// src/components/EventDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import "./EventDetail.css";
import Navbar from "../../components/Navbar";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/events/${id}/`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return null;

  const heroImage = event.images.length > 0 ? event.images[0].image : null;
  const galleryImages = event.images.slice(1);

  return (
    <>
    {/* <Navbar/> */}
    <div className="container my-5 mx-9">
     

      {/* Title */}
      <h1 className="event-title-text">{event.title}</h1>

      {/* Date */}
      <div className="event-meta my-2">
        <span>
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Hero Image */}
      {heroImage && (
        <img
          src={heroImage}
          alt="Event"
          className="img-fluid rounded mb-4 event-hero"
        />
      )}

      {/* Content */}
      <div className="event-content">
        {event.content}
      </div>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <div className="event-gallery mt-5">
          <h3 className="gallery-title">Gallery</h3>
          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <img
                key={img.id}
                src={img.image}
                alt="event gallery"
                className="gallery-image"
              />
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default EventDetailPage;
