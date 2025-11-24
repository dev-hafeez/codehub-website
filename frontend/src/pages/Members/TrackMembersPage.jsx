
import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../axios";
import { FaEye, FaEdit } from "react-icons/fa";
import "./TrackMemberPage.css";

// Import your new modal components
import ViewMemberModal from "../../components/members/ViewMemberModal";
import EditMemberModal from "../../components/members/EditMemberModal";

// ... (getRoleClass function remains the same)
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

  // State for modals
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Function to fetch members
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
  
  // Handlers to open modals
  const handleView = (member) => {
    setSelectedMember(member);
    setViewModalOpen(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setEditModalOpen(true);
  };
  
  // Handler to close any modal
  const handleCloseModals = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setSelectedMember(null);
  };

  // Handler to refresh data after a successful save
  const handleSaveSuccess = () => {
    fetchMembers(); // Refetch the list of members to show the update
  };

  if (loading) return <p className="status-message">Loading members...</p>;
  if (error) return <p className="status-message error-message">{error}</p>;

  return (
    <>
    {/* <Navbar/> */}
    <div className="dashboard-container">
      
      <div className="track-members-container">
        <h1 className="track-members-title">Track Members</h1>
        <div className="members-table-card">
          <table className="members-table">
            <thead>
              {/* ... table headers ... */}
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
                    <button className="action-btn btn-view" onClick={() => handleView(member)} title="View Member">
                      <FaEye />
                    </button>
                    <button className="action-btn btn-edit2" onClick={() => handleEdit(member)} title="Edit Member">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Render the Modals */}
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
    </div>
    </>
  );
};

export default TrackMembersPage;