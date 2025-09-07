import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import "../styles/AdminDashboard.css"; // Make sure to update this CSS file
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";

const MarkAttendance = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [activePage, setActivePage] = useState("Attendance");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showClubDropdown, setShowClubDropdown] = useState(false);
  const [selectedClub, setSelectedClub] = useState("ACM");

  const [meetingDetails, setMeetingDetails] = useState({
    startTime: "",
    endTime: "",
    venue: "",
    highlights: "",
    agenda: "",
  });

  const navItems = [
    "Overview", "Member Management", "Event Management",
    "Announcements", "Attendance", "Events", "Team Leads", "Settings"
  ];

  const students = [
    { id: "s1", name: "Ali Naveed", reg: "SP24-BCS-034" },
    { id: "s2", name: "Ibrahim Ahmed", reg: "SP22-BCS-099" },
    { id: "s3", name: "Abdullah Khan", reg: "FA21-BSE-056" },
    { id: "s4", name: "Ali Naveed", reg: "SP24-BCS-034" },
    { id: "s5", name: "Ibrahim Ahmed", reg: "SP22-BCS-099" },
  ];

  const initialAttendanceState = {
    ACM: students.reduce((acc, student) => ({ ...acc, [student.id]: null }), {}),
    CodeHub: students.reduce((acc, student) => ({ ...acc, [student.id]: null }), {}),
    Registration: students.reduce((acc, student) => ({ ...acc, [student.id]: null }), {}),
    Decor: students.reduce((acc, student) => ({ ...acc, [student.id]: null }), {}),
  };
  const [allClubsAttendance, setAllClubsAttendance] = useState(initialAttendanceState);

  const handleAttendanceChange = (id, status) => {
    setAllClubsAttendance((prev) => ({
      ...prev,
      [selectedClub]: {
        ...prev[selectedClub],
        [id]: status,
      },
    }));
  };

  const currentAttendance = allClubsAttendance[selectedClub] || {};
  const values = Object.values(currentAttendance);
  const total = values.length;
  const presentCount = values.filter((v) => v === "present").length;
  const absentCount = values.filter((v) => v === "absent").length;
  const leaveCount = values.filter((v) => v === "leave").length;
  const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails(prev => ({ ...prev, [name]: value }));
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleSubmit = () => {
    const unmarkedStudents = Object.values(currentAttendance).some(status => status === null);
    if (unmarkedStudents) {
      showAlert("Please mark the attendance for all students before submitting.");
      return;
    }

    if (!meetingDetails.startTime || !meetingDetails.endTime || !meetingDetails.venue || !meetingDetails.highlights || !meetingDetails.agenda) {
      showAlert("Please fill in all the required fields.");
      return;
    }

    const submissionData = {
      date: selectedDate.toLocaleDateString("en-CA"),
      club: selectedClub,
      ...meetingDetails,
      attendance: currentAttendance
    };

    console.log("Submitting Attendance Data:", submissionData);
    showAlert(`Attendance for ${selectedClub} on ${selectedDate.toLocaleDateString()} submitted successfully!`);

    // Navigate to the dashboard after successful submission and alert
    navigate('/dashboard');
  };

  const renderContent = () => {
    if (activePage !== "Attendance") {
      return (
        <div className="text-center mt-5">
          <h4>{activePage}</h4>
          <p>This content is a placeholder for the {activePage} section.</p>
        </div>
      );
    }

    return (
      <>
        <h3 className="dashboard-title text-center">ATTENDANCE</h3>

        <div className="filter-container">
          <div className="d-flex justify-content-center mb-3 flex-wrap">
            <button className="btn-design mx-1" onClick={() => setShowCalendar(!showCalendar)}>
              DATE: {selectedDate.toLocaleDateString()}
            </button>

            <div className="dropdown-container">
              <button className="btn-design mx-1" onClick={() => setShowClubDropdown(!showClubDropdown)}>
                CLUB: {selectedClub || "Select Club"}
              </button>
              {showClubDropdown && (
                <ul className="club-dropdown-menu">
                  {["ACM", "CodeHub", "Registration", "Decor"].map((club) => (
                    <li key={club}>
                      <a
                        className={`dropdown-item ${selectedClub === club ? "active" : ""}`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedClub(club);
                          setShowClubDropdown(false);
                        }}
                      >
                        {club}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              type="text"
              name="startTime"
              placeholder="Start Time: e.g., 2:00 PM"
              value={meetingDetails.startTime}
              onChange={handleDetailChange}
              className="meeting-input mx-1"
            />
            <input
              type="text"
              name="endTime"
              placeholder="End Time: e.g., 4:00 PM"
              value={meetingDetails.endTime}
              onChange={handleDetailChange}
              className="meeting-input mx-1"
            />
            <input
              type="text"
              name="venue"
              placeholder="Venue: e.g., A-202"
              value={meetingDetails.venue}
              onChange={handleDetailChange}
              className="meeting-input mx-1"
            />
          </div>

          {showCalendar && (
            <div className="calendar-popup">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
              />
            </div>
          )}
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <div className="chart-box">
            <svg width="160" height="160" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" stroke="#eee" strokeWidth="18" fill="none" />
              <circle
                cx="100" cy="100" r="90" stroke="#2D66AD" strokeWidth="18" fill="none"
                strokeDasharray={`${(percentage * 565) / 100} 565`}
                strokeLinecap="round" transform="rotate(-90 100 100)"
                style={{ transition: "stroke-dasharray 0.6s ease" }}
              />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="22" fontWeight="bold">
                {percentage}%
              </text>
            </svg>
            <div className="legend mt-2">
              <span className="legend-item present"></span> Present ({presentCount})
              <span className="legend-item absent ms-2"></span> Absent ({absentCount})
              <span className="legend-item leave ms-2"></span> Leave ({leaveCount})
            </div>
          </div>
          <div className="stats-box">
            <p>Total Members: <span className="stat-number">{total}</span></p>
            <p>Present: <span className="stat-number">{presentCount}</span></p>
            <p>Absent: <span className="stat-number">{absentCount}</span></p>
            <p>Leave: <span className="stat-number">{leaveCount}</span></p>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="highlight-options-section mt-4">
          <h5>Meeting Highlights</h5>
          <textarea
            type="text"
            name="highlights"
            placeholder="e.g., General Body Meeting, event planning, etc."
            value={meetingDetails.highlights}
            onChange={handleDetailChange}
            className="highlight-input"
          />
        </div>

        {/* Agenda Section */}
        <div className="agenda-options-section mt-4">
          <h5>Meeting Agenda</h5>
          <textarea
            type="text"
            name="agenda"
            placeholder="e.g., Discuss upcoming events, assign tasks, etc."
            value={meetingDetails.agenda}
            onChange={handleDetailChange}
            className="highlight-input"
          />
        </div>

        <div className="attendance-section">
          <div className="attendance-header-row mt-4">
            <h6 className="col-name-header">NAME</h6>
            <h6 className="col-reg-header">REG NO.</h6>
            <div className="col-status-header">
              <h6>STATUS</h6>
              <div className="status-header-labels">
                <span>P</span><span>A</span><span>L</span>
              </div>
            </div>
          </div>

          <div className="attendance-list">
            {students.map((s, index) => (
              <div key={s.id} className="student-attendance-row">
                <div className="student-name">
                  <span>{index + 1}.</span> {s.name}
                </div>
                <div className="student-reg">{s.reg}</div>
                <div className="student-status-controls">
                  {["present", "absent", "leave"].map((status) => (
                    <label
                      key={status}
                      className={`circle ${status} ${currentAttendance[s.id] === status ? "active" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`${selectedClub}-${s.id}`}
                        value={status}
                        checked={currentAttendance[s.id] === status}
                        onChange={() => handleAttendanceChange(s.id, status)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="submit-container mt-4">
            <button className="btn-submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default MarkAttendance;