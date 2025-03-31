# from flask import Flask, request, jsonify, render_template, send_from_directory
# import pandas as pd
# import numpy as np
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.svm import SVC
# from sklearn.preprocessing import StandardScaler
# import joblib
# import os

# app = Flask(__name__, static_folder='static', template_folder='templates')

# # Load models and scalers (assuming they've been trained and saved)
# try:
#     # Diabetes model and scaler
#     rf_model = joblib.load('models/diabetes_rf_model.pkl')
#     diabetes_scaler = joblib.load('models/diabetes_scaler.pkl')
    
#     # Heart disease model and scaler
#     svm_model = joblib.load('models/heart_svm_model.pkl')
#     heart_scaler = joblib.load('models/heart_scaler.pkl')
    
#     models_loaded = True
# except Exception as e:
#     print(f"Error loading models: {e}")
#     models_loaded = False
    
#     # Define feature names for both datasets
#     diabetes_features = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
#                          'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
    
#     heart_features = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 
#                       'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']

# # Save trained models (should be run after training)
# def save_models(rf, scaler_d, svm, scaler_h):
#     os.makedirs('models', exist_ok=True)
#     joblib.dump(rf, 'models/diabetes_rf_model.pkl')
#     joblib.dump(scaler_d, 'models/diabetes_scaler.pkl')
#     joblib.dump(svm, 'models/heart_svm_model.pkl')
#     joblib.dump(scaler_h, 'models/heart_scaler.pkl')
#     return True

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/api/predict/diabetes', methods=['POST'])
# def predict_diabetes():
#     try:
#         data = request.json
#         # Convert input to DataFrame with correct column names
#         input_data = pd.DataFrame([data], columns=diabetes_features)
        
#         # Scale the data
#         input_scaled = diabetes_scaler.transform(input_data)
        
#         # Make prediction
#         prediction = int(rf_model.predict(input_scaled)[0])
#         probability = float(rf_model.predict_proba(input_scaled)[0][1])
        
#         return jsonify({
#             'success': True,
#             'prediction': prediction,
#             'probability': probability * 100,
#             'message': 'Positive' if prediction == 1 else 'Negative'
#         })
#     except Exception as e:
#         return jsonify({
#             'success': False,
#             'error': str(e)
#         }), 500

# @app.route('/api/predict/heart', methods=['POST'])
# def predict_heart():
#     try:
#         data = request.json
#         # Convert input to DataFrame with correct column names
#         input_data = pd.DataFrame([data], columns=heart_features)
        
#         # Scale the data
#         input_scaled = heart_scaler.transform(input_data)
        
#         # Make prediction
#         prediction = int(svm_model.predict(input_scaled)[0])
#         probability = float(svm_model.predict_proba(input_scaled)[0][1])
        
#         return jsonify({
#             'success': True,
#             'prediction': prediction,
#             'probability': probability * 100,
#             'message': 'Positive' if prediction == 1 else 'Negative'
#         })
#     except Exception as e:
#         return jsonify({
#             'success': False,
#             'error': str(e)
#         }), 500

# @app.route('/api/model-metrics', methods=['GET'])
# def get_model_metrics():
#     # Mock metrics data (in a real app, this would be calculated or loaded)
#     return jsonify({
#         'diabetes': {
#             'accuracy': 0.78,
#             'f1_score': 0.75,
#             'confusion_matrix': [[50, 10], [15, 45]],
#             'feature_importance': [0.28, 0.22, 0.12, 0.08, 0.1, 0.15, 0.05, 0.1]
#         },
#         'heart': {
#             'accuracy': 0.85,
#             'f1_score': 0.83,
#             'confusion_matrix': [[60, 8], [12, 55]]
#         }
#     })

# if __name__ == '_main_':
#     app.run(debug=True)

from flask import Flask, request, jsonify, url_for, render_template, send_from_directory
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
import joblib
import os
import logging
from flask_cors import CORS  # type: ignore # Import CORS

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Load models and scalers
models_loaded = False
try:
    rf_model = joblib.load('diabetes_rf_model.pkl')
    diabetes_scaler = joblib.load('diabetes_scaler.pkl')
    svm_model = joblib.load('heart_svm_model.pkl')
    heart_scaler = joblib.load('heart_scaler.pkl')
    models_loaded = True
    logging.info("Models loaded successfully.")
except Exception as e:
    logging.error(f"Error loading models: {e}")

# Feature names
diabetes_features = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']
heart_features = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/predict/diabetes', methods=['POST'])
def predict_diabetes():
    if not models_loaded:
        return jsonify({'success': False, 'error': "Models not loaded. Please try again later."}), 500
    try:
        data = request.json
        # Input validation
        for feature in diabetes_features:
            if feature not in data:
                return jsonify({'success': False, 'error': f'Missing feature: {feature}'}), 400
            if not isinstance(data[feature], (int, float)):
                return jsonify({'success': False, 'error': f'{feature} must be a number.'}), 400
            if data[feature] < 0:
                return jsonify({'success': False, 'error': f'{feature} must be positive.'}), 400

        input_data = pd.DataFrame([data], columns=diabetes_features)
        input_scaled = diabetes_scaler.transform(input_data)
        prediction = int(rf_model.predict(input_scaled)[0])
        probability = float(rf_model.predict_proba(input_scaled)[0][1])

        return jsonify({
            'success': True,
            'prediction': prediction,
            'probability': probability * 100,
            'message': 'Positive' if prediction == 1 else 'Negative'
        })
    except Exception as e:
        logging.error(f"Diabetes prediction error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/predict/heart', methods=['POST'])
def predict_heart():
    if not models_loaded:
        return jsonify({'success': False, 'error': "Models not loaded. Please try again later."}), 500
    try:
        data = request.json
        # Input validation
        for feature in heart_features:
            if feature not in data:
                return jsonify({'success': False, 'error': f'Missing feature: {feature}'}), 400
            if not isinstance(data[feature], (int, float)):
                return jsonify({'success': False, 'error': f'{feature} must be a number.'}), 400
            if data['age'] < 0:
                return jsonify({'success': False, 'error': f'age must be positive.'}), 400
            if data['trestbps'] < 0:
                return jsonify({'success': False, 'error': f'trestbps must be positive.'}), 400
            if data['chol'] < 0:
                return jsonify({'success': False, 'error': f'chol must be positive.'}), 400
            if data['thalach'] < 0:
                return jsonify({'success': False, 'error': f'thalach must be positive.'}), 400
            if data['oldpeak'] < 0:
                return jsonify({'success': False, 'error': f'oldpeak must be positive.'}), 400
            if data['ca'] < 0:
                return jsonify({'success': False, 'error': f'ca must be positive.'}), 400

        input_data = pd.DataFrame([data], columns=heart_features)
        input_scaled = heart_scaler.transform(input_data)
        prediction = int(svm_model.predict(input_scaled)[0])
        probability = float(svm_model.predict_proba(input_scaled)[0][1])

        return jsonify({
            'success': True,
            'prediction': prediction,
            'probability': probability * 100,
            'message': 'Positive' if prediction == 1 else 'Negative'
        })
    except Exception as e:
        logging.error(f"Heart prediction error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/model-metrics', methods=['GET'])
def get_model_metrics():
    # Placeholder metrics (replace with actual metrics calculation)
    return jsonify({
        'diabetes': {
            'accuracy': 0.78,
            'f1_score': 0.75,
            'confusion_matrix': [[50, 10], [15, 45]],
            'feature_importance': [0.28, 0.22, 0.12, 0.08, 0.1, 0.15, 0.05, 0.1]
        },
        'heart': {
            'accuracy': 0.85,
            'f1_score': 0.83,
            'confusion_matrix': [[60, 8], [12, 55]]
        }
    })

if __name__ == '__main__':
    app.run(debug=True)