import React from "react";
import { GoDotFill } from "react-icons/go";

const PageContent = ({ content, index }) => {
  return (
    <div
      key={index}
      className=" dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] overflow-clip"
    >
      <div className="pt-[3%] lg:p-10">
        <div className="w-full lg:p-10 mx-auto">
          <p className="ipad:text-6xl text-5xl lg:leading-0 leading-[3.5rem] font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b uppercase  text-center from-neutral-200 to-neutral-500 py-8 tracking-[2px]">
            {content.title}
          </p>
        </div>
        <div className="flex lg:flex-row flex-col items-center lg:mt-10 w-full ipad:p-16">
          <div className="lg:w-[100%] w-[70%] ipad:pl-8">
            <img
              src={content.image}
              alt="#"
              className="bg-white rounded-full"
            />
          </div>
          <div className="lg:pl-[8%] p-6">
            <p className="text-white uppercase tracking-[2px] lg:text-5xl text-3xl lg:first-letter:text-6xl first-letter:text-4xl font-bold mb-[3%] lg:w-[100%] w-[80%]">
              Introduction
            </p>
            <div className="ipad:text-2xl text-xl text-neutral-300 w-full lg:tracking-[2px] tracking-[1.5px] font-extralight font-ai">
              {content.intro}
            </div>
          </div>
        </div>

        <p className="text-white uppercase tracking-[2px] lg:text-5xl text-3xl first-letter:text-4xl lg:first-letter:text-6xl pl-6 ipad:pl-20 font-bold mt-[1%] mb-[1.5%]">
          {" "}
          About
        </p>
        {content.content.map((value, index) => (
          <div className="ipad:pl-[7%] ipad:pr-16 p-4">
            <div className="flex gap-x-2 items-center">
              <GoDotFill className="text-white" />
              <h1 className="text-white mb-[10px] tracking-[1.5px] ipad:first-letter:text-4xl first-letter:text-3xl text-xl uppercase font-bold ipad:text-2xl">
                {value.heading}
              </h1>
            </div>
            <h1 className="ipad:text-2xl text-xl mb-[3%] text-neutral-300 ipad:tracking-[3px] tracking-[1px] font-extralight ipad:pl-8 lg:pr-10 p-2 font-ai">
              {value.innerContent}
            </h1>
          </div>
        ))}
        <p className="text-white uppercase tracking-[2px] lg:text-5xl text-3xl first-letter:text-4xl lg:first-letter:text-6xl pl-6 ipad:pl-20 font-bold mt-[1%] mb-[1.5%]">
          Conclusion
        </p>
        <h1 className="ipad:text-2xl text-xl font-ai mb-[3%] text-neutral-300 ipad:tracking-[3px] tracking-[1px] font-extralight pl-[8%] pr-10">
          {content.Conclusion}
        </h1>
        <p className="text-white uppercase tracking-[2px] lg:text-5xl text-3xl first-letter:text-4xl lg:first-letter:text-6xl pl-6 ipad:pl-20 font-bold mt-[1%] mb-[1.5%]">
          {" "}
          Tips of the day
        </p>
        {content.Tips.map((value, index) => (
          <div className="ipad:pl-[7%] ipad:pr-16 p-4">
            <div className="flex gap-x-2 items-center">
              <GoDotFill className="text-white" />
              <h1 className="text-white mb-[10px] tracking-[1.5px] lg:first-letter:text-4xl first-letter:text-3xl uppercase font-bold lg:text-2xl text-xl">
                {value.heading}
              </h1>
            </div>
            <h1 className="ipad:text-2xl text-xl mb-[3%] text-neutral-300 lg:tracking-[3px] tracking-[1px] font-extralight pl-8 pr-10 font-ai">
              {value.innerContent}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageContent;
