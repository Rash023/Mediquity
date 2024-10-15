import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Doctor from "../../Asset/Profile/Doctor.png"
import { useSelector } from "react-redux";

const GetDoctorBySpecialist = () => {
    const { specialist } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const desc = queryParams.get('desc');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/doctor/getDoctorBySpecialisation?specialization=${specialist}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDoctors(response.data.doctors);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const Skeleton = () => (
        <div className="w-full h-[300px] border border-white rounded-[30px] p-10 mt-3 mb-6 animate-pulse">
            <div className="w-full h-[150px] bg-gray-400 rounded-lg mb-4"></div>
            <div className="w-3/4 h-6 bg-gray-400 rounded mb-2 mx-auto"></div>
            <div className="w-1/4 h-10 bg-gray-500 rounded mx-auto"></div>
        </div>
    );

    return (
        <div className='min-h-[100vh] dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]'>
            <h1 className="select-none text-5xl ipad:text-7xl pt-[4%] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold uppercase tracking-[1px] mb-[4%]">
                Our Doctors
            </h1>
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {loading ? (
                        [...Array(3)].map((_, index) => <Skeleton key={index} />)
                    ) : (
                        doctors.map((doctor, index) => (
                            <div key={doctor._id} className='w-full  border border-white rounded-[30px] bg-black p-10 mt-3 mb-6'>
                                <div>
                                    <img src={Doctor} className='w-full h-auto rounded-lg' alt={`Dr. ${doctor.name}`} />
                                    <div className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-xl mt-4 lg:text-2xl uppercase select-none tracking-[1px] text-center">{`Dr. ${doctor.name}`}</div>
                                    <div className='flex justify-center'>
                                        <button
                                            className="text-white bg-gradient-to-b from-neutral-200 to-neutral-600 rounded-lg py-2 px-4 mt-4 uppercase tracking-[2px]"
                                            onClick={() => navigate(`/view-slots/${doctor._id}?name=${name}&desc=${desc}`)}
                                        >
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default GetDoctorBySpecialist