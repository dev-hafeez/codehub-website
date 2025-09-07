// src/components/ViewAttendance.jsx

import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// This is mock data to simulate attendance records.
const mockAttendanceData = [
  {
    id: "rec_1",
    date: "2025-09-07",
    club: "CodeHub",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    venue: "A-202",
    highlights: "General Body Meeting. Discussed upcoming hackathon.",
    agenda: "Introductions, hackathon planning, team assignments.",
    attendance: {
      "s1": "present",
      "s2": "present",
      "s3": "absent",
      "s4": "present",
      "s5": "leave",
    },
  },
  {
    id: "rec_2",
    date: "2025-09-06",
    club: "CodeHub",
    startTime: "11:00 AM",
    endTime: "1:00 PM",
    venue: "B-101",
    highlights: "Coding workshop on React hooks.",
    agenda: "React workshop, Q&A session.",
    attendance: {
      "s1": "present",
      "s2": "leave",
      "s3": "present",
      "s4": "absent",
      "s5": "present",
    },
  },
  {
    id: "rec_3",
    date: "2025-09-07",
    club: "Registration",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    venue: "B-102",
    highlights: "Project brainstorming session.",
    agenda: "Brainstorming new project ideas, dividing roles.",
    attendance: {
      "s1": "present",
      "s2": "present",
      "s3": "present",
      "s4": "present",
      "s5": "present",
    },
  },
];

const students = [
  { id: "s1", name: "Ali Naveed", reg: "SP24-BCS-034" },
  { id: "s2", name: "Ibrahim Ahmed", reg: "SP22-BCS-099" },
  { id: "s3", name: "Abdullah Khan", reg: "FA21-BSE-056" },
  { id: "s4", name: "Ali Naveed", reg: "SP24-BCS-034" },
  { id: "s5", name: "Ibrahim Ahmed", reg: "SP22-BCS-099" },
];

const ViewAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedClub, setSelectedClub] = useState("ACM");
  const [showClubDropdown, setShowClubDropdown] = useState(false);

  // Find the attendance record that matches the selected date and club
  const selectedRecord = mockAttendanceData.find(
    (record) =>
      record.date === selectedDate.toLocaleDateString("en-CA") &&
      record.club === selectedClub
  );

  const currentAttendance = selectedRecord?.attendance || {};
  const values = Object.values(currentAttendance);
  const total = values.length;
  const presentCount = values.filter((v) => v === "present").length;
  const absentCount = values.filter((v) => v === "absent").length;
  const leaveCount = values.filter((v) => v === "leave").length;
  const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="main-content">
        <h3 className="dashboard-title text-center">VIEW ATTENDANCE</h3>

        {/* Filter Section */}
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
          </div>
          {showCalendar && (
            <div className="calendar-popup">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setShowCalendar(false);
                }}
                inline
              />
            </div>
          )}
        </div>

        {/* Display Attendance */}
        {selectedRecord ? (
          <>
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

            {/* Meeting Details */}
            <div className="meeting-details-box mt-4">
              <h5>Meeting Details</h5>
              <p><strong>Time:</strong> {selectedRecord.startTime} - {selectedRecord.endTime}</p>
              <p><strong>Venue:</strong> {selectedRecord.venue}</p>
              <p><strong>Highlights:</strong> {selectedRecord.highlights}</p>
              <p><strong>Agenda:</strong> {selectedRecord.agenda}</p>
            </div>

            {/* Student Attendance List */}
            <div className="attendance-section">
              <div className="attendance-header-row mt-4">
                <h6 className="col-name-header">NAME</h6>
                <h6 className="col-reg-header">REG NO.</h6>
                <h6 className="col-status-header">STATUS</h6>
              </div>
              <div className="attendance-list">
                {students.map((student) => {
                  const status = selectedRecord.attendance[student.id];
                  return (
                    <div key={student.id} className="student-attendance-row">
                      <div className="student-name">{student.name}</div>
                      <div className="student-reg">{student.reg}</div>
                      <div className="student-status">
                        <span className={`status-text ${status}`}>{status || "N/A"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center mt-5">
            <p>No attendance record found for {selectedClub} on {selectedDate.toLocaleDateString()}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;