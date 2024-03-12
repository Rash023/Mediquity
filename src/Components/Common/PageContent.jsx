import React from 'react'
import Exercise from "../../Asset/Exercise-Blog.gif";
import { GoDotFill } from "react-icons/go";

const PageContent = ({ content, index }) => {
  return (
    <div key={index} className=' dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]'>
      <div className='pt-[3%] p-10'>
        <p className='className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b uppercase  text-center from-neutral-200 to-neutral-500 py-8 tracking-[2px]"'>
          {content.title}
        </p>
        <div className='flex items-center mt-10 w-full p-16'>
          <div className='w-[100%] pl-8'>
            <img src={content.image} alt="#" className='bg-white rounded-full ' />
          </div>
          <div className='pl-[8%]'>
            <p className='text-white uppercase tracking-[2px] text-5xl first-letter:text-6xl font-bold mb-[3%]'>Introduction</p>
            <span className="text-2xl  text-neutral-300 text-justify tracking-[2px] font-extralight  " >{content.intro}</span>
          </div>
        </div>

        <p className='text-white uppercase tracking-[2px] text-5xl first-letter:text-6xl pl-20 font-bold mt-[1%] mb-[1.5%]'> About</p>
        {
          content.content.map((value, index) => (
            <div className='pl-[7%] pr-16'>
              <div className='flex gap-x-2 items-center'>
                <GoDotFill className='text-white'/>
                <h1 className='text-white  mb-[10px] tracking-[1.5px] first-letter:text-4xl  uppercase font-bold text-2xl'>{value.heading}</h1>
              </div>
              <h1 className='text-xl mb-[3%] text-neutral-300 text-justify tracking-[3px] font-extralight pl-8 pr-10'>{value.innerContent}</h1>
            </div>
          ))
        }
        <p className='text-white uppercase tracking-[2px] text-5xl first-letter:text-6xl pl-20 font-bold mt-[5%] mb-[1.5%] '>Conclusion</p>
        <h1 className='text-xl mb-[3%] text-neutral-300 text-justify tracking-[3px] font-extralight pl-[8%] pr-10'>{content.Conclusion}</h1>
        <p className='text-white uppercase tracking-[2px] text-5xl first-letter:text-6xl pl-20 font-bold mt-[5%] mb-[2.5%]'> Tips of the day</p>
        {
          content.Tips.map((value, index) => (
            <div className='pl-[12em]'>
              <h1 className='text-white  mb-[10px] tracking-[1.5px] first-letter:text-4xl  uppercase font-bold text-2xl'> {index + 1}.{" "}{value.heading}</h1>
              <h1 className='text-xl mb-[3%] text-neutral-300 text-justify tracking-[3px] font-extralight pl-8 pr-10'>{value.innerContent}</h1>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PageContent