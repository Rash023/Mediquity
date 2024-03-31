import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoMdSend } from "react-icons/io";
import Markdown from "markdown-it";
import "./PersonalTherapist.css";
import { BackgroundBeams } from "../UI/BackgroundBeam.tsx";
import { TracingBeam } from "../UI/TracingBeam.tsx";
import Starsvg from "../../Asset/BardStar.svg";
import { useNavigate } from "react-router-dom";

const genAI = new GoogleGenerativeAI(`AIzaSyB5v4JcdsO0gLlgPhSkPD6CZYefcWY7aHk`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const md = new Markdown();

const PersonalTherapist = () => {
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);


  const [history, setHistory] = useState([
    {
      role: "user",
      parts:
        "Please act as a Mental Therapist. If I ask about topics unrelated to mental health or therapy, please respond with: 'Sorry, I am just your Mental Therapist'",
    },
    {
      role: "model",
      parts: "Great to meet you. How can I help you today?",
    },
  ]);


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) navigate('/login');
  }, []);

  async function getResponse(prompt) {
    setLoading(true);
    setLoading(true);
    const chat = await model.startChat({ history: history });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setLoading(false);
    return text;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newMessage.trim()) {
      return;
    }

    const userRole = {
      role: "user",
      parts: newMessage,
    };

    const modelOutput = await getResponse(newMessage);
    const modelRole = {
      role: "model",
      parts: modelOutput,
    };

    setHistory([...history, userRole, modelRole]);
    setNewMessage("");
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const parseMessage = (message) => {
    // Check if the message is in pointwise format
    if (message.startsWith("- ")) {
      // Split the message into individual points
      const points = message.split("- ").filter(Boolean);

      // Create a list using Markdown for each point
      const listItems = points
        .map((point, index) => `- ${md.renderInline(point.trim())}`)
        .join("\n");

      return `<ul>${listItems}</ul>`;
    }

    // Check if the message is in tabular format
    if (message.includes("|")) {
      // Split the message into rows
      const rows = message.split("\n").map((row) => row.trim());

      // Parse each row into a table row
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

    // If no specific format is detected, render the message as usual
    return md.render(message);
  };

  return (
    <div className="h-full min-h-[100vh] w-full  rounded-md  bg-neutral-950 flex flex-col items-center justify-center antialiased med-Assistant">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl  lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
          Medora
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-1 lg:text-center tracking-[1px] font-ai p-3 text-justify lg:p-0">
          I'm{" "}
          <span className="uppercase font-extrabold floating-animation gemini-font">
            Medora
          </span>
          , your friendly AI companion on the path to mental well-being. Think
          of me as the therapist in your pocket, minus the couch and awkward
          silences.
        </p>


        <div className="p-5 lg:p-0">
          <div className=" w-7xl lg:w-[1000px]  flex flex-col gap-x-2  border border-white rounded-[30px] overflow-hidden p-12 mt-[5%]">
            <div className="Pharmos-inner-div flex gap-x-2 mx-auto">
              <h1 className="text-4xl lg:text-6xl text-white font-bold tracking-wider mb-4 text-center first-letter:capitalize chat-name font-ai">
                Hello, {sessionStorage.getItem("user").split(" ")[0]}
              </h1>
              <img
                src={Starsvg}
                alt="Star SVG"
                className="h-6 w-6 animated-star"
              />
            </div>
            <h1 className="text-2xl lg:text-5xl text-gray-600 font-bold tracking-wider mb-4 text-center first-letter:capitalize font-ai">
              How can I help you today?
            </h1>
            <div
              className="chat-container max-h-[300px] overflow-y-auto mt-[2%]"
              ref={chatContainerRef}
            >
              {!loading &&
                history.slice(1).map((message, index) => (
                  <div
                    key={index}
                    className={`flex place-items-center items-start space-x-2 mt-[2%] ${message.role === "model" ? "lg:justify-start" : "lg:justify-end"
                      }`}
                  >
                    {message.role === "user" ? (
                      <img
                        src={`https://api.dicebear.com/8.x/initials/svg?seed=${sessionStorage.getItem("user").replace(' ', '%20')}`}
                        alt="User Avatar"
                        className="w-7 h-7 lg:w-10 lg:h-10 mt-3 lg:mt-1 rounded-full"
                      />
                    ) : (
                      <img
                        src="https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif"
                        alt="User Avatar"
                        className="w-7 h-7 lg:w-10 lg:h-10 mt-3 lg:mt-1 rounded-full"
                      />
                    )}
                    <div
                      className={` p-2 lg:p-4 rounded-[15px] lg:max-w-[50%] tracking-[2px] ${message.role === "user"
                        ? "text-white bg-gray-800"
                        : "text-white bg-slate-500"
                        } max-w-xl break-words`}
                      dangerouslySetInnerHTML={{
                        __html: parseMessage(message.parts),
                      }}
                      style={{ margin: "0.5rem" }}
                    />
                  </div>
                ))}
              {loading && <span className="loader"></span>}
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex place-items-center justify-center mt-[4%] gap-x-2"
            >
              <input
                type="text"
                value={newMessage}
                className="rounded-[15px] w-full p-4 bg-black border border-neutral-500 placeholder:tracking-[1px] placeholder:font-ai text-white font-ai text-2xl placeholder:text-[1.25rem] lg:placeholder:text-2xl"
                placeholder="Enter your message"
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <IoMdSend
                className="text-neutral-300 cursor-pointer absolute lg:relative right-20 lg:right-0 text-3xl lg:text-5xl"
                color=""
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalTherapist;
