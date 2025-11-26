import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import "./Regform.css";

function Regform() {
  const [formData, setFormData] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "12345",
      role: "STUDENT",
      phone_number: ""
    },
    roll_no: "",
    club: "",
    title: ""
  });

  const { signup, loading } = useAuthStore();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "name") {
      const [firstName, ...lastParts] = value.trim().split(" ");
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          first_name: firstName || "",
          last_name: lastParts.join(" ") || ""
        }
      }));
    } else if (id === "reg") {
      setFormData((prev) => ({ ...prev, roll_no: value }));
    } else if (id === "phone") {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, phone_number: value }
      }));
    } else if (id === "email") {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, email: value }
      }));
    } else if (id === "username") {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, username: value }
      }));
    } else if (id === "pass") {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, password: value }
      }));
    } else if (id === "club") {
      setFormData((prev) => ({ ...prev, club: value.trim() }));
    } else if (id === "role") {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, role: value }
      }));
    } else if (id === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value.toUpperCase()
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Regex for Reg No
    const regPattern = /^(FA|SP)\d{2}-[A-Z]{3}-\d{3}$/;
    if (!regPattern.test(formData.roll_no)) {
      alert("Invalid Reg No format. Please use FA22-BCS-001.");
      return;
    }

    const validClubs = [
      "codehub",
      "graphics_and_media",
      "social_media_and_marketing",
      "registration_and_decor",
      "events_and_logistics"
    ];

    if (!validClubs.includes(formData.club)) {
      alert("Invalid Club. Please select a valid club.");
      return;
    }

    const result = await signup(formData);
    console.log("SIGNUP RESPONSE =>", result);

    if (result.success) {
      alert("User registered successfully!");
      setFormData({
        user: {
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
          role: "STUDENT",
          phone_number: ""
        },
        roll_no: "",
        club: "",
        title: ""
      });
      return;
    }

    let allErrors = [];
    if (result.message) {
      if (typeof result.message === "string") {
        allErrors.push(result.message);
      } else if (typeof result.message === "object") {
        Object.entries(result.message).forEach(([field, value]) => {
          if (Array.isArray(value)) {
            allErrors.push(`${field}: ${value.join(", ")}`);
          } else if (typeof value === "object") {
            Object.entries(value).forEach(([subField, subValue]) => {
              allErrors.push(
                `${field}.${subField}: ${Array.isArray(subValue) ? subValue.join(", ") : subValue}`
              );
            });
          } else {
            allErrors.push(`${field}: ${value}`);
          }
        });
      }
    }

    if (allErrors.length === 0) {
      allErrors.push("Registration failed. Try again.");
    }

    alert(allErrors.join("\n"));
  };

  return (
    <>
      <div className="regform-container">
        {/* Form Only */}
        <div className="form-oval">
          <h2 className="dashboard-title">Registration</h2>
          <form className="form" onSubmit={handleSubmit}>
            {/* Name + Reg No */}
            <div className="form-row">
              <div className="form-group2 w-45">
                <label htmlFor="name">NAME</label>
                <input
                  type="text"
                  className="form-control2"
                  id="name"
                  placeholder="John Doe"
                  value={`${formData.user.first_name} ${formData.user.last_name}`.trim()}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group2 w-45">
                <label htmlFor="reg">Reg no.</label>
                <input
                  type="text"
                  className="form-control2"
                  id="reg"
                  placeholder="FA22-BCS-001"
                  value={formData.roll_no}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Username + Email */}
            <div className="form-row">
              <div className="form-group2 w-45">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control2"
                  id="username"
                  value={formData.user.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group2 w-45">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control2"
                  id="email"
                  value={formData.user.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password + Club */}
            <div className="form-row">
              <div className="form-group2 w-45 password-wrapper">
                <label htmlFor="pass">Password</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control2"
                    id="pass"
                    value={formData.user.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-group2 w-45">
                <label htmlFor="club">Club</label>
                <select
                  id="club"
                  className="form-control2"
                  value={formData.club}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select a Club --</option>
                  <option value="codehub">CodeHub</option>
                  <option value="graphics_and_media">Graphics & Media</option>
                  <option value="social_media_and_marketing">Social Media & Marketing</option>
                  <option value="registration_and_decor">Registration & Decor</option>
                  <option value="events_and_logistics">Events & Logistics</option>
                </select>
              </div>
            </div>

            {/* Role + Phone */}
            <div className="form-row">
              <div className="form-group2 w-45">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  className="form-control2"
                  value={formData.user.role}
                  onChange={handleChange}
                  required
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="LEAD">LEAD</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div className="form-group2 w-45">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control2"
                  placeholder="+923001234567"
                  value={formData.user.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Title */}
            <div className="form-row">
              <div className="form-group2 w-100">
                <label htmlFor="title">Title </label>
                <input
                  type="text"
                  className="form-control2"
                  id="title"
                  placeholder="e.g., Treasurer, President"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="button-row">
              <button
                type="submit"
                className="btn-design btn"
                style={{ padding: 13 }}
                disabled={loading}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Regform;