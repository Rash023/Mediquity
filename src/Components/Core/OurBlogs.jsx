import React from 'react'
import './OurBlogs.css'
import { OurBlogsData } from '../../Util/OurBlogsData'
import BlogCard from './BlogCard'

const OurBlogs = () => {
    return (
        <div className='our-blogs-container mt-[3%]'>
            <div>
                <div className='text-center uppercase tracking-[2px] text-4xl font-[700] leading-[63px] text-[#000000] mb-[2%]'>Our <span className='text-[#008E7B]'>Blogs</span></div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-x-12 place-items-center gap-y-8'>
                    {
                        OurBlogsData.map((provideCard) => (
                            <BlogCard data={provideCard} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OurBlogs