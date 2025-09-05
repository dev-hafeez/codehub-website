import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import NavbarComponent from './NavbarComponent'
import Footer from './Footer'

const forgotPassword = () => {
  const [email, setEmail] = useState('')
  const { requestOtp, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await requestOtp(email)
    if (res.success) {
      navigate('/reset-password')
    }
  }

  return (
    <>
    <NavbarComponent/>
    <div className="login-container d-flex flex-column align-items-center">
      <div className="login-card text-center">
        <h2 className="welcome-text text-black">Forgot Password</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group mb-3 text-start">
            <label htmlFor="email" className="text-black">Email</label>
            <input
              type="email"
              id="email"
              className="form-control custom-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark login-btn" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
    
    </>
  )
}

export default forgotPassword
