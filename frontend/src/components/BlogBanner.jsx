import React from "react";
import '../styles/BlogBanner.css';
import bgImage from '../assets/blog-banner-background.jpg'; 
import profileImg from '../assets/profile-nill.png'; 

const BlogBanner = () => {
  return (
    <div
      className="blog-banner position-relative text-white d-flex align-items-end m-4"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="overlay w-100 h-100 position-absolute top-0 start-0"></div>
      
      <div className="container position-relative z-2 py-4 px-5">
        <span className="badge bg-primary mb-2">Technology</span>
        
        <h2 className="blog-title fw-bold mb-3">
          The Impact of Technology on the Workplace: How Technology is Changing
        </h2>
        
        <div className="d-flex align-items-center gap-2 blog-meta">
          <img src={profileImg} alt="Author" className="author-img" />
          <span>Tracey Wilson</span>
          <span>August 20, 2022</span>
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
