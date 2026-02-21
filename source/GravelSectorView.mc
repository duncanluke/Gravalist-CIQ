import Toybox.WatchUi;
import Toybox.Graphics;
import Toybox.Sensor;
import Toybox.Activity;
import Toybox.FitContributor;
import Toybox.Math;
import Toybox.System;

class GravelSectorView extends WatchUi.DataField {

    // FIT Field IDs
    private const FIELD_ID_RATING = 0;
    private const FIELD_ID_ROCK_POINTS = 1;

    private var _fitFieldRating = null;
    private var _fitFieldPoints = null;

    private var _currentRating = 0.0;
    private var _rockPoints = 0.0;
    private var _sensitivity = 1.0; // Added new variable
    
    private var _ratingHistory = [0.0, 0.0, 0.0, 0.0, 0.0];
    private var _historyIdx = 0;
    
    private const SAMPLE_RATE = 25;
    
    // UI Layout variables
    private var _backgroundColor = Graphics.COLOR_WHITE;
    private var _labelColor = Graphics.COLOR_BLACK;
    private var _valueColor = Graphics.COLOR_BLACK;

    function initialize() {
        DataField.initialize();
        
        // Calculate calibration based on settings
        var bikeType = 0;
        var tireSize = 1;
        var frameType = 3;
        try {
            bikeType = Application.Properties.getValue("bikeType");
            tireSize = Application.Properties.getValue("tireSize");
            frameType = Application.Properties.getValue("frameType");
        } catch (e) {}

        // Calibration Tables
        var bikeFactors = [1.0, 1.4, 1.9]; // Gravel, Hardtail, FullSus
        var tireFactors = [0.8, 1.0, 1.2, 1.5]; // Small ... 2.2"+
        var frameFactors = [1.1, 1.15, 1.2, 1.0]; // Steel, Ti, Carbon, Aluminium (Baseline)
        
        _sensitivity = bikeFactors[bikeType] * tireFactors[tireSize] * frameFactors[frameType];

        // Register for high-frequency sensor data
        try {
            var options = {
                :period => 1,
                :accelerometer => { :enabled => true, :sampleRate => SAMPLE_RATE },
                :gyroscope => { :enabled => true, :sampleRate => SAMPLE_RATE }
            };
            Sensor.registerSensorDataListener(method(:onSensorData), options);
        } catch (e) {
            System.println("Sensor registration failed: " + e.getErrorMessage());
        }

        // Create FIT fields
        _fitFieldRating = createField("gravalist_rating", FIELD_ID_RATING, FitContributor.DATA_TYPE_FLOAT, { :mesgType => FitContributor.MESG_TYPE_RECORD, :units => "score" });
        _fitFieldPoints = createField("rock_points", FIELD_ID_ROCK_POINTS, FitContributor.DATA_TYPE_FLOAT, { :mesgType => FitContributor.MESG_TYPE_RECORD, :units => "points" });
    }

    // Set background color when it changes
    function onUpdate(dc) {
        var bgColor = getBackgroundColor();
        _backgroundColor = bgColor;
        _labelColor = (bgColor == Graphics.COLOR_BLACK) ? Graphics.COLOR_WHITE : Graphics.COLOR_BLACK;
        _valueColor = _labelColor;

        // Clear the screen
        dc.setColor(bgColor, bgColor);
        dc.clear();

        var width = dc.getWidth();
        var height = dc.getHeight();

        // Determine State Color
        var stateColor = Graphics.COLOR_GREEN;
        var stateText = "SMOOTH";
        if (_currentRating > 6.0) {
            stateColor = Graphics.COLOR_RED;
            stateText = "ROUGH";
        } else if (_currentRating > 3.0) {
            stateColor = Graphics.COLOR_ORANGE;
            stateText = "OKAY";
        }

        // Draw State Indicator (Background Glow/Bar)
        dc.setColor(stateColor, Graphics.COLOR_TRANSPARENT);
        dc.fillRectangle(0, 0, width, height / 3);
        
        // Text for State
        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, height / 6, Graphics.FONT_MEDIUM, stateText, Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);

        // Draw Rock Points (The Big Number)
        dc.setColor(_labelColor, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, height / 2, Graphics.FONT_XTINY, "GRAVEL ROCKS", Graphics.TEXT_JUSTIFY_CENTER);
        
        dc.setColor(_valueColor, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, height / 2 + 25, Graphics.FONT_NUMBER_MEDIUM, _rockPoints.format("%d"), Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);

        // Subtext for Contribution (Discovery Link)
        dc.setColor(_labelColor, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, height - 15, Graphics.FONT_XTINY, "JOIN THE MAP: GRAVALIST.COM", Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);
    }

    function onSensorData(sensorData) {
        var accel = sensorData.accelerometerData;
        var gyro = sensorData.gyroscopeData;
        
        var combinedMetric = 0.0;
        if (accel != null && accel.z != null) {
            combinedMetric += calculateVariance(accel.z) * 15.0;
        }
        if (gyro != null && gyro.y != null) {
            combinedMetric += calculateVariance(gyro.y) * 0.5;
        }
        
        processMetric(combinedMetric);
    }

    private function calculateVariance(values) {
        if (values.size() == 0) { return 0.0; }
        var sum = 0.0;
        var sumSq = 0.0;
        var count = values.size();
        for (var i = 0; i < count; i++) {
            var val = values[i].toFloat();
            sum += val;
            sumSq += (val * val);
        }
        var mean = sum / count;
        var variance = (sumSq / count) - (mean * mean);
        return variance > 0 ? variance : 0.0;
    }

    private function processMetric(rawMetric) {
        var info = Activity.getActivityInfo();
        var speed = (info != null && info.currentSpeed != null) ? info.currentSpeed : 0.0;
        var gradient = (info != null && info.gradient != null) ? info.gradient : 0.0;
        
        if (speed < 1.0) {
            _currentRating = 0.0;
        } else {
            // Calculate Rating
            var speedAdjustment = 1.0 + (speed / 8.0);
            var targetRating = (rawMetric / (speedAdjustment * 10000.0)) * _sensitivity;
            
            // Smoothing
            _ratingHistory[_historyIdx] = targetRating;
            _historyIdx = (_historyIdx + 1) % _ratingHistory.size();
            var total = 0.0;
            for (var i = 0; i < _ratingHistory.size(); i++) { total += _ratingHistory[i]; }
            _currentRating = total / _ratingHistory.size();

            // Calculate Rock Points
            // Points are earned in Amber/Red states, weighted by speed and gradient (effort)
            if (_currentRating > 3.0) {
                var multiplier = (_currentRating > 6.0) ? 2.0 : 1.0;
                var gradientFactor = 1.0 + (Math.abs(gradient) / 10.0);
                // Points = (Speed in m/s) * (Severity Multiplier) * (Gradient Difficulty)
                // This updates every second (onSensorData period), so we divide to make points meaningful
                _rockPoints += (speed * multiplier * gradientFactor) / 10.0;
            }
        }
        
        if (_currentRating > 10.0) { _currentRating = 10.0; }
        
        // Update FIT fields
        if (_fitFieldRating != null) { _fitFieldRating.setData(_currentRating); }
        if (_fitFieldPoints != null) { _fitFieldPoints.setData(_rockPoints); }

        WatchUi.requestUpdate();
    }

    function compute(info) {
        // Return Rock Points to the standard system (if in simple mode)
        return _rockPoints.format("%d");
    }

}
