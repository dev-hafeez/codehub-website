// import React from 'react'
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// import "../styles/Navbar.css";


// const NavLinks = () => {
//   return (
//     <>

//         <Nav.Link as={Link} to="/blogs" className="fw-semibold mx-2 text-white">

//               Blog
//             </Nav.Link>
//             <Nav.Link as={Link} to="/achievement" className="fw-semibold mx-2 text-white">
//               Achievement
//             </Nav.Link>
//             <Nav.Link as={Link} to="/teams" className="fw-semibold mx-2 text-white">
//               Teams
//             </Nav.Link>
//             <Nav.Link as={Link} to="/mission" className="fw-semibold mx-2 text-white">
//               Our Mission
//             </Nav.Link>
//             <Nav.Link as={Link} to="/contact" className="fw-semibold mx-2 text-white">
//               Contact Us
//             </Nav.Link>
//             <Nav.Link as={Link} to="/clubs" className="fw-semibold mx-2 text-white">
//               Clubs
//             </Nav.Link>    
//     </>
//   )
// }

// export default NavLinks

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
      <Nav.Link onClick={() => scrollToSection("blogs")} className="fw-semibold mx-2 text-white">Blog</Nav.Link>
      <Nav.Link onClick={() => scrollToSection("achievement")} className="fw-semibold mx-2 text-white">Achievement</Nav.Link>
      <Nav.Link onClick={() => scrollToSection("events")} className="fw-semibold mx-2 text-white">Events</Nav.Link>
      <Nav.Link onClick={() => scrollToSection("mission")} className="fw-semibold mx-2 text-white">Our Mission</Nav.Link>
      <Nav.Link onClick={() => scrollToSection("contact")} className="fw-semibold mx-2 text-white">Contact Us</Nav.Link>
      <Nav.Link onClick={() => scrollToSection("clubs")} className="fw-semibold mx-2 text-white">Clubs</Nav.Link>    
    </>
  )
}

export default NavLinks;
