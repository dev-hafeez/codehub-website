import React from 'react';
import Login from '../components/Login.jsx';

import Footer from '../components/Footer.jsx';
import NavbarComponent from '../components/NavbarComponent.jsx';



const LoginPage = () => {
    return (
        <div className="p-0 m-0">
            <NavbarComponent />

            {/* Login Component */}
            <Login />

            {/* Footer */}
            <Footer />
        </div>

    );
};

export default LoginPage;
