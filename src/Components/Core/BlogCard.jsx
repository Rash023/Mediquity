import React from 'react'

const BlogCard = ({data}) => {
    return (
        <div className='text-black border-[4px] border-[#21C4AF] w-[308px] h-[456px] rounded-[15px] bg-green-100 our-blog-box-shadow'>
            <div className='w-[230px] h-[228px] border-[4px] border-[#21C4AF] ml-[13%] mt-[10%] rounded-[15px] text-center'>
                <img src={data.src} className='h-full w-full rounded-xl' alt={data.label} />
                <div className='uppercase text-[21px] font-[700] text-center leading-[44px] mt-[5%] font-[700]'>{data.label}</div>
                <button className='uppercase w-[139px] h-[41px] leading-[24px] font-[19px] tracking-[0.1px] bg-[#21C4AF] border border-[#000000] rounded-[5px] font-bold our-blog-box-shadow mt-[5%]'>Learn More</button>
            </div>
        </div>
    )
}

export default BlogCard