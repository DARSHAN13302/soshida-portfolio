# Customer Churn Prediction - Complete ML Project

## Problem Statement
Telecom companies lose billions annually due to customer churn. Acquisition costs are 5-7x higher than retention. The business needs a predictive system to identify at-risk customers 3-6 months before they leave.

## My Approach

### Data Generation
- Created synthetic dataset with 10,000 customer records
- Engineered 14 features (demographics, account info, service usage, financial)
- Target: Churn (Yes/No)

### Models Implemented
1. Random Forest - Best performer (84% accuracy, 91% ROC AUC)
2. Gradient Boosting
3. Logistic Regression
4. SVM
5. KNN

### Technical Stack
- Python, Pandas, Scikit-learn
- XGBoost, SHAP for explainability
- Flask API for deployment
- Streamlit for interactive dashboard

## Challenges Overcome

### 1. Data Imbalance
- Problem: Only 15% churn rate
- Solution: Stratified sampling, class weighting, focus on Recall

### 2. Feature Heterogeneity
- Problem: Mixed data types
- Solution: Label encoding, StandardScaler

### 3. Model Interpretability
- Problem: Business needed understandable insights
- Solution: SHAP analysis, feature importance, visualizations

## Results
- Accuracy: 84%
- ROC AUC: 91%
- Recall: 85%
- Key Insight: Month-to-month contracts and lack of online security are top churn drivers

## My Contribution
- Independently designed and implemented complete system
- From data generation and EDA to model training and production deployment
- Delivered actionable business insights
