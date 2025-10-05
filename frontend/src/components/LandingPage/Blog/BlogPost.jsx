import React from "react";
import { Row, Col } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Blog.css";
const textVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const BlogPost = ({ title, description, imageUrl, imageAlt, reverseOrder }) => {
  const imageCol = (
    <Col
      md={6}
      className="d-flex justify-content-center align-items-center p-3"
    >
      <img src={imageUrl} alt={imageAlt} className="blog-image1 img-fluid" />
    </Col>
  );

  const textCol = (
    <Col md={6} className="p-4 d-flex flex-column justify-content-center">
      <div className="blog-content">
       
        <motion.h2
          className="blog-post-title"
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {title}
        </motion.h2>

       
        <motion.p
          className="text-black"
          variants={textVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {description}
        </motion.p>

      
        <Link
          to="/blogs"
          className="learn-more-btn btn btn-primary d-inline-flex align-items-center"
        >
          Learn more <BsArrowRight className="ms-2" />
        </Link>
      </div>
    </Col>
  );

  return (
    <div className="blog-post-container">
      <Row
        className={`align-items-center ${
          reverseOrder ? "flex-md-row-reverse" : "flex-md-row"
        } flex-column`}
      >
        {imageCol}
        {textCol}
      </Row>
    </div>
  );
};

export default BlogPost;
