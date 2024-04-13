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
          <h1 data-name="READING">
            <Link to="/games">READING</Link>
          </h1>
        </li>
        <li className="menu-link">
          <h1 data-name="GRAMMAR">
            <Link to="/user/profile">GRAMMAR</Link>
          </h1>
        </li>
        <li className="menu-link">
          <h1 data-name="SPEAKING">
            <Link to="/leaderboard">SPEAKING</Link>
          </h1>
        </li>
        <li className="menu-link">
          <h1 data-name="leaderboard">
            <Link to="/chat">leaderboard</Link>
          </h1>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
