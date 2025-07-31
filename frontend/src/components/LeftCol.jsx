import React from 'react'
import "./Hero.css";

const LeftCol = () => {
  return (
    <>
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
