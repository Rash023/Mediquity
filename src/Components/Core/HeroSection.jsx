// import React from 'react'
// import HeroImage from '../../Asset/HeroImage.png'
// import './HeroSection.css'
// const HeroSection = () => {
//   return (
//     // <div className='hero-container flex justify-center mb-[4%]'>
//     //     <div className="mt-[50px] mr-[30px]">
//     //         <img src={HeroImage} alt=''/>
//     //     </div>
//     //     <div className="mt-[89px]  w-[650px] h-[241px] ">
//     //         <div className='ml-[130px] flex flex-col space-y-[30px]'>
//     //             <div className="leading-[40px]">
//     //                 <span className='font-bold text-[50px] leading-[24px] '> Welcome To</span>
//     //                 <div className="font-bold text-[53px] leading-[24px] mt-[20px] text-[#008e7b] "><span>Healthcare.</span></div>
//     //             </div>
//     //             <div className="">
//     //                 <span className='font-semibold text-[33px] leading-[47px] tracking-[0.1px]'>Your Personalized Healthcare Telemedicine Assistant Platform.</span>
//     //             </div>
//     //             <div className="font-[600] text-[15px] leading-[27px] tracking-[0.1px] w-[606px] h-[80px] text-justify">
//     //                 Artificial Intelligence (AI) Has Revolutionized The Field Of Telemedicine And
//     //                 Healthcare, Offering Innovative Solutions To Enhance Patient Care, Improve
//     //                 Efficiency, And Streamline Various Processes.
//     //             </div>
//     //             <div>
//     //                 <button className='uppercase w-[175px] h-[48px] leading-[24px] font-[19px] tracking-[0.1px] bg-[#21C4AF] border border-[#000000] rounded-[5px] font-bold hero-section-box-shadow'>Learn More</button>
//     //             </div>
//     //         </div>
//     //     </div>
//     // </div>/

//     <>

//     </>
//   )
// }

// export default HeroSection
import React from "react";
import { SparklesCore } from "../UI/Sparkles.tsx";
import "./HeroSection.css";

export function HeroSection() {
  return (
    <div className="">
      <h1 className="mt-[25%] md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 gemini-font">
        Mediquity
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
