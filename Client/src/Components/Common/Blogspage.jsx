import React, { useEffect } from 'react'
import {BlogContent} from "../../Util/BlogContent"
import { useParams } from 'react-router-dom'
import PageContent from './PageContent'
import { useState } from 'react'

const Blogspage = () => {
  const {index} = useParams();
  const indexToRender = parseInt(index);
  const [blogArray, setBlogArray] = useState([]);

  useEffect(() => {
    setBlogArray([BlogContent[indexToRender]]);
  }, [indexToRender]);
  return (
    <div className='bg-black h-[120vh]'>

        {
          blogArray.map((content, index)=>(
            <PageContent content={content} key={index}/>
          ))
        }
    </div>
  )
}

export default Blogspage