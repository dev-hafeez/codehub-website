import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Global styles
import "./styles/layout.css";

// Pages
import LandingPage from "./pages/Landing/LandingPage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";

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
import ContactPage from "./pages/Contact/ContactPage.jsx";

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
import BillsListPage from "./pages/Bills/BillsListPage.jsx";
import CreateBillPage from "./pages/Bills/CreateBillPage.jsx";
import BillDetailPage from "./pages/Bills/BillDetailPage.jsx";
import MemberProfile from "./components/members/MemberProfile.jsx";

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
const DashboardHome = () => (
  <div>
    <h2>Welcome to your Dashboard</h2>
    <p>Please select an option from the menu on the left.</p>
  </div>
);
 return (
    <Router>
      <Routes>
        {/* --- All your non-dashboard routes stay here --- */}
        <Route path="/" element={<><LandingPage /></>} />

        {/* Auth (non-dashboard) */}
        <Route path="/login" element={<><LoginPage /><Footer /></>} />
       

        {/* Other Pages */}
        <Route path="/contact" element={<><ContactPage /><Footer /></>} />
        <Route path="/mission" element={<><MissionPage /><Footer /></>} />
        <Route path="/member/:id" element={<MemberProfile/>} />
        <Route path="/blogs" element={<BlogListingPage/>} />
  
  

    

        {/* 1. This is now a parent route. Notice the closing </Route> tag at the end. */}
        <Route path="/dashboard" element={<><DashboardPage /></>}>
          
          {/* 2. Add an 'index' route. This loads at /dashboard */}
       
          <Route path="bills" element={<BillsListPage />} />
<Route path="bills/create" element={<CreateBillPage />} />
<Route path="bills/:id" element={<BillDetailPage />} />


    
          
         
          {/* Attendance */}
<Route path="mark-attendance" element={<MarkAttendance />} />
<Route path="meeting-history" element={<MeetingList />} />
<Route path="meetings/:id" element={<ViewAttendancePage />} />
<Route path="meetings/:id/edit" element={<EditAttendancePage />} />

 <Route path="otp" element={<ReqOTP />} />
        <Route path="reset-password" element={<ResetPassword />} />
          

          {/* Members & Teams */}
          <Route path="members" element={<TrackMembersPage />} />
          <Route path="signup" element={<RegPage />} />
          


          {/* Blogs */}
          <Route path="blogs" element={<BlogListingPage />} />
          <Route path="admin-blogs" element={<AdminBlogPage />} />
          <Route path="myblog" element={<MyBlogPage />} />
          <Route path="article" element={<ArticlePage />} />

          {/* Profile - (You didn't have links, but you might want to add them) */}
          <Route path="edit-profile" element={<ProfilePage />} />
          <Route path="view-profile" element={<ViewProfilePage />} />

          {/* Events */}
          <Route path="events" element={<EventsListPage />} />
          <Route path="events/create" element={<EventCreatePage />} />

        </Route> {/* <-- 1. This is the closing tag for the parent route */}


        
           <Route path="/teams" element={<><TeamSection /><Footer /></>} />

        <Route path="/blog/:id" element={<><SinglePostPage /><Footer /></>} />
        <Route path="/blogs/:id/edit" element={<><EditBlogWrapper /><Footer /></>} />
        <Route path="/events/:id" element={<><EventDetailPage /><Footer /></>} />
        <Route path="/team/:title" element={<><TeamPage /><Footer /></>} />
        
        <Route path="/achievement" element={<><AchievementPage /><Footer /></>} />
      </Routes>
    </Router>
  );

}

export default App;