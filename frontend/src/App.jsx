import { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BlogListingPage from './pages/BlogListingPage.jsx';
import SinglePostPage from './pages/SinglePostPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import './App.css';
import { Button, Container, Alert } from 'react-bootstrap';
import { sampleBlog } from "./SampleData.js";
import Regform from './components/Regform.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
function App() {
  const [role, setRole] = useState(null);
    useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []); // The empty dependency array ensures this runs only once on mount.

  // We also need a way to update the user role when the login component succeeds.
  const handleLogin = (role) => {
    setRole(role);
    // You could also redirect here, but your Login component already handles that.
  };

  // We'll create a simple function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    // history.push('/login'); // Assuming you have a history object
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blogs" element={<BlogListingPage />} />
          <Route path="/blog/:id" element={<SinglePostPage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route 
          path="/dashboard" 
          element={<DashboardPage/>} 
        />
        <Route path="/signup" element={<Regform />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      
        </Routes>
      </Router>
    </>
  );
}

export default App;
