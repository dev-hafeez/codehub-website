import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore.js";

const Dashboard = () => {
   const {  role } = useAuthStore();
  const renderButtons = () => {
    switch (role) {
      case "ADMIN":
        return (
          <>
            <Link to="/members" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Member Management</Link>
            <Link to="/blogs" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Handle Blogs</Link>
            <Link to="/events" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Events</Link>
                <Link to="/events/create" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Create Event</Link>
            
          </>
        );
      case "LEAD":
        return (
          <>
            <Link to="/mark-attendance" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Mark Attendance</Link>
            <Link to="/meeting-history" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">View Attendance</Link>
            <Link to="/events/create" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Create Event</Link>
            <Link to="/signup" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Signup New Members</Link>
            <Link to="/myblog" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">My Articles</Link>
            <Link to="/article" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Post Article</Link>
            <Link to="/blogs" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">All Articles</Link>
             <Link to="/members" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Members</Link>
              <Link to="/events" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Events</Link>
          </>
        );
      case "STUDENT":
        return (
          <>
          <Link to="/article" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Post Article</Link>
            <Link to="/myblog" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">My Articles</Link>
             <Link to="/events" className="btn btn-primary dashboard-action-btn p-2 px-md-5 px-3 m-4 m-2">Upcoming Events</Link>
          </>
        );
      default:
        return <p>No actions available</p>;
    }
  };

  const getDashboardTitle = () => {
    switch (role) {
      case "ADMIN":
        return "Admin Dashboard";
      case "LEAD":
        return "Lead Dashboard";
      case "STUDENT":
        return "Student Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="dashboard">
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
