import React from 'react';
import Login from '../components/Login.jsx';

import Footer from '../components/Footer.jsx';
import NavbarComponent from '../components/NavbarComponent.jsx';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLinks from "../components/NavLinks.jsx";


const LoginPage = () => {
    return (
        <div className="p-0 m-0">
            <Navbar expand="lg" className="py-3 shadow-sm navbar-animate nav">
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Login Component */}
            <Login />

            {/* Footer */}
            <Footer />
        </div>

    );
};

export default LoginPage;
