const express = require("express");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const app = express();
const PORT = 4000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Handle POST requests to '/api/v1/predict'
app.post("/api/v1/predict", async (req, res) => {
  if (!req.body.image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: "uploads", // Optional: folder to store the image in Cloudinary
    });

    // Here you can access the Cloudinary URL of the uploaded image from result.secure_url
    // You can store this URL in a database or use it directly in your frontend application

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
