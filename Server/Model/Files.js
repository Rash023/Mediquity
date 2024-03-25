const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Files", fileSchema);
