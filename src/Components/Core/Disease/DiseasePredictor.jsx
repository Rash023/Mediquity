import React from 'react'
import './DiseasePredictor.css'
import { SymptomData } from '../../../Util/SymptomData'

const DiseasePredictor = () => {
  return (
    <div className='disease-predictor-container disease-predictor'>
      <div className='uppercase leading-[63px] font-[700] text-[70px] text-center text-[#000000] h-[116px] mt-[115px]'>DISEASE <span className='text-[#008E7B]'>PREDICTOR</span></div>
      <div className='w-[1083px] h-[1196px] disease-predictor-box-shadow border-[4px] border-[#21C4AF] rounded-[15px] ml-[22%] mb-[2%] flex flex-col bg-transparent backdrop-blur-sm items-center'>
        {
          SymptomData.map((_, index) => (
            <div className='flex flex-col gap-y-4'>
              <div className='flex gap-x-4 mt-[10%] items-baseline'>
                <div className='font-[700] text-[31px] leading-[63px]'>Symptom {index} : </div>
                <select className='w-[573px] h-[80px] disease-predictor-box-shadow border-[4px] border-[#21C4AF] rounded-[15px]'></select>
              </div>
            </div>
          ))
        }
        <button className='uppercase w-[176px] h-[56px] leading-[24px] text-[30px] tracking-[0.1px] bg-[#21C4AF] border border-[#000000] rounded-[5px] font-bold disease-predictor-box-shadow mt-[6%] px-[20px] py-[12px]'>PREDICT</button>
        <div className='w-[734px] h-[53px] leading-[27px] text-[16px] tracking-[0.1px] text-center font-[700] mt-[3%]'>
          By Continuing, You Agree To healthcare’s <span className='text-[#008E7B]'>Terms Of Service</span> Opens A New Tab And Acknowledge You've Read Our Privacy Policy. Notice At Collection
        </div>
      </div>

    </div>
  )
}

export default DiseasePredictor