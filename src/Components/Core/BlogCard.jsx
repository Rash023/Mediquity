// const BlogCard = ({data}) => {
//     return (
//         <div className='text-black border-[4px] border-[#21C4AF] w-[308px] h-[456px] rounded-[15px] bg-green-100 our-blog-box-shadow'>
//             <div className='w-[230px] h-[228px] border-[4px] border-[#21C4AF] ml-[13%] mt-[10%] rounded-[15px] text-center'>
//                 <img src={data.src} className='h-full w-full rounded-xl' alt={data.label} />
//                 <div className='uppercase text-[21px] font-[700] text-center leading-[44px] mt-[5%] font-[700]'>{data.label}</div>
//                 <button className='uppercase w-[139px] h-[41px] leading-[24px] font-[19px] tracking-[0.1px] bg-[#21C4AF] border border-[#000000] rounded-[5px] font-bold our-blog-box-shadow mt-[5%]'>Learn More</button>
//             </div>
//         </div>
//     )
// }

// export default BlogCard

import React from "react";
import { CardBody, CardContainer, CardItem } from "../UI/3DCard.tsx";

const BlogCard = () => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Add your content
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Add content
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};
export default BlogCard;
