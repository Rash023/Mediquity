import React from 'react'
import ConclusionImage from '../../Asset/Conclusion.png'
import './Conclusion.css'
const Conclusion = () => {
    return (
        <div className='flex gap-x-8 justify-center mt-[5%] conclusion-container'>
            <div className='w-[566px] h-[429px]'><img src={ConclusionImage} alt='conclusion' className='h-full w-full' /></div>
            <div className='flex flex-col'>
                <div className='w-[630px] h-[185px] flex flex-col'>
                    <div className='font-[600] text-[53px] font-bold'>We Take Care Of Your</div>
                    <div className='font-[600] text-[53px] font-bold'>Healthy <span className='text-[#008E7B]'>Life</span></div>
                </div>
                <div className='w-[685px] h-[210px] text-[16px] leading-[36px] font-[600] tracking-[0.1px]'>
                    We Are A Group Of Four Undergrad Student Of KIIT, Bhubaneswar, Odisha, INDIA
                    <br />
                    <br />
                    Still Learning And Have A Great Interest In Developing And Integrating Different Types Of Technologies. Worked With Various Tech Stacks And Participated In Numerous Events, Hackathons And Competetions And The Count Will Never Stop.Want To Know More About Us ? Click Below To Explore
                </div>
            </div>
        </div>
    )
}

export default Conclusion