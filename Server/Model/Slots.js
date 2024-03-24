const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  slots: [
    {
      timing: {
        type: String,
        required: true,
        enum: ["9-10", "10-11", "4-5", "5-6", "6-7"], // Valid slot timings
      },
      bookings: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
        },
      ],
    },
  ],
});
module.exports = mongoose.model("Slot", SlotSchema);
