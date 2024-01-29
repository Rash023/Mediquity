import React from 'react'
import './OurDoctor.css'
import { DoctorData } from '../../Util/DoctorData'
import OurDoctorCard from './OurDoctorCard'
const OurDoctor = () => {
    return (
        <div className='our-doctor-container mt-[3%]'>
            <div>
                <div className='text-center uppercase tracking-[2px] text-4xl font-[700] leading-[63px] text-[#000000] mb-[2%]'>Our <span className='text-[#008E7B]'>Doctors</span></div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-x-12 place-items-center'>
                    {
                        DoctorData.map((provideCard) => (
                            <OurDoctorCard data={provideCard} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OurDoctor