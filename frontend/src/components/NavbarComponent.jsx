import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="py-3  shadow-sm navbar-animate nav">
      <Container>
        {/* Brand */}
       <Navbar.Brand
  as={Link}
  to="/"
  className="fw-bold text-dark d-flex align-items-center"
>
  <img src="/acm-comsats-wah-chapter.png" alt="ACM Logo" height="40" className="me-2" />
  <p className="text-white mb-0">ACM cui Wah Chapter</p>
</Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <NavLinks /> {/* Navigation links */}
            <Nav.Link
              as={Link}
              to="/login"
              className="login-link  text-white  px-4 py-2 ms-lg-3 fw-semibold" style = {{backgroundColor: "#0C4182"}}>
              Log In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
