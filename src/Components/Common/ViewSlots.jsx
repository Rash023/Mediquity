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
        <div className='min-h-[100vh] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] '>
            <div className='flex flex-col pt-11 w-[70%] '>



                <div className=' '>
                    <div className='flex  gap-y-5 mt-5'>
                        {/* <h1 className='select-none text-2xl lg:text-5xl pt-[4%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 ml-7 font-sans font-bold uppercase tracking-[1px]'>Doctor Details</h1> */}
                        <div>
                            <img src={Doctor} className='rounded-full ml-14 h-[400px] w-[400px]' />
                        </div>
                        <div className='flex items-center pl-8'>
                            <div className='flex flex-col'>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>Dr. {slotDetails?.data?.slots?.name}</div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center mb-6'>{slotDetails?.data?.slots?.specialization}</div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div className='w-1 h-32 bg-white '></div> */}

                <div>
                    <h1 className='select-none text-2xl lg:text-5xl pt-[4%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  font-sans font-bold uppercase tracking-[1px]'>slot Details</h1>
                    {
                        slotDetails?.data?.slots?.slots.map((slot, index) => (
                            <div key={index}>
                                <div className='text-white'>{slot.day}</div>
                                <div className='text-white'>{slot.time}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewSlots