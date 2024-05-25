const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER",
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "File",
    },
  ],
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Appointment",
    },
  ],
  medications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Medication",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
