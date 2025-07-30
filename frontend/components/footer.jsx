import React from "react";
import "./Footer.css";
import ACMlogo from "../src/assets/ACMlogo.png";


const Footer = () => {
  return (
    <footer className="footer  pt-5 text-white">
      <div className="container  px-2">
        <div className="row pb-4">

    
          <div className="col-md-3 mb-4 d-flex align-items-start gap-2">
            <img src={ACMlogo} alt="ACM Logo" style={{ height: "50px" }} />
            <p className="mb-0 fw-light" style={{ fontSize: "2rem" }}>ACM CUI</p>

          </div>

     
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold mb-5">Achievement</h5>
            <ul className="list-unstyled">
              <li>Overview</li>
              <li>Events</li>
            </ul>
          </div>

  
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-5">Clubs</h5>
            <ul className="list-unstyled">
              <li>CodeHub</li>
              <li>Media & Marketing</li>
              <li>Graphics</li>
              <li>Events & Logistics</li>
              <li>Decor</li>
            </ul>
          </div>

   
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold mb-5">Blogs</h5>
            <ul className="list-unstyled">
              <li>About us</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </ul>
          </div>

   
          <div className="col-md-2 mb-4">
            <h5 className="fw-bold mb-5">Contact Us</h5>
            <p className="mb-0">Reach out via email or connect on our social platforms.</p>
          </div>
        </div>

        <hr className="border-light" />

        <div className="d-flex flex-wrap justify-content-between align-items-center py-2">
          <div className="d-flex flex-wrap gap-5 pb-3">
            <p>English</p>
            <p>Terms & Privacy</p>
            <p>Security</p> 
            <p>Status</p>
          </div>
          <div className="ms-auto">
            <p className="mb-0">© 2025 ACM CUI Wah</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
