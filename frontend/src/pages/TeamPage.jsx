import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/TeamPage.css";
import Footer from "../components/Footer";

const TeamPage = () => {
  const { title } = useParams();
  const location = useLocation();
  const { image, role, description } = location.state || {};

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
            <h3 className="team-detail-role">{role}</h3>
            <p className="team-detail-description">{description}</p>
            <Link to="/teams" className="back-button">
              ← Back to Teams
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default TeamPage;
