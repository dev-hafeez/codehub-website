// src/components/ViewMemberModal.jsx
import React from "react";
import "../style2/Modal.css"; // We will create this CSS file next

const ViewMemberModal = ({ isOpen, onClose, member }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Member Details</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="detail-item">
            <strong>Username:</strong> <span>{member.user.username}</span>
          </div>
          <div className="detail-item">
            <strong>Email:</strong> <span>{member.user.email}</span>
          </div>
          <div className="detail-item">
            <strong>Roll No:</strong> <span>{member.roll_no}</span>
          </div>
          <div className="detail-item">
            <strong>Role:</strong> <span>{member.user.role}</span>
          </div>
          <div className="detail-item">
            <strong>Club:</strong> <span>{member.club}</span>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn1 btn-secondary1" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMemberModal;