import React, { useState } from 'react';

import './Navbar.css';
import logo from "../../assets/images/SANS_logo.png";
import logo_on_hover from "../../assets/images/SANS_logo_on_hover.png";


const Navbar = ({ active }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="http:/localhost:5173/">
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
        <li><a href="http://localhost:5173/profile" className={active=="profile" ? "active" : ""}>Profile</a></li>
        <li><a href="http://localhost:5173/reading" className={active=="reading" ? "active" : ""}>Reading</a></li>
        <li><a href="http://localhost:5173/grammar" className={active=="grammar" ? "active" : ""}>Grammar</a></li>
        <li><a href="http://localhost:5173/speaking" className="active">Speaking</a></li>
        <li><a href="http://localhost:5173/leaderboard" className={active=="leaderboard" ? "active" : ""}>Leaderboard</a></li>
      </ul>
      <div className="auth-buttons">
        <a href="http:/localhost:5173/" className="btn">
          End Session
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
