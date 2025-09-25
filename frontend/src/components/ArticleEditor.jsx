// // import React, { useState, useRef } from "react";
// // import ReactQuill from "react-quill-new";
// // import "react-quill-new/dist/quill.snow.css";
// // import axios from "axios";
// // import "../styles/ArticleEditor.css";

// // function ArticleEditor() {
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [coverImage, setCoverImage] = useState(null);
// //   const [coverPreview, setCoverPreview] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const token = localStorage.getItem("token");
// //   const quillRef = useRef(null);

// //   // ✅ Cover image upload
// //   const handleCoverChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setCoverImage(file);
// //       setCoverPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   const removeCoverImage = () => {
// //     setCoverImage(null);
// //     setCoverPreview(null);
// //   };

// //   // ✅ Inline image handler (ReactQuill custom upload)
// //   const handleImageInsert = () => {
// //     const input = document.createElement("input");
// //     input.setAttribute("type", "file");
// //     input.setAttribute("accept", "image/*");
// //     input.click();

// //     input.onchange = async () => {
// //       const file = input.files[0];
// //       if (!file) return;

// //       const formData = new FormData();
// //       formData.append("image", file);

// //       try {
// //         const res = await axios.post(
// //           "http://localhost:8000/api/blogs/upload-inline-image/",
// //           formData,
// //           {
// //             headers: { Authorization: `Token ${token}` },
// //           }
// //         );

// //         const imageUrl = res.data.url;
// //         const editor = quillRef.current.getEditor();
// //         const range = editor.getSelection();
// //         editor.insertEmbed(range.index, "image", imageUrl);
// //       } catch (err) {
// //         console.error("Inline image upload failed:", err);
// //         alert("Image upload failed. Please try again.");
// //       }
// //     };
// //   };

// //   // ✅ Quill toolbar config
// //   const modules = {
// //     toolbar: {
// //       container: [
// //         [{ header: [1, 2, 3, false] }],
// //         ["bold", "italic", "underline", "strike"],
// //         [{ list: "ordered" }, { list: "bullet" }],
// //         ["link", "image"], // 👈 image button
// //         ["clean"],
// //       ],
// //       handlers: {
// //         image: handleImageInsert, // 👈 override default image upload
// //       },
// //     },
// //   };

// //   const formats = [
// //     "header",
// //     "bold",
// //     "italic",
// //     "underline",
// //     "strike",
// //     "list",
// //     "bullet",
// //     "link",
// //     "image", // 👈 allow inline images
// //   ];

// //   // ✅ Submit
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!token) {
// //       alert("You must be logged in to create a blog.");
// //       return;
// //     }

// //     if (!title || !content) {
// //       alert("Title and content are required.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("title", title);
// //     formData.append("content", content);

// //     if (coverImage) {
// //       formData.append("cover_image", coverImage); // 👈 only cover
// //     }

// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const res = await axios.post(
// //         "http://localhost:8000/api/blogs/upload/",
// //         formData,
// //         { headers: { Authorization: `Token ${token}` } }
// //       );

// //       console.log("Blog created:", res.data);
// //       alert("Blog created successfully!");

// //       // reset
// //       setTitle("");
// //       setContent("");
// //       setCoverImage(null);
// //       setCoverPreview(null);
// //     } catch (err) {
// //       console.error("Error creating blog:", err.response || err);
// //       setError(
// //         err.response?.data?.message ||
// //           err.response?.data ||
// //           "Failed to create blog"
// //       );
// //       alert(`Error creating blog: ${error || "Unknown error"}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <form className="article-editor-container p-5" onSubmit={handleSubmit}>
// //       {/* Title */}
// //       <input
// //         type="text"
// //         className="article-title-input"
// //         value={title}
// //         onChange={(e) => setTitle(e.target.value)}
// //         placeholder="Enter article title"
// //         required
// //       />

// //       {/* Cover image */}
// //       <label className="mt-3">Cover Image:</label>
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleCoverChange}
// //         className="mt-1"
// //       />
// //       {coverPreview && (
// //         <div className="cover-preview mt-2">
// //           <img src={coverPreview} alt="cover preview" />
// //           <button
// //             type="button"
// //             onClick={removeCoverImage}
// //             className="remove-image-btn"
// //           >
// //             ✕
// //           </button>
// //         </div>
// //       )}

// //       {/* Content editor */}
// //       <ReactQuill
// //         ref={quillRef}
// //         theme="snow"
// //         value={content}
// //         onChange={setContent}
// //         modules={modules}
// //         formats={formats}
// //         className="article-content-editor mt-3"
// //         placeholder="Write your blog content here..."
// //       />

// //       {/* Error */}
// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {/* Submit */}
// //       <button type="submit" className="btn-submit mt-3" disabled={loading}>
// //         {loading ? "Publishing..." : "Publish"}
// //       </button>
// //     </form>
// //   );
// // }

// // export default ArticleEditor;




// import React, { useState, useRef, useEffect } from "react";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
// import "../styles/ArticleEditor.css";
// import { useArticleStore } from "../store/useArticleStore";

// function ArticleEditor({ mode = "create", blogData = null, onSuccess }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [coverImage, setCoverImage] = useState(null);
//   const [coverPreview, setCoverPreview] = useState(null);

//   const { uploadInlineImage, saveBlog, loading, error } = useArticleStore();
//   const quillRef = useRef(null);

//   // Pre-fill form if editing
//   useEffect(() => {
//     if (mode === "edit" && blogData) {
//       setTitle(blogData.title || "");
//       setContent(blogData.content || "");
//       setCoverPreview(blogData.images[0].image_url|| null);
//     }
//   }, [mode, blogData]);

//   const handleCoverChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverImage(file);
//       setCoverPreview(URL.createObjectURL(file));
//     }
//   };

//   const removeCoverImage = () => {
//     setCoverImage(null);
//     setCoverPreview(null);
//   };

//   // Image handler using store
//   const handleImageInsert = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       if (!file) return;

//       try {
//         const imageUrl = await uploadInlineImage(file);
//         const editor = quillRef.current.getEditor();
//         const range = editor.getSelection();
//         editor.insertEmbed(range.index, "image", imageUrl);
//       } catch {
//         console.log("Inline image upload failed");
//         alert("Image upload failed. Please try again.");
//       }
//     };
//   };

//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, false] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["link", "image"],
//         ["clean"],
//       ],
//       handlers: { image: handleImageInsert },
//     },
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "list",
//     "bullet",
//     "link",
//     "image",
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await saveBlog({
//         mode,
//         blogData,
//         title,
//         content,
//         coverImage,
//       });

//       alert(mode === "edit" ? "Blog updated!" : "Blog created!");

//       if (mode === "create") {
//         setTitle("");
//         setContent("");
//         setCoverImage(null);
//         setCoverPreview(null);
//       }

//       if (onSuccess) onSuccess(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form className="article-editor-container p-5" onSubmit={handleSubmit}>
//       {/* Title */}
//       <input
//         type="text"
//         className="article-title-input"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter article title"
//         required
//       />

//       {/* Cover image */}
//       <label className="mt-3">Cover Image:</label>
//       <input type="file" accept="image/*" onChange={handleCoverChange} />
//       {coverPreview && (
//         <div className="cover-preview mt-2">
//           <img src={coverPreview} alt="cover preview" />
//           <button type="button" onClick={removeCoverImage}>
//             ✕
//           </button>
//         </div>
//       )}

//       {/* Content editor */}
//       <ReactQuill
//         ref={quillRef}
//         theme="snow"
//         value={content}
//         onChange={setContent}
//         modules={modules}
//         formats={formats}
//         placeholder="Write your blog content here..."
//       />

//       {/* Error */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Submit */}
//       <button type="submit" className="btn-submit mt-3" disabled={loading}>
//         {loading ? "Saving..." : mode === "edit" ? "Update" : "Publish"}
//       </button>
//     </form>
//   );
// }

// export default ArticleEditor;




import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../styles/ArticleEditor.css";
import { useArticleStore } from "../store/useArticleStore";
import { useNavigate } from "react-router-dom";

function ArticleEditor({ mode = "create", blogData = null, onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const { uploadInlineImage, saveBlog, loading, error } = useArticleStore();
  const quillRef = useRef(null);

const navigate = useNavigate();

  // Pre-fill form if editing
  useEffect(() => {
    if (mode === "edit" && blogData) {
      setTitle(blogData.title || "");
      setContent(blogData.content || "");
      setCoverPreview(blogData.images[0].image_url || null);
    }
  }, [mode, blogData]);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };

  // Image handler using store
  const handleImageInsert = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      try {
        const imageUrl = await uploadInlineImage(file);
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", imageUrl);
      } catch (err){
        alert("❌ Image upload failed. Please try again.");
        set({
    error:
      err.response?.data?.message ||
      err.response?.data ||
      "Failed to save blog",
  });
  throw err;  
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: { image: handleImageInsert },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!title.trim()) {
      alert("⚠️ Title is required!");
      return;
    }
    if (!coverImage && !coverPreview) {
      alert("⚠️ Please upload a cover image.");
      return;
    }
    if (!content.trim() || content === "<p><br></p>") {
      alert("⚠️ Content cannot be empty.");
      return;
    }

    try {
      await saveBlog({
        mode,
        blogData,
        title,
        content,
        coverImage,
      });

      alert(mode === "edit" ? "✅ Blog updated successfully!" : "✅ Blog created successfully!");

      if (mode === "create") {
        setTitle("");
        setContent("");
        setCoverImage(null);
        setCoverPreview(null);
      }
      navigate("/dashboard");

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save blog. Please try again.");
    }
  };

  return (
    <form className="article-editor-container p-5" onSubmit={handleSubmit}>
      {/* Title */}
      <input
        type="text"
        className="article-title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter article title"
        required
      />

      {/* Cover image */}
      <label className="mt-3">Cover Image:</label>
      <input type="file" accept="image/*" onChange={handleCoverChange} />
      {coverPreview && (
        <div className="cover-preview mt-2">
          <img src={coverPreview} alt="cover preview" />
          <button type="button" onClick={removeCoverImage}>
            ✕
          </button>
        </div>
      )}

      {/* Content editor */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Write your blog content here..."
      />

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Submit */}
      <button type="submit" className="btn-submit mt-3" disabled={loading}>
        {loading ? "Saving..." : mode === "edit" ? "Update" : "Publish"}
      </button>
    </form>
  );
}

export default ArticleEditor;
