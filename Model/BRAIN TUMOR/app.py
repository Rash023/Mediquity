from flask import Flask, request, jsonify
import numpy as np
import cv2
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import base64
import io

app = Flask(__name__)
model = load_model('/Model/model.h5')

def preprocess_image(img):
    img = cv2.resize(img, (150, 150))
    img_array = np.array(img)
    img_array = img_array.reshape(1, 150, 150, 3)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    # Get the uploaded image file
    file = request.files['image']

    # Read image file
    img_stream = io.BytesIO(file.read())
    img = cv2.imdecode(np.frombuffer(img_stream.read(), np.uint8), 1)

    # Preprocess the image
    img_array = preprocess_image(img)

    # Make predictions
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions)

    # Map the predicted class index to tumor type
    tumor_types = ['Giloma Tumor', 'Meningioma Tumor', 'No Tumor', 'Pituitary Tumor']
    predicted_tumor_type = tumor_types[predicted_class]

    return jsonify({'prediction': predicted_tumor_type})

if __name__ == '__main__':
    app.run()
