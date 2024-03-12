import React from 'react'
import { FaUpload } from "react-icons/fa";
import './BrainTumor.css'

const Pneumonia = () => {
  return (
    <div className="h-fit w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="h-[100vh] w-full rounded-md flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
            Brain Tumor Detection
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center tracking-[1px]">
            Welcome to <span className='uppercase font-bold'>Mediquity</span>, your premier platform for brain tumor detection. We offer state-of-the-art solutions tailored to accurately detect brain tumors. Whether you need reliable diagnostic reports, scalable imaging solutions, or customizable treatment plans, <span className='uppercase font-bold'>Mediquity</span> is your trusted partner!
          </p>
          <div className='w-[600px] h-[330px] border rounded-[30px] mt-[20%] border-neutral-300 mx-auto flex flex-col p-4 bg-black'>
            <FaUpload size={30} className='mt-[3%] text-neutral-400 mx-auto' />
            <div className='text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mt-[3%] mx-auto'>Upload Image</div>
            <div className='text-neutral-500 max-w-lg my-2 text-sm text-center tracking-[1px] mt-[2%] mx-auto'>Image Size Must Be Less Than 2MB</div>
            <div className='w-[400px] h-[80px] detection-box-shadow border border-neutral-400 rounded-[15px] mt-[3%] text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold tracking-[1px] flex justify-center items-center mx-auto mb-5'>Select <span className='ml-[2%]'>Image</span></div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default Pneumonia