// import React from 'react';
// import TeamsCard from './TeamsCard'; // Adjust path if necessary
// import '../styles/TeamSection.css';

// import codeHubImage from '../assets/codehub.jpg';
// import socialImage from '../assets/social.jpg';
// import eventsImage from '../assets/events.jpg';
// import graphicsImage from '../assets/graphics.jpg';
// import decorImage from '../assets/decor.jpg';

// const teamData = [
//   {
//     image: codeHubImage,
//     title: 'Code Hub',
//     role: 'Senior Front-end Developer',
//     description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
//   },
//   {
//     image: socialImage,
//     title: 'Social Media and Marketing',
//     role: 'Senior Front-end Developer',
//     description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
//   },
//   {
//     image: eventsImage,
//     title: 'Events and Logistics',
//     role: 'Senior Front-end Developer',
//     description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
//   },
//   {
//     image: graphicsImage,
//     title: 'Graphics and Media',
//     role: 'Senior Front-end Developer',
//     description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
//   },
//   {
//     image: decorImage,
//     title: 'Decor and Registration',
//     role: 'Senior Front-end Developer',
//     description: 'Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
//   },
// ];

// const TeamSection = () => {
//   return (
//     <div className="team-section">
//       <div className="team-container">
//         <h1 className="team-title">Our Teams</h1>
//         <p className="team-subtitle">
//           Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
//         </p>

//         <div className="team-cards">
//           {teamData.map((team, index) => (
//             <TeamsCard
//               key={index}
//               image={team.image}
//               title={team.title}
//               role={team.role}
//               description={team.description}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamSection;


import React, { useRef, useEffect, useState } from 'react';
import TeamsCard from './TeamsCard.jsx';
import '../styles/TeamSection.css';

import codeHubImage from '../assets/codehub.jpg';
import socialImage from '../assets/social.jpg';
import eventsImage from '../assets/events.jpg';
import graphicsImage from '../assets/graphics.jpg';
import decorImage from '../assets/decor.jpg';

const teamData = [
  { image: codeHubImage, title: 'Code Hub', role: 'Senior Front-end Developer', description: 'Worem ipsum dolor sit amet...' },
  { image: socialImage, title: 'Social Media and Marketing', role: 'Senior Front-end Developer', description: 'Worem ipsum dolor sit amet...' },
  { image: eventsImage, title: 'Events and Logistics', role: 'Senior Front-end Developer', description: 'Worem ipsum dolor sit amet...' },
  { image: graphicsImage, title: 'Graphics and Media', role: 'Senior Front-end Developer', description: 'Worem ipsum dolor sit amet...' },
  { image: decorImage, title: 'Decor and Registration', role: 'Senior Front-end Developer', description: 'Worem ipsum dolor sit amet...' },
];

const TeamSection = () => {
  const scrollRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollX(scrollRef.current.scrollLeft);
    };

    const scrollEl = scrollRef.current;
    scrollEl.addEventListener('scroll', handleScroll);

    return () => {
      scrollEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="team-section">
      <div className="team-container">
        <h1 className="team-title">Our Teams</h1>
        <p className="team-subtitle">
          Worem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="team-cards" ref={scrollRef}>
          {teamData.map((team, index) => {
            const offset = scrollX / 300; // adjust 300 to your card width
            const translateX = Math.max(0, (index - offset) * 40); // overlap effect
            const zIndex = 100 - index; // keep order consistent

            return (
              <div
                key={index}
                className="card-wrapper"
                style={{
                  transform: `translateX(-${translateX}px)`,
                  zIndex,
                }}
              >
                <TeamsCard
                  image={team.image}
                  title={team.title}
                  role={team.role}
                  description={team.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
