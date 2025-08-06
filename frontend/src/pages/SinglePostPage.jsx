import React from 'react'
import BlogContent from '../components/BlogContent'
import { sampleBlog } from "../SampleData.js";
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
const SinglePostPage = () => {
  return (
    <div>
<Navbar/>
        <BlogContent blog={sampleBlog}/>
        <Footer/>
    </div>
  )
}

export default SinglePostPage