import React from 'react'
import { projects } from '../../Util/Projects'
import BlogCard from './BlogCard'

const Blog = () => {
    return (

        <div className='flex flex-col text-center -mt-[7%]'>
            <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b uppercase mt-[9%] from-neutral-200 to-neutral-500 py-8 tracking-[2px]">
                Blogs
            </p>
            <div className="max-w-8xl mx-auto px-8 mt-[12%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 -mt-[3%]">
                {
                    projects.map((project) => (
                        <BlogCard />
                    ))
                }
            </div>
        </div>

    )
}

export default Blog