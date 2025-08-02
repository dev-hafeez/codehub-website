import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BlogCard.css";

const BlogCard = ({title, author,date,tag, image, authorImg} ) => {
  return (
    <div className="blogCard-wrapper">
      <div className="blogCard-container border container col-6 col-md-4 col-lg-3 col-xl-2">
        <div className="blog-img-container py-3">
          <img src={image} alt="CarImage" className="blog-image img-fluid" />
        </div>
        <div className="blog-tag">
          <span className="tag-text">{tag}</span>
        </div>
        <div className="blog-title pt-2">
          <h2 className="blog-title-text">
            {title}
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
          <span className="d-flex pt-2 ps-3 blog-author-name">{author}</span>
          <span className="d-flex pt-2 ps-3 blog-date">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
