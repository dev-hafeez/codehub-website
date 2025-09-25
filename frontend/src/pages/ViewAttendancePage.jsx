// src/components/ViewAttendancePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/AdminDashboard.css";
import Navbar from "../components/Navbar";
import useAttendanceStore from "../store/useAttendanceStore";
import axiosInstance from "../axios.js";

const ViewAttendancePage = () => {
  const { id } = useParams(); // ✅ meeting id from URL
  const { students, fetchStudents } = useAttendanceStore();

  const [meeting, setMeeting] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loadingMeeting, setLoadingMeeting] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [error, setError] = useState(null);

  // ✅ fetch meeting details
  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axiosInstance.get(`/meetings/${id}/`);
        setMeeting(res.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch meeting");
      } finally {
        setLoadingMeeting(false);
      }
    };

    fetchMeeting();
    fetchStudents(); // load students
  }, [id, fetchStudents]);

  // ✅ fetch attendance only when button clicked
const handleFetchAttendance = async () => {
  setLoadingAttendance(true);
  try {
    const res = await axiosInstance.get(`/meetings/${id}/attendance/`);
    console.log("Attendance raw response:", res.data);

    // ✅ filter records only for this meeting
    const filtered = res.data.filter((a) => a.meeting === parseInt(id));

    setAttendance(filtered);
  } catch (err) {
    setError(err.response?.data?.detail || "Failed to fetch attendance");
  } finally {
    setLoadingAttendance(false);
  }
};

  if (loadingMeeting) return <p className="text-center">Loading meeting...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!meeting) return <p className="text-center">No meeting found.</p>;

  // ✅ calculate stats
  const total = attendance.length;
  const presentCount = attendance.filter((a) => a.status === "PRESENT").length;
  const absentCount = attendance.filter((a) => a.status === "ABSENT").length;
  const leaveCount = attendance.filter((a) => a.status === "LEAVE").length;
  const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;

  return (
    <>
    <Navbar />
    <div className="dashboard-container">
      
      <div className="main-content">
        <h3 className="dashboard-title text-center">VIEW ATTENDANCE</h3>

        {/* Meeting Details */}
        <div className="meeting-details-box mt-4">
          <h5>Meeting Details</h5>
          <p><strong>Date:</strong> {meeting.date}</p>
          <p><strong>Time:</strong> {meeting.start_time} - {meeting.end_time}</p>
          <p><strong>Venue:</strong> {meeting.venue}</p>
          <p><strong>Highlights:</strong> {meeting.highlights}</p>
          <p><strong>Agenda:</strong> {meeting.agenda}</p>
        </div>

        {/* Button to fetch attendance */}
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            onClick={handleFetchAttendance}
            disabled={loadingAttendance}
          >
            {loadingAttendance ? "Loading Attendance..." : "View Attendance"}
          </button>
        </div>

        {/* Attendance Section */}
        {attendance.length > 0 && (
          <>
            {/* Stats */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
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

            {/* Student Attendance List */}
            <div className="attendance-section mt-4">
              <div className="attendance-header-row">
                <h6 className="col-name-header">NAME</h6>
                <h6 className="col-reg-header">REG NO.</h6>
                <h6 className="col-status-header">STATUS</h6>
              </div>
              <div className="attendance-list">
                {students.map((student) => {
                  // ✅ match attendance by user.id
                  const record = attendance.find((a) => a.user === student.user.id);
                  const status = record ? record.status.toLowerCase() : "N/A";

                  return (
                    <div key={student.id} className="student-attendance-row">
                      <div className="student-name">
                        {student.user.first_name} {student.user.last_name}
                      </div>
                      <div className="student-reg">{student.roll_no}</div>
                      <div className="student-status">
                        <span className={`status-text ${status}`}>{status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default ViewAttendancePage;
