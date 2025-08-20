import React from 'react'
import BlogBanner from '../components/BlogBanner'
import BlogGrid from '../components/BlogGrid'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const BlogListingPage = () => {
  return (
    <>
    <Navbar/>
    <div>
        <h2 className="mt-5 text-center">ACM CUI WAH BLOGS</h2>
        <p className="text-center" style={{fontSize:'20px'}}>Home</p>
    </div>
    <BlogBanner/>
    <BlogGrid/>
    <Footer/>
    
    </>
  )
}

export default BlogListingPage