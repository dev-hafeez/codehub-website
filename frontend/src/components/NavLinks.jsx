import React from 'react'
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";


const NavLinks = () => {
  return (
    <>
        <Nav.Link as={Link} to="/blog" className="fw-semibold mx-2 text-white">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/achievement" className="fw-semibold mx-2 text-white">
              Achievement
            </Nav.Link>
            <Nav.Link as={Link} to="/teams" className="fw-semibold mx-2 text-white">
              Teams
            </Nav.Link>
            <Nav.Link as={Link} to="/mission" className="fw-semibold mx-2 text-white">
              Our Mission
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-semibold mx-2 text-white">
              Contact Us
            </Nav.Link>
            <Nav.Link as={Link} to="/clubs" className="fw-semibold mx-2 text-white">
              Clubs
            </Nav.Link>    
    </>
  )
}

export default NavLinks
