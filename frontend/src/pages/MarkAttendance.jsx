import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import useAttendanceStore from "../store/useAttendanceStore.js";
import "../styles/AdminDashboard.css";

const MarkAttendance = () => {
  const navigate = useNavigate();
  const { students, fetchStudents, createMeeting, loading } =
    useAttendanceStore();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    startTime: "",
    endTime: "",
    venue: "",
    highlights: "",
    agenda: "",
  });

  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (students.length > 0) {
      const initial = students.reduce((acc, s) => {
        acc[s.user.id] = null;
        return acc;
      }, {});
      setAttendance(initial);
    }
  }, [students]);

  const values = Object.values(attendance);
  const total = values.length;
  const presentCount = values.filter((v) => v === "PRESENT").length;
  const absentCount = values.filter((v) => v === "ABSENT").length;
  const leaveCount = values.filter((v) => v === "LEAVE").length;
  const percentage = total > 0 ? Math.round((presentCount / total) * 100) : 0;

  const handleAttendanceChange = (userId, status) => {
    setAttendance((prev) => ({ ...prev, [userId]: status }));
  };

  function to24Hour(timeStr) {
    if (!timeStr) return "";
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
    if (!match) return "";
    let [_, hours, minutes, modifier] = match;
    hours = parseInt(hours, 10);
    if (modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
  }

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const unmarked = Object.values(attendance).some((status) => status === null);
    if (unmarked) {
      alert("Please mark attendance for all students.");
      return;
    }

    if (
      !meetingDetails.startTime ||
      !meetingDetails.endTime ||
      !meetingDetails.venue ||
      !meetingDetails.highlights ||
      !meetingDetails.agenda
    ) {
      alert("Please fill in all meeting details.");
      return;
    }

    const attendanceArray = Object.entries(attendance).map(
      ([userId, status]) => ({
        user: parseInt(userId),
        status, // already uppercase
      })
    );

    const formattedDate = selectedDate.toISOString().split("T")[0];

    const submissionData = {
      date: formattedDate,
      start_time: to24Hour(meetingDetails.startTime),
      end_time: to24Hour(meetingDetails.endTime),
      venue: meetingDetails.venue,
      agenda: meetingDetails.agenda,
      highlights: meetingDetails.highlights,
      attendance: attendanceArray,
    };

    try {
      await createMeeting(submissionData);
      alert("Attendance submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      alert(`Error submitting attendance: ${JSON.stringify(errorMessage)}`);
    }
  };

  return (
    <>
    <Navbar />
    <div className="dashboard-container">
      
      <div className="main-content">
        <h3 className="dashboard-title text-center">ATTENDANCE</h3>
        <div className="filter-container">
          <button
            className="btn-design mx-1"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            DATE: {selectedDate.toLocaleDateString()}
          </button>
          {showCalendar && (
            <div className="calendar-popup">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
              />
            </div>
          )}
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
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
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
              <span className="legend-item present"></span> Present (
              {presentCount})
              <span className="legend-item absent ms-2"></span> Absent (
              {absentCount})
              <span className="legend-item leave ms-2"></span> Leave (
              {leaveCount})
            </div>
          </div>
          <div className="stats-box">
            <p>
              Total Members: <span className="stat-number">{total}</span>
            </p>
            <p>
              Present: <span className="stat-number">{presentCount}</span>
            </p>
            <p>
              Absent: <span className="stat-number">{absentCount}</span>
            </p>
            <p>
              Leave: <span className="stat-number">{leaveCount}</span>
            </p>
          </div>
        </div>
        <div className="highlight-options-section mt-4">
          <h5>Meeting Highlights</h5>
          <textarea
            name="highlights"
            placeholder="e.g., General Body Meeting"
            value={meetingDetails.highlights}
            onChange={handleDetailChange}
            className="highlight-input"
          />
        </div>
        <div className="agenda-options-section mt-4">
          <h5>Meeting Agenda</h5>
          <textarea
            name="agenda"
            placeholder="e.g., Discuss upcoming events"
            value={meetingDetails.agenda}
            onChange={handleDetailChange}
            className="highlight-input"
          />
        </div>
        <div className="attendance-section">
          <div className="attendance-header-row mt-4">
            <h6 className="col-name-header">NAME</h6>
            <h6 className="col-reg-header">ROLL NO.</h6>
            <div className="col-status-header">
              <h6>STATUS</h6>
              <div className="status-header-labels">
                <span>P</span>
                <span>A</span>
                <span>L</span>
              </div>
            </div>
          </div>
          {loading && <p>Loading students...</p>}
          {!loading &&
            students.map((s, index) => (
              <div key={s.user.id} className="student-attendance-row">
                <div className="student-name">
                  <span>{index + 1}.</span> {s.user.first_name} {s.user.last_name}
                </div>
                <div className="student-reg">{s.roll_no}</div>
                <div className="student-status-controls">
                  {["PRESENT", "ABSENT", "LEAVE"].map((status) => (
                    <label
                      key={status}
                      className={`circle ${status.toLowerCase()} ${
                        attendance[s.user.id] === status ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`student-${s.user.id}`}
                        value={status}
                        checked={attendance[s.user.id] === status}
                        onChange={() =>
                          handleAttendanceChange(s.user.id, status)
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className="submit-container mt-4">
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default MarkAttendance;
