// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/BlogCard.css";
// import { Link } from "react-router-dom";
// import { FaPencilAlt, FaTrash } from "react-icons/fa";
// import defaultImage from "../assets/author-1.jpg"
// import defaultBlogImage from "../assets/blog1.jpg";
// const BlogCard = ({ id, title, author, date, tag, image, authorImg, role, currentUserId, authorId }) => {
//   // Only show edit/delete if user is admin, lead, or the blog owner
//   const canEditOrDelete = role === "ADMIN" || role === "LEAD" || currentUserId === authorId;

//   const handleEdit = (e) => {
//     e.preventDefault();
//     console.log("Edit blog", id);
//     // navigate to edit page or open modal
//   };

//   const handleDelete = (e) => {
//     e.preventDefault();
//     console.log("Delete blog", id);
//     // call delete API
//   };

//   return (
//     <Link to={`/blog/${id}`} style={{ textDecoration: "none" }}>
//       <div className="blogCard-wrapper">
//         <div className="blogCard-container border container">
//           <div className="blog-img-container py-3">
//             <img src={image||defaultBlogImage} alt="Blog" className="blog-image img-fluid" />
//           </div>

//           <div className="blog-tag">
//             <span className="tag-text">{tag}</span>
//           </div>

//           <div className="blog-title pt-2">
//             <h2 className="blog-title-text" style={{ fontSize: "1rem" }}>{title}</h2>
//           </div>

//           <div className="d-flex pt-3 flex-row align-items-center justify-content-start bottom w-100">
//             <span className="d-flex blog-author-pfp">
//              <img 
//   src={authorImg ||defaultImage} 
//   alt="Author" 
//   className="author-image img-fluid" 
// />
//             </span>
//             <span className="d-flex pt-1 ps-3 blog-author-name" style={{ fontSize: "0.8rem" }}>{author}</span>
//             <span className="d-flex pt-1 ps-3 blog-date" style={{ fontSize: "0.8rem" }}>{date}</span>

//             {canEditOrDelete && (
//               <span className="ms-auto d-flex gap-2">
//                 <FaPencilAlt onClick={handleEdit} style={{ cursor: "pointer" }} />
//                 <FaTrash onClick={handleDelete} style={{ cursor: "pointer", color: "red" }} />
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default BlogCard;
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/BlogCard.css";
import { Link, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import defaultImage from "../assets/author-1.jpg";
import defaultBlogImage from "../assets/blog1.jpg";
import axios from "axios";

const BlogCard = ({
  id,
  title,
  author,
  date,
  tag,
  image,
  authorImg,
  role,
  currentUserId,
  authorId,
  onDelete,
  // callback from parent
}) => {
  const navigate = useNavigate();

  

  const canEdit = String(currentUserId) === String(authorId);
  console.log(canEdit)
  const canDelete = role === "ADMIN";

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/blogs/${id}/edit`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a blog.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/blogs/${id}/delete/`, {
        headers: { Authorization: `Token ${token}` },
      });
      alert("Blog deleted successfully!");
      if (onDelete) onDelete(id); // remove from parent list
    } catch (err) {
      console.error("Delete failed:", err.response || err);
      alert("Failed to delete blog. You may not have permission.");
    }
  };

  return (
    <Link to={`/blog/${id}`} style={{ textDecoration: "none" }}>
      <div className="blogCard-wrapper">
        <div className="blogCard-container border container">
          <div className="blog-img-container py-3">
            <img
              src={image || defaultBlogImage}
              alt="Blog"
              className="blog-image img-fluid"
            />
          </div>

          <div className="blog-tag">
            <span className="tag-text">{tag}</span>
          </div>

          <div className="blog-title pt-2">
            <h2 className="blog-title-text" style={{ fontSize: "1rem" }}>
              {title}
            </h2>
          </div>

          <div className="d-flex pt-3 flex-row align-items-center justify-content-start bottom w-100">
            <span className="d-flex blog-author-pfp">
              <img
                src={authorImg || defaultImage}
                alt="Author"
                className="author-image img-fluid"
              />
            </span>
            <span className="d-flex pt-1 ps-3 blog-author-name" style={{ fontSize: "0.8rem" }}>
              {author}
            </span>
            <span className="d-flex pt-1 ps-3 blog-date" style={{ fontSize: "0.8rem" }}>
              {date}
            </span>

            <span className="ms-auto d-flex gap-2">
              {canEdit && <FaPencilAlt onClick={handleEdit} style={{ cursor: "pointer" }} />}
              {canDelete && <FaTrash onClick={handleDelete} style={{ cursor: "pointer", color: "red" }} />}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
