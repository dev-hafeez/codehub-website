import React from "react";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";
import BlogGrid from "../components/BlogGrid.jsx";
import useAuthStore from "../store/authStore.js";
import BlogOwner from "../components/blogowner.jsx"

const MyBlogPage = () => {
  const { user_id, role } = useAuthStore(); 

  return (
    <div>
      <NavbarComponent />
      <div className="container mt-4">
        <BlogOwner/>
        <h2>My Blogs</h2>
        
        {/* Pass both userId and role to BlogGrid */}
        <BlogGrid
  userId={user_id}
  userRole={role}
  filterByUser={true}    // only current user's blogs
  blogListing={false}
/>
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogPage;
