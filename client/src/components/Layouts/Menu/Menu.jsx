import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/SANS_logo.png";
import logo_on_hover from "../../../assets/images/SANS_logo_on_hover.png";
import "./Menu.css"; 

const Menu = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="menu flex">
      <img
        src={isHovered ? logo_on_hover : logo}
        alt="BattleXO Logo"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />

      <ul>
        <li className="menu-link">
          <h1 data-name="PROFILE">
            <Link to="/profile">PROFILE</Link>
          </h1>
        </li>
        <li className="menu-link">
          <h1 data-name="READING">
            <Link to="/reading">READING</Link>
          </h1>
        </li>
        <li className="menu-link">
          <h1 data-name="GRAMMAR">
            <Link to="/grammar">GRAMMAR</Link>
          </h1>
        </li>
        <li className="menu-link">
          <h1 data-name="SPEAKING">
            <Link to="/speaking">SPEAKING</Link>
          </h1>
        </li>
        <li className="menu-link">
          <h1 data-name="leaderboard">
            <Link to="/leaderboard">leaderboard</Link>
          </h1>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
