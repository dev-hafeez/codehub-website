import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import "../styles/NavbarComponent.css";
import useAuthStore from "../store/authStore.js";


const NavbarComponent = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect to login page after logout
  };

  return (
    <Navbar expand="lg" className="py-3 shadow-sm navbar-animate nav">
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center navbar-brand"
      
        >
          <img
            src="/acm-comsats-wah-chapter.png"
            alt="ACM Logo"
            height="40"
            className="me-2"
          />
          <span className="text-white" >
    ACM cui Wah Chapter
  </span>
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <NavLinks /> {/* Navigation links */}

            {/* Dashboard button visible only if logged in */}
            {token && (
              <Nav.Link
                as={Link}
                to="/dashboard"
                className="dashboard-link px-4 py-2 ms-lg-3 fw-semibold"
                style={{ backgroundColor: "#ffffff" ,color:'#2D66AD', cursor: "pointer"}}
              >
                Dashboard
              </Nav.Link>
            )}

            {/* Login / Logout */}
            {token ? (
              <Nav.Link
                onClick={handleLogout}
                className="login-link px-4 py-2 ms-lg-3 fw-semibold"
                style={{ backgroundColor: "#ffffff", cursor: "pointer" }}
              >
                Log Out
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="login-link px-4 py-2 ms-lg-3 fw-semibold"
                style={{ backgroundColor: "#ffffff" }}
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
