import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore.js";
import axiosInstance from "../../axios";
import "./Sidebar.css";

const Sidebar = () => {
  const { role } = useAuthStore();
  const loggedInUserId = parseInt(localStorage.getItem("user_id"));
  const [student, setStudent] = useState(null);

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

  const renderButtons = () => {
  // ADMIN VIEW
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

  // LEAD VIEW
  if (role === "LEAD") {
    const isTreasurer =
      student?.title?.toUpperCase() === "TREASURER";

    return (
      <>
        {/* LEAD OPTIONS */}
        <Link to="/dashboard/mark-attendance" className="btn btn-primary m-2">
          Mark Attendance
        </Link>
        <Link to="/dashboard/meeting-history" className="btn btn-primary m-2">
          View Attendance
        </Link>
        <Link to="/dashboard/events/create" className="btn btn-primary m-2">
          Create Event
        </Link>
        <Link to="/dashboard/events" className="btn btn-primary m-2">
          Events
        </Link>
        <Link to="/dashboard/signup" className="btn btn-primary m-2">
          Signup New Members
        </Link>
        <Link to="/dashboard/myblog" className="btn btn-primary m-2">
          My BlogPosts
        </Link>
        <Link to="/dashboard/article" className="btn btn-primary m-2">
          Post BlogPost
        </Link>
        <Link to="/dashboard/blogs" className="btn btn-primary m-2">
          All BlogPosts
        </Link>
        <Link to="/dashboard/members" className="btn btn-primary m-2">
          Members
        </Link>
        

        {/* TREASURER-ONLY OPTIONS */}
        {isTreasurer && (
          <>
            <Link to="/dashboard/bills" className="btn btn-primary m-2">
              Bills
            </Link>
            <Link to="/dashboard/bills/create" className="btn btn-primary m-2">
              Add Bill
            </Link>
          </>
        )}
      </>
    );
  }

  // STUDENT VIEW
  if (role === "STUDENT") {
    return (
      <>
        <Link to="/dashboard/article" className="btn btn-primary m-2">
          Post Article
        </Link>
        <Link to="/dashboard/myblog" className="btn btn-primary m-2">
          My BlogPosts
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
