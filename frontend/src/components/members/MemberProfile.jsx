import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import "./MemberProfile.css";
import Navbar from "../Navbar";


const MemberProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const [member, setMember] = useState(location.state || null);

  useEffect(() => {
    if (!member) fetchMember();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMember = async () => {
    try {
      const res = await axiosInstance.get(`/students/${id}/`);
      setMember(res.data);
    } catch (err) {
      console.error("Failed to fetch member", err);
    }
  };

  if (!member)
    return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="mp-container">
      <div className="mp-box">
        {/* TOP IMAGE */}
        <div className="mp-image-section">
          {/* Ensure member.profile_pic exists, or provide a placeholder */}
          <img 
            src={member.profile_pic || "https://via.placeholder.com/200"} 
            alt={member.user.first_name} 
          />
        </div>

        {/* BOTTOM CONTENT */}
        <div className="mp-content">
          <h1>
            This is {member.user.first_name}, The {member.title} of ACM
          </h1>

          {member.profile_desc && (
            <p>{member.profile_desc}</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default MemberProfile;