import React from 'react';
import Login from '../components/Login.jsx';

import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import { Link } from "react-router-dom";
import NavLinks from "../components/NavLinks.jsx";


const LoginPage = () => {
    return (
        <div className="p-0 m-0">
            <Navbar />

            {/* Login Component */}
            <Login />

            {/* Footer */}
            <Footer />
        </div>

    );
};

export default LoginPage;
