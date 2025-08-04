import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BlogCard.css";

import { Link } from "react-router-dom";
const BlogCard = ({id, title, author, date, tag, image, authorImg }) => {
  return (
    <Link to={`/blog/${id}`} style={{ textDecoration: "none" }}>
    <div className="blogCard-wrapper">
      <div className="blogCard-container border container " >

        <div className="blog-img-container py-3">
          <img src={image} alt="CarImage" className="blog-image img-fluid" />
        </div>
        <div className="blog-tag">
          <span className="tag-text">{tag}</span>
        </div>
        <div className="blog-title pt-2">
          <h2 className="blog-title-text">{title}</h2>
        </div>
        <div className="d-flex pt-3 flex-row align-items-center justify-content-start bottom">
          <span className="d-flex blog-author-pfp">
            <img
              src={authorImg}
              alt="Author"
              className="author-image img-fluid"
            />
          </span>
          <span className="d-flex pt-1 ps-3 blog-author-name">{author}</span>
          <span className="d-flex pt-1 ps-3 blog-date">{date}</span>
        </div>
      </div>
    </div>

    </Link>
  );
};

export default BlogCard;

