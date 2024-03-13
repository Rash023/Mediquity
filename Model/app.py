from flask import Flask, request, jsonify
import cv2
import numpy as np
import io
import pickle as pkl
from tensorflow.keras.models import load_model
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

# Load pneumonia prediction model
pneumonia_model = load_model('D:\Minor\Model\PNEUMONIA\Model\Pneumonia.h5')

# Load diabetes prediction model
with open('D:\ML\DISEASE PREDICTION\DIABETES\Model\diabetesPredictionModel.pkl', 'rb') as file:
    diabetes_model = pkl.load(file)

# Load brain tumor prediction model
brain_tumor_model = load_model('D:\Minor\Model\BRAIN TUMOR\Model\model.h5')

def preprocess_image(img):
    img = cv2.resize(img, (150, 150))
    img_array = np.array(img)
    img_array = img_array.reshape(1, 150, 150, 3)
    return img_array

@app.route('/predict/pneumonia', methods=['POST'])
def predict_pneumonia():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in request'})

    file = request.files['image']
    img_stream = io.BytesIO(file.read())
    img = cv2.imdecode(np.frombuffer(img_stream.getvalue(), np.uint8), 1)
    img = cv2.resize(img, (224, 224))
    
    prediction = pneumonia_model.predict(np.expand_dims(img, axis=0))
    predicted_class = np.argmax(prediction)
    classes = ['NORMAL', 'PNEUMONIA']

    return jsonify({'prediction': classes[predicted_class]})

@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json
    gender = int(data['gender'])
    age = float(data['age'])
    hypertension = int(data['hypertension'])
    heart_disease = int(data['heart_disease'])
    smoking_history = int(data['smoking_history'])
    bmi = float(data['bmi'])
    HbA1c_level = float(data['HbA1c_level'])
    blood_glucose_level = int(data['blood_glucose_level'])
    
    input_data = np.array([[
        age,
        gender,
        hypertension,
        heart_disease,
        smoking_history,
        bmi,
        HbA1c_level,
        blood_glucose_level
    ]])
    
    prediction = diabetes_model.predict(input_data)
    
    result = "Non-diabetic" if prediction[0] == 0 else "Diabetic"
    
    return jsonify({'result': result})


@app.route('/predict/brain_tumor', methods=['POST'])
def predict_brain_tumor():
    file = request.files['image']
    img_stream = io.BytesIO(file.read())
    img = cv2.imdecode(np.frombuffer(img_stream.read(), np.uint8), 1)
    img_array = preprocess_image(img)

    predictions = brain_tumor_model.predict(img_array)
    predicted_class = np.argmax(predictions)
    tumor_types = ['Giloma Tumor', 'Meningioma Tumor', 'No Tumor', 'Pituitary Tumor']
    predicted_tumor_type = tumor_types[predicted_class]

    return jsonify({'prediction': predicted_tumor_type})

if __name__ == '__main__':
    app.run(debug=True)
