import React from 'react'
import './Contributor.css'
import { ContributorData } from '../../Util/ContributorData'
import ContributorCard from './Card/ContributorCard'
import { motion } from "framer-motion";
import { LampContainer } from '../UI/Lamp.tsx'

const Contributor = () => {
  return (
    //   <div className='contributor-box-container flex flex-col items-center'>
    //     <div className='uppercase leading-[63px] font-[700] text-[80px] text-center text-[#000000] h-[116px] mt-[115px]'>OUR <span className='text-[#008E7B]'>CONTRIBUTOR</span></div>
    //     <div className='grid grid-cols-3 mt-[2%] gap-8'>
    //       {
    //         ContributorData.map((contributor) => (
    //           <ContributorCard contributor={contributor} />
    //         ))
    //       }
    //     </div>
    //   </div>
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        {/* <div className=''>
          {
            ContributorData.map((contributor) => (
              <ContributorCard contributor={contributor} />
            ))
          }
        </div> */}
      </motion.h1>
    </LampContainer>
  )
}

export default Contributor