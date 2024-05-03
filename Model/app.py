from flask import Flask, request, jsonify
import cv2
import numpy as np
import io
import pickle as pkl
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from keras.preprocessing.image import ImageDataGenerator
from flask_cors import CORS
import tensorflow as tf
import base64

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

# MODEL
pneumonia_model = load_model('./PNEUMONIA/Model/Pneumonia.h5')
osteoporosis_model = load_model(r'./OSTEOPOROSIS/Model/Osteoporosis.h5')
kidney_stone_model = load_model(r'./KIDNEY STONE/Model/Kidney_Stone.h5')
tuberculosis_model = load_model(r'./TUBERCULOSIS/Model/Tuberculosis.h5')
brain_tumor_model = load_model('./BRAIN TUMOR/Model/Model.h5')
image_gen = ImageDataGenerator(
    preprocessing_function=tf.keras.applications.mobilenet_v2.preprocess_input)
with open('./DIABETES/Model/diabetesPredictionModel.pkl', 'rb') as file:
    diabetes_model = pkl.load(file)

# PREPROCESSING
def preprocess_image(img):
    img = cv2.resize(img, (150, 150))
    img_array = np.array(img)
    img_array = img_array.reshape(1, 150, 150, 3)
    return img_array

def preprocess_image_kidney_stone(img):
    img_pil = image.load_img(img, target_size=(200, 200), color_mode='grayscale')
    img_array = image.img_to_array(img_pil)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

def preprocess_image_tuberculosis(image_content):
    target_size = (64, 64)
    img = cv2.imdecode(np.frombuffer(image_content, np.uint8), -1)
    img = cv2.resize(img, target_size)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize the image
    return img

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

@app.route('/predict/osteoporosis', methods=['POST'])
def predict_osteoporosis():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})
    image_file = request.files['image']
    image = cv2.imdecode(np.frombuffer(
        image_file.read(), np.uint8), cv2.IMREAD_COLOR)
    image = cv2.resize(image, (224, 224))
    image = image_gen.standardize(image)
    image = np.expand_dims(image, axis=0)
    pred = osteoporosis_model.predict(image)
    class_labels = ['Healthy', 'Osteoporosis']
    pred_class = class_labels[np.argmax(pred)]
    return jsonify({'prediction': pred_class})

@app.route('/predict/kidney-stone', methods=['POST'])
def predict_kidney_stone():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})
    file = request.files['file']
    img_bytes = io.BytesIO(file.read())
    img_array = preprocess_image_kidney_stone(img_bytes)
    prediction = kidney_stone_model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)
    class_labels = ['Cyst', 'Normal', 'Stone', 'Tumor']
    predicted_label = class_labels[predicted_class[0]]
    return jsonify({'prediction': predicted_label})

@app.route('/predict/tuberculosis', methods=['POST'])
def predict_tuberculosis():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})
    file = request.files['file']
    image_content = file.read()
    processed_image = preprocess_image_tuberculosis(image_content)
    prediction = tuberculosis_model.predict(processed_image)
    predicted_class = int(np.round(prediction)[0][0])
    class_labels = ['Normal', 'Tuberculosis']
    return jsonify({'prediction': class_labels[predicted_class]})

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
