import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import useAuthStore from "../store/authStore.js";

const BlogGrid = ({ userId = null, userRole, filterByUser = false, blogListing = false }) => {
  const { user_id } = useAuthStore(); // current logged-in user ID
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/blogs/");
       console.log(res.data)

        let mappedBlogs = res.data.map((blog) => ({
          id: blog.id,
          title: blog.title,
          author: blog.createdBy || "Unknown",
          authorId: blog.created_by.id || blog.user,
          date: new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          tag: "General",
          image: blog.images?.length > 0 ? blog.images[0].image_url : null,
          authorImg: null,
        }));
console.log(user_id)
        // Filter only if filterByUser=true
        if (filterByUser ) {
          mappedBlogs = mappedBlogs.filter((b) =>String(b.authorId)  === user_id);
        }
        console.log(mappedBlogs)

        setBlogs(mappedBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [ filterByUser]);

  // Delete blog from local state
  const handleDeleteBlog = (deletedId) => {
    setBlogs((prev) => prev.filter((b) => b.id !== deletedId));
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 12);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (blogs.length === 0) return <p>No blogs found.</p>;

  return (
    <Container className="my-4">
      <Row className="justify-content-center g-4">
        {blogs.slice(0, visibleCount).map((blog) => (
          <Col key={blog.id} xs={11} sm={6} md={4} lg={4} xl={3}>
            <BlogCard
              {...blog}
              role={userRole}
              currentUserId={user_id}
              onDelete={handleDeleteBlog}
              blogListing={blogListing}
            />
          </Col>
        ))}
      </Row>

      {visibleCount < blogs.length && (
        <div className="text-center mt-4">
          <Button onClick={handleLoadMore} variant="primary">
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};

export default BlogGrid;
