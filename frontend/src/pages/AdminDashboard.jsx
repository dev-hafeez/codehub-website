import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminDashboard.css";
import logo from "../assets/ACMlogo.png";

const AdminDashboard = () => {
  // -------------------------------
  // State Variables
  // -------------------------------
  
  // Current active page
  const [activePage, setActivePage] = useState("Attendance");

  // Track screen size for responsiveness
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // -------------------------------
  // Student Data & Attendance
  // -------------------------------
  
  const students = [
    { id: "s1", name: "Ali Naveed", reg: "SP24-BCS-034" },
    { id: "s2", name: "Ibrahim Ahmed", reg: "SP22-BCS-099" },
    { id: "s3", name: "Abdullah Khan", reg: "FA21-BSE-056" },
      { id: "s4", name: "Ali Naveed", reg: "SP24-BCS-034" },
    { id: "s5", name: "Ibrahim Ahmed", reg: "SP22-BCS-099" },

  ];

  // Initialize attendance state for all students
  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = null;
      return acc;
    }, {})
  );

  // Update attendance for a student
  const handleAttendanceChange = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  // -------------------------------
  // Attendance Stats
  // -------------------------------
  
  const values = Object.values(attendance);
  const total = values.length;
  const presentCount = values.filter((v) => v === "present").length;
  const absentCount = values.filter((v) => v === "absent").length;
  const leaveCount = values.filter((v) => v === "leave").length;
  const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;

  // -------------------------------
  // Render Main Content
  // -------------------------------
  
  const renderContent = () => {
    if (activePage !== "Attendance") {
      return <h4>Select an option from the sidebar</h4>;
    }

    return (
      <>
        {/* Dashboard Title */}
        <h3 className="dashboard-title text-center">
          ADMIN DASHBOARD ATTENDANCE
        </h3>

        {/* Filter Buttons */}
        <div className="d-flex justify-content-center mb-3">
          <button className="filter-btn mx-1">DATE</button>
          <button className="filter-btn mx-1">CLUB</button>
          <button className="filter-btn mx-1">EVENT</button>
        </div>

        {/* Charts and Stats */}
        <div className="d-flex flex-wrap justify-content-center gap-3">

          {/* Attendance Circle Chart */}
          <div className="chart-box">
            <svg width="160" height="160" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#eee"
                strokeWidth="18"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#2D66AD"
                strokeWidth="18"
                fill="none"
                strokeDasharray={`${(percentage * 565) / 100} 565`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                style={{ transition: "stroke-dasharray 0.6s ease" }}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="22"
                fontWeight="bold"
              >
                {percentage}%
              </text>
            </svg>

            <div className="legend mt-2">
              <span className="legend-item present"></span> Present ({presentCount})
              <span className="legend-item absent ms-2"></span> Absent ({absentCount})
              <span className="legend-item leave ms-2"></span> Leave ({leaveCount})
            </div>
          </div>

          {/* Attendance Stats Box */}
          <div className="stats-box">
            <p>Total Members: <span className="stat-number">{total}</span></p>
            <p>Present: <span className="stat-number">{presentCount}</span></p>
            <p>Absent: <span className="stat-number">{absentCount}</span></p>
            <p>Leave: <span className="stat-number">{leaveCount}</span></p>
          </div>
        </div>

        {/* Attendance Table or Cards */}
        <div className="attendance-columns mt-4">
          {isMobile
            ? students.map((s) => (
                <div key={s.id} className="col-card student-card">
                  <h5>{s.name}</h5>
                  <p>{s.reg}</p>
                  <div className="status-row">
                    {["present", "absent", "leave"].map((status) => (
                      <label
                        key={status}
                        className={`circle ${status} ${
                          attendance[s.id] === status ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={s.id}
                          value={status}
                          checked={attendance[s.id] === status}
                          onChange={() => handleAttendanceChange(s.id, status)}
                        />
                        <span style={{ fontSize: "14px", marginLeft: "5px" }}>
                          {status === "present" ? "P" : status === "absent" ? "A" : "L"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))
            : (
              <>
                <div className="col-card name">
                  <h5>NAME</h5>
                  <ol>{students.map((s) => <li key={s.id}>{s.name}</li>)}</ol>
                </div>
                <div className="col-card reg">
                  <h5>REGISTRATION NO.</h5>
                  {students.map((s) => <p key={s.id}>{s.reg}</p>)}
                </div>
                <div className="col-card status">
                  <h5>STATUS</h5>
                  <div className="status-header">
                    <span>P</span>
                    <span>A</span>
                    <span>L</span>
                  </div>
                  {students.map((s) => (
                    <div key={s.id} className="status-row">
                      {["present", "absent", "leave"].map((status) => (
                        <label
                          key={status}
                          className={`circle ${status} ${
                            attendance[s.id] === status ? "active" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={s.id}
                            value={status}
                            checked={attendance[s.id] === status}
                            onChange={() => handleAttendanceChange(s.id, status)}
                          />
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )
          }
        </div>
      </>
    );
  };

  // -------------------------------
  // Main Render
  // -------------------------------
  
  return (
    <div className="dashboard-container">
      <div className="admin-dashboard">

        {/* -----------------------------
            Mobile Top Navbar
        ----------------------------- */}
        {isMobile && (
          <nav className="navbar navbar-dark bg-primary fixed-top d-lg-none">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              
              {/* Hamburger Button */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSidebar"
                aria-controls="offcanvasSidebar"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* Centered Title */}
              <span className="navbar-brand mx-auto text-center">ACM CUI WAH</span>

              {/* Empty div to balance flex */}
              <div style={{ width: "40px" }}></div>
            </div>
          </nav>
        )}

        {/* -----------------------------
            Sidebar for Desktop
        ----------------------------- */}
        <div className="d-none d-lg-block sidebar">
          <div className="sidebar-header d-flex align-items-center">
            <img src={logo} alt="ACM Logo" className="logo me-2" />
            <span className="acm-title">ACM CUI</span>
          </div>

          <ul className="nav flex-column">
            {[
              "Overview",
              "Member Management",
              "Event Management",
              "Announcements",
              "Attendance",
              "Events",
              "Team Leads",
              "Settings",
            ].map((item) => (
              <li
                key={item}
                className={`nav-item ${activePage === item ? "active" : ""}`}
                onClick={() => setActivePage(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* -----------------------------
            Offcanvas Sidebar for Mobile
        ----------------------------- */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasSidebar"
          aria-labelledby="offcanvasSidebarLabel"
        >
          <div className="offcanvas-header">
            <img src={logo} alt="ACM Logo" className="logo me-2" />
            <h5 className="offcanvas-title" id="offcanvasSidebarLabel">ACM CUI</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body p-0">
            <div className="sidebar-body">
              <ul className="nav flex-column">
                {[
                  "Overview",
                  "Member Management",
                  "Event Management",
                  "Announcements",
                  "Attendance",
                  "Events",
                  "Team Leads",
                  "Settings",
                ].map((item) => (
                  <li
                    key={item}
                    className={`nav-item ${activePage === item ? "active" : ""}`}
                    onClick={() => {
                      setActivePage(item);
                      // Close offcanvas after selection
                      const offcanvas = document.getElementById("offcanvasSidebar");
                      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                      bsOffcanvas.hide();
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* -----------------------------
            Main Content
        ----------------------------- */}
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
