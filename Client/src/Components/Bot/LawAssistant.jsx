import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoMdSend } from "react-icons/io";
import Markdown from "markdown-it";
import "./Style/LawAssistant.css";
import Starsvg from "../../Asset/Profile/BardStar.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(`${API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const md = new Markdown();

const LawAssistant = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  console.log("TOKEN", token);
  console.log("USER", user);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [history, setHistory] = useState([
    {
      role: "user",
      parts:
        "Please act as a Health Law Advisor specializing in Indian health laws. You may provide guidance on legal matters related to health regulations and proceedings in India. If I seek assistance on a health law issue, kindly advise on the appropriate steps or relevant laws, along with references. If the query is unrelated to health law, please respond accordingly.",
    },
    {
      role: "model",
      parts: "Great to meet you. How can I help you today?",
    },
  ]);

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  async function getResponse(prompt) {
    setLoading(true);
    const chat = await model.startChat({ history: history });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
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
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-2 md:p-8 med-Assistant">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-wider mb-6 -ml-1">
          Jurix
        </h1>
        <p className="text-neutral-500 max-w-2xl mx-auto my-4 text-lg md:text-xl lg:text-2xl text-center tracking-wide font-ai">
          Welcome to{" "}
          <span className="uppercase font-bold floating-animation gemini-font">
            Jurix
          </span>
          , your trusted Health Law Advisor. We specialize in providing legal
          support and guidance for individuals navigating the complexities of
          healthcare law.
        </p>

        <div className="mt-8 md:mt-12">
          <div className="w-full border border-white rounded-3xl overflow-hidden p-6 md:p-8 lg:p-12">
            <div className="flex items-center justify-center gap-x-4 mb-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-wider text-center first-letter:capitalize chat-name font-ai">
                Hello, {user?.name.split(" ")[0]}
              </h2>
              <img
                src={Starsvg}
                alt="Star SVG"
                className="h-8 w-8 md:h-10 md:w-10 animated-star"
              />
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-gray-600 font-bold tracking-wider mb-8 text-center first-letter:capitalize font-ai">
              How can I help you today?
            </h3>
            <div
              className="chat-container max-h-[400px] md:max-h-[500px] overflow-y-auto mb-6"
              ref={chatContainerRef}
            >
              {!loading &&
                history.slice(1).map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 mb-4 ${
                      message.role === "model" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {message.role === "user" ? (
                     <img
                      src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.name ? user.name.replace(' ', '%20') : 'Anonymous'}`}
                      alt="User Avatar"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                    />
                    ) : (
                      <img
                        src="https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif"
                        alt="Assistant Avatar"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                      />
                    )}
                    <div
                      className={`p-4 rounded-2xl max-w-[75%] md:max-w-[65%] tracking-wide ${
                        message.role === "user"
                          ? "bg-gray-800 text-white"
                          : "bg-slate-500 text-white"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: parseMessage(message.parts),
                      }}
                    />
                  </div>
                ))}
              {loading && <span className="loader"></span>}
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center justify-center gap-x-2"
            >
              <input
                type="text"
                value={newMessage}
                className="flex-grow rounded-2xl p-4 md:p-5 bg-black border border-neutral-500 text-white font-ai text-xl md:text-2xl placeholder:text-neutral-500 placeholder:tracking-wide"
                placeholder="Enter your message"
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full p-2 md:p-3"
              >
                <IoMdSend className="text-xl md:text-2xl" />
              </button>
            </form>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default LawAssistant;
