import Toybox.WatchUi;
import Toybox.Graphics;
import Toybox.Sensor;
import Toybox.Activity;
import Toybox.FitContributor;
import Toybox.Math;
import Toybox.System;
import Toybox.Communications;
import Toybox.Application;
import Toybox.Lang;
import Toybox.Time;

class GravelSectorView extends WatchUi.DataField {

    // FIT Field IDs
    private const FIELD_ID_RATING = 0;
    private const FIELD_ID_ROCK_POINTS = 1;
    private const FIELD_ID_SESSION_TOTAL_ROCKS = 2;
    private const FIELD_ID_SESSION_AVG_RATING = 3;
    private const FIELD_ID_LAP_ROCKS = 4;

    private var _fitFieldRating = null;
    private var _fitFieldPoints = null;
    private var _fitFieldSessionRocks = null;
    private var _fitFieldSessionAvg = null;
    private var _fitFieldLapRocks = null;

    private var _currentRating = 0.0;
    private var _rockPoints = 0.0;
    private var _totalRatingSum = 0.0;
    private var _ratingCount = 0;
    private var _lapStartRocks = 0.0;
    private var _sensitivity = 1.0;
    
    private var _ratingHistory = new [75];
    private var _historyIdx = 0;
    
    // Batch Sync Variables (End-of-ride only)
    private var _checkpointCounter = 0;
    private const SYNC_INTERVAL = 300; // 5 mins
    private var _checkpointRatingSum = 0.0;
    private var _checkpointSpeedSum = 0.0;
    private var _checkpointGradSum = 0.0;
    private var _checkpointDataCount = 0;
    private var _checkpoints = []; // Stores [lat, lon, rating, speed, grad]

    private var _rideId = "";
    private var _isSyncing = false;
    private const SAMPLE_RATE = 25;

    function initialize() {
        DataField.initialize();
        var userId = "GUEST";
        try { userId = Application.Properties.getValue("userId"); } catch (e) {}
        _rideId = userId + "_" + Time.now().value().toString();

        // Calibration
        var bikeType = 0; var tireSize = 1; var frameType = 3;
        try {
            bikeType = Application.Properties.getValue("bikeType");
            tireSize = Application.Properties.getValue("tireSize");
            frameType = Application.Properties.getValue("frameType");
        } catch (e) {}
        var bikeFactors = [1.0, 1.4, 1.9];
        var tireFactors = [0.8, 1.0, 1.2, 1.5];
        var frameFactors = [1.1, 1.15, 1.2, 1.0];
        _sensitivity = bikeFactors[bikeType] * tireFactors[tireSize] * frameFactors[frameType];

        // Register Sensors
        try {
            var opts = { :period => 1, :accelerometer => {:enabled => true, :sampleRate => SAMPLE_RATE}, :gyroscope => {:enabled => true, :sampleRate => SAMPLE_RATE} };
            Sensor.registerSensorDataListener(method(:onSensorData), opts);
        } catch (e) {}

        // FIT Fields
        _fitFieldRating = createField("rating", FIELD_ID_RATING, FitContributor.DATA_TYPE_FLOAT, { :mesgType => FitContributor.MESG_TYPE_RECORD, :units => "score" });
        _fitFieldPoints = createField("rock_points_inc", FIELD_ID_ROCK_POINTS, FitContributor.DATA_TYPE_FLOAT, { :mesgType => FitContributor.MESG_TYPE_RECORD, :units => "pts" });
        _fitFieldSessionRocks = createField("total_rocks", FIELD_ID_SESSION_TOTAL_ROCKS, FitContributor.DATA_TYPE_FLOAT, { :mesgType => FitContributor.MESG_TYPE_SESSION, :units => "total_pts" });
        _fitFieldSessionAvg = createField("avg_gravel_rating", FIELD_ID_SESSION_AVG_RATING, FitContributor.DATA_TYPE_FLOAT, { :mesgType => FitContributor.MESG_TYPE_SESSION, :units => "avg_score" });
        _fitFieldLapRocks = createField("lap_rocks", FIELD_ID_LAP_ROCKS, FitContributor.DATA_TYPE_FLOAT, { :mesgType => FitContributor.MESG_TYPE_LAP, :units => "lap_pts" });

        for (var i = 0; i < 75; i++) {
            _ratingHistory[i] = 0.0;
        }
    }

    function onUpdate(dc) {
        var bgColor = getBackgroundColor();
        var labelColor = (bgColor == Graphics.COLOR_BLACK) ? Graphics.COLOR_WHITE : Graphics.COLOR_BLACK;
        dc.setColor(bgColor, bgColor); dc.clear();

        var stateColor = Graphics.COLOR_GREEN; var stateText = "SMOOTH";
        if (_currentRating > 6.0) { stateColor = Graphics.COLOR_RED; stateText = "ROUGH"; }
        else if (_currentRating > 3.0) { stateColor = Graphics.COLOR_ORANGE; stateText = "OKAY"; }

        dc.setColor(stateColor, Graphics.COLOR_TRANSPARENT); dc.fillRectangle(0, 0, dc.getWidth(), dc.getHeight() / 3);
        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(dc.getWidth() / 2, dc.getHeight() / 6, Graphics.FONT_MEDIUM, stateText, Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);

        dc.setColor(labelColor, Graphics.COLOR_TRANSPARENT);
        dc.drawText(dc.getWidth() / 2, dc.getHeight() / 2, Graphics.FONT_XTINY, "GRAVEL ROCKS", Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(dc.getWidth() / 2, dc.getHeight() / 2 + 25, Graphics.FONT_NUMBER_MEDIUM, _rockPoints.format("%d"), Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);
        var footer = _isSyncing ? "SYNCING..." : "MAPS.GRAVALIST.COM";
        dc.drawText(dc.getWidth() / 2, dc.getHeight() - 15, Graphics.FONT_XTINY, footer, Graphics.TEXT_JUSTIFY_CENTER | Graphics.TEXT_JUSTIFY_VCENTER);
    }

    function onSensorData(sensorData as Sensor.SensorData) as Void {
        var accel = sensorData.accelerometerData; var gyro = sensorData.gyroscopeData;
        var combined = 0.0;
        if (accel != null && accel.z != null) { combined += calculateVariance(accel.z) * 15.0; }
        if (gyro != null && gyro.y != null) { combined += calculateVariance(gyro.y) * 0.5; }
        
        var info = Activity.getActivityInfo();
        var speed = (info != null && info.currentSpeed != null) ? info.currentSpeed : 0.0;
        var gradient = 0.0; if (info != null && info has :gradient && info.gradient != null) { gradient = info.gradient; }
        
        if (speed < 1.0) { _currentRating = 0.0; }
        else {
            var target = (combined / (1.0 + (speed / 8.0)) / 10000.0) * _sensitivity;
            _ratingHistory[_historyIdx] = target; _historyIdx = (_historyIdx + 1) % _ratingHistory.size();
            var total = 0.0; for (var i = 0; i < _ratingHistory.size(); i++) { total += _ratingHistory[i]; }
            _currentRating = total / _ratingHistory.size(); _totalRatingSum += _currentRating; _ratingCount++;
            if (_currentRating > 3.0) {
                var mult = (_currentRating > 6.0) ? 2.0 : 1.0;
                var gradF = 1.0 + ((gradient < 0 ? -gradient : gradient) / 10.0);
                _rockPoints += (speed * mult * gradF) / 10.0;
            }
        }
        if (_currentRating > 10.0) { _currentRating = 10.0; }
        if (_fitFieldRating != null) { _fitFieldRating.setData(_currentRating); }
        if (_fitFieldPoints != null) { _fitFieldPoints.setData(_rockPoints); }
        WatchUi.requestUpdate();
    }

    function compute(info) {
        if (info != null && info.timerState == Activity.TIMER_STATE_ON) {
            _checkpointCounter++;
            _checkpointRatingSum += _currentRating;
            _checkpointSpeedSum += (info.currentSpeed != null) ? info.currentSpeed : 0.0;
            if (info has :gradient && info.gradient != null) { _checkpointGradSum += info.gradient; }
            _checkpointDataCount++;

            // Every 5 minutes, capture a route checkpoint locally
            if (_checkpointCounter >= SYNC_INTERVAL) {
                var lat = 0.0; var lon = 0.0;
                if (info.currentLocation != null) { 
                    var c = info.currentLocation.toDegrees(); 
                    lat = c[0]; lon = c[1]; 
                }
                
                // Add to local buffer instead of syncing live
                _checkpoints.add({
                    "lat" => lat,
                    "lon" => lon,
                    "rating" => _checkpointRatingSum / _checkpointDataCount,
                    "speed" => _checkpointSpeedSum / _checkpointDataCount,
                    "gradient" => _checkpointGradSum / _checkpointDataCount,
                    "timestamp" => Time.now().value()
                });

                _checkpointCounter = 0; _checkpointRatingSum = 0.0; _checkpointSpeedSum = 0.0; _checkpointGradSum = 0.0; _checkpointDataCount = 0;
            }
        }
        return _rockPoints.format("%d");
    }

    function onTimerReset() {
        var rocks = _rockPoints; var avgR = (_ratingCount > 0) ? (_totalRatingSum / _ratingCount) : 0.0;
        if (_fitFieldSessionRocks != null) { _fitFieldSessionRocks.setData(rocks); }
        if (_fitFieldSessionAvg != null) { _fitFieldSessionAvg.setData(avgR); }
        
        // Final Mega-Sync to maps.gravalist.com
        transmitBatch(rocks, avgR);
    }

    private function transmitBatch(rocks, rating) {
        var userId = "GUEST"; try { userId = Application.Properties.getValue("userId"); } catch (e) {}
        var bikeType = 0; try { bikeType = Application.Properties.getValue("bikeType"); } catch (e) {}
        
        var payload = {
            "rideId" => _rideId,
            "userId" => userId,
            "bikeType" => bikeType,
            "totalRocks" => rocks,
            "avgRating" => rating,
            "timestamp" => Time.now().value(),
            "checkpoints" => _checkpoints // The entire 6-hour route data
        };

        var opts = { 
            :method => Communications.HTTP_REQUEST_METHOD_POST as Communications.HttpRequestMethod, 
            :headers => { "Content-Type" => Communications.REQUEST_CONTENT_TYPE_JSON }, 
            :responseType => Communications.HTTP_RESPONSE_CONTENT_TYPE_JSON as Communications.HttpResponseContentType 
        };
        
        _isSyncing = true;
        Communications.makeWebRequest("https://maps.gravalist.com/api/sync", payload, opts, method(:onSyncResponse));
    }

    function onSyncResponse(respCode as Lang.Number, data as Lang.Dictionary or Lang.String or Null) as Void {
        _isSyncing = false;
        if (respCode == 200) { System.println("Ride Synced OK"); }
        WatchUi.requestUpdate();
    }

    private function calculateVariance(values) {
        if (values.size() == 0) { return 0.0; }
        var sum = 0.0; var sumSq = 0.0;
        for (var i = 0; i < values.size(); i++) {
            var val = values[i].toFloat(); sum += val; sumSq += (val * val);
        }
        var mean = sum / values.size();
        var varc = (sumSq / values.size()) - (mean * mean);
        return varc > 0 ? varc : 0.0;
    }
}
