import React, { useRef, useEffect, useState } from 'react';
import eventImage from '../assets/events.jpg';
import ellipseImage from '../assets/ellipse1.png';
import '../styles/EventSection.css';

const events = [
  {
    title: 'ChatGPT Cheatsheet for UX Designers',
    description: `AI won't replace designers, but designers who use AI will.
    Learn how to streamline your workflow, improve prototypes, and generate ideas with the help of AI tools like ChatGPT.`,
    image: eventImage,
  },
  {
    title: 'AI Tools for UI/UX Productivity',
    description: `Explore how modern designers leverage AI tools for rapid wireframing, content suggestions, and improving collaboration.`,
    image: eventImage,
  },
  {
    title: 'Smart Prototyping with ChatGPT',
    description: `Discover how to use AI for faster prototyping, better feedback, and smarter iteration cycles.`,
    image: eventImage,
  },
  {
    title: 'Future of UX with AI',
    description: `What’s next for designers in a world powered by AI? Learn how AI is transforming user research and accessibility.`,
    image: eventImage,
  },
  {
    title: 'Prompt Engineering for Designers',
    description: `Understand the art of prompt writing tailored to design tasks. Live examples using ChatGPT, Midjourney, and more.`,
    image: eventImage,
  },
];

const EventSection = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollPosition = () => {
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.firstChild.offsetWidth + 32; // width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener('scroll', updateScrollPosition);
    return () => scrollContainer.removeEventListener('scroll', updateScrollPosition);
  }, []);

  return (
    <section className=" bg-white position-relative events-section">
      <img src={ellipseImage} alt="Background Ellipse" className="ellipse-bg" />

      <div className="container-fluid px-4 position-relative z-1">
        <h1 className="events-heading-text">Events</h1>

        <div ref={scrollRef} className="event-cards-scroll mt-4">
          {events.map((event, index) => (
            <div className="event-card-wrapper" key={index}>
              <div className="card shadow-lg event-card">
                <img src={event.image} className="card-img-top img-fluid rounded-top" alt="event" />
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text text-muted">{event.description}</p>
                  <a href="#" className="text-decoration-none text-primary fw-bold">Read More →</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="scroll-dots d-flex justify-content-center mt-3">
          {events.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${activeIndex === idx ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
