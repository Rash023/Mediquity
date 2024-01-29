import React from 'react'

const ProvideCard = ({data}) => {
  return (
    <div className='text-black border-[4px] border-[#21C4AF] w-[308px] h-[244px] rounded-[15px] bg-green-100 doctor-box-shadow'>
        <div className='w-[198px] h-[125px] border-[4px] border-[#21C4AF] ml-[17%] mt-[10%] rounded-[15px]'>
            <img src={data.src} className='h-full w-full rounded-xl' alt={data.label}/>
            <div className='uppercase font-[16px] font-[700] text-center leading-[63px] w-[206px] h-[116px]'>{data.label}</div>
        </div>
    </div>
  )
}

export default ProvideCard