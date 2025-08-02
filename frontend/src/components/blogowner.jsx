import React from 'react';
import '../styles/blogowner.css';
import ownerImg from '../assets/rob.png'; 

const BlogOwner = () => {
  return (
    <div className="blog-owner-wrapper">
  <div className="blog-owner-card">

    <div className="owner-info">
      <img
        src={ownerImg}
        alt="Jonathan Doe"
        className="owner-img"
        
      />
      <div>
        <span className="owner-name">Jonathan Doe</span>
        <span className="owner-role">Collaborator & Editor</span>
      </div>
    </div>

    <p className="description-text">
      Meet Jonathan Doe, a passionate writer and blogger with a love for
      technology and travel. Jonathan holds a degree in Computer Science and
      has spent years working in the tech industry, gaining a deep
      understanding of the impact technology has on our lives.
    </p>

    <div className="social-icons">
      <a href="#"><i className="bi bi-facebook"></i></a>
      <a href="#"><i className="bi bi-twitter"></i></a>
      <a href="#"><i className="bi bi-instagram"></i></a>
      <a href="#"><i className="bi bi-youtube"></i></a>
    </div>

  </div>
</div>

  );
};

export default BlogOwner;
