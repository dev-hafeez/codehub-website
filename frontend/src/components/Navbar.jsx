import React, { useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Form,
  Button
} from "react-bootstrap";
import { Link ,useNavigate} from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { BsSearch } from "react-icons/bs";
import "../styles/Navbar.css";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const navigate = useNavigate()
  
  const [searchQuery, setSearchQuery] = useState("");
  const { token, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // Conditional rendering for auth buttons
  const renderAuthButtons = () => {
    if (!token) {
      return (
        <Link to="/login" className="login-link px-4 py-2 ms-lg-3 fw-semibold"
                style={{ backgroundColor: "#ffffff", cursor: "pointer" }}>
          Login
        </Link>
      );
    }

    // For any logged-in role → Only Logout
    return (
      <>
       <Button 
    type="button" 
    className="login-link px-4 py-2 ms-lg-3 fw-semibold"
    style={{ backgroundColor: "#ffffff", cursor: "pointer" }}
    onClick={() => navigate('/forgot-password')}
  >
    Reset password
  </Button>

      <Button
        onClick={handleLogout}
        className="login-link px-4 py-2 ms-lg-3 fw-semibold"
                style={{ backgroundColor: "#ffffff", cursor: "pointer" }}
        
      >
        Logout
      </Button>
      </>
    );
  };

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar shadow-sm">
      <Container fluid className="px-4">
        {/* Desktop Logo  */}
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="d-none d-lg-flex align-items-center text-white fw-bold"
        >
          <img
            src="/acm-comsats-wah-chapter.png"
            alt="ACM Logo"
            className="navbar-logo"
          />
          <span className="ms-2">Acm Cui Wah Chapter</span>
        </BootstrapNavbar.Brand>

        {/* Mobile Search Bar */}
        <div
          className="d-flex d-lg-none flex-grow-1 me-2 search-bar"
          style={{ width: "50px" }}
        >
          <Form className="w-100 position-relative">
            <Form.Control
              type="search"
              placeholder="Search"
              className="search-input pe-4"
              size="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery === "" && <BsSearch className="search-icon" />}
          </Form>
        </div>

        {/* Mobile Theme Toggle only */}
        <div className="d-flex d-lg-none align-items-center">
          <ThemeToggle />
        </div>

        {/* Toggle for mobile */}
        <BootstrapNavbar.Toggle
          aria-controls="navbar-nav"
          className="ms-2 bg-light"
        />

        <BootstrapNavbar.Collapse
          id="navbar-nav"
          className="w-100 mt-2 mt-lg-0"
        >
          <Nav className="nav-links d-flex flex-lg-row flex-column align-items-lg-center align-items-center mx-auto">
            <Nav.Link
              as={Link}
              to="/achievement"
              className="text-white fw-semibold"
            >
              Achievement
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/teams"
              className="text-white fw-semibold"
            >
              Teams
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/mission"
              className="text-white fw-semibold"
            >
              Our Mission
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className="text-white fw-semibold"
            >
              Contact us
            </Nav.Link>

            {/* Auth Buttons in Collapse for Mobile */}
            <div className="d-flex d-lg-none mt-3 justify-content-center">
              {renderAuthButtons()}
            </div>
          </Nav>

          {/* Right Section (Desktop only) */}
          <div className="d-none d-lg-flex align-items-center">
            {/* Search Bar */}
            <Form className="d-flex me-2 position-relative">
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-input pe-4"
                size="sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery === "" && <BsSearch className="search-icon" />}
            </Form>

            {/* Toggle Button */}
            <ThemeToggle />

            {/* Auth Buttons for Desktop */}
            {renderAuthButtons()}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
