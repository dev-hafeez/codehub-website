import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileOptions.css";
import useAuthStore from "../../store/authStore";
import axiosInstance from "../../axios";

const ProfileOptions = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [profilePic, setProfilePic] = useState(null);

  const loggedInUserId = parseInt(localStorage.getItem("user_id"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/students/");
        const students = Array.isArray(res.data) ? res.data : [res.data];
        const user = students.find(s => s.user && s.user.id === loggedInUserId);
        if (user && user.profile_pic) {
          setProfilePic(user.profile_pic);
        }
      } catch (err) {
        console.error("Failed to fetch profile picture:", err);
      }
    };

    fetchProfile();
  }, [loggedInUserId]);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="profile-options-box">
      <div className="profile-icon">
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        ) : (
          <div
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              backgroundColor: "#ccc"
            }}
          />
        )}
      </div>

      <button
        className="option-btn"
        onClick={() => navigate("/dashboard/edit-profile")}
      >
        Profile
      </button>

      <button
        className="option-btn"
        onClick={() => navigate("/dashboard/otp")}
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
