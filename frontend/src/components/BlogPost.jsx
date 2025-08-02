import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs'; // Importing the arrow icon
import "../styles/Blog.css";
const BlogPost = ({ title, description, imageUrl, imageAlt, reverseOrder }) => {
  const imageCol = (
    <Col md={6} className="d-flex justify-content-center align-items-center p-3">
      <img src={imageUrl} alt={imageAlt} className="blog-image img-fluid" />
    </Col>
  );

  const textCol = (
    <Col md={6} className="p-4 d-flex flex-column justify-content-center">
      <div className="blog-content">
        <h2 className="blog-post-title">{title}</h2>
        <p className="text-black">{description}</p>
        <button className="learn-more-btn ">
          Learn more <BsArrowRight />
        </button>
      </div>
    </Col>
  );

  return (
    <div className="blog-post-container">
      <Row className={`align-items-center ${reverseOrder ? 'flex-md-row-reverse' : 'flex-md-row'} flex-column`}>

        {imageCol}
        {textCol}
      </Row>
    </div>
  );
};

export default BlogPost;