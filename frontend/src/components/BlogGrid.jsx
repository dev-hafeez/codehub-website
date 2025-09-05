// import React, { useEffect, useState } from "react";
// import BlogCard from "./BlogCard";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col } from "react-bootstrap";
// import axios from "axios";
// import useAuthStore from "../store/authStore.js";

// const BlogGrid = ({ userId = null, userRole }) => {
//   const { user_id } = useAuthStore(); // current logged-in user ID
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("http://localhost:8000/api/blogs/");

//         let mappedBlogs = res.data.map((blog) => ({
//           id: blog.id,
//           title: blog.title,
//           author: blog.createdBy || "Unknown",
//           authorId: blog.createdById || blog.user,
//           date: new Date(blog.createdAt).toLocaleDateString("en-US", {
//             month: "long",
//             day: "numeric",
//             year: "numeric",
//           }),
//           tag: "General",
//           image: blog.images?.length > 0 ? blog.images[0].image_url : null,
//           authorImg: null,
//         }));

//         // Filter by userId if passed (only show their blogs)
//         if (userId) {
//           mappedBlogs = mappedBlogs.filter((b) => b.authorId === userId);
//         }

//         setBlogs(mappedBlogs);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//         setError("Failed to load blogs");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, [userId]);

//   // ✅ handle delete from BlogCard
//   const handleDeleteBlog = (deletedId) => {
//     setBlogs((prev) => prev.filter((b) => b.id !== deletedId));
//   };

//   if (loading) return <p>Loading blogs...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (blogs.length === 0) return <p>No blogs found.</p>;

//   return (
//     <Container className="my-4">
//       <Row className="justify-content-center g-4">
//         {blogs.map((blog) => (
//           <Col key={blog.id} xs={11} sm={6} md={4} lg={4} xl={3}>
//             <BlogCard
//               {...blog}
//               role={userRole}
//               currentUserId={user_id}
//               onDelete={handleDeleteBlog} // 👈 pass delete handler
//             />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default BlogGrid;



import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import useAuthStore from "../store/authStore.js";

const BlogGrid = ({ userId = null, userRole }) => {
  const { user_id } = useAuthStore(); // current logged-in user ID
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination state
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/blogs/");

        let mappedBlogs = res.data.map((blog) => ({
          id: blog.id,
          title: blog.title,
          author: blog.createdBy || "Unknown",
          authorId: blog.createdById || blog.user,
          date: new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          tag: "General",
          image: blog.images?.length > 0 ? blog.images[0].image_url : null,
          authorImg: null,
        }));

        // Filter by userId if passed (only show their blogs)
        if (userId) {
          mappedBlogs = mappedBlogs.filter((b) => b.authorId === userId);
        }

        setBlogs(mappedBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [userId]);

  // ✅ handle delete from BlogCard
  const handleDeleteBlog = (deletedId) => {
    setBlogs((prev) => prev.filter((b) => b.id !== deletedId));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

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
            />
          </Col>
        ))}
      </Row>

      {/* Show load more button if blogs remain */}
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
