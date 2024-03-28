
import numpy as np
import cv2
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
import tensorflow as tf

app = Flask(__name__)

# Load the trained model
model = load_model(
    r'D:\Minor\Model\OSTEOPOROSIS\Model\Osteoporosis.h5')

# Define class labels
class_labels = ['Healthy', 'Osteoporosis']
# Define image data generator with preprocessing function
image_gen = ImageDataGenerator(
    preprocessing_function=tf.keras.applications.mobilenet_v2.preprocess_input)


@app.route('/predict', methods=['POST'])
def predict():
    # Check if the request contains the image file
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    # Get the image file from the request
    image_file = request.files['image']

    # Read the image using OpenCV
    image = cv2.imdecode(np.frombuffer(
        image_file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Resize the image to match the model's input shape
    image = cv2.resize(image, (224, 224))

    # Preprocess the image using the image data generator
    image = image_gen.standardize(image)

    # Add batch dimension
    image = np.expand_dims(image, axis=0)

    # Perform prediction
    pred = model.predict(image)
    pred_class = class_labels[np.argmax(pred)]

    # Return the prediction result
    return jsonify({'prediction': pred_class})


if __name__ == '__main__':
    app.run(debug=True)
