import React from 'react'
import { FaUpload } from "react-icons/fa";
import './BrainTumor.css'
import { BackgroundBeams } from '../../UI/BackgroundBeam.tsx';

const BrainTumor = () => {
  return (
    // <div className='brain-tumor-container brain-container flex flex-col'>
    //   <div className='uppercase leading-[63px] font-[700] text-[80px] text-center text-[#000000] h-[116px] mt-[115px]'>BRAIN TUMOR <span className='text-[#008E7B]'>DETECTION</span></div>
    //   <div className='w-[1045px] h-[730px] detection-box-shadow border-[4px] border-[#21C4AF] rounded-[15px] ml-[22%] mb-[2%] flex flex-col backdrop-blur-sm'>
    //     <div className='font-[700] text-[42px] leading-[63px] uppercase text-center mt-[3%]'>Health <span className='text-[#008E7B]'>Care</span></div>
    //     <div className='w-[831px] h-[433px] detection-box-shadow border-[4px] border-[#21C4AF] rounded-[15px] ml-[10%] mb-[2%] flex flex-col mt-[3%] items-center'>
    //       <FaUpload size={50} className='mt-[3%]' />
    //       <div className='font-[700] text-[50px] leading-[63px] mt-[3%]'>Upload Image</div>
    //       <div className='text-[#008E7B] text-[27px] leading-[63px] font-[700] mt-[2%]'>Image Size Must Be Less Than 2MB</div>
    //       <div className='w-[414px] h-[90px] detection-box-shadow border-[4px] border-[#21C4AF] rounded-[15px] mt-[3%] font-[700] text-[36px] leading-[63px] flex justify-center items-center'>Select <span className='text-[#008E7B] ml-[2%]'>Image</span></div>
    //     </div>
    //     <div className='w-[734px] h-[53px] leading-[27px] text-[16px] tracking-[0.1px] text-center font-[700] mt-[3%] ml-[14%]'>
    //       By Continuing, You Agree To healthcare’s <span className='text-[#008E7B]'>Terms Of Service</span> Opens A New Tab And Acknowledge You've Read Our Privacy Policy. Notice At Collection
    //     </div>
    //   </div>
    // </div>
    <div className="h-[100vh] w-full rounded-md bg-neutral-950 flex flex-col items-center justify-center antialiased">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px]">
          Brain Tumor Detection
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center tracking-[1px]">
          Welcome to <span className='uppercase font-bold'>Mediquity</span>, your premier platform for brain tumor detection. We offer state-of-the-art solutions tailored to accurately detect brain tumors. Whether you need reliable diagnostic reports, scalable imaging solutions, or customizable treatment plans, <span className='uppercase font-bold'>Mediquity</span> is your trusted partner!
        </p>
        <div className='w-[600px] h-[330px] border rounded-[30px] mt-[20%] border-neutral-300 mx-auto flex flex-col p-4'>
          <FaUpload size={30} className='mt-[3%] text-neutral-400 mx-auto' />
          <div className='text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mt-[3%] mx-auto'>Upload Image</div>
          <div className='text-neutral-500 max-w-lg my-2 text-sm text-center tracking-[1px] mt-[2%] mx-auto'>Image Size Must Be Less Than 2MB</div>
          <div className='w-[414px] h-[90px] detection-box-shadow border border-neutral-400 rounded-[15px] mt-[3%] text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] flex justify-center items-center mx-auto mb-5'>Select <span className='ml-[2%]'>Image</span></div>
        </div>
      </div>
      <BackgroundBeams />
    </div>

  )
}

export default BrainTumor