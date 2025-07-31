import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClubsSection.css';

const ClubsSection = () => {
  return (
    <div className="clubs-container container-fluid position-relative">
      {/* Background Shapes */}
      <div className="bg-shape bottom-left-triangle"></div>
      <div className="bg-shape top-right-triangle"></div>

      <div className="center-circle text-center d-flex align-items-center justify-content-center">CLUBS</div>
      
      <div className="club-box code-hub text-center">
        <div className="connector connector-top-left"></div>
        <h4>CODE HUB</h4>
        <p>Empowering coders through hands-on learning and real-world challenges.</p>
      </div>

      <div className="club-box events-logistics text-center">
        <div className="connector connector-top-right"></div>
        <h4>EVENTS & LOGISTICS</h4>
        <p>Seamlessly managing every detail to create impactful tech experiences.</p>
      </div>

      <div className="club-box media-marketing text-center">
        <div className="connector connector-bottom-left"></div>
        <h4>MEDIA & MARKETING</h4>
        <p>Spreading the ACM vision through creative and engaging campaigns.</p>
      </div>

      <div className="club-box decor text-center">
        <div className=" connector-bottom"></div>
        <h4>DECOR</h4>
        <p>Designing vibrant spaces that reflect the spirit of innovation.</p>
      </div>

      <div className="club-box graphics text-center">
        <div className="connector connector-bottom-right"></div>
        <h4>GRAPHICS</h4>
        <p>Crafting visual stories that capture attention and inspire curiosity.</p>
      </div>

      <button className="btn btn-primary learn-more-btn">Learn more →</button>
    </div>
  );
};

export default ClubsSection;
