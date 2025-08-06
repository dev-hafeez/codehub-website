/* Regfrom.jsx*/
import React from "react";
import REGlogo from "../assets/Reglogo.png"; 
import ACMlogo from "../assets/ACMlogo.png"; 
import CircleLogo from "../assets/Reglogo.png"; 
import '../styles/Regform.css';

function Regform() {
  return (
    <div className="regform-container container-fluid">
  
      <h2 className="registration-heading text-center">WELCOME TO REGISTRATION</h2>

      <div className="left-panel">
        <img src={ACMlogo} alt="ACM Logo" className="acm-logo" />
        <div className="logo-content">
          <h4>Association for Computing Machinery</h4>
          <p>
            computing community.<br />
            Gain access to exclusive tech events,<br />
            workshops, and certifications.<br />
            Registrations are now open — secure your spot today!
          </p>
        </div>
      </div>

  
      <div className="background-shape"></div>

        <div className="form-oval">
        <form className="form">
          <div className="form-row d-flex justify-content-between flex-wrap">
            <div className="form-group w-45">
              <label htmlFor="name">NAME</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="form-group w-45">
              <label htmlFor="reg">Reg no.</label>
              <input type="text" className="form-control" id="reg" />
            </div>
          </div>
          <div className="form-row d-flex justify-content-between flex-wrap">
            <div className="form-group w-45">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group w-45">
              <label htmlFor="phone">Phone no.</label>
              <input type="text" className="form-control" id="phone" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="club">Club</label>
            <input type="text" className="form-control w-75 mx-auto" id="club" />
          </div>
          <div className="button-row text-center mt-4">
            <button type="button" className="btn btn-dark mx-2">MENU</button>
            <button type="submit" className="btn btn-dark mx-2">REGISTER</button>
          </div>
        </form>
      </div>
      <div className="bottom-logo-circle">
        <img src={CircleLogo} alt="Bottom Logo" className="circle-logo" />
      </div>
    </div>
  );
}

export default Regform;
