import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='nav-container'>
        <div className='flex justify-between'>

            {/* image */}
            <div className='py-[1%] pl-[2%]'>
                <img src='https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=' alt='' width={70} height={70} className='rounded-full'/>
            </div>
            
            {/* tabs */}
            <div className=' flex '>
                <div className='flex gap-x-[80px] py-[3%]'>
                    <div className="">
                        <Link to='/' className=' text-black font-bold text-[26px] leading-[24px] tracking-[0.1px]'>Home</Link>
                    </div>
                    <div className="">
                        <Link to='/aboutus' className='text-black font-bold text-[26px] leading-[24px] tracking-[0.1px] '>About Us</Link>
                    </div>
                    <div className="">
                        <Link to='/doctors' className='text-black font-bold text-[26px] leading-[24px] tracking-[0.1px] '>Doctors</Link>
                    </div>
                    <div className="">
                        <Link to='/contact' className='text-black font-bold text-[26px] leading-[24px] tracking-[0.1px] '>Contact</Link>
                    </div>
                </div>

                {/* buttons */}
                <div className='flex gap-x-[60px] ml-[90px] mr-[90px] py-[2%]'>
                    <div className="w-[113px] h-[48px] border-[2px] border-black rounded-[10px] px-[20px] py-[12px] shadow-xl">
                        <button className='font-bold text-[16px] leading-[24px] tracking-[0.1px] pl-[9px]'>Log in</button>
                    </div>
                    <div className="w-[156px] h-[48px] border-[2px] border-black rounded-[10px] px-[20px] py-[12px] shadow-xl">
                        <button className='font-bold text-[16px] leading-[24px] tracking-[0.1px] pl-[9px]'>Get started</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Navbar