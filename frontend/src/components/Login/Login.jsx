import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import "boxicons/css/boxicons.min.css";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isActive, setIsActive] = useState(false);
  console.log(backendUrl)
  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const [showSignIn, setShowSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/users`, {
        firstName, 
        lastName,
        email,
        password,
      },
      { withCredentials: true }
    );
      console.log(data);
      // Handle successful registration (e.g., redirect to login or home page)
      setIsActive(false); // Automatically switch to login form after registration
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      toast.success("Registration successful.")
    } catch (error) {
      console.error(error);
      toast.error("Email already registered.")
      // Handle registration error (e.g., display error message)
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/users/auth`, { 
        email,
        password,
      }, 
      { withCredentials: true }
    );
      console.log(data);
      setEmail("");
      setPassword("");
      toast.success("Logged in successfully.")
      navigate("/");
      // Handle successful login (e.g., redirect to home page)
    } catch (error) {
      console.error(error);
      toast.error("Email or password is incorrect")
      // Handle login error (e.g., display error message)
    }
  };

  const toggleSignIn = () => {
    setShowSignIn((prevShowSignIn) => !prevShowSignIn);
  };

  return (
    <>
      <div className="login-component" id="web-screen">
        <div className={`container ${isActive ? "active" : ""}`} id="container">
          <div className="form-container sign-up">
            <form onSubmit={handleRegisterSubmit}>
              <h1>Create Account</h1>
              
              
              <input
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form onSubmit={handleLoginSubmit}>
              <h1>Sign In</h1>
             
              
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#">Forget Your Password?</a>
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button
                  className="hidden"
                  id="login"
                  onClick={handleLoginClick}
                >
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button
                  className="hidden"
                  id="register"
                  onClick={handleRegisterClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-component" id="mobile-screen">
        <div className="container">
          <div className={`form-container ${showSignIn ? "sign-in" : "sign-up"}`}>
            {showSignIn ? (
              <form onSubmit={handleLoginSubmit}>
                <h1>Sign In</h1>
                
                
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#">Forgot Your Password?</a>
                <button type="submit">Sign In</button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <h1>Create Account</h1>
                
                
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
              </form>
            )}
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all site features</p>
                <button
                  className="hidden"
                  id="login"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your personal details to use all site features
                </p>
                <button
                  className="hidden"
                  id="register"
                  onClick={() => setShowSignIn(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div className="switch-form">
            {showSignIn ? (
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={toggleSignIn}>
                  Sign Up
                </a>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <a href="#" onClick={toggleSignIn}>
                  Sign In
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
