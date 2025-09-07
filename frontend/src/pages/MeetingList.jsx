import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminDashboard.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const MeetingList = ({ onView }) => {
    
    const getMockMeetingDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 60; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            if (Math.random() > 0.6) { // Randomly select some dates to be "meetings"
                dates.push(d);
            }
        }
        return dates.sort((a, b) => b - a);
    };

    const [meetingDates, setMeetingDates] = useState(getMockMeetingDates());

    const handleEdit = (date) => {
        alert(`Edit functionality for ${date.toLocaleDateString()} is not yet implemented.`);
    };

    return (
        <>
        <Navbar/>
        <div className="attendance-section">
            <h3 className="dashboard-title text-center">MEETING HISTORY</h3>
            
            <div className="list-group list-group-flush mt-4">
                {meetingDates.map((date, index) => (
                    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0">{date.toLocaleDateString()}</span>
                        <div>
                             <Link to="/view-attendance" className="btn btn-design">View</Link>
                            <button 
                                className="btn btn-design"
                                onClick={() => handleEdit(date)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default MeetingList;