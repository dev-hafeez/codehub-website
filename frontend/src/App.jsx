import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BlogListingPage from './pages/BlogListingPage.jsx';
import SinglePostPage from './pages/SinglePostPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import './App.css';
import { Button, Container, Alert } from 'react-bootstrap';
import { sampleBlog } from "./SampleData.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blogs" element={<BlogListingPage />} />
          <Route path="/blog/:id" element={<SinglePostPage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
