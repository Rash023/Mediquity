import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Doctor from "../../Asset/Doctor.png"
import { LuAsterisk } from 'react-icons/lu';


const ViewSlots = () => {
    const [slotDetails, setslotDetails] = useState([]);
    const { docId } = useParams();

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/doctor/getDoctorSlots?id=${docId}`);
                console.log(response);
                setslotDetails(response);
            } catch (error) {
                console.error("Error fetching slots:", error);
            }
        };
        fetchSlots();
    }, [docId]);

    return (
        <div className='min-h-[100vh] min-w-fit dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] '>
            <div className='flex flex-col w-[100%]'>
                <div className='flex xl:flex-row flex-col gap-y-10 mt-[8%] w-full lg:justify-center lg:gap-x-20 items-center'>
                    <div>
                        <img src={Doctor} className='rounded-full lg:h-[400px] h-[350px] lg:w-[400px] w-[350px]' alt='Doctor' />
                    </div>

                    <div className='xl:w-[2px] w-[70%] xl:h-[400px] h-[5px] bg-white rounded-md' />
                    <div className='flex items-center'>
                        <div className='flex flex-col gap-y-5 lg:justify-center items-center'>

                            <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                                <div className='text-gray-300 text-5xl uppercase text-center first-letter:text-6xl'>Name <span className='lg:inline-block hidden'>-</span> </div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center'>Dr. {slotDetails?.data?.slots?.name}</div>
                            </div>

                            <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                                <div className='text-gray-300 text-5xl uppercase text-center first-letter:text-6xl'>Specialization <span className='lg:inline-block hidden'>-</span> </div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center'>{slotDetails?.data?.slots?.specialization}</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='xl:w-0 w-[70%] xl:h-[400px] h-[5px] bg-white rounded-md mx-auto mt-[5%]' />

                <div className='flex flex-col w-[100%] xl:-mt-[27%]'>
                    <div className='mx-auto mt-[5%]'>
                        <h1 className='select-none text-gray-300 lg:text-5xl text-4xl uppercase first-letter:text-6xl tracking-[2px]'>Available  <span className='text-6xl tracking-[2px]'>S</span>lot</h1>
                    </div>

                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-12 w-full lg:p-20 p-10 gap-y-4'>
                        {
                            slotDetails?.data?.slots?.slots.map((slot, index) => (
                                <div key={index} className='cursor-not-allowed h-fit w-full flex flex-col gap-y-4 border border-white rounded-[15px] bg-black p-4'>
                                    <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center lg:first-letter:text-4xl first-letter:text-2xl'>{slot.day}</div>
                                    <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>{slot.time}</div>
                                    <div className="flex lg:items-center gap-1 mx-auto">
                                        <div className="text-red-500 text-md text-[1.2rem]"><LuAsterisk /></div>
                                        <div className="text-neutral-500 my-1 text-[1.2rem] text-center tracking-[1.5px]">N/A</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSlots