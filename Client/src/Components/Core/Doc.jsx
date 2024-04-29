import React from 'react'
import { FaFilePdf } from "react-icons/fa";

const Doc = ({ file, index }) => {

    const viewpdf = () => {
        window.open('https://asset.cloudinary.com/dvpulu3cc/07dbdf1215e7760677a15213f2ed507f', "_blank", "noreferrer");
    }

    return (
        <div className='mb-[12%] transform hover:scale-110 transition duration-300'>
            <div className="cursor-pointer flex items-center gap-x-6 border border-neutral-300 w-[320px]  rounded-[30px] px-10 py-2" onClick={viewpdf}>
                <div className="">
                    <FaFilePdf size={30} color='red' />
                </div>
                <div className="text-clip overflow-hidden ... ">
                <span className='text-xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold  tracking-[1px] mt-[3%] mx-auto'>{file.name}.</span>

                    <span className='text-xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold  tracking-[1px] mt-[3%] mx-auto'>pdf</span>
                </div>
            </div>
        </div>
    )
}

export default Doc