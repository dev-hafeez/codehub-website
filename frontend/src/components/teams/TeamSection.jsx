import React, { useState, useEffect } from "react";
import TeamsCard from "./TeamsCard.jsx";
import "./TeamSection.css";

import codeHubImage from "../../assets/codehub.jpg";
import socialImage from "../../assets/social.jpg";
import eventsImage from "../../assets/events.jpg";
import graphicsImage from "../../assets/graphics.jpg";
import decorImage from "../../assets/decor.jpg";

import Navbar from "../DashboardNavbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

const teamData = [
  {
    image: codeHubImage,
    title: "Code Hub",
    description:
      "CodeHub is a dynamic club under ACM that brings together students passionate about coding, problem-solving, and technology."
  },
  {
    image: socialImage,
    title: "Social Media and Marketing",
    description:
      "Dedicated to building creativity, communication, and digital presence through modern marketing strategies."
  },
  {
    image: eventsImage,
    title: "Events and Logistics",
    description:
      "The backbone of planning, coordinating, and executing successful ACM events with precision."
  },
  {
    image: graphicsImage,
    title: "Graphics and Media",
    description:
      "Bringing creativity and technology together through design, animation, and visual storytelling."
  },
  {
    image: decorImage,
    title: "Decor and Registration",
    description:
      "Ensuring events feel welcoming, vibrant, and well-organized with creative decoration and planning."
  }
];

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(teamData.length / 2));
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch all members (NOT filtered by club)
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axiosInstance.get("/students/");
        const data = res.data;

        const filtered = data.filter(
  m => m.title && m.title.trim() !== "" && m.title.toUpperCase() !== "NULL"
);


        setMembers(filtered);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleOpenCard = (team) => {
    navigate(`/team/${encodeURIComponent(team.title)}`, {
      state: {
        image: team.image,
        description: team.description
      }
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? teamData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === teamData.length - 1 ? 0 : prev + 1));
  };

  const getTransformStyles = () => {
    let cardWidth, gap, scale;

    if (windowWidth <= 480) {
      cardWidth = 240;
      gap = 15;
      scale = 1.02;
    } else if (windowWidth <= 768) {
      cardWidth = 260;
      gap = 20;
      scale = 1.05;
    } else if (windowWidth <= 1024) {
      cardWidth = 280;
      gap = 40;
      scale = 1.1;
    } else {
      cardWidth = 300;
      gap = 40;
      scale = 1.1;
    }

    const scaledCardWidth = cardWidth * scale;
    const viewportCenter = windowWidth / 2;
    const cardCenter = scaledCardWidth / 2;
    const totalCardWidth = cardWidth;
    const offsetForActiveCard = activeIndex * totalCardWidth;

    return {
      transform: `translateX(${viewportCenter - cardCenter - offsetForActiveCard - 30 - (windowWidth > 1024 ? 300 : 0)}px) translateY(-50%)`
    };
  };

  return (
    <>
      <Navbar />
      <div className="team-section">
        <div className="team-container">
          <h1 className="team-title">Our Teams</h1>

          <div className="carousel-wrapper">
            <button className="nav-btn prev-btn" onClick={handlePrev} aria-label="Previous team">
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

            <button className="nav-btn next-btn" onClick={handleNext} aria-label="Next team">
              &#8250;
            </button>
          </div>

          {/* 🔥 NEW: SHOW ALL MEMBERS WITH NON-NULL TITLES */}
           <div className="team-members-preview-container">
      <h2 className="team-members-heading">Executive</h2>

      <div className="team-members-grid">
        {members.map((m) => (
          <div
            className="preview-member"
            key={m.id}
            onClick={() =>
              navigate(`/member/${m.id}`, { state: m }) // Send data to page
            }
            style={{ cursor: "pointer" }}   // optional, shows it's clickable
          >
            <img src={m.profile_pic} alt={m.user.first_name} />
            <p className="name">
              {m.user.first_name} {m.user.last_name}
            </p>
            <p className="role">{m.title}</p>
          </div>
        ))}
      </div>
    </div>

        </div>
      </div>
    </>
  );
};

export default TeamSection;
