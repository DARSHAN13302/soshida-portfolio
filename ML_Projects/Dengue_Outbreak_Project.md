# Dengue Outbreak Prediction - Geospatial ML Project

## Problem Statement
Public health agencies needed to predict dengue fever outbreaks in urban areas using environmental factors, enabling early intervention and resource allocation.

## My Approach

### Data Sources
- Satellite imagery (land cover, vegetation indices)
- Climate data (temperature, rainfall, humidity)
- Population density (census data)
- Historical disease cases (5 years of outbreak records)

### Technical Stack
- Python: GeoPandas, Rasterio, Xarray, Scikit-learn
- Visualization: Folium, Plotly, Kepler.gl
- Models: Random Forest, XGBoost, LSTM (time series)
- Geospatial: QGIS, PostGIS, Leaflet

## Challenges Overcome

### 1. Data Integration
- Problem: Combining raster, gridded, and point data with different resolutions
- Solution: Resampled to uniform grid, spatial joins, automated ETL pipeline

### 2. Spatial Autocorrelation
- Problem: Cases in neighboring areas not independent
- Solution: Moran's I test, spatial weights, spatial cross-validation

### 3. Temporal-Lag Detection
- Problem: Environmental factors affect outbreaks with 2-8 week delay
- Solution: Lagged features, LSTM networks, Granger causality tests

### 4. Data Imbalance
- Problem: Outbreaks are rare (<5% of locations)
- Solution: SMOTE oversampling, cost-sensitive learning

## Results
- Accuracy: 82%
- Recall: 78%
- Early Warning: 3-4 weeks in advance
- AUC-ROC: 0.89
- Key Insight: Rainfall strongest predictor (35% feature importance)

## My Contribution
- Designed complete data pipeline
- Integrated 5 different data sources
- Built prediction model with 82% accuracy
- Developed risk mapping dashboard
- Collaborated with epidemiologists
