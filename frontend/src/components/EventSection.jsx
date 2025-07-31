import React from 'react';
import eventImage from '../assets/events.jpg';
import ellipseImage from '../assets/ellipse.png';
import '../styles/EventSection.css';


const events = [
  {
    title: 'ChatGPT Cheatsheet for UX Designers',
    description: `AI won't replace designers, but designers who use AI will.
    Learn how to streamline your workflow, improve prototypes, and generate ideas with the help of AI tools like ChatGPT. 
    Discover the latest prompts, design tricks, and conversational patterns used in the industry. 
    Make sure you’re not left behind as the design world evolves with AI.`,
    image: eventImage,
  },
  {
    title: 'AI Tools for UI/UX Productivity',
    description: `Explore how modern designers leverage AI tools for rapid wireframing, content suggestions, and improving collaboration between teams.
    From Figma plugins to smart design audits, this event covers how to maximize design workflows and minimize repetitive tasks. 
    Real-world case studies and tools breakdown included.`,
    image: eventImage,
  },
  {
    title: 'Smart Prototyping with ChatGPT',
    description: `Discover how to use AI for faster prototyping, better feedback, and smarter iteration cycles.
    This guide includes step-by-step demo prompts, AI toolkits, and visual examples from top design teams.`,
    image: eventImage,
  },
  {
    title: 'Future of UX with AI',
    description: `What’s next for designers in a world powered by artificial intelligence? 
    Learn how AI is transforming the user research process, personalization, A/B testing, and accessibility. 
    Expert panel insights, career tips, and resources provided.`,
    image: eventImage,
  },
  {
    title: 'Prompt Engineering for Designers',
    description: `Understand the art of prompt writing tailored to design tasks. 
    Discover how a single well-written prompt can replace hours of manual effort. 
    Live examples using ChatGPT, Midjourney, and more.`,
    image: eventImage,
  },
];

const EventSection = () => {
  return (
    <section className="py-5 bg-light position-relative events-section">
      <img src={ellipseImage} alt="Background Ellipse" className="ellipse-bg" />

      <div className="container-fluid px-5 position-relative z-1">
        <h1 className="events-heading-text">Events</h1>

        <div className="event-cards-scroll mt-4">
          {events.map((event, index) => (
            <div className="event-card-wrapper" key={index}>
              <div className="card shadow-lg event-card">
                <img src={event.image} className="card-img-top img-fluid rounded-top" alt="event" />
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text text-muted">{event.description}</p>
                  <a href="#" className="text-decoration-none text-primary fw-bold">
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
