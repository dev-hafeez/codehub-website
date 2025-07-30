import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './MissionsSection.css';


const MissionSection = () => {
  return (
    <div>
      <div className="container-fluid border justify-content-center p-5">

      <div className="border container col-lg-5 justify-content-center align-items-center">
        <h1 className="text-center heading fs-1">Our Mission</h1>
      <p className="lead text-center mission-text">
        Our mission is to empower students through technology, innovation, and collaboration. We aim to create a dynamic learning environment where students can enhance their skills, share ideas, and grow as future leaders in tech. Through workshops, competitions, and community events, we strive to inspire and uplift the next generation of computing professionals.
      </p>
      <div className="text-center">  
        <button type="button" className="btn learn-more-btn">Learn More </button>
      </div>
      
      </div>
      
    </div>
    </div>
      
  )
}


export default MissionSection