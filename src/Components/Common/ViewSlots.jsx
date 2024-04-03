import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Doctor from "../../Asset/Doctor.png"


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
                <div className='flex lg:flex-row flex-col gap-y-10 mt-[8%] w-full lg:justify-center lg:gap-x-44 items-center'>
                    <div>
                        <img src={Doctor} className='rounded-full h-[400px] lg:w-[400px] w-[350px]' alt='Doctor' />
                    </div>
            
                    <div className='lg:w-[2px] w-[80%] lg:h-[400px] h-[5px] bg-white rounded-md'/>
                    <div className='flex items-center'>
                        <div className='flex flex-col gap-y-5 lg:justify-center items-center'>
                            
                            <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                                <div className='text-white text-5xl uppercase first-letter:text-6xl'>Name <span className='lg:inline-block hidden'>-</span> </div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>Dr. {slotDetails?.data?.slots?.name}</div>
                            </div>

                            <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                                <div className='text-white text-5xl uppercase first-letter:text-6xl'>Specialization <span className='lg:inline-block hidden'>-</span> </div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>{slotDetails?.data?.slots?.specialization}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSlots