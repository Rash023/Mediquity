import React from "react";

import Cover from "../../Asset/About/Cover.jpg";
import Image1 from "../../Asset/About/Image1.jpg";
import Image2 from "../../Asset/About/Image2.png";
import Image3 from "../../Asset/About/Image3.jpg";
import Quote from "./Quote";
import HighlightText from "./HighlightText";
import StatsComponent from "./Stats";

const About = () => {
  return (
    <div className="bg-black bg-dot-white/[0.2] text-white">
      <section className="w-11/12 mx-auto">
        <div className="relative mx-auto flex w-full max-w-maxContent flex-col justify-between gap-10 text-center">
          <header className="mx-auto py-20 lg:text-[40px] text-[30px] font-semibold w-full font-sans tracking-widest leading-[1.2]">
            DRIVING AI INNOVATION IN HEALTHCARE FOR
            <HighlightText text={"A SEAMLESS FUTURE"} />
            <p className="mx-auto text-center font-extralight text-white lg:w-[95%] font-ai lg:mt-[2%] mt-[6%] text-[25px]">
              At Mediquity, we are transforming healthcare through the power of
              AI. Our team of dedicated developers is committed to delivering
              seamless AI-driven healthcare solutions that enhance patient care,
              streamline processes, and promote efficiency across the medical
              landscape.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px] "></div>
          <div className="absolute bottom-0 left-[50%] grid lg:w-[80%] w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-2 lg:gap-10">
            <img src={Image1} alt="" className="h-full w-full" />
            <img src={Image2} alt="" className="h-full w-full" />
            <img src={Image3} alt="" className="h-full w-full" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700 lg:mt-0 -mt-10 w-10/12 mx-auto">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section className="w-11/12  mx-auto">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans bg-clip-text font-bold text-4xl lg:w-[90%] uppercase tracking-wider lg:text-left text-center">
                Our Story
              </h1>
              <p className="font-light text-white lg:w-[95%] w-[100%] lg:text-2xl text-xl font-ai tracking-wider">
                Mediquity was born from the passion and drive of a group of
                developers aiming to revolutionize the healthcare industry
                through advanced AI technologies. Our journey began with a
                desire to create intelligent, adaptable healthcare solutions
                that respond to the needs of modern patients and providers.
              </p>
              <p className="lg:text-2xl text-xl font-light text-white lg:w-[95%] w-[100%] font-ai tracking-wider">
                We understand that the future of healthcare lies in seamless,
                tech-driven solutions. By leveraging AI, we are removing
                barriers to access and ensuring healthcare becomes more
                efficient, personalized, and accessible for all, regardless of
                location or limitations of traditional systems.
              </p>
            </div>

            <div>
              <img
                src={Cover}
                height={500}
                width={500}
                alt="Cover image"
                className="shadow-[0_0_20px_0] shadow-[#FC6767] "
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  font-sans bg-clip-text font-bold text-4xl lg:w-[70%] uppercase tracking-wider lg:text-left text-center">
                Our Vision
              </h1>
              <p className="lg:text-2xl text-xl font-light text-white lg:w-[95%] w-[100%] font-ai tracking-wider">
                We envision a world where AI streamlines healthcare processes,
                making quality healthcare universally accessible. Our mission is
                to be at the forefront of this revolution, building tools and
                systems that bring efficiency and innovation to healthcare
                providers and patients alike.
              </p>
            </div>
            <div className="lg:mt-0 lg:mb-0 -mt-5 mb-10 flex lg:w-[40%] flex-col gap-10">
              <h1 className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans bg-clip-text font-bold text-4xl lg:w-[80%] uppercase tracking-wider lg:text-left text-center">
                Our Mission
              </h1>
              <p className="lg:text-2xl text-xl font-medium text-white lg:w-[95%] w-[100%] font-ai tracking-wider">
                Our mission is simple yet powerful - to deliver cutting-edge AI
                solutions that elevate the healthcare experience for both
                providers and patients. We aim to empower healthcare systems
                with intelligent automation, data-driven insights, and seamless
                integration of AI technologies that transform traditional
                methods of care.
              </p>
            </div>
          </div>
        </div>
      </section>
      <StatsComponent />
    </div>
  );
};

export default About;
