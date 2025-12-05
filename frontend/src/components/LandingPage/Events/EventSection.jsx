import React, { useRef, useEffect, useState } from 'react';
import axiosInstance from '../../../axios';
import ellipseImage from '../../../assets/ellipse1.png';
import { Link } from 'react-router-dom'; 
import './EventSection.css';

const EventSection = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get('/events/');
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const updateScrollPosition = () => {
    if (!scrollRef.current || !scrollRef.current.firstChild) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.firstChild.offsetWidth + 32; // width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    scrollContainer.addEventListener('scroll', updateScrollPosition);
    return () => scrollContainer.removeEventListener('scroll', updateScrollPosition);
  }, []);

  return (
    <section className="events-section3">
      <img src={ellipseImage} alt="Background Ellipse" className="ellipse-bg" />

      <div className="container-fluid px-4 position-relative z-1">
        <h1 className="events-heading-text">Events</h1>

        <div ref={scrollRef} className="event-cards-scroll mt-4">
          {events.length > 0 ? (
            events.map((event) => (
              <div className="event-card-wrapper" key={event.id}>
                <div className="event-card shadow-lg">
                 
                  {event.images && event.images.length > 0 ? (
                    <img
                      src={event.images[0].image}
                      className="card-img-top img-fluid"
                      alt={event.title}
                    />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}

                  {/* Event Details */}
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.content}</p>
                    <p className="card-date">
                      <strong>Date:</strong> {event.date}
                    </p>

                  
                    <Link
                      to={`/events/${event.id}`}
                      className="text-decoration-none text-primary fw-bold"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">No events available.</p>
          )}
        </div>

        {/* Scroll dots */}
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
