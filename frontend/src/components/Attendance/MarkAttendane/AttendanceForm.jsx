import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AttendanceForm.css";

const AttendanceForm = ({ selectedDate, setSelectedDate, showCalendar, setShowCalendar, meetingDetails, handleDetailChange }) => {
  return (
    <div className="attendance-form">
      <div className="filter-container">
        <button className="btn-design" onClick={() => setShowCalendar(!showCalendar)}>
          DATE: {selectedDate.toLocaleDateString()}
        </button>
        {showCalendar && (
          <div className="calendar-popup">
            <DatePicker selected={selectedDate} onChange={setSelectedDate} inline />
          </div>
        )}

        <input type="text" name="startTime" placeholder="Start Time" value={meetingDetails.startTime} onChange={handleDetailChange} className="meeting-input"/>
        <input type="text" name="endTime" placeholder="End Time" value={meetingDetails.endTime} onChange={handleDetailChange} className="meeting-input"/>
        <input type="text" name="venue" placeholder="Venue" value={meetingDetails.venue} onChange={handleDetailChange} className="meeting-input"/>
      </div>

      <div className="notes-section">
        <div className="highlight-section">
          <h5>Meeting Highlights</h5>
          <textarea name="highlights" value={meetingDetails.highlights} onChange={handleDetailChange} className="highlight-input" placeholder="Highlights"/>
        </div>

        <div className="agenda-section">
          <h5>Meeting Agenda</h5>
          <textarea name="agenda" value={meetingDetails.agenda} onChange={handleDetailChange} className="highlight-input" placeholder="Agenda"/>
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
