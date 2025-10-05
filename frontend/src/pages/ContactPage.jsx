import React from "react"; 
import Navbar from "../components/Navbar";
import "../styles/ContactPage.css";

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-info">
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-subtitle">
              Reach out to us directly through the following channels:
            </p>

            <div className="contact-details">
              <p><strong>ACM Official Email:</strong> acmcuiwah@gmail.com</p>
              <p><strong>President Email:</strong> kanwartaha0@gmai.com</p>
              <p><strong>Faculty Head Email:</strong>mtalha@ciitwah.edu.pk</p>
               <p>
                <strong>LinkedIn:</strong> 
                <a href="https://www.linkedin.com/company/acmcuiwah/" target="_blank" rel="noopener noreferrer">
                  ACM
                </a>
              </p>
              <p>
                <strong>Instagram:</strong> 
                <a href="https://www.instagram.com/acmcuiwah?igsh=bjhjczlmNWZ5c3E3" target="_blank" rel="noopener noreferrer">
                  ACM
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
