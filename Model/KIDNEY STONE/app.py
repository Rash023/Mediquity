from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import io

app = Flask(__name__)

# Load the trained model
model = load_model(r'C:\Users\KIIT\Desktop\Minor_final\Minor\Model\KIDNEY STONE\Model\Kidney_Stone.h5')

def preprocess_image(img):
    # Convert the image to PIL format and resize to (200, 200)
    img_pil = image.load_img(img, target_size=(200, 200), color_mode='grayscale')
    # Convert PIL image to numpy array
    img_array = image.img_to_array(img_pil)
    # Expand dimensions to match the model's input shape
    img_array = np.expand_dims(img_array, axis=0)
    # Preprocess the image (normalize pixel values)
    img_array = img_array / 255.0
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})

    file = request.files['file']
    img_bytes = io.BytesIO(file.read())
    img_array = preprocess_image(img_bytes)

    # Make prediction
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)

    # Map predicted class to label
    class_labels = ['Cyst', 'Normal', 'Stone', 'Tumor']
    predicted_label = class_labels[predicted_class[0]]

    return jsonify({'prediction': predicted_label})

if __name__ == '__main__':
    app.run(debug=True)
