import React from 'react'
import HighlightText from './HighlightText'

const Quote = () => {
  return (
    <div className="text-[25px] font-light mx-auto py-5 pb-20 text-center text-neutral-500 tracking-wider leading-relaxed font-ai">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform combines <HighlightText text={"TECHNOLOGY"} />,{" "}
        <span className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  font-sans bg-clip-text font-bold ">
            {" "}
            EXPERTISE
        </span>
        , and community to create an
        <span className="text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  font-sans bg-clip-text font-bold ">
            {" "}
            UNPARALLEL MEDICAL EXPERIENCE.
        </span> 
    </div>
  )
}

export default Quote