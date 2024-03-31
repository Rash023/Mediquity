import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Doctor from "../../Asset/Doctor.png"


const GetDoctorBySpecialist = () => {
    const { specialist } = useParams();

    const [Doctors, setdoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/doctor/getDoctorBySpecialisation?specialization=${specialist}`);
                console.log(response);
                setdoctors(response);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchDoctors();
    }, [specialist]);



    return (
        <div className='min-h-[100vh] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]'>
            <h1 className="select-none text-4xl lg:text-7xl pt-[4%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
                Our Doctors
            </h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                {
                    Doctors?.data?.doctors.map((doctor, index) => (
                        <div className='w-[20vw] h-fit border border-white rounded-[30px] bg-black p-10 ml-14 mt-3 mb-6'>
                            <div>
                                <div>
                                    <img src={Doctor} className='rounded-lg' />
                                </div>

                                <div className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl mt-4 lg:text-2xl uppercase select-none tracking-[1px]">{`Dr. ${doctor.name}`}</div>
                                <div className='flex justify-center'>
                                    <button
                                        className="text-white bg-gradient-to-b from-neutral-200 to-neutral-600 rounded-lg py-2 px-4 mt-4 uppercase tracking-[2px]">
                                    Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default GetDoctorBySpecialist