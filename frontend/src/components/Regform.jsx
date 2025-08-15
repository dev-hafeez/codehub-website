/* Regform.jsx*/
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import REGlogo from "../assets/Reglogo.png"; 
import ACMlogo from "../assets/ACMlogo.png"; 
import CircleLogo from "../assets/Reglogo.png"; 
import useAuthStore from '../store/authStore'
import '../styles/Regform.css';

function Regform() {
  const [formData, setFormData] = useState({
    user: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      role: 'STUDENT'
    },
    roll_no: '',
    club: ''
  })

  const { signup, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target

    // Map UI fields to backend structure
    if (id === 'name') {
      const [firstName, ...lastParts] = value.split(' ')
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          first_name: firstName || '',
          last_name: lastParts.join(' ') || ''
        }
      }))
    } else if (id === 'reg') {
      setFormData((prev) => ({ ...prev, roll_no: value }))
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, username: value, password: value } // Default username/password = reg no
      }))
    } else if (id === 'email') {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, email: value }
      }))
    } else if (id === 'club') {
      setFormData((prev) => ({ ...prev, club: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signup(formData)
    if (result.success) {
      navigate('/students')
    }
  }

  return (
    <div className="regform-container container-fluid">
      <h2 className="registration-heading text-center">WELCOME TO REGISTRATION</h2>

      <div className="left-panel">
        <img src={ACMlogo} alt="ACM Logo" className="acm-logo" />
        <div className="logo-content">
          <h4>Association for Computing Machinery</h4>
          <p>
            computing community.<br />
            Gain access to exclusive tech events,<br />
            workshops, and certifications.<br />
            Registrations are now open — secure your spot today!
          </p>
        </div>
      </div>

      <div className="background-shape"></div>

      <div className="form-oval">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row d-flex justify-content-between flex-wrap">
            <div className="form-group w-45">
              <label htmlFor="name">NAME</label>
              <input type="text" className="form-control" id="name" onChange={handleChange} />
            </div>
            <div className="form-group w-45">
              <label htmlFor="reg">Reg no.</label>
              <input type="text" className="form-control" id="reg" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row d-flex justify-content-between flex-wrap">
            <div className="form-group w-45">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" onChange={handleChange} />
            </div>
            <div className="form-group w-45">
              <label htmlFor="phone">Phone no.</label>
              <input type="text" className="form-control" id="phone" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="club">Club</label>
            <input type="text" className="form-control w-75 mx-auto" id="club" onChange={handleChange} />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="button-row text-center mt-4">
            <button type="button" className="btn btn-dark mx-2">MENU</button>
            <button type="submit" className="btn btn-dark mx-2" disabled={loading}>
              {loading ? 'REGISTERING...' : 'REGISTER'}
            </button>
          </div>
        </form>
      </div>

      <div className="bottom-logo-circle">
        <img src={CircleLogo} alt="Bottom Logo" className="circle-logo" />
      </div>
    </div>
  );
}

export default Regform;
