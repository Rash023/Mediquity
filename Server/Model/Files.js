const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  files: [
    {
      filename: {
        type: String,
        required: true,
      },
      fileUrl: {
        type: String,
      },
      tags: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Files", fileSchema);
