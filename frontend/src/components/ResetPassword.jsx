import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const { resetPassword, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await resetPassword(password)
    if (res.success) {
      alert('Password reset successful! Please login again.')
      navigate('/login')
    }
  }

  return (
    <div className="login-container d-flex flex-column align-items-center">
      <div className="login-card text-center">
        <h2 className="welcome-text text-black">Reset Password</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group mb-3 text-start">
            <label htmlFor="password" className="text-black">New Password</label>
            <input
              type="password"
              id="password"
              className="form-control custom-input"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark login-btn" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  )
}

export default ResetPassword
