// src/store/authStore.js
import { create } from 'zustand'
import axios from 'axios'

const useAuthStore = create((set) => ({
  user_id: null,
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login/', { username, password })
 // Example structure adjustment
    const token = res.data?.token || res.data?.data?.token
    const role = res.data?.role || res.data?.data?.role
    const user_id = res.data?.user || res.data?.data?.user_id
      // Save token & user data
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      set({
      user_id,
      token,
      role,
      loading: false
    })
   console.log(user_id,token,role)

    return true;

    } catch (err) {
       
      set({
        error: err.response?.data?.message || 'Login failed',
        loading: false
      })
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token')
     localStorage.removeItem('role')
    set({ role: null, token: null ,user_id:null})
  }
}))

export default useAuthStore
