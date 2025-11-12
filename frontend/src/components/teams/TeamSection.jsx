import React, { useState } from "react";
import TeamsCard from "./TeamsCard.jsx";
import "./TeamSection.css";

import codeHubImage from "../../assets/codehub.jpg";
import socialImage from "../../assets/social.jpg";
import eventsImage from "../../assets/events.jpg";
import graphicsImage from "../../assets/graphics.jpg";
import decorImage from "../../assets/decor.jpg";
import Navbar from "../Navbar.jsx";

const teamData = [
  {
    image: codeHubImage,
    title: "Code Hub",
    description: "CodeHub is a dynamic club...",
  },
  {
    image: socialImage,
    title: "Social Media",
    description: "The Social Media & Marketing Club...",
  },
  {
    image: eventsImage,
    title: "Events & Logistics",
    description: "The Events & Logistics Club...",
  },
  {
    image: graphicsImage,
    title: "Graphics & Media",
    description: "The Graphics & Media Club...",
  },
  {
    image: decorImage,
    title: "Decor & Registration",
    description: "The Décor & Registration Club...",
  },
];

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(teamData.length / 2)
  );

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? teamData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === teamData.length - 1 ? 0 : prev + 1));
  };

  const handleOpenCard = (team) => {
    console.log("Opening:", team.title);
  };

  const getTransformStyles = () => {
    return {
      transform: `translateX(calc(50% - 150px - (${activeIndex} * 340px)))`,
    };
  };

  return (
    <>
      <Navbar />
      <div className="team-section">
        <div className="team-container">
          <h1 className="team-title">Our Teams</h1>

          <div className="carousel-wrapper">
            <button className="nav-btn prev-btn" onClick={handlePrev}>
              &#8249;
            </button>

            <div className="team-track" style={getTransformStyles()}>
              {teamData.map((team, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={index}
                    className={`card-wrapper ${isActive ? "active" : "inactive"}`}
                    onClick={isActive ? () => handleOpenCard(team) : undefined}
                  >
                    <TeamsCard
                      image={team.image}
                      title={team.title}
                      description={team.description}
                    />
                  </div>
                );
              })}
            </div>

            <button className="nav-btn next-btn" onClick={handleNext}>
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamSection;
