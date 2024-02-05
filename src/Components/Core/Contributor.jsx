import React from 'react'
import './Contributor.css'
import { ContributorData } from '../../Util/ContributorData'
import ContributorCard from './Card/ContributorCard'

const Contributor = () => {
  return (
    <div className='contributor-box-container flex flex-col items-center'>
      <div className='uppercase leading-[63px] font-[700] text-[80px] text-center text-[#000000] h-[116px] mt-[115px]'>OUR <span className='text-[#008E7B]'>CONTRIBUTOR</span></div>
      <div className='grid grid-cols-3 mt-[2%] gap-8'>
        {
          ContributorData.map((contributor) => (
            <ContributorCard contributor={contributor} />
          ))
        }
      </div>
    </div>
  )
}

export default Contributor