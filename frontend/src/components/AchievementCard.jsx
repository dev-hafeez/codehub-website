import React from 'react';
import "../styles/Achievements.css";
import { IoMdArrowForward } from "react-icons/io";

const AchievementCard = ({ number = 1, title, description, bgColor = "#0C4182" }) => {
  return (
   
    <div className="boxcard mt-4" style={{ backgroundColor: bgColor }}>
      <div className="rounded-circle d-flex justify-content-center align-items-center mx-auto">
        {number}
      </div>

      <h4 className="achievement-title">
        {title ? (
          title
        ) : (
          <>
            <span className="big-o">O</span>rganized <br />
            National Level <br />
            Coding <br />
            Competition:
          </>
        )}
      </h4>

      <p className="acheivement-text">
        {description ||
          "Our ACM chapter successfully hosted a nationwide coding contest, attracting participants from top universities and encouraging competitive programming skills among students."}
      </p>

      <p className="arrow">
        <IoMdArrowForward />
      </p>
    </div>
  );
};

export default AchievementCard;