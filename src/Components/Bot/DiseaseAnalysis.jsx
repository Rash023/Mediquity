import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoMdSend } from "react-icons/io";
import Markdown from "markdown-it";
import "./PersonalTherapist.css";
import { BackgroundBeams } from "../UI/BackgroundBeam.tsx";
import { TracingBeam } from "../UI/TracingBeam.tsx";
import Starsvg from "../../Asset/BardStar.svg";
import { FaUpload } from "react-icons/fa";

const genAI = new GoogleGenerativeAI(`AIzaSyB5v4JcdsO0gLlgPhSkPD6CZYefcWY7aHk`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const md = new Markdown();

const DiseaseAnalysis = () => {
    const [newMessage, setNewMessage] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [modelAvatar, setModelAvatar] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null); 
    const [responseText, setResponseText] = useState("");
    const chatContainerRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
                const formData = new FormData();
                formData.append("image", file);
                fetch("http://localhost:4000/api/v1/predict", {
                    method: "POST",
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    setResponseText(data.message);
                })
                .catch(error => console.error("Error:", error));
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [responseText]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    };

    const parseMessage = (message) => {
        if (message.startsWith("- ")) {
            const points = message.split("- ").filter(Boolean);

            const listItems = points
                .map((point, index) => `- ${md.renderInline(point.trim())}`)
                .join("\n");

            return `<ul>${listItems}</ul>`;
        }

        if (message.includes("|")) {
            const rows = message.split("\n").map((row) => row.trim());

            const tableRows = rows
                .map((row) => {
                    const columns = row
                        .split("|")
                        .filter(Boolean)
                        .map((column) => column.trim());
                    return `<tr>${columns
                        .map((column) => `<td>${md.renderInline(column)}</td>`)
                        .join("")}</tr>`;
                })
                .join("");

            return `<table>${tableRows}</table>`;
        }

        return md.render(message);
    };

    return (
        <div className="h-full min-h-[100vh] w-full rounded-md bg-neutral-950 flex flex-col items-center justify-center antialiased p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
                    Medora
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto my-1 text-lg text-center tracking-[1px] font-ai font-bold">
                    I'm{" "}
                    <span className="uppercase font-extrabold floating-animation gemini-font">
                        Medora
                    </span>
                    , your friendly AI companion on the path to mental well-being. Think
                    of me as the therapist in your pocket, minus the couch and awkward
                    silences.
                </p>
                <div className="w-7xl flex flex-col gap-x-2 border border-white rounded-[30px] overflow-hidden p-12 mt-[5%]">
                    <div className="flex gap-x-2 mx-auto">
                        <h1 className="text-2xl md:text-6xl text-white font-bold tracking-wider mb-4 text-center first-letter:capitalize chat-name font-ai">
                            Hello, Hindol
                        </h1>
                        <img src={Starsvg} alt="Star SVG" className="h-6 w-6" />
                    </div>

                    <h1 className="text-2xl md:text-5xl text-gray-500 font-bold tracking-wider mb-4 text-center first-letter:capitalize font-ai">
                        How can I help you today?
                    </h1>
                    <div>
                        {uploadedImage ? (
                            <img
                                src={uploadedImage}
                                alt="Uploaded"
                                className="w-[300px] h-[300px] mx-auto rounded-lg"
                            />
                        ) : (
                            <div className='w-[600px] h-[330px] border rounded-[30px] mt-[10%] border-neutral-300 mx-auto flex flex-col p-4 bg-black'>
                                <FaUpload size={30} className='mt-[3%] text-neutral-400 mx-auto' />
                                <div className='text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mt-[3%] mx-auto'>Upload Image</div>
                                <div className='text-neutral-500 max-w-lg my-2 text-sm text-center tracking-[1px] mt-[2%] mx-auto'>Image Size Must Be Less Than 2MB</div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="upload"
                                />
                                <label htmlFor="upload" className='w-[400px] h-[80px] detection-box-shadow border border-neutral-400 rounded-[15px] mt-[3%] text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold tracking-[1px] flex justify-center items-center mx-auto mb-5 cursor-pointer'>Select <span className='ml-[2%]'>Image</span></label>
                            </div>
                        )}
                    </div>
                    <div ref={chatContainerRef} className="flex flex-col gap-y-4 mt-4">
                        {/* Messages go here */}
                        {responseText && (
                            <div
                                dangerouslySetInnerHTML={{ __html: parseMessage(responseText) }}
                                className="text-white"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseAnalysis;
