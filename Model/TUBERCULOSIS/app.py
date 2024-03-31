from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import io

app = Flask(__name__)

# Load the trained model
model = load_model(
    r'C:\Users\KIIT\Desktop\Minor_final\Minor\Model\Tuberculosis\Model\Tuberculosis-1.h5')

# Define target size for resizing input images
target_size = (64, 64)

# Function to preprocess the input image


def preprocess_image(image_content):
    img = cv2.imdecode(np.frombuffer(image_content, np.uint8), -1)
    img = cv2.resize(img, target_size)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize the image
    return img

# Route for predicting Tuberculosis from an uploaded image


@app.route('/predict', methods=['POST'])
def predict():
    # Check if the request contains an image file
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']

    # Read the image file as bytes
    image_content = file.read()

    # Preprocess the uploaded image
    processed_image = preprocess_image(image_content)

    # Make prediction
    prediction = model.predict(processed_image)

    # Get the predicted class (0 for normal, 1 for tuberculosis)
    predicted_class = int(np.round(prediction)[0][0])

    # Define class labels
    class_labels = ['Normal', 'Tuberculosis']

    # Return the prediction result
    return jsonify({'prediction': class_labels[predicted_class]})


if __name__ == '__main__':
    app.run(debug=True)
