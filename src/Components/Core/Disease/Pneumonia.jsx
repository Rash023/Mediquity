import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import "./Pneumonia.css";

const PneumoniaDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const predictPneumonia = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict/pneumonia", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction result.");
      }

      const data = await response.json();
      setPredictionResult(data.prediction);
    } catch (error) {
      console.error("Error predicting brain tumor:", error);
      alert("Error predicting brain tumor. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center p-10">
      <div className="w-full rounded-md flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
            Pneumonia Detection
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center tracking-[1px]">
            Welcome to <span className="uppercase font-bold">Pneumonia Detection</span>, your premier platform for pneumonia detection. We offer state-of-the-art solutions tailored to accurately detect pneumonia. Whether you need reliable diagnostic reports, scalable imaging solutions, or customizable treatment plans,{" "}
            <span className="uppercase font-bold">Mediquity</span> is your trusted partner!
          </p>
          <div className="w-[450px] min-h-[300px] border rounded-[30px] mt-[7%] border-neutral-300 mx-auto flex flex-col bg-black p-14">
            {!selectedImage ? (
              <>
                <label htmlFor="uploadInput" className="cursor-pointer">
                  <FaUpload
                    size={30}
                    className="mt-[3%] text-neutral-400 mx-auto"
                  />
                  <div className="text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mt-[3%] mx-auto">
                    Upload Image
                  </div>
                </label>
                <input
                  type="file"
                  id="uploadInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="text-neutral-500 max-w-lg my-2 text-sm text-center tracking-[1px] mt-[2%] mx-auto">
                  Image Size Must Be Less Than 2MB
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-auto rounded-[15px] mb-4 overflow-hidden">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded"
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mt-2 mb-4">
                  {isLoading ? "Predicting..." : predictionResult}
                </div>
              </>
            )}
            <div
              className="w-[300px] h-[80px] detection-box-shadow border border-neutral-400 rounded-[15px] mt-[3%] text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold tracking-[1px] flex justify-center items-center mx-auto mb-5 cursor-pointer"
              onClick={predictPneumonia}
              style={{ display: isLoading || predictionResult ? "none" : "" }}
            >
              PREDICT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PneumoniaDetection;