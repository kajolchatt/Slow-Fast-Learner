# backend/app.py
from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import joblib
 
app = Flask(__name__)
CORS(app)
# Load the trained model
model = joblib.load('trained_model.joblib')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        data = request.get_json()
        print("Received data:", data)
        # Extract relevant features from the data
        user_input = np.array([
    [float(data['CGPA']), int(data['IAMARKS_SUB1']), int(data['IAMARKS_SUB2']),
    int(data['IAMARKS_SUB3']), int(data['IAMARKS_SUB4']), int(data['IAMARKS_SUB5']),
    int(data['NUMBER_PROJECT']), int(data['INTERNSHIP']), int(data['BACKLOGS']),
    int(data['EXTRA_ACTIVITIES'])]
])

        print("User input array:", user_input)
        # Make predictions for the user input
        user_pred = model.predict(user_input)
        print("Prediction:", user_pred)

        # Return the prediction as JSON
        if user_pred is not None and len(user_pred) > 0:
            return jsonify({'prediction': int(user_pred[0])})
        else:
            return jsonify({'error': 'Prediction is undefined'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000,debug=False,server='gunicorn')