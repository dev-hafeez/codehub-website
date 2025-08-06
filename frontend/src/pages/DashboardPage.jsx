import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'

const DashboardPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="flex-grow-1">
        <Dashboard userRole="admin" /> {/* Change userRole as needed */}
      </div>

      <Footer />
    </div>
  )
}

export default DashboardPage
