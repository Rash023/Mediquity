import React from 'react'

const OurDoctorCard = ({data}) => {
  return (
    <div className='text-black border-[4px] border-[#21C4AF] w-[308px] h-[340px] rounded-[15px] bg-green-100 our-doctor-shadow'>
        <div className='w-[230px] h-[209px] border-[4px] border-[#21C4AF] ml-[13%] mt-[10%] rounded-[15px]'>
            <img src={data.src} className='h-full w-full rounded-xl' alt={data.name}/>
            <div className='uppercase font-[16px] font-[700] text-center leading-[63px] w-[220px] h-[116px] flex flex-col'>
              <div>{data.name}</div>
              <div className='leading-[63px] font-[24px] text-[#008E7B] -mt-[10%]'>{data.role}</div>
            </div>
        </div>
    </div>
  )
}

export default OurDoctorCard