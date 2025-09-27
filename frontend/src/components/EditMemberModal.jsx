// src/components/EditMemberModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import "../style2/Modal.css";

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const EditMemberModal = ({ isOpen, onClose, member, onSave }) => {
  const [formData, setFormData] = useState({
    roll_no: "",
    club: "",
    user: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      role: "STUDENT",
    },
  });

  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load initial member data into form
  useEffect(() => {
    if (member) {
      setFormData({
        roll_no: member.roll_no || "",
        club: member.club || "",
        user: {
          id: member.user?.id || "", // ✅ include ID for Django to know which user to update
          first_name: member.user?.first_name || "",
          last_name: member.user?.last_name || "",
          email: member.user?.email || "",
          username: member.user?.username || "",
          password: "", // keep blank unless changed
          role: member.user?.role || "STUDENT",
        },
      });
    }
  }, [member]);

  if (!isOpen || !member) return null;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["roll_no", "club"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      }));
    }
  };

  // Submit changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const dataToSend = {};

      // --- Compare top-level fields (roll_no, club) ---
      if (formData.roll_no !== member.roll_no) {
        dataToSend.roll_no = formData.roll_no;
      }
      if (formData.club !== member.club) {
        dataToSend.club = formData.club;
      }

      // --- Compare nested user fields ---
      const updatedUserFields = {};
      const userFields = [
        "first_name",
        "last_name",
        "email",
        "username",
        "password",
        "role",
      ];

      userFields.forEach((field) => {
        if (field === "password") {
          // Only send password if user actually typed something
          if (formData.user.password.trim()) {
            updatedUserFields.password = formData.user.password;
          }
        } else if (formData.user[field] !== member.user[field]) {
          updatedUserFields[field] = formData.user[field];
        }
      });

      // Only include "user" object if it has changes
      if (Object.keys(updatedUserFields).length > 0) {
        updatedUserFields.id = member.user.id; // ✅ include user ID
        dataToSend.user = updatedUserFields;
      }

      console.log("PATCH Payload being sent:", dataToSend);

      if (Object.keys(dataToSend).length === 0) {
        alert("No changes detected!");
        setIsSaving(false);
        return;
      }

      // ✅ Make PATCH request (no trailing slash!)
      await axiosInstance.patch(`/students/${member.id}`, dataToSend);

      onSave();
      onClose();
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);

      // Handle duplicate email or nested errors
      if (err.response?.data?.user?.email) {
        setError(err.response.data.user.email[0]);
      } else {
        setError(err.response?.data?.detail || "Failed to update member.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2>Edit Member: {member.user.username}</h2>
            <button type="button" className="modal-close-btn" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="modal-body">
            {error && <p className="error-message">{error}</p>}

            {/* Roll No */}
            <div className="form-group">
              <label htmlFor="roll_no">Roll No.</label>
              <input
                type="text"
                id="roll_no"
                name="roll_no"
                value={formData.roll_no}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* Club */}
            <div className="form-group">
              <label htmlFor="club">Club</label>
              <input
                type="text"
                id="club"
                name="club"
                value={formData.club}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* First Name */}
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.user.first_name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.user.last_name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.user.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.user.username}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.user.password}
                onChange={handleChange}
                placeholder="Leave blank if unchanged"
                style={inputStyle}
              />
            </div>

            {/* Role */}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.user.role}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="STUDENT">Student</option>
                <option value="LEAD">Lead</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn1 btn-secondary1"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemberModal;
