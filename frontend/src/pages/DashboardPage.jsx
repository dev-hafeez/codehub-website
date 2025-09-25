import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'

const DashboardPage = () => {
  return (
    <div className="">
      <Navbar />
      
      <div >
        <Dashboard  /> 
      </div>

      <Footer />
    </div>
  )
}

export default DashboardPage
