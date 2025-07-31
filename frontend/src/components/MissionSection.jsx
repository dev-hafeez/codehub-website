import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/MissionsSection.css';
import Brush from '../../assets/brush.png';
import Waves from '../../assets/waves.png';

const MissionSection = () => {
  return (
    <div className="mission-container">
      
      <div className="scaled-wrapper">
        <img src={Waves} alt="Waves" className="waves-image" />
        <div className="container-fluid d-flex justify-content-center p-5">
          <div className="content-container">
            <img src={Brush} alt="Brush" className="brush-image" />
            <h1 className="heading">Our Mission</h1>
            <p className="mission-text">
              Our mission is to empower students through technology, innovation, and collaboration. We aim to create a dynamic learning environment where students can enhance their skills, share ideas, and grow as future leaders in tech. Through workshops, competitions, and community events, we strive to inspire and uplift the next generation of computing professionals.
            </p>
            <div className="text-center">
              <button type="button" className="btn learn-more-btn">Learn more →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;