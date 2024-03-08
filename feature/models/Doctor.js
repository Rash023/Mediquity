const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  bookedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  ],
});

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  slots: [slotSchema],
});

module.exports = mongoose.model("Doctor", DoctorSchema);
