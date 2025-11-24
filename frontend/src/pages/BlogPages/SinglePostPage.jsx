import React from 'react'
import BlogContent from '../../components/Blogs/BlogContent'
import { sampleBlog } from "../../SampleData.js";
import Navbar from '../../components/Navbar.jsx';

const SinglePostPage = () => {
  return (
    <div>
{/* <Navbar/> */}
        <BlogContent blog={sampleBlog}/>
      
    </div>
  )
}

export default SinglePostPage