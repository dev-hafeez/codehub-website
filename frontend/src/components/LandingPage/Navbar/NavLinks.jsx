import React from 'react';
import { Nav } from "react-bootstrap";

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const NavLinks = () => {
  return (
    <>
      <Nav.Link 
  onClick={() => scrollToSection("blogs")} 
  className="fw-semibold mx-2 text-white custom-nav-link"
>
  Blog
</Nav.Link>

<Nav.Link 
  onClick={() => scrollToSection("achievement")} 
  className="fw-semibold mx-2 text-white custom-nav-link"
>
  Achievement
</Nav.Link>

<Nav.Link 
  onClick={() => scrollToSection("events")} 
  className="fw-semibold mx-2 text-white custom-nav-link"
>
  Events
</Nav.Link>

<Nav.Link 
  onClick={() => scrollToSection("mission")} 
  className="fw-semibold mx-2 text-white custom-nav-link"
>
  Our Mission
</Nav.Link>

<Nav.Link 
  onClick={() => scrollToSection("contact")} 
  className="fw-semibold mx-2 text-white custom-nav-link"
>
  Contact Us
</Nav.Link>

<Nav.Link 
  onClick={() => scrollToSection("clubs")} 
  className="fw-semibold mx-2 text-white custom-nav-link"
>
  Clubs
</Nav.Link>
 
    </>
  )
}

export default NavLinks;
