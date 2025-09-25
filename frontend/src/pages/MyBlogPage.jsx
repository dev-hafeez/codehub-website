import React from "react";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";
import BlogGrid from "../components/BlogGrid.jsx";
import useAuthStore from "../store/authStore.js";


const MyBlogPage = () => {
  const { user_id, role } = useAuthStore();

  return (
    <div>
      <NavbarComponent />
      <div className="container mt-4">
        <h2>My Blogs</h2>
        <BlogGrid
          userId={user_id}
          userRole={role}
          filterByUser={true}
          blogListing={false}
        />
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogPage;
