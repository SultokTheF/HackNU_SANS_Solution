import React, { useState } from 'react';

import './Navbar.css';
import logo from "../../../assets/images/SANS_logo.png";
import logo_on_hover from "../../../assets/images/SANS_logo_on_hover.png";

import useAuthentication from '../../../hooks/useAuthentication';


const Navbar = ({ active }) => {
  const [isHovered, setIsHovered] = useState(false);
  const userData = useAuthentication();

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">
          <img 
            src={isHovered ? logo_on_hover : logo}
            alt="Education Platform Logo" 
            className="navbar-logo"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        </a>
      </div>
      <ul className="menu-items">
        <li><a href="/profile" className={active=="profile" ? "active" : ""}>Profile</a></li>
        <li><a href="/reading" className={active=="reading" ? "active" : ""}>Reading</a></li>
        <li><a href="/grammar" className={active=="grammar" ? "active" : ""}>Grammar</a></li>
        <li><a href="http://localhost:3000/call" className={active=="speaking" ? "active" : ""}>Speaking</a></li>
        <li><a href="/leaderboard" className={active=="leaderboard" ? "active" : ""}>Leaderboard</a></li>
      </ul>
      {userData ? (
        <div className="auth-buttons">
          <a href="/profile" className="btn">
            {userData.username}
          </a>
        </div>
      ) : (
        <div className="auth-buttons">
          <a href="/authorization" className="btn">
            Authorization
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
