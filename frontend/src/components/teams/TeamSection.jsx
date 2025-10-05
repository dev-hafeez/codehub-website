import React from 'react';
import TeamsCard from './TeamsCard.jsx';
import './TeamSection.css';

import codeHubImage from '../../assets/codehub.jpg';
import socialImage from '../../assets/social.jpg';
import eventsImage from '../../assets/events.jpg';
import graphicsImage from '../../assets/graphics.jpg';
import decorImage from '../../assets/decor.jpg';
import Navbar from '../Navbar.jsx';

const teamData = [
  { image: codeHubImage, title: 'Code Hub', description: 'CodeHub is a dynamic club under the Association for Computing Machinery (ACM) that brings together students passionate about coding, problem-solving, and technology. It serves as a collaborative space where members can enhance their programming skills, share knowledge, and work on real-world projects. Through coding competitions, workshops, and peer-to-peer learning, CodeHub empowers students to grow as developers and innovators while fostering a strong community of tech enthusiasts.' },
  { image: socialImage, title: 'Social Media and Marketing',  description: 'The Social Media & Marketing Club under the Association for Computing Machinery (ACM) is dedicated to building creativity, communication, and digital presence. The club focuses on exploring the latest trends in social media, content creation, branding, and marketing strategies. Members collaborate to design campaigns, manage online platforms, and develop practical skills that bridge technology with creativity. By blending innovation and outreach, the club empowers students to become effective digital storytellers and marketing leaders.' },
  { image: eventsImage, title: 'Events and Logistics',  description: 'The Events & Logistics Club under the Association for Computing Machinery (ACM) is the backbone of planning, organizing, and executing successful activities. The club ensures that every workshop, competition, and gathering runs smoothly by handling coordination, scheduling, and on-ground management. Members develop strong leadership, teamwork, and organizational skills while gaining hands-on experience in event planning. With precision and dedication, the Events & Logistics Club transforms ideas into impactful experiences for the entire ACM community.' },
  { image: graphicsImage, title: 'Graphics and Media',  description: 'The Graphics & Media Club under the Association for Computing Machinery (ACM) brings creativity and technology together through design and visual storytelling. The club focuses on graphic design, video editing, animation, and digital media production to support ACM’s events, promotions, and initiatives. Members learn industry-relevant tools, sharpen their artistic skills, and collaborate on real projects that showcase innovation and imagination. By combining design with technology, the Graphics & Media Club transforms ideas into engaging visual experiences.' },
  { image: decorImage, title: 'Decor and Registration',  description: 'The Décor & Registration Club under the Association for Computing Machinery (ACM) ensures that every event feels welcoming, vibrant, and well-organized. The club manages event aesthetics through creative decorations and designs while also handling smooth registration processes for participants. Members gain experience in hospitality, planning, and creative presentation, contributing to the overall atmosphere and professionalism of ACM events. With a balance of creativity and coordination, the Décor & Registration Club makes every event both seamless and memorable.' },
];

const TeamSection = () => {
  

  return (
    <>
    <Navbar/>
    <div className="team-section">
      <div className="team-container">
        <h1 className="team-title">Our Teams</h1>
       

        <div className="team-cards">
          {teamData.map((team, index) => (
            <div key={index} className="card-wrapper">
              <TeamsCard
                image={team.image}
                title={team.title}
                description={team.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
 
    </>
  );
};

export default TeamSection;
