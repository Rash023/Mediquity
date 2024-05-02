import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Doctor from "../../Asset/Profile/Doctor.png"
import { LuAsterisk } from 'react-icons/lu';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ViewSlots = () => {
    const [slotDetails, setSlotDetails] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { doctorId } = useParams();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/doctor/getDoctorSlots?id=${doctorId}`);
                setSlotDetails(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSlots();
    }, [doctorId]);
    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setShowModal(true);
    };
    const handleConfirmBooking = async () => {
        try {
            await axios.post(`${BASE_URL}/api/v1/user/bookAppointment`, {
                doctorId: doctorId,
                slotId: selectedSlot._id
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            toast.success("Appointment Added Successfully")
        } catch (error) {
            toast.error("Please Try Again")
            console.error(error);
        }

        setShowModal(false);
    };
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
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center'>Dr. {slotDetails?.data?.data[0].doctorId?.name}</div>
                            </div>

                            <div className='flex lg:flex-row flex-col gap-x-5 lg:items-baseline gap-y-3'>
                                <div className='text-gray-300 text-5xl uppercase text-center first-letter:text-6xl'>Specialization <span className='lg:inline-block hidden'>-</span> </div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center'>{slotDetails?.data?.data[0].doctorId?.specialization}</div>
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
                        {slotDetails?.data?.data?.map((slot, index) => (
                            <div key={index} className={`${slot.isFull ? 'pointer-events-none' : 'cursor-pointer'} h-fit w-full flex flex-col gap-y-4 border border-white rounded-[15px] bg-black p-4`} onClick={() => handleSlotClick(slot)}>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-3xl font-bold uppercase select-none tracking-[1px] text-center lg:first-letter:text-4xl first-letter:text-2xl'>{slot.day}</div>
                                <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl lg:text-2xl font-bold uppercase select-none tracking-[1px] text-center'>{slot.time}</div>
                                {
                                    slot.isFull && <div className="flex lg:items-center gap-1 mx-auto">
                                        <div className="text-red-500 text-md text-[1.2rem]"><LuAsterisk /></div>
                                        <div className="text-neutral-500 my-1 text-[1.2rem] text-center tracking-[1.5px]">N/A</div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div>
                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
                        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowModal(false)}></div>
                        <div className="relative bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-2xl mb-4 uppercase tracking-[1.5px]">Confirm Booking</h2>
                            <p className='uppercase tracking-[1.2px]'>Are you sure you want to book the slot for {selectedSlot.day} at {selectedSlot.time}?</p>
                            <div className="flex justify-end mt-4">
                                <button className="px-4 py-2 bg-green-500 text-white rounded-md mr-4 uppercase tracking-[1.2px]" onClick={handleConfirmBooking}>Yes</button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-md uppercase tracking-[1.2px]" onClick={() => setShowModal(false)}>No</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewSlots