const mongoose = require("mongoose");

const MedicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Powder", "Syrup", "Tablet"],
  },
  dosage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Live", "Pause"],
    default: "Live",
  },
  days: [
    {
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
    },
  ],
  times: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Medication", MedicationSchema);
