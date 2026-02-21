# Gravalist: Gravel Rocks Counter

The **Gravel Rocks Collector** is a Garmin Connect IQ Data Field that automatically counts 'Gravel Rocks' based on vibrations, speed, and gradient, turning every ride into a motivational exploration.

## Features
- **3-Tiered Real-Time UI**: Color-coded feedback (Smooth 🟢, Okay 🟡, Rough 🔴).
- **Gamified "Rock Points"**: Accumulate points based on terrain difficulty, speed, and slope.
- **Advanced Calibration**: User-selectable settings for:
  - **Bike Type**: Gravel (Rigid), MTB Hardtail, MTB Full Suspension.
  - **Tire Size**: From <35mm up to 2.2"+ wide MTB tires.
  - **Frame Material**: Steel, Titanium, Carbon, and Aluminium.
- **Scientific Normalization**: Data is normalized so that results are consistent across different bike setups, ensuring fair contributions to the [maps.gravalist.com](https://maps.gravalist.com) global map.

## Project Structure
- `source/`: MonkeyC source code.
- `resources/`: Graphics, strings, and application settings.
- `manifest.xml`: App configuration and device compatibility.

## How to use
Add this Data Field to any cycling activity profile. Use the Garmin Connect Mobile app to calibrate your specific bike and tire setup for the most accurate "Rock Points" calculation.
