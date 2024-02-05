import React from 'react'
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ContributorCard = ({ contributor }) => {
    const navigate = useNavigate();
    return (
        <div className='text-black border-[4px] border-[#21C4AF] w-[390px] h-[456px] rounded-[15px] bg-green-100 contributor-box-shadow'>
            <div className='flex flex-col items-center'>
                <div className='w-[300px] h-[228px] border-[4px] border-[#21C4AF] mt-[10%] rounded-[15px] text-center'>
                    <img src={contributor.src} className='h-full w-full rounded-xl' alt={contributor.label} />
                </div>
                <div className='flex gap-x-2 items-baseline'>
                    <div className='uppercase text-[25px] font-[700] text-center leading-[44px] mt-[5%] font-[700] text-[#008E7B] tracking-[2px]'>Name -</div>
                    <div className='uppercase text-[21px] font-[700] text-center leading-[44px] mt-[5%] font-[700] tracking-[2px]'>{contributor.name}</div>
                </div>
                <div className='flex gap-x-2 items-baseline'>
                    <div className='uppercase text-[25px] font-[700] text-center mt-[5%] font-[700] text-[#008E7B] tracking-[2px]'>Role -</div>
                    <div className='uppercase text-[21px] font-[700] text-center mt-[5%] font-[700] tracking-[2px]'>{contributor.role}</div>
                </div>
                <div className='flex gap-x-4 items-baseline mt-[5%]'>
                    <FaLinkedin color='#0A66C2' size={40} className='cursor-pointer' onClick={() => navigate(contributor.linkedIn)}/>
                    <FaGithub color='black' size={40}  className='cursor-pointer' onClick={() => navigate(contributor.github)}/>
                </div>
            </div>
        </div>
    )
}

export default ContributorCard