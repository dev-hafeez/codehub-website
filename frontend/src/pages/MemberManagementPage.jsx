import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import '../styles/MemberManagement.css';
import Navbar from '../components/Navbar';

const initialMembers = [
  { id: 1, name: 'Ali Naveed', reg: 'SP24-BCS-034', club: 'CodeHub' },
  { id: 2, name: 'Ibrahim Ahmed', reg: 'SP22-BCS-099', club: 'Decor' },
  { id: 3, name: 'Abdullah Khan', reg: 'FA21-BSE-056', club: 'Events and Logistics' },
  { id: 4, name: 'Hamza Tariq', reg: 'SP24-BCS-035', club: 'Graphics' },
  { id: 5, name: 'Umar Farooq', reg: 'FA21-BCS-057', club: 'Media and Marketing' },
  { id: 6, name: 'Fatima Zohra', reg: 'FA21-BSE-057', club: 'CodeHub' },
  { id: 7, name: 'Zainab Asad', reg: 'SP22-BCS-100', club: 'Events and Logistics' },
  { id: 8, name: 'Hassan Raza', reg: 'SP24-BCS-036', club: 'Decor' },
  { id: 9, name: 'Ayesha Khan', reg: 'FA21-BSE-058', club: 'Media and Marketing' },
  { id: 10, name: 'Bilal Khan', reg: 'SP24-BCS-037', club: 'Graphics' },
  { id: 11, name: 'Ahmad Saleem', reg: 'FA21-BCS-058', club: 'CodeHub' },
  { id: 12, name: 'Sana Batool', reg: 'SP22-BCS-101', club: 'Decor' },
  { id: 13, name: 'Hafiz Ahmed', reg: 'SP24-BCS-038', club: 'Events and Logistics' },
  { id: 14, name: 'Hammad Ali', reg: 'FA21-BCS-059', club: 'Graphics' },
  { id: 15, name: 'Minahil Azhar', reg: 'SP22-BCS-102', club: 'Media and Marketing' },
];

const clubs = ['All Clubs', 'CodeHub', 'Decor', 'Events and Logistics', 'Graphics', 'Media and Marketing'];

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn">
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const MemberManagementPage = () => {
  const [members, setMembers] = useState(initialMembers);
  const [selectedClub, setSelectedClub] = useState('All Clubs');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMemberId, setDeletingMemberId] = useState(null);
  const [form, setForm] = useState({ name: '', reg: '', club: 'CodeHub' });

  useEffect(() => {
    if (editingMember) {
      setForm({ name: editingMember.name, reg: editingMember.reg, club: editingMember.club });
      setShowModal(true);
    }
  }, [editingMember]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const clubMatch = selectedClub === 'All Clubs' || member.club === selectedClub;
      const searchMatch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.reg.toLowerCase().includes(searchTerm.toLowerCase());
      return clubMatch && searchMatch;
    });
  }, [members, selectedClub, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...form } : m));
    } else {
      setMembers(prev => [...prev, { id: Date.now(), ...form }]);
    }
    closeModal();
  };

  const handleDeleteClick = (memberId) => {
    setDeletingMemberId(memberId);
    setShowConfirmModal(true);
  };

  const handleDeleteConfirm = () => {
    setMembers(prev => prev.filter(m => m.id !== deletingMemberId));
    setShowConfirmModal(false);
    setDeletingMemberId(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setForm({ name: '', reg: '', club: 'CodeHub' });
  };

  return (
    <>
    <Navbar/>
    <div className="dashboard-container">
      
      <div className="main-content">
        <h3 className="dashboard-title">Member Management</h3>
        <div className="controls-container">
          
          <div className="filter-group">
            <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} className="select-input">
              {clubs.map(club => <option key={club} value={club}>{club}</option>)}
            </select>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-input" />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="member-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Registration #</th>
                <th>Club</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.reg}</td>
                  <td>{member.club}</td>
                  <td>
                    <button onClick={() => setEditingMember(member)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDeleteClick(member.id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={showModal} onClose={closeModal}>
          <h2>{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
          <form onSubmit={handleSubmit} className="modal-form">
            <input type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="Full Name" required />
            <input type="text" name="reg" value={form.reg} onChange={handleInputChange} placeholder="Registration #" required />
            <select name="club" value={form.club} onChange={handleInputChange}>
              {clubs.filter(c => c !== 'All Clubs').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="btn-group">
              <button type="button" onClick={closeModal} className="btn-cancel">Cancel</button>
              <button type="submit" className="btn-add">Save</button>
            </div>
          </form>
        </Modal>

        <Modal show={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this member?</p>
          <div className="btn-group">
            <button onClick={() => setShowConfirmModal(false)} className="btn-cancel">Cancel</button>
            <button onClick={handleDeleteConfirm} className="btn-delete-confirm">Delete</button>
          </div>
        </Modal>
      </div>
    </div>
    </>
  );
};

export default MemberManagementPage;
