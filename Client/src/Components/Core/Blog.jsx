import React from "react";
import { blogs } from "../../Util/Blogs";
import BlogCard from "./BlogCard";

const Blog = () => {
  return (
    <div className="flex flex-col text-center -mt-[7%]">
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b uppercase mt-[9%] from-neutral-200 to-neutral-500 py-8 tracking-[2px]">
        Blogs
      </p>
      <div className="w-full px-8 mt-[4%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8">
        {blogs.map((service,index) => (
          <BlogCard index={index}/>
        ))}
      </div>
    </div>
  );
};

export default Blog;
