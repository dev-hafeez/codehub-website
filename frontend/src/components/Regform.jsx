/* Regform.jsx */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import REGlogo from "../assets/Reglogo.png"; 
import ACMlogo from "../assets/ACMlogo.png"; 
import CircleLogo from "../assets/Reglogo.png"; 
import useAuthStore from '../store/authStore'
import '../styles/Regform.css';
import Navbar from './Navbar';

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

    if (id === 'name') {
      const [firstName, ...lastParts] = value.trim().split(' ')
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          first_name: firstName || '',
          last_name: lastParts.join(' ') || ''
        }
      }))
    } 
    else if (id === 'reg') {
      setFormData((prev) => ({ ...prev, roll_no: value }))
    } 
    else if (id === 'email') {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, email: value }
      }))
    } 
    else if (id === 'username') {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, username: value }
      }))
    }
    else if (id === 'pass') {
      setFormData((prev) => ({
        ...prev,
        user: { ...prev.user, password: value }
      }))
    }
    else if (id === 'club') {
      setFormData((prev) => ({ ...prev, club: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signup(formData)
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <>
    <Navbar/>
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
          {/* Name + Reg No */}
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

          {/* Username + Email */}
          <div className="form-row d-flex justify-content-between flex-wrap">
            <div className="form-group w-45">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" onChange={handleChange} />
            </div>
            <div className="form-group w-45">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" onChange={handleChange} />
            </div>
          </div>
        {/*Password and club */}
          <div className="form-row d-flex justify-content-between flex-wrap">
            <div className="form-group w-45">
            <label htmlFor="pass">Password</label>
            <input type="password" className="form-control" id="pass" onChange={handleChange} />
          </div>
            <div className="form-group w-45" >
            <label htmlFor="club">Club</label>
            <input type="text" className="form-control" id="club" onChange={handleChange} />
          </div>

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
    </>
  );
}

export default Regform;