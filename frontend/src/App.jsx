import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Global styles
import "./styles/layout.css";

// Pages
import LandingPage from "./pages/Landing/LandingPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

// Blog
import AdminBlogPage from "./pages/BlogPages/AdminBlogPage.jsx";
import BlogListingPage from "./pages/BlogPages/BlogListingPage.jsx";
import SinglePostPage from "./pages/BlogPages/SinglePostPage.jsx";
import ArticlePage from "./pages/BlogPages/ArticlePage.jsx";
import MyBlogPage from "./pages/BlogPages/MyBlogPage.jsx";



// Auth
import RegPage from "./pages/Auth/RegPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import ReqOTP from "./components/Auth/ReqOTP.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";

// Blogs Edit
import EditBlogWrapper from "./components/Blogs/EditBlogWrapper.jsx";

// Attendance
import MeetingList from "./pages/Attendance/MeetingList.jsx";
import MarkAttendance from "./pages/Attendance/MarkAttendance.jsx";
import ViewAttendancePage from "./pages/Attendance/ViewAttendancePage.jsx";
import EditAttendancePage from "./pages/Attendance/EditAttendancePage.jsx";

// Members & Team
import TrackMembersPage from "./pages/Members/TrackMembersPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import MissionPage from "./pages/MissionPage.jsx";
import TeamSection from "./components/teams/TeamSection.jsx";
import ContactPage from "./pages/ContactPage.jsx";

// Profile
import ViewProfilePage from "./pages/Profile/ViewProfilePage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";

// Events
import EventsListPage from "./pages/Events/EventsListPage.jsx";
import EventCreatePage from "./pages/Events/EventsCreatePage.jsx";
import EventDetailPage from "./pages/Events/EventDetailPage.jsx";

// Layout
import Footer from "./components/Footer/Footer.jsx";
import AchievementPage from "./pages/AchievementPage.jsx";

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (role) => {
    setRole(role);
  };

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
  };

  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<><LandingPage /></>} />

        {/* Attendance */}
        <Route path="/mark-attendance" element={<><MarkAttendance /></>} />
        <Route path="/meeting-history" element={<><MeetingList /></>} />
        <Route path="/meetings/:id/" element={<><ViewAttendancePage /></>} />
        <Route path="/meetings/:id/edit" element={<><EditAttendancePage /></>} />

        {/* Members & Teams */}
        <Route path="/members" element={<><TrackMembersPage /></>} />
        <Route path="/contact" element={<><ContactPage /><Footer /></>} />
        <Route path="/mission" element={<><MissionPage /><Footer /></>} />
        <Route path="/teams" element={<><TeamSection /><Footer /></>} />
        <Route path="/team/:title" element={<><TeamPage /><Footer /></>} />

        {/* Auth */}
        <Route path="/login" element={<><LoginPage /><Footer /></>} />
        <Route path="/otp" element={<><ReqOTP /><Footer /></>} />
        <Route path="/signup" element={<><RegPage /><Footer /></>} />
        <Route path="/reset-password" element={<><ResetPassword /><Footer /></>} />

        {/* Blogs */}
        <Route path="/blogs" element={<><BlogListingPage /><Footer /></>} />
        <Route path="/admin-blogs" element={<><AdminBlogPage /><Footer /></>} />
        <Route path="/blog/:id" element={<><SinglePostPage /><Footer /></>} />
        <Route path="/blogs/:id/edit" element={<><EditBlogWrapper /><Footer /></>} />
        <Route path="/myblog" element={<><MyBlogPage /><Footer /></>} />
        <Route path="/article" element={<><ArticlePage /><Footer /></>} />

        {/* Profile */}
        <Route path="/edit-profile" element={<><ProfilePage /><Footer /></>} />
        <Route path="/view-profile" element={<><ViewProfilePage /><Footer /></>} />

        {/* Events */}
        <Route path="/events" element={<><EventsListPage /><Footer /></>} />
        <Route path="/events/create" element={<><EventCreatePage /><Footer /></>} />
         <Route path="/events/:id" element={<><EventDetailPage /><Footer /></>} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<><DashboardPage /><Footer /></>} />

        <Route path="/achievement" element={<><AchievementPage /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;
