import React from 'react'
import HeroImage from '../../Asset/HeroImage.png'
import './HeroSection.css'
const HeroSection = () => {
  return (
    <div className='hero-container flex justify-center mb-[4%]'>
        <div className="mt-[50px] mr-[30px]">
            <img src={HeroImage} alt=''/>
        </div>
        <div className="mt-[89px]  w-[650px] h-[241px] ">
            <div className='ml-[130px] flex flex-col space-y-[30px]'>
                <div className="leading-[40px]">
                    <span className='font-bold text-[50px] leading-[24px] '> Welcome To</span> 
                    <div className="font-bold text-[53px] leading-[24px] mt-[20px] text-[#008e7b] "><span>Healthcare.</span></div>
                </div>
                <div className="">
                    <span className='font-semibold text-[33px] leading-[47px] tracking-[0.1px]'>Your Personalized Healthcare Telemedicine Assistant Platform.</span>
                </div>
                <div className="font-[600] text-[15px] leading-[27px] tracking-[0.1px] w-[606px] h-[80px] text-justify">
                    Artificial Intelligence (AI) Has Revolutionized The Field Of Telemedicine And 
                    Healthcare, Offering Innovative Solutions To Enhance Patient Care, Improve 
                    Efficiency, And Streamline Various Processes.
                </div>
                <div>
                    <button className='uppercase w-[175px] h-[48px] leading-[24px] font-[19px] tracking-[0.1px] bg-[#21C4AF] border border-[#000000] rounded-[5px] font-bold hero-section-box-shadow'>Learn More</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection