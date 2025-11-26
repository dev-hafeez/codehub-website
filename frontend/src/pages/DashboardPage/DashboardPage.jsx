import React from 'react'
import Navbar from '../../components/DashboardNavbar/Navbar'
import Sidebar from '../../components/dashboard/Sidebar' 
import { Outlet } from 'react-router-dom' 
import './DashboardPage.css' 

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