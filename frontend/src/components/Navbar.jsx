import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import "./Navbar.css";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="py-3 bg-white shadow-sm navbar-animate">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-dark d-flex align-items-center">
          <img src="/acm-comsats-wah-chapter.png" alt="ACM Logo" height="40" className="me-2"/>
          ACM CUI Wah Chapter
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <NavLinks /> {/* Navigation links */}
            <Nav.Link
              as={Link}
              to="/login"
              className="login-link  text-white rounded-pill px-4 py-2 ms-lg-3 fw-semibold" style = {{backgroundColor: "#2a5ea8"}}>
              Log In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
