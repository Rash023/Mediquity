const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
    enum: [
      "Cardiologist",
      "Dermatologist",
      "Endocrinologist",
      "Gastroenterologist",
      "Hematologist",
      "Neurologist",
      "Oncologist",
      "Pediatrician",
      "Psychiatrist",
      "Radiologist",
      "Surgeon",
      "Urologist",
    ],
  },
});

module.exports = new mongoose.model("Doctor", DoctorSchema);
