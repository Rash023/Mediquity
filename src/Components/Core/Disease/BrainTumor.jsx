import React from 'react'
import { FaUpload } from "react-icons/fa";
import './BrainTumor.css'

const BrainTumor = () => {
  return (
    <div className='brain-tumor-container brain-container flex flex-col'>
      <div className='uppercase leading-[63px] font-[700] text-[83px] text-center text-[#000000] h-[116px] mt-[115px]'>BRAIN TUMOR <span className='text-[#008E7B]'>DETECTION</span></div>
      <div className='w-[1045px] h-[730px] detection-box-shadow border-[4px] border-[#21C4AF] rounded-[15px] ml-[22%] mb-[2%] flex flex-col'>
        <div className='font-[700] text-[42px] leading-[63px] uppercase text-center mt-[3%]'>Health <span className='text-[#008E7B]'>Care</span></div>
        <div className='w-[831px] h-[433px] detection-box-shadow border-[4px] border-[#21C4AF] rounded-[15px] ml-[10%] mb-[2%] flex flex-col mt-[3%] items-center'>
          <FaUpload size={50} className='mt-[3%]' />
          <div className='font-[700] text-[50px] leading-[63px] mt-[3%]'>Upload Image</div>
          <div className='text-[#008E7B] text-[27px] leading-[63px] font-[700] mt-[2%]'>Image Size Must Be Less Than 2MB</div>
          <div className='w-[414px] h-[90px] detection-box-shadow border-[4px] border-[#21C4AF] rounded-[15px] mt-[3%] font-[700] text-[36px] leading-[63px] flex justify-center items-center'>Select <span className='text-[#008E7B] ml-[2%]'>Image</span></div>
        </div>
        <div className='w-[734px] h-[53px] leading-[27px] text-[16px] tracking-[0.1px] text-center font-[700] mt-[3%] ml-[14%]'>
          By Continuing, You Agree To healthcare’s <span className='text-[#008E7B]'>Terms Of Service</span> Opens A New Tab And Acknowledge You've Read Our Privacy Policy. Notice At Collection
        </div>
      </div>
    </div>
  )
}

export default BrainTumor