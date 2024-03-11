from flask import Flask, request, jsonify
import pickle as pkl
import numpy as np

app = Flask(__name__)

with open('D:\ML\DISEASE PREDICTION\DIABETES\Model\diabetesPredictionModel.pkl', 'rb') as file:
    model = pkl.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Convert gender to binary
    data['gender'] = 1 if data['gender'] == 'Male' else 0
    
    # Prepare data for prediction
    input_data = np.array([[
        data['age'],
        data['gender'],
        data['hypertension'],
        data['heart_disease'],
        data['smoking_history'],
        data['bmi'],
        data['HbA1c_level'],
        data['blood_glucose_level']
    ]])
    
    # Make prediction
    prediction = model.predict(input_data)
    
    # Return prediction
    if prediction[0] == 0:
        result = "Non-diabetic"
    else:
        result = "Diabetic"
    
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
