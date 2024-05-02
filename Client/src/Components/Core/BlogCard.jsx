import { React } from "react";
import { CardBody, CardContainer, CardItem } from "../UI/3DCard.tsx";
import { useNavigate } from "react-router-dom";
import { Blogs } from "../../Util/Blogs.js";

const BlogCard = ({ index }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/blogspage/${index}`);
  };
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] md:w-[17rem] lg:w-[30rem] h-auto  md:h-[30rem] rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white uppercase tracking-[1.1px]"
        >
          {Blogs[index].title}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={Blogs[index].image}
            height="1000"
            width="1000"
            className="h-60 w-[99%] object-cover rounded-xl group-hover/card:shadow-xl opacity-90"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          ></CardItem>

          <div className="bg-[#3b82f6] p-2 rounded-lg">
            <button
              className="text-white font-semibold tracking-wide"
              onClick={clickHandler}
            >
              Read More →
            </button>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
};
export default BlogCard;
