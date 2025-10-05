import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ACMlogo from "../../assets/ACMlogo.png";
import CircleLogo from "../../assets/Reglogo.png";
import useAuthStore from "../../store/authStore";
import "./Regform.css";
function Regform() {
  const [formData, setFormData] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      role: "STUDENT",
      title: ""
    },
    roll_no: "",
    club: ""
  });

  const { signup, loading, error } = useAuthStore();
  const navigate = useNavigate();

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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regPattern = /^(FA|SP)\d{2}-[A-Z]{3}-\d{3}$/;

    if (!regPattern.test(formData.roll_no)) {
      alert("Invalid Reg No format. Please use format like FA22-BCS-001.");
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
          title: ""
        },
        roll_no: "",
        club: ""
      });
    } else {
      if (result.message && result.message.toLowerCase().includes("email")) {
        alert("This email is already registered. Please use another one.");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="regform-container container-fluid">
        <h2 className="registration-heading text-center">
          WELCOME TO REGISTRATION
        </h2>

        <div className="left-panel">
          <img src={ACMlogo} alt="ACM Logo" className="acm-logo" />
          <div className="logo-content">
            <h4>Association for Computing Machinery</h4>
            <p>
              computing community.
              <br />
              Gain access to exclusive tech events,
              <br />
              workshops, and certifications.
              <br />
              Registrations are now open — secure your spot today!
            </p>
          </div>
        </div>

        <div className="background-shape"></div>

        <div className="form-oval">
          <form className="form" onSubmit={handleSubmit}>
            {/* Name + Reg No */}
            <div className="form-row d-flex justify-content-between flex-wrap">
              <div className="form-group w-45">
                <label htmlFor="name">NAME</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={`${formData.user.first_name} ${formData.user.last_name}`.trim()}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group w-45">
                <label htmlFor="reg">Reg no.</label>
                <input
                  type="text"
                  className="form-control"
                  id="reg"
                  value={formData.roll_no}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Username + Email */}
            <div className="form-row d-flex justify-content-between flex-wrap">
              <div className="form-group w-45">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={formData.user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group w-45">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.user.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password + Club */}
            <div className="form-row d-flex justify-content-between flex-wrap">
              <div className="form-group w-45">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  value={formData.user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group w-45">
                <label htmlFor="club">Club</label>
                <select
                  id="club"
                  className="form-control"
                  value={formData.club}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select a Club --</option>
                  <option value="codehub">CodeHub</option>
                  <option value="graphics_and_media">Graphics & Media</option>
                  <option value="social_media_and_marketing">
                    Social Media & Marketing
                  </option>
                  <option value="registration_and_decor">
                    Registration & Decor
                  </option>
                  <option value="events_and_logistics">
                    Events & Logistics
                  </option>
                </select>
              </div>
            </div>

            {/* Role */}
            <div className="form-row d-flex justify-content-between flex-wrap">
              <div className="form-group w-45">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  className="form-control"
                  value={formData.user.role}
                  onChange={handleChange}
                  required
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="LEAD">LEAD</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>

            <div className="button-row text-center mt-4">
              <Link to="/dashboard" type="button" className="btn btn-dark mx-2">
                Back
              </Link>
              <button
                type="submit"
                className="btn btn-dark mx-2"
                disabled={loading}
              >
                {loading ? "REGISTERING..." : "REGISTER"}
              </button>
            </div>
          </form>
        </div>

        <div className="bottom-logo-circle">
          <img src={CircleLogo} alt="Bottom Logo" className="circle-logo" />
        </div>
      </div>
    </>
  );
}

export default Regform;
