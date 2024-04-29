import React from 'react'
import './BookAppointment.css'
const BookAppointment = () => {
    return (
        <div className='book-appointment-container mt-[3%]'>
            <div className='flex flex-col'>
                <div className='text-center uppercase tracking-[2px] text-4xl font-[700] leading-[63px] text-[#000000] mb-[2%]'>Book <span className='text-[#008E7B]'>Appointment</span></div>
                <div className='uppercase tracking-2px w-[231px] h-[47px] rounded-[10px] px-[20px] py-[12px] tracking-[0.1px] bg-[#21C4AF] border border-[#000000] rounded-[5px] font-bold book-appointment-box-shadow ml-[43%]'>Book Appointment</div>
            </div>
        </div>
    )
}

export default BookAppointment