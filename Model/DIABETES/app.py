from flask import Flask, request, render_template
import pickle as pkl
import numpy as np

app = Flask(__name__)


with open('D:\ML\DISEASE PREDICTION\DIABETES\Model\diabetesPredictionModel.pkl', 'rb') as file:
    model = pkl.load(file)

@app.route('/')
def home():
    return render_template('index.html', final_result='')

@app.route('/predict', methods=['POST'])
def predict():
    data = {
        'age': int(request.form['age']),
        'gender': request.form['gender'],
        'hypertension': int(request.form['hypertension']),
        'heart_disease': int(request.form['heart_disease']),
        'smoking_history': int(request.form['smoking_history']),
        'bmi': float(request.form['bmi']),
        'HbA1c_level': float(request.form['HbA1c_level']),
        'blood_glucose_level': int(request.form['blood_glucose_level'])
    }
    
    
    data['gender'] = 1 if data['gender'] == 'Male' else 0
    
    
    prediction = model.predict(np.array(list(data.values())).reshape(1, -1))
    
    
    if prediction[0] == 0:
        result = "Non-diabetic"
    else:
        result = "Diabetic"
    
    return render_template('index.html', final_result=result)

if __name__ == '__main__':
    app.run(debug=True)
