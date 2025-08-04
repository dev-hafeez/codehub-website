import React from "react";
import BlogCard from './BlogCard';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Image01 from "../assets/iphone-image.jpg";
import Image02 from "../assets/car-image.jpg";
import Image03 from "../assets/psv-controller.jpg";
import AuthorImg01 from "../assets/author-1.jpg";
import AuthorImg02 from "../assets/author-2.jpg";
import AuthorImg03 from "../assets/author-3.jpg";

const blogs = [
  {
    id:1,
    title: "5 Tips to Master Competitive Programming",
    author: "Ayaan Ahmed Khan",
    date: "July 25, 2025",
    tag: "Programming",
    image: Image01,
    authorImg: AuthorImg01,
  },
  {
    id:2,
    title: "Why AI is the Future of Education",
    author: "Fatima Noor",
    date: "July 20, 2025",
    tag: "AI & Education",
    image: Image02,
    authorImg: AuthorImg02,
  },
  {
    id:3,
    title: "Beginner’s Guide to Web Development in 2025",
    author: "Hamza Ali",
    date: "July 15, 2025",
    tag: "Web Dev",
    image: Image03,
    authorImg: AuthorImg03,
  },
    {
      id:4,
    title: "5 Tips to Master Competitive Programming",
    author: "Ayaan Ahmed Khan",
    date: "July 25, 2025",
    tag: "Programming",
    image: Image01,
    authorImg: AuthorImg01,
  },
  {
    id:5,
    title: "Why AI is the Future of Education",
    author: "Fatima Noor",
    date: "July 20, 2025",
    tag: "AI & Education",
    image: Image02,
    authorImg: AuthorImg02,
  },
  {
    id:6,
    title: "Beginner’s Guide to Web Development in 2025",
    author: "Hamza Ali",
    date: "July 15, 2025",
    tag: "Web Dev",
    image: Image03,
    authorImg: AuthorImg03,
  },
    {
      id:7,
    title: "5 Tips to Master Competitive Programming",
    author: "Ayaan Ahmed Khan",
    date: "July 25, 2025",
    tag: "Programming",
    image: Image01,
    authorImg: AuthorImg01,
  },
  {
    id:8,
    title: "Why AI is the Future of Education",
    author: "Fatima Noor",
    date: "July 20, 2025",
    tag: "AI & Education",
    image: Image02,
    authorImg: AuthorImg02,
  },
  {
    id:9,
    title: "Beginner’s Guide to Web Development in 2025",
    author: "Hamza Ali",
    date: "July 15, 2025",
    tag: "Web Dev",
    image: Image03,
    authorImg: AuthorImg03,
  },
    {
      id:10,
    title: "5 Tips to Master Competitive Programming",
    author: "Ayaan Ahmed Khan",
    date: "July 25, 2025",
    tag: "Programming",
    image: Image01,
    authorImg: AuthorImg01,
  },
  {
    id:11,
    title: "Why AI is the Future of Education",
    author: "Fatima Noor",
    date: "July 20, 2025",
    tag: "AI & Education",
    image: Image02,
    authorImg: AuthorImg02,
  },
  {
    id:12,
    title: "Beginner’s Guide to Web Development in 2025",
    author: "Hamza Ali",
    date: "July 15, 2025",
    tag: "Web Dev",
    image: Image03,
    authorImg: AuthorImg03,
  },
];

const BlogGrid = () => {
  return (
    <Container className="my-4">
      <Row className="justify-content-center g-4 ">
        {blogs.map((blog, index) => (
          <Col key={index} xs={10} sm={6} md={4} lg={4} xl={3}>
            <BlogCard
            id={blog.id}
              title={blog.title}
              author={blog.author}
              date={blog.date}
              tag={blog.tag}
              image={blog.image}
              authorImg={blog.authorImg}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogGrid;
