
import React from 'react';
import EventsSection from '../components/EventSection';
import Footer from '../components/Footer.jsx';
import Achievements from '../components/Achievements.jsx'; 
import AchievementCard from '../components/AchievementCard.jsx';
import Blog from '../components/Blog.jsx';
import NavbarComponent from '../components/NavbarComponent.jsx';
import Hero from '../components/Hero.jsx';
import ClubsSection from '../components/ClubsSection.jsx';
import MissionSection from '../components/MissionSection.jsx';
import "../styles/LandingPage.css";



const LandingPage = () => {
  return (
     <div> 

       <div className="landing-page">
      <NavbarComponent />
      <main className="overflow-hidden">
  <div id="hero"><Hero /></div>
  <div id="achievement"><Achievements /></div>
  <div id="clubs"><ClubsSection /></div>
  <div id="blogs"><Blog /></div>
  <div id="events"><EventsSection /></div>
  <div id="mission"><MissionSection /></div>
</main>
      <Footer />
    </div>
      
    </div>
  
  );
};

export default LandingPage;


