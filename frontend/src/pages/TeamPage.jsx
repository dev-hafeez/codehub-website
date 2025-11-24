import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MemberCard from "../components/members/MemberCard"; 
import "../styles/TeamPage.css";

const TeamPage = () => {
  const { title } = useParams();
  const location = useLocation();
  const { image, role, description } = location.state || {};

  const [members, setMembers] = useState([]);

  useEffect(() => {
    // ... (Keep your API logic / Dummy Data logic here) ...
    const dummyData = [
      { id: 1, name: "Ali Khan", designation: "Team Lead", image: "https://i.pravatar.cc/150?u=1" },
      { id: 2, name: "Sara Ahmed", designation: "Senior Developer", image: "https://i.pravatar.cc/150?u=5" },
      { id: 3, name: "Bilal Raza", designation: "Creative Director", image: "https://i.pravatar.cc/150?u=3" },
      { id: 4, name: "Ayesha Noor", designation: "Event Coordinator", image: "https://i.pravatar.cc/150?u=9" },
      { id: 5, name: "Usman Zafar", designation: "Marketing Head", image: "https://i.pravatar.cc/150?u=12" },
    ];
    setMembers(dummyData);
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