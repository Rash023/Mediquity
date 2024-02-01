import React, { useState } from 'react'
import './Login.css'
const Login = () => {
    return (
        <div className='login-container login-bg-container flex flex-col gap-y-12'>
            <div className='uppercase leading-[63px] font-[700] text-[83px] text-center text-[#000000] h-[116px] mt-[115px]'>Don't Have Account ? <span className='text-[#008E7B]'>Register</span></div>
            <div className='w-[1083px] h-fit border-[4px] border-[#21C4AF] rounded-[15px] login-box-shadow ml-[21%] mb-[2%] flex flex-col'>
                <div className='uppercase tracking-[2px] w-[435px] h-[116px] leading-[63px] text-[42px] font-[700] text-center ml-[29%] mt-[2%]'>
                    Health <span className='text-[#008E7B]'>Care</span>
                </div>
                <div>
                    <input type='text' placeholder='First Name' className='border-[4px] border-[#21C4AF] rounded-[15px] w-[831px] h-[93px] placeholder:text-[31px] placeholder:leading-[63px] placeholder:font-[700] placeholder:uppercase placeholder:tracking-[2px] ml-[10%] placeholder:px-[2%] bg-gradient-to-r from-white to-white text-[31px] leading-[63px]' />
                    <br />
                    <input type='text' placeholder='Last Name' className='border-[4px] border-[#21C4AF] rounded-[15px] w-[831px] h-[93px] placeholder:text-[31px] placeholder:leading-[63px] placeholder:font-[700] placeholder:uppercase placeholder:tracking-[2px] ml-[10%] placeholder:px-[2%] bg-gradient-to-r from-white to-white text-[31px] leading-[63px] mt-[5%]' />
                    <br />
                    <input type='text' placeholder='Email' className='border-[4px] border-[#21C4AF] rounded-[15px] w-[831px] h-[93px] placeholder:text-[31px] placeholder:leading-[63px] placeholder:font-[700] placeholder:uppercase placeholder:tracking-[2px] ml-[10%] placeholder:px-[2%] bg-gradient-to-r from-white to-white text-[31px] leading-[63px] mt-[5%]' />
                    <br />
                    <input type='text' placeholder='Password  ' className='border-[4px] border-[#21C4AF] rounded-[15px] w-[831px] h-[93px] placeholder:text-[31px] placeholder:leading-[63px] placeholder:font-[700] placeholder:uppercase placeholder:tracking-[2px] ml-[10%] placeholder:px-[2%] bg-gradient-to-r from-white to-white mt-[5%]' />
                </div>
                <button className='uppercase w-[207px] h-[56px] leading-[24px] text-[31px] tracking-[1px] bg-[#21C4AF] border border-[#000000] rounded-[5px] font-bold login-box-shadow ml-[40%] mt-[6%] px-[20px] py-[12px]'>REGISTER</button>
                <div className='w-[734px] h-[53px] font-[700] leading-[27px] tracking-[1px] text-center ml-[15%] mt-[3%]'>
                    By Continuing, You Agree To healthcare’s <span className='text-[#008E7B]'>Terms Of Service</span> Opens A New Tab And Acknowledge You've Read Our Privacy Policy. Notice At Collection
                </div>
                <div className='w-[734px] h-[53px] font-[600] text-[25px] leading-[27px] text-center mt-[5%] ml-[15%]'>
                    Have An Account ? <span className='text-[#008E7B] underline'>Login</span>
                </div>
            </div>
        </div>
    )
}

export default Login