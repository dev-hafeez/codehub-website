import React from 'react'
import { useLocation } from 'react-router-dom'
import BlogBanner from '../../components/Blogs/BlogBanner'
import BlogGrid from '../../components/Blogs/BlogGrid'
import Navbar from '../../components/DashboardNavbar/Navbar'

import useAuthStore from '../../store/authStore'

const BlogListingPage = () => {
  const { user_id, role } = useAuthStore()
  const location = useLocation()
  const blogListing = true

  // Show Navbar only if route is NOT /blogs
  const shouldShowNavbar = location.pathname == '/blogs'

  return (
    <>
      {shouldShowNavbar && <Navbar />}
   
      <div>
        <h2 className="mt-5 text-center">ACM CUI WAH BLOGS</h2>
        <p className="text-center" style={{fontSize:'20px'}}>Home</p>
      </div>
      <BlogBanner/>
      <BlogGrid
        userRole={role}
        filterByUser={false}
        blogListing={true}
      />
    </>
  )
}

export default BlogListingPage