import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import './ReqOTP.css'
const ReqOTP = () => {
  const [email, setEmail] = useState('')
  const { requestOtp, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await requestOtp(email)
    if (res.success) {
      navigate('/dashboard/reset-password')
    }
  }

  return (
    <>
      <div className="otp-container d-flex flex-column align-items-center">
        <div className="otp-card text-center">
          <h2 className=" text-black dashboard-title">Reset Password</h2>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="otp-input-group mb-3 text-start">
              <label htmlFor="email" className="otp-label text-black">Email</label>
              <input
                type="email"
                id="email"
                className="otp-input form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="otp-btn btn btn-dark" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </>
  )
}

export default ReqOTP
