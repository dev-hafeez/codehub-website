import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import './App.css'
import { Button, Container, Alert } from 'react-bootstrap';
import LoginPage from './pages/LoginPage.jsx';

function App() { 
  return (
    <>
<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>


    </>
  )
}

export default App
