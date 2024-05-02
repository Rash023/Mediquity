import React, { useState } from "react";
import "./Style/PersonalTherapist.css";
import axios from "axios";
import { FaUpload } from "react-icons/fa";


const DiseaseAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [responseText, setResponseText] = useState("");


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setUploadedImage(reader.result);
        const formData = new FormData();
        formData.append("image", file);
        setLoading(true);
        const response = await axios.post(
          "https://mediquity-gtoc.onrender.com/api/v1/predict/disease-predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLoading(false);
        console.log(response);
        setResponseText(response?.data?.generatedContent);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen min-w-screen dark:bg-black bg-white dark:bg-dot-white-[0.2] bg-dot-black-[0.2] relative flex items-center justify-center">
      <div className="rounded-md flex flex-col items-center justify-center antialiased">
        <div className="flex flex-col justify-between">
          <div className="p-3 lg:p-0">
            <h1 className="text-4xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
              VINICIUS
            </h1>
            <p className="select-none text-neutral-500 max-w-lg mx-auto text-lg lg:text-[1.25rem] tracking-[1px] font-ai p-3 lg:p-0 text-justify">
              Greetings from{" "}
              <span className="uppercase font-bold floating-animation gemini-font">
                Vinicius
              </span>
              , your personal Image Analyzer. I specialize in providing support and guidance for individuals concerned about image analysis. Whether you seek insights into image patterns, content recognition, or visual data interpretation,{" "}
              <span className="uppercase font-bold floating-animation gemini-font">
                Vinicius
              </span>{" "}
              is here to assist you every step of the way. The name Vinicius reflects our dedication to advanced image analysis and proactive data management.
            </p>

          </div>



          <div className="lg:p-0 p-3">
            <div className="max-w-[450px] h-fit border rounded-[30px]  border-neutral-300 mx-auto flex flex-col bg-black p-14 mt-[10%]">
              {!uploadedImage ? (
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
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-auto"
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col gap-y-4 mt-4">
                {loading ? (
                  <div className="loader" />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{ __html: responseText }}
                    className="text-4xl uppercase tracking-[1px] select-none md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold"
                  />
                )}

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseAnalysis;
