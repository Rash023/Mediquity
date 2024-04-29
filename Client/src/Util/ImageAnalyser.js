const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB5v4JcdsO0gLlgPhSkPD6CZYefcWY7aHk");

async function fetchImage(url) {
  const fetchModule = await import('node-fetch');
  const fetch = fetchModule.default;

  const response = await fetch(url);
  const buffer = await response.buffer();
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType: response.headers.get("content-type")
    }
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "Explain about this disease.";

  const imageLinks = [
    "https://www.skincancer.org/wp-content/uploads/basal-cell-carcinoma-4-scar.png"
  ];

  const imageParts = await Promise.all(imageLinks.map(fetchImage));

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = await response.text();
  console.log(text);
}

run();
