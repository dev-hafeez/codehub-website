import React from "react";
import ACMlogo from "../assets/ACMlogo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="acm-branding-container d-flex">
        <img src={ACMlogo} alt="ACM Logo" className="acm-logo col-md-1" />
        <p className="acm-branding">Association for Computing Machinery</p>
      </div>
      <div className="dashboard-panel d-flex flex-column align-items-center">
        <h1 className="dashboard-title mt-4">Dashboard</h1>
        <div className="dashboard-actions">
          <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">
            Write Article
          </button>
          <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">
            Post Article
          </button>

          <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">
            Edit Article
          </button>
          <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">
            Create Event
          </button>
          <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">
            Attendance
          </button>
          <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">
            Check Student Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
