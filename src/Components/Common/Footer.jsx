import React from 'react'
import Arrow from '../../Asset/arrow.png'

import './Footer.css'
const Footer = () => {
  return (
    <div className='footer-container flex justify-evenly mt-[5%]'>
        <div className="">
            <div><img src='https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=' alt='' width={70} height={70} className='rounded-full'/></div>
        </div>

        <div className=" flex flex-col space-y-5">
            <div className="">
                <span className='font-bold text-[20px] leading-[24px] mt-[20px]'>First Column</span>
            </div>
            <div className="">
                <div className="font-bold text-[15px] text-gray-600 leading-[24px] ">First Page</div>
                <div className="font-bold text-[15px] text-gray-600 leading-[24px]">Second Page</div>
                <div className="font-bold text-[15px] text-gray-600 leading-[24px]">Third Page</div>
                <div className="font-bold text-[15px] text-gray-600 leading-[24px]">Fourth Page</div>
            </div>
        </div>
        <div className="flex flex-col space-y-5">
            <div className="">
                <span className='font-bold text-[20px] leading-[24px] mt-[20px]'>Second Column</span>
            </div>
            <div className="">
                <div className="font-bold text-[15px] text-gray-600 leading-[24px]">Fifth Page</div>
                <div className="font-bold text-[15px] text-gray-600 leading-[24px]">Sixth Page</div>
                <div className="font-bold text-[15px] text-gray-600 leading-[24px]">Seventh Page</div>
            </div>
        </div>
        <div className="flex flex-col space-y-5">
            <div className="">
                <span className='font-bold text-[20px] leading-[24px] mt-[20px]'>Third Column</span>
            </div>
            <div className="">
                <div className="font-bold text-[15px] text-gray-600 leading-[24px]">Eight Page</div>
                <div className="font-bold text-[15px] text-gray-600 leading-[24px]">Nine Page</div>
                <div className="font-bold text-[15px] text-gray-600 leading-[24px]">Ten Page</div>
            </div>
        </div>
        <div className="flex flex-col space-y-5">
            <div className="">
                <span className='font-bold text-[20px] leading-[24px] mt-[20px]'>Subscribe</span>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="w-[300px] h-[48px]  bg-gray-100 px-[20px] py-[12px]">
                    <button className='flex space-x-[80px]'>
                        <div><span className='text-gray-500 font-bold'>HealthCare Service</span></div>
                        <div className='pt-[2.5%]'><img src={Arrow} width={10} height={10} className='' alt=''/></div>
                    </button>
                </div>
                <div className="">
                    <span className="font-bold text-[15px] text-gray-400 leading-[24px]">Join our newsletter to stay up to date on </span>
                    <div><span className="font-bold text-[15px] text-gray-400 leading-[24px]">features and  releases </span></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer