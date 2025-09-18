import { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import BlogListingPage from './pages/BlogListingPage.jsx';
import SinglePostPage from './pages/SinglePostPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ViewAttendancePage from './pages/ViewAttendancePage.jsx';
import { Button, Container, Alert } from 'react-bootstrap';
import { sampleBlog } from "./SampleData.js";
import Regform from './components/Regform.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import MyBlogPage from './pages/MyBlogPage.jsx';
import EditBlogWrapper from './components/EditBlogWrapper.jsx';
import MeetingList from './pages/MeetingList.jsx';
import MarkAttendance from './pages/MarkAttendance.jsx';
import AdminBlogPage from './pages/AdminBlogPage.jsx';
import EditAttendancePage from './pages/EditAttendancePage.jsx';
import MemberManagementPage from './pages/MemberManagementPage.jsx';
import TrackMembersPage from './pages/TrackMembersPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import MissionPage from './pages/MissionPage.jsx';
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
          <Route path="/mark-attendance" element={<MarkAttendance />} />
          <Route path="/meeting-history" element={<MeetingList/>} />
          <Route path="/meetings/:id/" element={<ViewAttendancePage />} />
          <Route path="/meetings/:id/edit" element={<EditAttendancePage/>} />

          <Route path="/members" element={<TrackMembersPage/>} />

          <Route path="/mission" element={<MissionPage/>} />
          <Route path="/teams" element={<TeamPage/>} />


          <Route path="/login" element={<LoginPage />} />
          <Route path="/blogs" element={<BlogListingPage />} />
          <Route path="/admin-blogs" element={<AdminBlogPage />} />
          <Route path="/blog/:id" element={<SinglePostPage />} />
           <Route path="/blogs/:id/edit" element={<EditBlogWrapper />} />
          <Route path="/myblog" element={<MyBlogPage />} />

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
