from flask import Flask, request, jsonify
import cv2
import numpy as np
import io
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)

# Load the trained model
model = load_model('D:\Minor\Model\PNEUMONIA\Model\Pneumonia.h5')

@app.route('/predict', methods=['POST'])
def predict():
    # Check if request contains file
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in request'})

    # Get the uploaded image file
    file = request.files['image']

    # Read image file
    img_stream = io.BytesIO(file.read())
    img = cv2.imdecode(np.frombuffer(img_stream.getvalue(), np.uint8), 1)

    # Preprocess the image (resize and normalize)
    img = cv2.resize(img, (224, 224))

    # Perform inference using the preprocessed image
    prediction = model.predict(np.expand_dims(img, axis=0))
    predicted_class = np.argmax(prediction)

    # Define classes
    classes = ['NORMAL', 'PNEUMONIA']

    # Return the predicted class
    return jsonify({'prediction': classes[predicted_class]})

if __name__ == '__main__':
    app.run()
