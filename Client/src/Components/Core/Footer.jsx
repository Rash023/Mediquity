import React from "react";
import Logo from "../../Asset/Footer/Logo.png";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";

export function Footer() {
  return (
    <div className="w-full bg-black text-white md:p-8 p-4 relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col justify-between items-start md:items-center space-y-6 md:space-y-0 relative z-10">
        <div className="flex flex-col items-start space-x-4 gap-y-6">
          <div className="flex-shrink-0 md:ml-3 ml-1 w-16 h-16 rounded-full bg-white">
            <img
              src={Logo}
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="text-sm md:text-base w-full flex md:flex-row flex-col justify-between text-zinc-400 ">
            <div className="tracking-wide w-full md:w-[50%] md:ml-0 -ml-[3%]">
              Mediquity is an innovative platform offering advanced technology
              for delivering health solutions.
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-16 md:mt-0 mt-2 tracking-wide md:ml-0 -ml-[3%] gap-y-1">
              <a href="/" className="hover:underline">
                Legal
              </a>
              <a href="/" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/" className="hover:underline">
                Terms of Service
              </a>
              <a href="/" className="hover:underline">
                Cookie Policy
              </a>
            </div>
            <div className="md:ml-0 -ml-[3%] border-b-[0.1px] border-zinc-200 pb-1 w-[98%] md:hidden mt-1" />
          </div>
          <div className="md:ml-0 -ml-[3%] border-b-[0.1px] border-gray-400 pb-1 w-[98%] -mt-2 hidden md:block" />
          <div className="w-full flex md:flex-row flex-col md:justify-between md:items-center text-sm text-zinc-400 -mt-2">
            <div className="flex items-center space-x-4 md:ml-0 -ml-[3%]">
              <a
                href="https://github.com/Rash023/Mediquity"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-10 h-10 border-2 border-zinc-800 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:bg-zinc-800 group-hover:scale-110">
                  <FaGithub className="text-xl md:text-2xl text-white group-hover:text-gray-300" />
                </div>
              </a>
              <a
                href="https://discord.gg/VJgUexc4"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-10 h-10 border-2 border-zinc-800 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:bg-zinc-800 group-hover:scale-110">
                  <FaDiscord className="text-xl md:text-2xl text-white group-hover:text-gray-300" />
                </div>
              </a>
            </div>
            <div className="text-right md:text-base text-sm tracking-wide flex md:items-center md:justify-end space-x-1 md:mt-0 mt-2 -ml-2">
              <span className="mr-1"> © {new Date().getFullYear()} </span>{" "}
              Mediquity{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
