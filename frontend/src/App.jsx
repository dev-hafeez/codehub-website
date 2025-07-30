import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/pages/LandingPage.jsx';
import './App.css'
import { Button, Container, Alert } from 'react-bootstrap';

function App() { 
  return (
    <>
<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>


    </>
  )
}

export default App
