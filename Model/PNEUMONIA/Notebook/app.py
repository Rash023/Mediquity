from flask import Flask, render_template, request, redirect, url_for
import os
import itertools
from PIL import Image
import cv2
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        filename = secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Preprocess image
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0
        
        # Load model and make prediction
        model = load_model('/Model/Pneumonia.h5')
        prediction = model.predict(img_array)
        
        # Process prediction result
        if prediction[0][0] > 0.5:
            result = "Pneumonia Detected"
        else:
            result = "Normal"
        
        return render_template('result.html', result=result)

if __name__ == '__main__':
    app.config['UPLOAD_FOLDER'] = '/path/to/upload/folder'
    app.run()
