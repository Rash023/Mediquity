from flask import Flask, render_template, request
import numpy as np
import cv2
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
model = load_model('model.h5')

def preprocess_image(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (150, 150))
    img_array = np.array(img)
    img_array = img_array.reshape(1, 150, 150, 3)
    return img_array

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get the uploaded image file
        file = request.files['image']

        # Save the file to the uploads folder
        file_path = 'uploads/' + file.filename
        file.save(file_path)

        # Preprocess the image
        img_array = preprocess_image(file_path)

        # Make predictions
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions)

        # Map the predicted class index to tumor type
        tumor_types = ['Giloma Tumor', 'Meningioma Tumor', 'No Tumor', 'Pituitary Tumor']
        predicted_tumor_type = tumor_types[predicted_class]

        return render_template('index.html', prediction=predicted_tumor_type, image_path=file_path)

    return render_template('index.html', prediction=None, image_path=None)

if __name__ == '__main__':
    app.run()
