import React, { useState, useEffect } from "react";
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

  const [titleInputMode, setTitleInputMode] = useState(false); // Track if user is typing custom title
  const { signup, loading, club: userClub } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Set the user's club by default when component mounts
  useEffect(() => {
    if (userClub) {
      setFormData((prev) => ({
        ...prev,
        club: userClub
      }));
    }
  }, [userClub]);

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
      // Convert to uppercase and only allow valid characters
      const upperValue = value.toUpperCase();
      setFormData((prev) => ({ ...prev, roll_no: upperValue }));
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
    } else if (id === "title-select") {
      if (value === "NULL") {
        setFormData((prev) => ({ ...prev, title: "" }));
        setTitleInputMode(false);
      } else if (value === "custom") {
        setTitleInputMode(true);
        setFormData((prev) => ({ ...prev, title: "" }));
      } else {
        // For predefined titles like PRESIDENT, TREASURER, etc.
        setFormData((prev) => ({ ...prev, title: value }));
        setTitleInputMode(false);
      }
    } else if (id === "title-input") {
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

    if (!formData.club) {
      alert("Club selection is required.");
      return;
    }

    // Prepare data to send - convert empty title to "NULL"
    const dataToSend = {
      ...formData,
      title: formData.title === "" ? "NULL" : formData.title
    };

    const result = await signup(dataToSend);
    console.log("=== SIGNUP RESULT ===");
    console.log("result:", result);
    console.log("result.message:", result.message);
    console.log("=== END RESULT ===");

    if (result.success) {
      alert("User registered successfully!");
      setFormData({
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
        club: userClub || "",
        title: ""
      });
      setTitleInputMode(false);
      return;
    }

    let allErrors = [];

    if (result.message) {
      console.log("Extracting from result.message:", result.message);

      if (typeof result.message === "string") {
        allErrors.push(result.message);
      } else if (typeof result.message === "object") {
        const extractErrors = (obj, prefix = "") => {
          Object.entries(obj).forEach(([field, value]) => {
            const fieldPath = prefix ? `${prefix}.${field}` : field;

            if (Array.isArray(value)) {
              value.forEach(err => {
                allErrors.push(`${fieldPath}: ${err}`);
              });
            } else if (typeof value === "object" && value !== null) {
              extractErrors(value, fieldPath);
            } else if (value) {
              allErrors.push(`${fieldPath}: ${value}`);
            }
          });
        };
        extractErrors(result.message);
      }
    }

    if (allErrors.length === 0) {
      if (result.error) {
        allErrors.push(result.error);
      } else if (result.data) {
        allErrors.push(JSON.stringify(result.data));
      } else {
        allErrors.push("Registration failed. Please try again.");
      }
    }

    console.log("Final allErrors:", allErrors);
    alert(allErrors.join("\n"));
  };

  return (
    <>
      <div className="regform-container">
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
                  disabled
                  required
                >
                  <option value={userClub}>{userClub || "-- No Club Assigned --"}</option>
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

            {/* Title - Dropdown with custom input option */}
            <div className="form-row">
              <div className="form-group2 w-100">
                <label htmlFor="title-select">Title </label>
                <select
                  id="title-select"
                  className="form-control2"
                  value={
                    titleInputMode ? "custom" : 
                    (formData.title === "" ? "NULL" : formData.title)
                  }
                  onChange={handleChange}
                >
                  <option value="NULL">-- NULL (STUDENT AND LEADS) --</option>
                  <option value="PRESIDENT">PRESIDENT</option>
                  <option value="VICE PRESIDENT">VICE PRESIDENT</option>
                  <option value="TREASURER">TREASURER</option>
                  <option value="SECRETARY">SECRETARY</option>
                  
                  <option value="custom">-- ENTER CUSTOM TITLE --</option>
                </select>

                {titleInputMode && (
                  <input
                    type="text"
                    id="title-input"
                    className="form-control2"
                    placeholder="Enter your custom title"
                    value={formData.title}
                    onChange={handleChange}
                    style={{ marginTop: "10px" }}
                  />
                )}
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