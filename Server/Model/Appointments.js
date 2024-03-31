const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: true,
  },

  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  day: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  time: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Appointment", AppointmentSchema);
