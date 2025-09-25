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
              Have questions or want to work with us? We'd love to hear from you!
            </p>

            <div className="contact-details">
              <p><strong>Email:</strong> hello@yourteam.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Location:</strong> 123 Innovation Street, Tech City</p>
            </div>
          </div>

          <div className="contact-form">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your email" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="Your message" required></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
