import React from "react";
import ACMlogo from "../assets/ACMlogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
   const {  role } = useAuthStore();
  const renderButtons = () => {
    switch (role) {
      case "ADMIN":
        return (
          <>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Write Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Post Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Edit Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Create Event</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Attendance</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Check Student Details</button>
          </>
        );
      case "LEAD":
        return (
          <>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Post Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Create Event</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Attendance</button>
          </>
        );
      case "STUDENT":
        return (
          <>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Write Article</button>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Post Article</button>
          </>
        );
      default:
        return <p>No actions available</p>;
    }
  };

  const getDashboardTitle = () => {
    switch (role) {
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
        <div className="dashboard-inner-panel d-flex flex-column align-items-center justify-content-center">
          <h1 className="dashboard-title mt-5 text-center">{getDashboardTitle()}</h1>

          {/* Centered Button Container with wrapping */}
          <div className="dashboard-actions d-flex flex-wrap justify-content-center">
            {renderButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
