import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Navbar from "../components/DashboardNavbar/Navbar";
import MemberCard from "../components/members/MemberCard"; 
import "../styles/TeamPage.css";
import axiosInstance from "../axios";

const TeamPage = () => {
  const { title } = useParams();
  const location = useLocation();
  const { image, role, description } = location.state || {};

  const [members, setMembers] = useState([]);
  const clubMap = {
  "Code Hub": "codehub",
  "Graphics and Media": "graphics_and_media",
  "Social Media and Marketing": "social_media_and_marketing",
  "Decor and Registration": "registration_and_decor",
  "Events and Logistics": "events_and_logistics"
};

useEffect(() => {
  const fetchMembers = async () => {
    try {
      const res = await axiosInstance.get("/students/");
      const data = res.data;

      const decodedTitle = decodeURIComponent(title);
      const backendClub = clubMap[decodedTitle];

      const filtered = data.filter(student => student.club === backendClub);

      const formatted = filtered.map(student => ({
        id: student.id,
        name: `${student.user.first_name} ${student.user.last_name}`,
        designation: student.profile_desc,
        image: student.profile_pic
      }));

      setMembers(formatted);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  fetchMembers();
}, [title]);



  return (
    <div>
      <Navbar />
      
      <div className="team-detail">
        <div className="team-detail-card">
          {image && (
            <div className="team-detail-image-wrapper">
              <img src={image} alt={title} className="team-detail-image" />
            </div>
          )}
          <div className="team-detail-content">
            <h1 className="team-detail-title">{title}</h1>
            {role && <h3 className="team-detail-role">{role}</h3>} 
            <p className="team-detail-description">{description}</p>
            <Link to="/teams" className="back-button">
              ← Back to Teams
            </Link>
          </div>
        </div>
      </div>

      <div className="members-section">
        <div className="members-container">
          <h2 className="members-title">Team Members</h2>
          <div className="members-grid">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                image={member.image}
                name={member.name}
                designation={member.designation}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeamPage;