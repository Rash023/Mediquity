import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';

import User from'../../Asset/user.jpg'

const AllAppointments = () => {
  const [appointments, setappointments] = useState([]);
  const token = sessionStorage.getItem("token");

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
                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center'> </div>
              </div>

              <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                <div className='text-gray-300 text-5xl uppercase text-center first-letter:text-6xl'>Specialization <span className='lg:inline-block hidden'>-</span> </div>
                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center'></div>
              </div>

            </div>
          </div>
        </div>
        <div className='xl:w-0 w-[70%] xl:h-[400px] h-[5px] bg-white rounded-md mx-auto mt-[5%]' />
        <div className="">

        </div>
      </div>
    </div>
  )
}

export default AllAppointments