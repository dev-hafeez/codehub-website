import React from 'react';
import { FaFacebookF, FaTwitter, FaGithub, FaLink } from 'react-icons/fa';
import '../styles/TeamCard.css'; // Import the CSS file

const TeamsCard = ({ image, title, role, description }) => {
  return (
    <div className="teams-card">
      <div>
        <img
          src={image}
          alt={title}
          className="teams-card-image"
        />
        <h3 className="teams-card-title">{title}</h3>
        <p className="teams-card-role">{role}</p>
        <p className="teams-card-description">{description}</p>
      </div>
      <div className="teams-card-socials">
        <a href="#" className="social-icon facebook"><FaFacebookF /></a>
        <a href="#" className="social-icon twitter"><FaTwitter /></a>
        <a href="#" className="social-icon github"><FaGithub /></a>
        <a href="#" className="social-icon link"><FaLink /></a>
      </div>
    </div>
  );
};

export default TeamsCard;