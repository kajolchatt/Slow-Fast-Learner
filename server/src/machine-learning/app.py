from flask import Flask, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load('trained_model.joblib')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        data = request.get_json()

        # Extract relevant features from the data
        user_input = np.array([[data['CGPA'], data['IAMARKS_SUB1'], data['IAMARKS_SUB2'],
                                data['IAMARKS_SUB3'], data['IAMARKS_SUB4'], data['IAMARKS_SUB5'],
                                data['NUMBER_PROJECT'], data['INTERNSHIP'], data['BACKLOGS'],
                                data['EXTRA_ACTIVITIES']]])

        # Make predictions for the user input
        user_pred = model.predict(user_input)

        # Return the prediction as JSON
        return jsonify({'prediction': int(user_pred[0])})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
