import React from "react";
import ACMlogo from "../assets/ACMlogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
   const {  role } = useAuthStore();
  const renderButtons = () => {
    switch (role) {
      case "ADMIN":
        return (
          <>
            <Link to="/" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Member Management</Link>
            <Link to="/admin-blogs" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Handle Blogs</Link>
            
          </>
        );
      case "LEAD":
        return (
          <>
            <Link to="/mark-attendance" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Mark Attendance</Link>
            <Link to="/meeting-history" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">View Attendance</Link>
            <button className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Create Event</button>
            <Link to="/signup" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Signup New Members</Link>
            <Link to="/myblog" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">My Articles</Link>
          </>
        );
      case "STUDENT":
        return (
          <>
          <Link to="/article" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Post Article</Link>
            <Link to="/myblog" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">My Articles</Link>
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
