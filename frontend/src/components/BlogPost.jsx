import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom'; // <-- import Link
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

        {/* Use Link to navigate */}
        <Link to="/blogs" className="learn-more-btn btn btn-primary d-inline-flex align-items-center">
          Learn more <BsArrowRight className="ms-2" />
        </Link>
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
