import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore.js";
import axiosInstance from "../../axios";
import "./Sidebar.css";

const Sidebar = () => {
  const { role } = useAuthStore();
  const loggedInUserId = parseInt(localStorage.getItem("user_id"));
  const [student, setStudent] = useState(null);
  
  // State to track which dropdown is currently open
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axiosInstance.get("/students/");
        const students = Array.isArray(res.data) ? res.data : [res.data];
        const foundStudent = students.find(
          (s) => s.user && s.user.id === loggedInUserId
        );
        if (foundStudent) setStudent(foundStudent);
      } catch (err) {
        console.error("Failed to fetch student profile:", err);
      }
    };

    fetchStudent();
  }, [loggedInUserId]);

  // Helper function to toggle dropdowns
  const toggleDropdown = (name) => {
    // If clicking the already open one, close it (set to null), otherwise open the new one
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const renderButtons = () => {
    // ADMIN VIEW (Kept as is for now, but can be grouped similarly if desired)
    if (role === "ADMIN") {
      return (
        <>
          <Link to="/dashboard/members" className="btn btn-primary m-2">
            Member Management
          </Link>
          <Link to="/dashboard/blogs" className="btn btn-primary m-2">
            Handle Blogs
          </Link>
          <Link to="/dashboard/events" className="btn btn-primary m-2">
            Events
          </Link>
          <Link to="/dashboard/events/create" className="btn btn-primary m-2">
            Create Event
          </Link>
          <Link to="/dashboard/signup" className="btn btn-primary m-2">
            Signup New Members
          </Link>
          <Link to="/dashboard/otp" className="btn btn-primary m-2">
            Reset Password
          </Link>
        </>
      );
    }

    // LEAD VIEW (Grouped)
    if (role === "LEAD") {
      const isTreasurer = student?.title?.toUpperCase() === "TREASURER";

      return (
        <>
          {/* ATTENDANCE GROUP */}
          <div className="sidebar-group">
            <button 
              className="btn btn-primary m-2 dropdown-toggle-btn"
              onClick={() => toggleDropdown("attendance")}
            >
              <span>Attendance</span>
              <span className={`arrow ${activeDropdown === "attendance" ? "open" : ""}`}>▼</span>
            </button>
            
            {activeDropdown === "attendance" && (
              <div className="dropdown-content">
                <Link to="/dashboard/mark-attendance" className="btn btn-secondary m-2 sub-link">
                  Mark Attendance
                </Link>
                <Link to="/dashboard/meeting-history" className="btn btn-secondary m-2 sub-link">
                  View Attendance
                </Link>
              </div>
            )}
          </div>

          {/* EVENTS GROUP */}
          <div className="sidebar-group">
            <button 
              className="btn btn-primary m-2 dropdown-toggle-btn"
              onClick={() => toggleDropdown("events")}
            >
              <span>Events</span>
              <span className={`arrow ${activeDropdown === "events" ? "open" : ""}`}>▼</span>
            </button>
            
            {activeDropdown === "events" && (
              <div className="dropdown-content">
                <Link to="/dashboard/events" className="btn btn-secondary m-2 sub-link">
                  All Events
                </Link>
                <Link to="/dashboard/events/create" className="btn btn-secondary m-2 sub-link">
                  Create Event
                </Link>
              </div>
            )}
          </div>

          {/* BLOGS GROUP */}
          <div className="sidebar-group">
            <button 
              className="btn btn-primary m-2 dropdown-toggle-btn"
              onClick={() => toggleDropdown("blogs")}
            >
              <span>Blogs</span>
              <span className={`arrow ${activeDropdown === "blogs" ? "open" : ""}`}>▼</span>
            </button>
            
            {activeDropdown === "blogs" && (
              <div className="dropdown-content">
                <Link to="/dashboard/myblog" className="btn btn-secondary m-2 sub-link">
                  My BlogPosts
                </Link>
                <Link to="/dashboard/article" className="btn btn-secondary m-2 sub-link">
                  Post BlogPost
                </Link>
                <Link to="/dashboard/blogs" className="btn btn-secondary m-2 sub-link">
                  All BlogPosts
                </Link>
              </div>
            )}
          </div>

          {/* MEMBERS GROUP */}
          <div className="sidebar-group">
             <button 
              className="btn btn-primary m-2 dropdown-toggle-btn"
              onClick={() => toggleDropdown("members")}
            >
              <span>Members</span>
              <span className={`arrow ${activeDropdown === "members" ? "open" : ""}`}>▼</span>
            </button>

            {activeDropdown === "members" && (
              <div className="dropdown-content">
                <Link to="/dashboard/members" className="btn btn-secondary m-2 sub-link">
                  View Members
                </Link>
                <Link to="/dashboard/signup" className="btn btn-secondary m-2 sub-link">
                  Signup New Member
                </Link>
              </div>
            )}
          </div>

          {/* TREASURER-ONLY GROUP */}
          {isTreasurer && (
            <div className="sidebar-group">
              <button 
                className="btn btn-primary m-2 dropdown-toggle-btn"
                onClick={() => toggleDropdown("finance")}
              >
                <span>Finance</span>
                <span className={`arrow ${activeDropdown === "finance" ? "open" : ""}`}>▼</span>
              </button>
              
              {activeDropdown === "finance" && (
                <div className="dropdown-content">
                  <Link to="/dashboard/bills" className="btn btn-secondary m-2 sub-link">
                    View Bills
                  </Link>
                  <Link to="/dashboard/bills/create" className="btn btn-secondary m-2 sub-link">
                    Add Bill
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      );
    }

    // STUDENT VIEW
    if (role === "STUDENT") {
      return (
        <>
          <Link to="/dashboard/article" className="btn btn-primary m-2">
            Post Blog
          </Link>
          <Link to="/dashboard/myblog" className="btn btn-primary m-2">
            My BlogPosts
          </Link>
           <Link to="/dashboard/blogs" className="btn btn-primary m-2">
              All Blogs
          </Link>
          <Link to="/dashboard/events" className="btn btn-primary m-2">
            Upcoming Events
          </Link>
        </>
      );
    }

    return <p>No actions available</p>;
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
    <div className="sidebar">
      <h3 className="sidebar-title mt-4 text-center">{getDashboardTitle()}</h3>
      <div className="sidebar-actions">
        {renderButtons()}
      </div>
    </div>
  );
};

export default Sidebar;