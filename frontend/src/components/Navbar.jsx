import React, { useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Form,
  Button
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { BsSearch } from "react-icons/bs";
import "../styles/Navbar.css";
import useAuthStore from "../store/authStore";
import ProfileOptions from "./ProfileOptions";
import { PersonCircle } from "react-bootstrap-icons";
import axiosInstance from "../axios";   // IMPORTANT

const Navbar = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { token } = useAuthStore();
  const [showOptions, setShowOptions] = useState(false);

  // 🔍 Handle typing in search bar
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const [blogsRes, eventsRes] = await Promise.all([
        axiosInstance.get(`/blogs/?search=${query}`),
        axiosInstance.get(`/events/?search=${query}`)
      ]);

      const results = [
        ...blogsRes.data.map((b) => ({
          id: b.id,
          title: b.title,
          type: "blog",
        })),
        ...eventsRes.data.map((ev) => ({
          id: ev.id,
          title: ev.title,
          type: "event",
        })),
      ];

      setSearchResults(results);
      setShowDropdown(true);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // When clicking a search result
  const handleResultClick = (result) => {
    setShowDropdown(false);
    setSearchQuery("");

    navigate(
      result.type === "blog"
        ? `/blog/${result.id}`
        : `/events/${result.id}`
    );
  };

  const renderAuthButtons = () => {
    if (!token) {
      return (
        <Link
          to="/login"
          className="login-link px-4 py-2 ms-lg-3 fw-semibold"
          style={{ backgroundColor: "#ffffff", cursor: "pointer" }}
        >
          Login
        </Link>
      );
    }

    return (
      <>
        <Button
          variant="light"
          className="login-link px-3 py-2 ms-lg-3 fw-semibold"
          style={{ backgroundColor: "#ffffff", cursor: "pointer" }}
          onClick={() => setShowOptions(!showOptions)}
        >
          <PersonCircle size={24} color="#0c4182" />
        </Button>

        {showOptions && <ProfileOptions navigate={navigate} />}
      </>
    );
  };

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar1 shadow-sm">
      <Container fluid className="px-4">
        {/* Logo */}
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
          <span className="ms-2">ACM CUI WAH CHAPTER</span>
        </BootstrapNavbar.Brand>

        {/* Mobile Search */}
        <div
          className="d-flex d-lg-none flex-grow-1 me-2 position-relative"
          style={{ width: "50px" }}
        >
          <Form className="w-100 position-relative">
            <Form.Control
              type="search"
              placeholder="Search"
              className="search-input pe-4"
              size="sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery === "" && <BsSearch className="search-icon" />}

            {/* Mobile Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((item, index) => (
                  <div
                    key={index}
                    className="search-item"
                    onClick={() => handleResultClick(item)}
                  >
                    {item.title} <span style={{ opacity: 0.6 }}>({item.type})</span>
                  </div>
                ))}
              </div>
            )}
          </Form>
        </div>

        <BootstrapNavbar.Toggle
          aria-controls="navbar-nav"
          className="ms-2 bg-light"
        />

        <BootstrapNavbar.Collapse id="navbar-nav" className="w-100">
          {/* Navigation Links */}
          <Nav className="nav-links d-flex flex-lg-row flex-column align-items-lg-center align-items-center mx-auto mt-lg-0 mt-2">
            <Nav.Link as={Link} to="/achievement" className="text-white fw-semibold">
              Achievement
            </Nav.Link>
            <Nav.Link as={Link} to="/teams" className="text-white fw-semibold">
              Teams
            </Nav.Link>
            <Nav.Link as={Link} to="/mission" className="text-white fw-semibold">
              Our Mission
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white fw-semibold">
              Contact us
            </Nav.Link>
          </Nav>

          {/* Desktop Right Section */}
          <div className="d-none d-lg-flex align-items-center position-relative">
            {/* Search Bar */}
            <Form className="d-flex me-2 position-relative">
              <Form.Control
                type="search"
                placeholder="Search"
                className="search-input pe-4"
                size="sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery === "" && <BsSearch className="search-icon" />}

              {/* Desktop Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map((item, index) => (
                    <div
                      key={index}
                      className="search-item"
                      onClick={() => handleResultClick(item)}
                    >
                      {item.title} <span style={{ opacity: 0.6 }}>({item.type})</span>
                    </div>
                  ))}
                </div>
              )}
            </Form>

            {renderAuthButtons()}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
