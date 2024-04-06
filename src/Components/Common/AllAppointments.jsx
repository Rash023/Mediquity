import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { IoLink } from "react-icons/io5";
import User from '../../Asset/user.jpg'

const AllAppointments = () => {
  const [Appointments, setappointments] = useState([]);
  const token = sessionStorage.getItem("token");
  const [userdetails, setuserdetails] = useState([]);


  useEffect(() => {
    const getuserdetails = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('user', response);
        setuserdetails(response);

      } catch (e) {
        console.log(e.message);
      }
    }
    getuserdetails();
  }, [token])

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getAppointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setappointments(response);

      } catch (e) {
        console.log(e.message);
      }
    }
    getAppointments();
  }, [token])

  const handleSlotClick = (slot) => {
    console.log("appointments clicked");
};


  return (
    <div className='min-h-[100vh] min-w-fit dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] '>
      <div className="flex flex-col w-[100%]">
        <div className='flex xl:flex-row flex-col gap-y-10 mt-[8%] w-full lg:justify-center lg:gap-x-20 items-center'>
          <div>
            <img src={User} className='rounded-full lg:h-[400px] h-[350px] lg:w-[400px] w-[350px]' alt='Doctor' />
          </div>

          <div className='xl:w-[2px] w-[70%] xl:h-[400px] h-[5px] bg-white rounded-md' />
          <div className='flex items-center'>
            <div className='flex flex-col gap-y-5 lg:justify-center items-center'>

              <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                <div className='text-gray-300 text-5xl uppercase text-center first-letter:text-6xl'>Name <span className='lg:inline-block hidden'>-</span> </div>
                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center'>{userdetails?.data?.user?.name} </div>
              </div>

              <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                <div className='text-gray-300 text-5xl uppercase text-center first-letter:text-6xl'>Email <span className='lg:inline-block hidden'>-</span> </div>
                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center'>{userdetails?.data?.user?.email}</div>
              </div>

            </div>
          </div>
        </div>

        <div className='xl:w-0 w-[70%] xl:h-[400px] h-[5px] bg-white rounded-md mx-auto mt-[5%]' />

        <div className="flex flex-col w-[100%] xl:-mt-[27%]">
          <div className='mx-auto mt-[5%]'>
            <h1 className='select-none text-gray-300 lg:text-5xl text-4xl uppercase first-letter:text-6xl tracking-[2px]'>Your  <span className='text-6xl tracking-[2px]'>A</span>ppointments</h1>
          </div>

          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-12 w-full lg:p-20 p-10 gap-y-4'>
                        {Appointments?.data?.appointments?.map((appointment, index) => (
                            <div key={index} className={` h-fit w-full flex flex-col gap-y-4 border border-white rounded-[15px] bg-black p-4`} onClick={() => handleSlotClick()}>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center lg:first-letter:text-4xl first-letter:text-2xl'>{index+1}</div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>{appointment?.doctorId?.name}</div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>{appointment?.doctorId?.email}</div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>{appointment?.day}</div>
                                <div className='flex'>
                                  <div className='text-white  '><IoLink /></div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>{appointment?.link}</div>
                                </div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>{appointment?.time}</div>
                            </div>
                        ))}
                    </div>
        </div>
      </div>
    </div>
  )
}

export default AllAppointments