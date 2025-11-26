import React from 'react'
import BlogBanner from '../../components/Blogs/BlogBanner'
import BlogGrid from '../../components/Blogs/BlogGrid'

import useAuthStore from '../../store/authStore' // import store

const BlogListingPage = () => {
  const { user_id, role } = useAuthStore(); 
  const blogListing=true;

  return (
    <>
      {/* <Navbar/> */}
   
      <div>
        <h2 className="mt-5 text-center">ACM CUI WAH BLOGS</h2>
        <p className="text-center" style={{fontSize:'20px'}}>Home</p>
      </div>
      <BlogBanner/>
      <BlogGrid
  userRole={role}
  filterByUser={false}    // show all blogs
  blogListing={true}
/>

 
    </>
  )
}

export default BlogListingPage
