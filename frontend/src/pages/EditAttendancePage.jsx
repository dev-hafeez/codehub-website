// src/components/EditAttendancePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/AdminDashboard.css";
import Navbar from "../components/Navbar";
import useAttendanceStore from "../store/useAttendanceStore";
import axiosInstance from "../axios";

const EditAttendancePage = () => {
  const { id } = useParams(); // meeting id
  const { students, fetchStudents } = useAttendanceStore();

  const [meeting, setMeeting] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loadingMeeting, setLoadingMeeting] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(false);
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
    fetchStudents(); // load students for names/roll numbers
  }, [id, fetchStudents]);

  // ✅ fetch attendance when Edit Attendance button clicked
  const handleFetchAttendance = async () => {
    setLoadingAttendance(true);
    try {
      const res = await axiosInstance.get(`/meetings/${id}/attendance/`);
      const filtered = res.data.filter((a) => a.meeting === parseInt(id));
      console.log(filtered)

      setAttendance(filtered);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch attendance");
    } finally {
      setLoadingAttendance(false);
    }
  };

  // ✅ update meeting
  const handleUpdateMeeting = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/meetings/${id}/`, meeting);
      alert("Meeting updated!");
      setEditingMeeting(false);
    } catch (err) {
      alert("Failed to update meeting");
    }
  };

  // ✅ update individual attendance
  const handleUpdateAttendance = async (record) => {
    try {
      await axiosInstance.put(
        `/meetings/${id}/attendance/${record.id}`,
        record
      );
      alert("Attendance updated!");
    } catch (err) {
      alert("Failed to update attendance");
    }
  };

  if (loadingMeeting) return <p className="text-center">Loading meeting...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!meeting) return <p className="text-center">No meeting found.</p>;

  return (
    <div className="">
      <Navbar />
      <div className="main-content">
        <h3 className="dashboard-title text-center">EDIT MEETING & ATTENDANCE</h3>

        {/* Meeting Details */}
        {!editingMeeting ? (
          <div className="meeting-details-box mt-4">
            <h5>Meeting Details</h5>
            <p><strong>Date:</strong> {meeting.date}</p>
            <p><strong>Time:</strong> {meeting.start_time} - {meeting.end_time}</p>
            <p><strong>Venue:</strong> {meeting.venue}</p>
            <p><strong>Highlights:</strong> {meeting.highlights}</p>
            <p><strong>Agenda:</strong> {meeting.agenda}</p>

            <div className="mt-3">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => setEditingMeeting(true)}
              >
                Edit Meeting
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={handleFetchAttendance}
                disabled={loadingAttendance}
              >
                {loadingAttendance ? "Loading Attendance..." : "Edit Attendance"}
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-4" onSubmit={handleUpdateMeeting}>
            <div className="mb-2">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={meeting.date}
                onChange={(e) => setMeeting({ ...meeting, date: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label>Start Time</label>
              <input
                type="time"
                className="form-control"
                value={meeting.start_time}
                onChange={(e) =>
                  setMeeting({ ...meeting, start_time: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>End Time</label>
              <input
                type="time"
                className="form-control"
                value={meeting.end_time}
                onChange={(e) =>
                  setMeeting({ ...meeting, end_time: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label>Venue</label>
              <input
                type="text"
                className="form-control"
                value={meeting.venue}
                onChange={(e) => setMeeting({ ...meeting, venue: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label>Agenda</label>
              <textarea
                className="form-control"
                value={meeting.agenda}
                onChange={(e) => setMeeting({ ...meeting, agenda: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label>Highlights</label>
              <textarea
                className="form-control"
                value={meeting.highlights}
                onChange={(e) =>
                  setMeeting({ ...meeting, highlights: e.target.value })
                }
              />
            </div>
            <button className="btn btn-success me-2" type="submit">
              Save Meeting
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => setEditingMeeting(false)}
            >
              Cancel
            </button>
          </form>
        )}

        {/* Attendance Section */}
        {attendance.length > 0 && (
          <div className="attendance-section mt-5">
            <h5>Edit Attendance</h5>
            <div className="attendance-header-row mt-3">
              <h6 className="col-name-header">NAME</h6>
              <h6 className="col-reg-header">REG NO.</h6>
              <h6 className="col-status-header">STATUS</h6>
            </div>
            <div className="attendance-list">
              {students.map((student) => {
                const record = attendance.find((a) => a.user === student.user.id);

                if (!record) return null;

                return (
                  <div key={record.id} className="student-attendance-row">
                    <div className="student-name">
                      {student.user.first_name} {student.user.last_name}
                    </div>
                    <div className="student-reg">{student.roll_no}</div>
                    <div className="student-status d-flex align-items-center">
                      <select
                        value={record.status}
                        onChange={(e) =>
                          setAttendance((prev) =>
                            prev.map((a) =>
                              a.id === record.id
                                ? { ...a, status: e.target.value }
                                : a
                            )
                          )
                        }
                      >
                        <option value="PRESENT">Present</option>
                        <option value="ABSENT">Absent</option>
                        <option value="LEAVE">Leave</option>
                      </select>
                      <button
                        className="btn btn-sm btn-outline-success ms-2"
                        onClick={() => handleUpdateAttendance(record)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAttendancePage;
