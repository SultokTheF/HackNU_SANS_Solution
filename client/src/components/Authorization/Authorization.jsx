import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

import "./Authorization.css";
import logo from "../../assets/images/SANS_logo.png";
import logo_on_hover from "../../assets/images/SANS_logo_on_hover.png";

const baseURL = "http://localhost:8000/api";

const Authorization = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "user",
    user_level: 1,
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const handleSignUpClick = () => container.classList.add("right-panel-active");
    const handleSignInClick = () => container.classList.remove("right-panel-active");

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', handleSignUpClick);
      signInButton.addEventListener('click', handleSignInClick);
    }

    return () => {
      if (signUpButton && signInButton) {
        signUpButton.removeEventListener('click', handleSignUpClick);
        signInButton.removeEventListener('click', handleSignInClick);
      }
    };
  }, []);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  const handleInputChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/register/`, userData);
      if (response.status === 201) {
        setUserData({ ...userData, username: "", email: "", password: "" });
        alert("Registration successful");
      } else {
        setRegisterError("Something went wrong! Try later");
      }
    } catch (e) {
      setRegisterError("Enter unique credentials! This username may already be in use");
      console.error("Error:", e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/login/`, userData);
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem("accessToken", access);
        Cookies.set('refreshToken', refresh, { expires: 30 });
        alert("Login successful");
      } else {
        setLoginError("Something went wrong! Try later");
      }
    } catch (error) {
      setLoginError("Invalid email or password!");
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="authorization flex">
        <a href="/">
          <img
            src={isHovered ? logo_on_hover : logo}
            alt="qush"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        </a>
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={handleRegister}>
              <h1 className="active">Create Account</h1>
              <div className="social-container">
                <button type="button" className="login-with-google-btn" >
                  You also cannot Sign up with Google
                </button>
              </div>
              <span>or use your email for registration</span>
              <input 
                type="text" 
                placeholder="username"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <div className="error">
                {registerError}
              </div>
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h1 className="active">Sign in</h1>
              <div className="social-container">
                <button type="button" className="login-with-google-btn" >
                  You cannot Sign in with Google
                </button>
              </div>
              <span>or use your account</span>
              <input 
                type="email" 
                placeholder="Email" 
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <input 
                type="password" 
                placeholder="Password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <div className="error">
                {loginError}
              </div>
              <button>Login</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Already have an account?</h1>
                <p>Then go use system!</p>
                <button className="ghost" id="signIn">Login</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Dont have an account?</h1>
                <p>Then join our community!</p>
                <button className="ghost" id="signUp">Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authorization;
