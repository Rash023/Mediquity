import React, { useState } from 'react';
import Files from '../../Util/Files';
import Doc from './Doc';
import { IoChevronBackOutline } from "react-icons/io5";
import './AllDocs.css'

const AllDocs = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const filesPerPage = 8;
    const totalPages = Math.ceil(Files.length / filesPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const renderFiles = () => {
        const startIndex = currentPage * filesPerPage;
        const endIndex = Math.min(startIndex + filesPerPage, Files.length);

        return Files.slice(startIndex, endIndex).map((file, index) => (
            <div key={index} className=''>
                <Doc file={file} index={startIndex + index} />
            </div>
        ));
    };

    return (
        <div>
            <div className='grid grid-cols-3 border border-neutral-600 w-[75rem] rounded-[20px] mt-[3%] p-12 bg-shad'>

                {renderFiles()}

            </div>
            <div className='col-span-3 flex gap-x-8 justify-center items-center mt-9'>

                <div className='flex items-center gap-x-3 border border-neutral-600 rounded-[13px] px-4 cursor-pointer transform hover:scale-110 transition duration-300 btn-sha'   
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}>

                    <IoChevronBackOutline />
                    <div>
                        <button
                            className='font-cursive text-2xl first-letter:text-3xl tracking-[1.5px] font-thin '
                        >
                            Previous
                        </button>
                    </div>
                </div>

                <div className='flex items-center  border border-neutral-600 rounded-[13px] px-4  gap-x-3 cursor-pointer transform hover:scale-110 transition duration-300 btn-sha'
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}>

                    <div>
                        <button
                            className='font-cursive text-2xl first-letter:text-3xl tracking-[1.5px] font-thin ' 
                        >
                            Next
                        </button>
                    </div>
                    <IoChevronBackOutline className='rotate-180' />
                </div>
            </div>
        </div>

    );
};

export default AllDocs;
