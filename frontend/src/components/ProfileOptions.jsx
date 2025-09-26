import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ProfileOptions.css";
import useAuthStore from "../store/authStore";
import { PersonCircle } from "react-bootstrap-icons"; 

const ProfileOptions = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  
  return (
    <div className="profile-options-box">
      <div className="profile-icon">
        <PersonCircle size={74} color="#0c4182" />
      </div>
      <button
        className="option-btn"
        onClick={() => navigate("/edit-profile")}
      >
        Edit Profile
      </button>

      <button
        className="option-btn"
        onClick={() => navigate("/reset-password")}
      >
        Reset Password
      </button>

      <button
        className="option-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
      
    </div>
  );
};

export default ProfileOptions;
