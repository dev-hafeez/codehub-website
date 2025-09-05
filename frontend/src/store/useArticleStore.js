import { create } from "zustand";
import axios from "axios";

const token = localStorage.getItem("token");

export const useArticleStore = create((set) => ({
  loading: false,
  error: null,

  // Upload inline image for Quill
  uploadInlineImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/blogs/upload-inline-image/",
        formData,
        { headers: { Authorization: `Token ${token}` } }
      );
      return res.data.url; // return uploaded image URL
    } catch (err) {
      console.error("Inline image upload failed:", err);
      throw err;
    }
  },

  // Create or update blog
  saveBlog: async ({ mode, blogData, title, content, coverImage }) => {
    if (!token) throw new Error("Not authenticated");

    if (!title || !content) throw new Error("Title and content are required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (coverImage) {
      formData.append("images", coverImage);
    }

    const url =
      mode === "edit"
        ? `http://localhost:8000/api/blogs/${blogData.id}/edit/`
        : "http://localhost:8000/api/blogs/upload/";

    const method = mode === "edit" ? "put" : "post";

    try {
      set({ loading: true, error: null });
      const res = await axios({
        method,
        url,
        data: formData,
        headers: { Authorization: `Token ${token}` },
      })
      
      return res.data;
    } catch (err) {
      set({
        error:
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to save blog",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
