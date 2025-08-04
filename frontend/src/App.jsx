import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import './App.css'
import { Button, Container, Alert } from 'react-bootstrap';
import BlogListingPage from './pages/BlogListingPage.jsx';
import SinglePostPage from './pages/SinglePostPage.jsx'
import { sampleBlog } from "./SampleData.js";
import ArticlePage from './pages/ArticlePage.jsx';


function App() { 
  return (
    <>
<Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/blogs" element={<BlogListingPage/>} />
         <Route path="/blog/:id" element={<SinglePostPage/>}/>
         <Route path="/article" element={<ArticlePage/>}/>
      </Routes>
    </Router>


    </>
  )
}

export default App
