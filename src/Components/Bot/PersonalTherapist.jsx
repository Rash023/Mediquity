import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoMdSend } from "react-icons/io";
import Markdown from "markdown-it";
import './PersonalTherapist.css'
import { BackgroundBeams } from '../UI/BackgroundBeam.tsx';

const genAI = new GoogleGenerativeAI(`AIzaSyB5v4JcdsO0gLlgPhSkPD6CZYefcWY7aHk`);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const md = new Markdown();

const PersonalTherapist = () => {
  const [newMessage, setNewMessage] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [modelAvatar, setModelAvatar] = useState('');
  const chatContainerRef = useRef(null);
  const [history, setHistory] = useState([
    {
      role: "user",
      parts: "Hello, You need to act like a Mental Therapist, If I ask you out of topic question simple give reply like Sorry I am just your Mental Therapist",
    },
    {
      role: "model",
      parts: "Great to meet you. How can I help you today?",
    },
  ]);

  useEffect(() => {
    fetchAvatar("user").then((avatarUrl) => setUserAvatar(avatarUrl));
    fetchAvatar("model").then((avatarUrl) => setModelAvatar(avatarUrl));
  }, []);

  async function fetchAvatar(role) {
    const response = await fetch(
      `https://source.unsplash.com/random/100x100/?${role}`
    );
    return response.url;
  }

  async function getResponse(prompt) {
    const chat = await model.startChat({ history: history });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
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
    if(chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
    <div className="h-full min-h-[100vh] w-full rounded-md bg-neutral-950 flex flex-col items-center justify-center antialiased">
        {/* <BackgroundBeams /> */}
        <div className="max-w-7xl mx-auto">
            <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
                Mediquity Mental Therapist
            </h1>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center tracking-[1px]">
                Welcome to <span className='uppercase font-bold'>Mediquity</span>, your compassionate guide on the journey to mental well-being. We specialize in providing support and guidance for individuals seeking relief from mental health challenges. Whether you're in need of empathetic listening, personalized coping strategies, or a safe space to explore your emotions, <span className='uppercase font-bold'>Mediquity</span> is here for you every step of the way.
            </p>

            <div className='w-7xl flex flex-col gap-x-2 border border-white rounded-[30px] overflow-hidden p-12 mt-[5%]'>
                <h1 className="text-2xl md:text-6xl text-white font-bold tracking-wider mb-4 text-center first-letter:capitalize chat-name font-ai">Hello, Hindol</h1>
                <div className="chat-container max-h-[300px] overflow-y-auto" ref={chatContainerRef}>
                    {history.slice(1).map((message, index) => (
                        <div key={index} className={`flex place-items-center items-start space-x-2 ${message.role === "model" ? "justify-start" : "justify-end"}`}>
                            { 
                                message.role === "user" ? <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full" /> : <img src={userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                            }
                            <div className={`bg-black p-4 rounded-[15px] max-w-[70%] tracking-[2px] ${message.role === "user" ? "text-white" : "text-white"} max-w-xl break-words`} dangerouslySetInnerHTML={{ __html: parseMessage(message.parts) }} />
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className='w-full flex place-items-center justify-center mt-[4%] gap-x-2'>
                    <input type="text" value={newMessage} className='rounded-[15px] w-full p-4 bg-black border border-neutral-500 placeholder:tracking-[1px] placeholder:font-ai text-white font-ai text-2xl' placeholder='Enter your message' onChange={(e) => setNewMessage(e.target.value)} />
                    <IoMdSend className='text-neutral-300' size={40} color='' />
                </form>
            </div>
        </div>
    </div >
);


}

export default PersonalTherapist;
