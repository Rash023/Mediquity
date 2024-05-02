import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { LuAsterisk } from "react-icons/lu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PneumoniaDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_FLASK_URL;
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
      const response = await fetch(`${BASE_URL}/predict/pneumonia`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction result.");
      }

      const data = await response.json();
      setPredictionResult(data.prediction);
    } catch (error) {
      console.error(error);
      toast.error("Please Try Again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen dark:bg-black bg-white dark:bg-dot-white-[0.2] bg-dot-black-[0.2] relative flex items-center justify-center">
      <div className="rounded-md flex flex-col items-center justify-center antialiased">
        <div>
          <div className="p-3 lg:p-0">
            <h1 className="text-4xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
              Pneumonia Detection
            </h1>
            <p className="select-none text-neutral-500 max-w-lg mx-auto text-lg lg:text-[1.25rem] tracking-[1px] font-ai p-3 lg:p-0 text-justify">
              Greetings from{" "}
              <span className="uppercase font-bold floating-animation gemini-font">
                PneumoCheck
              </span>
              , your personal Pneumonia Detector. I specialize in providing support and guidance for individuals concerned about pneumonia risk assessment. Whether you seek insights into symptoms, risk factors assessment, or preventive measures,{" "}
              <span className="uppercase font-bold floating-animation gemini-font">
                PneumoCheck
              </span>{" "}
              is here to assist you every step of the way. The name PneumoCheck reflects our dedication to pneumonia awareness and proactive health management.
            </p>
          </div>



          <div className="lg:p-0 p-3">
            <div className="max-w-[450px] min-h-[300px] border rounded-[30px] mt-[7%] border-neutral-300 mx-auto flex flex-col bg-black p-14">
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
                className="w-full max-w-[300px] h-[80px] detection-box-shadow border border-neutral-400 rounded-[15px] mt-[3%] text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold tracking-[1px] flex justify-center items-center mx-auto mb-5 cursor-pointer"
                onClick={predictPneumonia}
                style={{ display: isLoading || predictionResult ? "none" : "" }}
              >
                PREDICT
              </div>
            </div>
            <div className="flex lg:items-center mt-4 lg:ml-48 gap-1">
              <div className="text-red-500 text-md"><LuAsterisk /></div>
              <div className="text-neutral-500 my-1 text-[0.65rem] text-center tracking-[1px]">Information provided is subject to ongoing evolution and may not be entirely accurate.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PneumoniaDetection;
