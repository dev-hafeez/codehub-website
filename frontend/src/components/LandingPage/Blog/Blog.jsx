import React from 'react';
import { Container } from 'react-bootstrap';
import BlogPost from './BlogPost';
import './Blog.css'; // We will create this CSS file next

import aiImage from '../../../assets/blogImage.png'; // Make sure you have images in this path
import hackathonImage from '../../../assets/blog1.jpg';


const Blog = () => {
  const blogData = [
    {
      id: 1,
      title: 'Artificial Intelligence',
      description: 'Artificial Intelligence is no longer just a buzzword—it’s transforming how we live, work, and connect. From virtual assistants to smart healthcare, AI is shaping the future at an incredible pace.',
      imageUrl: aiImage,
      imageAlt: 'Artificial Intelligence concept',
      reverseOrder: false,
    },
    {
      id: 2,
      title: 'How Hackathons Boost Student Innovation',
      description: (
        <>
          <span className="highlight">
            Hackathons are more than just coding marathons
          </span>
          ; they're a launchpad for creativity, teamwork, and real-world problem-solving. In this post, we explore how participating in hackathons helps students gain practical experience, build networks, and bring bold ideas to life.
        </>
      ),
      imageUrl: hackathonImage,
      imageAlt: 'Students at a hackathon',
      reverseOrder: true,
    },
  ];

  return (
    <div className="bgstyle border">
    <Container className="blogs  ">
      <h1 className="blog-title text-center ">Blogs</h1>
      {blogData.map((blog) => (
        <div key={blog.id} className="container blog-container justify-content-center">
<BlogPost
         
          title={blog.title}
          description={blog.description}
          imageUrl={blog.imageUrl}
          imageAlt={blog.imageAlt}
          reverseOrder={blog.reverseOrder}
        />
        </div>
        
      ))}
    </Container>
    </div>
  );
};

export default Blog;