import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleEditor from "./ArticleEditor";
import Navbar from "./Navbar";

function EditBlogWrapper() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/blogs/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        const found = res.data.find((b) => b.id === parseInt(id));
        setBlog(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;
console.log(blog)
  return (
    <>
    <Navbar/>
    <ArticleEditor mode="edit" blogData={blog} />
    </>
  );
}

export default EditBlogWrapper;
