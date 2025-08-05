
import React from 'react';
import "../styles/Hero.css";


const LeftCol = () => {
  return (
    <>

      <div className="text-center">
        <img
          src="/acm-comsats-wah-chapter.png"
          alt="ACM Logo"
          className="img-fluid hero-logo"
        />
        <h1 className="display-5 fw-bold text-white left-heading">ACM CHAPTER WAH</h1>
      </div>

      <div className="text-center hero-stats">
        <div>
          <h3 className="mb-0 fw-bold text-white">100+</h3>
          <p className="mb-0 text-white">Courses</p>
        </div>
        <div>
          <h3 className="mb-0 fw-bold text-white">60+</h3>
          <p className="mb-0 text-white">Members</p>
        </div>
        <div>
          <h3 className="mb-0 fw-bold text-white">60+</h3>
          <p className="mb-0 text-white">Events</p>
        </div>
      </div>
    </>
  );
};

export default LeftCol;


