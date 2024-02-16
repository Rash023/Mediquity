const express = require("express");
const { uploadImageToCloudinary } = require("../Util/imageUploader");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
const genAI = new GoogleGenerativeAI("AIzaSyB5v4JcdsO0gLlgPhSkPD6CZYefcWY7aHk"); 


router.post("/disease-predict", async (req, res) => {
    try {
        const image = req.files.image; 

        if (!image) {
            return res.status(400).json({
                message: 'Image file not provided',
                success: false
            });
        }

        
        const uploadDetails = await uploadImageToCloudinary(image, 'uploads');
        const imageUrl = uploadDetails.secure_url;

        
        const generatedContent = await generateContent(imageUrl);
        
        return res.status(200).json({
            message: 'Disease prediction successful',
            imageUrl: imageUrl,
            generatedContent: generatedContent,
            success: true
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({
            message: 'Error analyzing image',
            success: false
        });
    }
});


async function generateContent(imageUrl) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "You are a Health Based Image Analyzer. You will provide with Description then Syptoms, Precaution, Medication and Youtube Video.";
    const imageParts = await fetchImage(imageUrl);
    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    const text = await response.text();

    return text;
}


async function fetchImage(url) {
    const fetchModule = await import('node-fetch');
    const fetch = fetchModule.default;

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    return {
        inlineData: {
            data: Buffer.from(buffer).toString("base64"),
            mimeType: response.headers.get("content-type")
        }
    };
}

module.exports = router;
