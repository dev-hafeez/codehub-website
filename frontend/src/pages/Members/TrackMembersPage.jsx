import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../axios";
import { FaEye, FaEdit } from "react-icons/fa";
import "./TrackMemberPage.css";

import ViewMemberModal from "../../components/members/ViewMemberModal";
import EditMemberModal from "../../components/members/EditMemberModal";

const getRoleClass = (role) => {
  const roleLower = role?.toLowerCase() || 'other';
  if (roleLower.includes('student')) return 'role-student';
  if (roleLower.includes('lead')) return 'role-lead';
  return 'role-other';
};

const TrackMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/students/");
      setMembers(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch members");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleView = (member) => {
    setSelectedMember(member);
    setViewModalOpen(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setEditModalOpen(true);
  };

  const handleCloseModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setSelectedMember(null);
  };

  const handleSaveSuccess = () => {
    fetchMembers();
  };

  if (loading) return <p className="status-message">Loading members...</p>;
  if (error) return <p className="status-message error-message">{error}</p>;

  // Mobile card view
  if (isMobile) {
    return (
      <>
        <div className="dashboard-container">
          <div className="track-members-container">
            <h1 className="dashboard-title">Track Members</h1>
            <div className="members-mobile-list">
              {members.map((member) => (
                <div key={member.user.id} className="member-card">
                  <div className="member-card-header">
                    <div className="member-name">{member.user.username}</div>
                    <span className={`role-badge ${getRoleClass(member.user.role)}`}>
                      {member.user.role}
                    </span>
                  </div>
                  <div className="member-card-body">
                    <div className="card-item">
                      <span className="card-label">Roll No.</span>
                      <span className="card-value">{member.roll_no}</span>
                    </div>
                    <div className="card-item">
                      <span className="card-label">Email</span>
                      <span className="card-value">{member.user.email}</span>
                    </div>
                    <div className="card-item">
                      <span className="card-label">Phone</span>
                      <span className="card-value">{member.user.phone_number || 'N/A'}</span>
                    </div>
                    <div className="card-item">
                      <span className="card-label">Club</span>
                      <span className="card-value">{member.club}</span>
                    </div>
                  </div>
                  <div className="member-card-actions">
                    <button 
                      className="action-btn btn-view" 
                      onClick={() => handleView(member)} 
                      title="View Member"
                    >
                      <FaEye /> View
                    </button>
                    <button 
                      className="action-btn btn-edit2" 
                      onClick={() => handleEdit(member)} 
                      title="Edit Member"
                    >
                      <FaEdit /> Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <ViewMemberModal 
          isOpen={isViewModalOpen}
          onClose={handleCloseModals}
          member={selectedMember}
        />
        <EditMemberModal 
          isOpen={isEditModalOpen}
          onClose={handleCloseModals}
          member={selectedMember}
          onSave={handleSaveSuccess}
        />
      </>
    );
  }

  // Desktop table view
  return (
    <>
      <div className="dashboard-container">
        <div className="track-members-container">
          <h1 className="dashboard-title">Track Members</h1>
          <div className="members-table-card">
            <table className="members-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Roll No.</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Club</th>
                  <th className="actions-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.user.id}>
                    <td>{member.user.username}</td>
                    <td>{member.roll_no}</td>
                    <td>{member.user.email}</td>
                    <td>{member.user.phone_number}</td>
                    <td>
                      <span className={`role-badge ${getRoleClass(member.user.role)}`}>
                        {member.user.role}
                      </span>
                    </td>
                    <td>{member.club}</td>
                    <td className="actions-cell">
                      <button 
                        className="action-btn btn-view" 
                        onClick={() => handleView(member)} 
                        title="View Member"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-btn btn-edit2" 
                        onClick={() => handleEdit(member)} 
                        title="Edit Member"
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <ViewMemberModal 
        isOpen={isViewModalOpen}
        onClose={handleCloseModals}
        member={selectedMember}
      />
      <EditMemberModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseModals}
        member={selectedMember}
        onSave={handleSaveSuccess}
      />
    </>
  );
};

export default TrackMembersPage;