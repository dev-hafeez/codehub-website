import React from "react";
import "../styles/Login.css";
import { PersonFill } from "react-bootstrap-icons";

const Login = () => {
    return (
        <div className="login-container d-flex flex-column align-items-center">

            <div className="login-card text-center">
                <h2 className="welcome-text text-black">WELCOME BACK</h2>
                <form className="mt-4">
                    <div className="form-group mb-3 text-start">
                        <label htmlFor="email" className="text-black">EMAIL</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control custom-input"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group mb-4 text-start">
                        <label htmlFor="password" className="text-black">PASSWORD</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control custom-input"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn btn-dark login-btn ">
                        LOGIN
                    </button>
                </form>
                <div className="icon-container ">
                    <PersonFill size={30} />
                </div>
            </div>
            <img
                src="acm-comsats-wah-chapter.png" // replace with your actual ACM logo
                alt="ACM Logo"
                className="acm-logo mt-4 my-4"
            />
        </div>
    );
};

export default Login;
