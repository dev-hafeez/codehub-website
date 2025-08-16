// src/store/authStore.js
import { create } from 'zustand'
import axios from 'axios'

const useAuthStore = create((set, get) => ({
  user_id: null,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  resetToken: null, // for forgot password flow
  loading: false,
  error: null,

  // ---------- LOGIN ----------
  login: async (username, password) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login/', { 
        username, 
        password 
      })

      const token = res.data?.token || res.data?.data?.token
      const role = res.data?.role || res.data?.data?.role
      const user_id = res.data?.user || res.data?.data?.user_id

      localStorage.setItem('token', token)
      localStorage.setItem('role', role)

      set({ user_id, token, role, loading: false })
      return true
    } catch (err) {
      const apiError = err.response?.data
      let errorMessage = 'Login failed'

      if (apiError) {
        if (apiError.non_field_errors) {
          errorMessage = apiError.non_field_errors.join(', ')
        } else if (apiError.detail) {
          errorMessage = apiError.detail
        } else if (typeof apiError === 'string') {
          errorMessage = apiError
        } else {
          errorMessage = JSON.stringify(apiError)
        }
      }

      set({
        error: errorMessage,
        loading: false
      })
      return false
    }
  },

  // ---------- SIGNUP ----------
  signup: async (signupData) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        'http://localhost:8000/api/auth/signup/',
        signupData,
        { headers: { Authorization: `Token ${token}` } }
      )

      set({ loading: false })
      return { success: true, data: res.data }
    } catch (err) {
      const apiError = err.response?.data
      let errorMessage = 'Signup failed'

      if (apiError) {
        if (apiError.non_field_errors) {
          errorMessage = apiError.non_field_errors.join(', ')
        } else if (apiError.detail) {
          errorMessage = apiError.detail
        } else if (typeof apiError === 'string') {
          errorMessage = apiError
        } else {
          errorMessage = JSON.stringify(apiError)
        }
      }

      set({
        error: errorMessage,
        loading: false
      })
      return { success: false, error: errorMessage }
    }
  },

  // ---------- FORGOT PASSWORD ----------
  requestOtp: async (email) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post('http://localhost:8000/api/auth/otp/', { email })

      const resetToken = res.data?.token?.access
      set({ resetToken, loading: false })

      return { success: true, resetToken }
    } catch (err) {
      const apiError = err.response?.data
      let errorMessage = 'OTP request failed'

      if (apiError?.non_field_errors) {
        errorMessage = apiError.non_field_errors.join(', ')
      }

      set({ error: errorMessage, loading: false })
      return { success: false, error: errorMessage }
    }
  },

  // ---------- RESET PASSWORD ----------
 // ---------- RESET PASSWORD ----------
resetPassword: async (newPassword) => {
  set({ loading: true, error: null })
  try {
    const { resetToken } = get()
    const res = await axios.put('http://localhost:8000/api/auth/password/reset', {
      token: resetToken,
      password: newPassword
    })

    // 🔑 Clear any existing session after password reset
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    set({ 
      loading: false, 
      resetToken: null, 
      token: null, 
      user_id: null, 
      role: null 
    })

    return { success: true, data: res.data }
  } catch (err) {
    const apiError = err.response?.data
    let errorMessage = 'Password reset failed'

    if (apiError?.non_field_errors) {
      errorMessage = apiError.non_field_errors.join(', ')
    }

    set({ error: errorMessage, loading: false })
    return { success: false, error: errorMessage }
  }
},


  // ---------- LOGOUT ----------
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    set({ role: null, token: null, user_id: null })
  }
}))

export default useAuthStore
