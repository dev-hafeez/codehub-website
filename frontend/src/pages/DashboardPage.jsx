import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/dashboard/Sidebar' // <-- Import new Sidebar
import { Outlet } from 'react-router-dom' // <-- Import Outlet
import './DashboardPage.css' // <-- We'll create this CSS file

const DashboardPage = () => {
  return (
    <div className="dashboard-page-container">
      <Navbar />
      
      <div className="dashboard-layout">
        {/*  */}
        <div className="sidebar-container">
          <Sidebar />
        </div>
        
        <div className="content-container">
          {/* This Outlet is where your pages will be rendered */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage