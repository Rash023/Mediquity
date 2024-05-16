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
  role: {
    type: String,
    default: "DOCTOR",
    immutable: true,
  },
  specialization: {
    type: String,
    required: true,
    enum: [
      "Anesthesiology",
      "Cardiology",
      "Dermatology",
      "Endocrinology",
      "Family Medicine",
      "Gastroenterology",
      "Hematology",
      "Infectious Disease",
      "Internal Medicine",
      "Neurology",
      "Neurosurgery",
      "Obstetrics and Gynecology (OB/GYN)",
      "Oncology",
      "Ophthalmology",
      "Orthopedic Surgery",
      "Otolaryngology (ENT)",
      "Pediatrics",
      "Physical Medicine and Rehabilitation",
      "Psychiatry",
      "Pulmonology",
      "Radiology",
      "Rheumatology",
    ],
  },
  image: {
    type: String,
    required: true,
  },
  slots: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Slot",
    },
  ],
});

module.exports = new mongoose.model("Doctor", DoctorSchema);
