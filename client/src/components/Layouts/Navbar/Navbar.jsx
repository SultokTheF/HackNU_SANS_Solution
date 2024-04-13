import React, { useState } from 'react';

import './Navbar.css';
import logo from "../../../assets/images/SANS_logo.png";
import logo_on_hover from "../../../assets/images/SANS_logo_on_hover.png";


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
        <li><a href="/speaking" className={active=="speaking" ? "active" : ""}>Speaking</a></li>
        <li><a href="/leaderboard" className={active=="leaderboard" ? "active" : ""}>Leaderboard</a></li>
      </ul>
      <div className="auth-buttons">
        <a href="/authorization" className="btn">Authorization</a>
      </div>
    </nav>
  );
}

export default Navbar;
