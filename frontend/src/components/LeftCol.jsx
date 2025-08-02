<<<<<<< HEAD
import React from 'react'
import "./Hero.css";
=======
import React from 'react';
import "../styles/Hero.css";
>>>>>>> feature/achievements-blog

const LeftCol = () => {
  return (
    <>
<<<<<<< HEAD
      <img
        src="/acm-comsats-wah-chapter.png"
        alt="ACM Logo"
        className="img-fluid mb-3 hero-logo"
        style={{ maxHeight: "120px" }}
      />
      <h1 className="display-5 fw-bold">ACM CHAPTER WAH</h1>

      <div className="text-center d-flex justify-content-center  gap-4 mt-3">
        <div>
          <h3 className="mb-0 fw-bold">15+</h3>
          <p className="mb-0">Courses</p>
        </div>
        <div>
          <h3 className="mb-0 fw-bold">200+</h3>
          <p className="mb-0">Members</p>
        </div>
        <div>
          <h3 className="mb-0 fw-bold">10+</h3>
          <p className="mb-0">Events</p>
        </div>
      </div>
    </>
  )
}

export default LeftCol
=======
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

>>>>>>> feature/achievements-blog
