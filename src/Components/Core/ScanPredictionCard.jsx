import React from 'react'

const ScanPredictionCard = ({data}) => {
    return (
        <div className='text-black border-[4px] border-[#21C4AF] w-[308px] h-[280px] rounded-[15px] bg-green-100 scan-prediction-box-shadow'>
            <div className='w-[198px] h-[125px] border-[4px] border-[#21C4AF] ml-[17%] mt-[10%] rounded-[15px] text-center'>
                <img src={data.src} className='h-full w-full rounded-xl' alt={data.label} />
                <div className='uppercase font-[16px] font-[700] text-center leading-[63px] '>{data.label}</div>
                <button className='uppercase w-[139px] h-[41px] leading-[24px] font-[19px] tracking-[0.1px] bg-[#21C4AF] border border-[#000000] rounded-[5px] font-bold scan-prediction-box-shadow'>Learn More</button>
            </div>
        </div>
    )
}

export default ScanPredictionCard