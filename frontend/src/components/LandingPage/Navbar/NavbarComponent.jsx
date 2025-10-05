import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks.jsx";
import "./NavbarComponent.css";
import useAuthStore from "../../../store/authStore.js";

const NavbarComponent = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <Navbar expand="lg" className="py-3 shadow-sm custom-navbar-animate custom-navbar">
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center custom-navbar-brand"
        >
          <img
            src="/acm-comsats-wah-chapter.png"
            alt="ACM Logo"
            height="40"
            className="me-2"
          />
          <span className="custom-navbar-title text-white">
            ACM CUI Wah Chapter
          </span>
        </Navbar.Brand>


        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end custom-navbar-collapse">
          <Nav className="align-items-center">
            <NavLinks /> 
         
            {token && (
              <Nav.Link
                as={Link}
                to="/dashboard"
                className="custom-dashboard-link1 px-4 py-2 ms-lg-3 fw-semibold"
              >
                Dashboard
              </Nav.Link>
            )}

            {token ? (
              <Nav.Link
                onClick={handleLogout}
                className="custom-login-link1 px-4 py-2 ms-lg-3 fw-semibold"
              >
                Log Out
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="custom-login-link px-4 py-2 ms-lg-3 fw-semibold"
              >
                Log In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
