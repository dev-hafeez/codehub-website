import React from "react";
import ACMlogo from "../assets/ACMlogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";

const Dashboard = ({ userRole = "admin" }) => {
  const renderButtons = () => {
    switch (userRole) {
      case "admin":
        return (
          <>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Write Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Post Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Edit Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Create Event</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Attendance</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Check Student Details</button>
          </>
        );
      case "lead":
        return (
          <>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Post Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Create Event</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Attendance</button>
          </>
        );
      case "student":
        return (
          <>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Write Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-5 m-4">Post Article</button>
          </>
        );
      default:
        return <p>No actions available</p>;
    }
  };

  const getDashboardTitle = () => {
    switch (userRole) {
      case "admin":
        return "Admin Dashboard";
      case "lead":
        return "Lead Dashboard";
      case "student":
        return "Student Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="dashboard-container">
      {/* <div className="acm-branding-container d-flex mt-4 mx-4">
        <img src={ACMlogo} alt="ACM Logo" className="acm-logo col-md-1" />
        <p className="acm-branding">Association for Computing Machinery</p>
      </div> */}
      <div className="dashboard-panel d-flex flex-column align-items-center justify-content-center">
        <div className="dashboard-inner-panel d-flex flex-column align-items-center">
          <h1 className="dashboard-title mt-5 align-self-center">{getDashboardTitle()}</h1>
          <div className="dashboard-actions">
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
