import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Doctor from "../../Asset/Profile/Doctor.png"


const GetDoctorBySpecialist = () => {
    const { specialist } = useParams();
    const navigate = useNavigate();
    const [Doctors, setdoctors] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/doctor/getDoctorBySpecialisation?specialization=${specialist}`);
                setdoctors(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctors();
    }, [specialist]);



    return (
        <div className='min-h-[100vh] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]'>
            <h1 className="select-none text-5xl lg:text-7xl pt-[4%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
                Our Doctor
            </h1>
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 w-[90%] gap-x-20 mx-auto">
                {
                    Doctors?.data?.doctors.map((doctor, index) => (
                        <div className='w-fit h-fit border border-white rounded-[30px] bg-black p-10 mt-3 mb-6'>
                            <div>
                                <div>
                                    <img src={Doctor} className='rounded-lg' alt=''/>
                                </div>

                                <div className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl mt-4 lg:text-2xl uppercase select-none tracking-[1px] text-center">{`Dr. ${doctor.name}`}</div>
                                <div className='flex justify-center'>
                                    <button
                                        className="text-white bg-gradient-to-b from-neutral-200 to-neutral-600 rounded-lg py-2 px-4 mt-4 uppercase tracking-[2px]"
                                        onClick={()=>navigate(`/view-slots/${doctor._id}`)}
                                        >
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