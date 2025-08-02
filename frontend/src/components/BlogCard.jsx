import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BlogCard.css";
import carImg from "../assets/car-image.jpg";
import authorImg from "../assets/author-1.jpg";

const BlogCard = () => {
  return (
    <div className="blogCard-wrapper">
      <div className="blogCard-container border container col-6 col-md-4 col-lg-3 col-xl-2">
        <div className="blog-img-container py-3">
          <img src={carImg} alt="CarImage" className="blog-image img-fluid" />
        </div>
        <div className="blog-tag">
          <span className="tag-text">Technology</span>
        </div>
        <div className="blog-title pt-2">
          <h2 className="blog-title-text">
            The Impact of Technology on the WorkPlace: How Technology is
            Changing
          </h2>
        </div>
        <div className="d-flex pt-3 flex-row justify-content-start bottom">
          <span className="d-flex blog-author-pfp">
            <img
              src={authorImg}
              alt="Author"
              className="author-image img-fluid"
            />
          </span>
          <span className="d-flex pt-2 ps-3 blog-author-name">John Doe</span>
          <span className="d-flex pt-2 ps-3 blog-date">March 15, 2023</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
