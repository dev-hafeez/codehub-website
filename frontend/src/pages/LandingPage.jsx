
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
import BlogBanner from '../components/BlogBanner.jsx';
import BlogGrid from '../components/BlogGrid.jsx';
import BlogCard from '../components/BlogCard.jsx';
import BlogOwner from '../components/BlogOwner.jsx';
import Regform from '../components/Regform.jsx'; 





const LandingPage = () => {
  return (
     <div> 

       <div className="landing-page">
      <NavbarComponent />
      <main className="overflow-hidden"> {/* Prevent overflow */}
        <Hero />
       <Achievements/>
       <ClubsSection/>
      <Blog/>
      <EventsSection/>
      <MissionSection/>
      </main>
      <Footer />
    </div>
      
    </div>
  );
};

export default LandingPage;


