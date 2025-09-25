import React from 'react'
import BlogBanner from '../components/BlogBanner'
import BlogGrid from '../components/BlogGrid'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useAuthStore from '../store/authStore' // import store

const AdminBlogPage = () => {
  const { user_id, role } = useAuthStore(); // get current user

  return (
    <>
      <Navbar/>
      <div>
        <h2 className="mt-5 text-center">ACM CUI WAH BLOGS</h2>
        <p className="text-center" style={{fontSize:'20px'}}>Home</p>
      </div>
      <BlogBanner/>
      {/* ✅ Pass user info down */}
      <BlogGrid userId={user_id} userRole={role} />
      <Footer/>
    </>
  )
}

export default AdminBlogPage
