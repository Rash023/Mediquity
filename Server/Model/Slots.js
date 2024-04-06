const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Doctor",
    required: true,
  },
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  appointments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Appointment",
    },
  ],
});
module.exports = mongoose.model("Slot", SlotSchema);
