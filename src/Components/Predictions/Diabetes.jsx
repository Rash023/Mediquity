import React, { useState } from 'react';
import axios from 'axios';

function Diabetes() {
  const [predictionResult, setPredictionResult] = useState('');
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    hypertension: '',
    heart_disease: '',
    smoking_history: '',
    bmi: '',
    HbA1c_level: '',
    blood_glucose_level: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/predict', formData);
      setPredictionResult(response.data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
        <br />
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <label>Hypertension:</label>
        <input type="number" name="hypertension" value={formData.hypertension} onChange={handleChange} />
        {/* Add similar inputs for other parameters */}
        <button type="submit">Predict</button>
      </form>
      {predictionResult && <p>Prediction: {predictionResult}</p>}
    </div>
  );
}

export default Diabetes;