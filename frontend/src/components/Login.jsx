import React, { useState } from 'react'
import { PersonFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import '../styles/Login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

  e.preventDefault()
  const success = await login(username, password)
  if (success) {
    navigate('/dashboard')
  } else {
    alert("Invalid credentials. Please try again.")

  }
}


  return (
    <div className="login-container d-flex flex-column align-items-center">
      <div className="login-card text-center">
        <h2 className="welcome-text text-black">WELCOME BACK</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group mb-3 text-start">
            <label htmlFor="username" className="text-black">Username</label>
            <input
              type="text"
              id="username"
              className="form-control custom-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4 text-start">
            <label htmlFor="password" className="text-black">Password</label>
            <input
              type="password"
              id="password"
              className="form-control custom-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-link px-4 py-2 ms-lg-3 fw-semibold"
                style={{ backgroundColor: "#ffffff", cursor: "pointer" }} disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>

      
        <div className="icon-container">
          <PersonFill size={30} />
        </div>
      </div>

      <img
        src="acm-comsats-wah-chapter.png"
        alt="ACM Logo"
        className="acm-logo mt-4 my-4"
      />
    </div>
  )
}

export default Login
