import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ACMlogo from "../../assets/ACMlogo.png";
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
      phone_number: ""
    },
    roll_no: "",
    club: "",
    title: ""   
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
    } 
    else if (id === "reg") {
      setFormData((prev) => ({ ...prev, roll_no: value }));
    } 
    else if (id === "phone") {
  setFormData((prev) => ({
    ...prev,
    user: { ...prev.user, phone_number: value }
  }));
}

    else if (id === "email") {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, email: value }
      }));
    } 
    else if (id === "username") {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, username: value }
      }));
    } 
    else if (id === "pass") {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, password: value }
      }));
    } 
    else if (id === "club") {
      setFormData((prev) => ({ ...prev, club: value.trim() }));
    } 
    else if (id === "role") {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, role: value }
      }));
    }
    else if (id === "title") {
      setFormData((prev) => ({ ...prev, title: value })); // ⬅ FIXED
    }
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate registration number
  const regPattern = /^(FA|SP)\d{2}-[A-Z]{3}-\d{3}$/;
  if (!regPattern.test(formData.roll_no)) {
    alert("Invalid Reg No format. Please use FA22-BCS-001.");
    return;
  }

  // Validate club selection
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

  // Call signup API
  const result = await signup(formData);
  console.log("SIGNUP RESPONSE =>", result);

  // SUCCESS
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

  // FAILURE – extract backend validation errors
  let allErrors = [];

  if (result.message) {
    if (typeof result.message === "string") {
      // simple string message
      allErrors.push(result.message);
    } else if (typeof result.message === "object") {
      // object containing field errors
      Object.entries(result.message).forEach(([field, value]) => {
        if (Array.isArray(value)) {
          allErrors.push(`${field}: ${value.join(", ")}`);
        } else if (typeof value === "object") {
          // nested object (e.g., user.email)
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

  // fallback if no detailed errors
  if (allErrors.length === 0) {
    allErrors.push("Registration failed. Try again.");
  }

  // Show all errors
  alert(allErrors.join("\n"));
};



  return (
    <>
      <div className="regform-container container-fluid">
       
        <div className="left-panel">
        <img src={ACMlogo} alt="ACM Logo" className="acm-logo" />
          <div className="logo-content">
            <h4 className="">Association for Computing Machinery</h4>
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
                  <option value="social_media_and_marketing">Social Media & Marketing</option>
                  <option value="registration_and_decor">Registration & Decor</option>
                  <option value="events_and_logistics">Events & Logistics</option>
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

               <div className="form-group w-45">
    <label htmlFor="phone">Phone Number</label>
    <input
      type="text"
      id="phone"
      className="form-control"
      placeholder="+923001234567"
      value={formData.user.phone_number}
      onChange={handleChange}
      required
    />
  </div>
            </div>
            

            {/* Title */}
            <div className="form-row d-flex justify-content-between flex-wrap">
              <div className="form-group w-45">
                <label htmlFor="title">Title (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="e.g., Treasurer, President"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="button-row text-center mt-4">
              <Link to="/dashboard" type="button" className="btn btn-design mx-2">
                Back
              </Link>
              <button type="submit" className="btn btn-design mx-2" disabled={loading}>
                {loading ? "REGISTERING..." : "REGISTER"}
              </button>
            </div>
          </form>
        </div>

        
      </div>
    </>
  );
}

export default Regform;
