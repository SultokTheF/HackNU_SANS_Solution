import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from '../Layouts';
import { Loader } from '../UI';

import useAuthentication from '../../hooks/useAuthentication';

import './UserProfile.css'; // Ensure this CSS file contains the styles provided
import logo from "../../assets/avatars";

const UserProfile = () => {
  const userData = useAuthentication();

  // Function to calculate the user's current level and XP progress
  const calculateUserLevel = (xp) => {
    let level = 1;
    let xpForNextLevel = 1000;

    while (xp >= xpForNextLevel) {
      level++;
      xp -= xpForNextLevel;
      xpForNextLevel *= 2;
    }

    return { level, xp, xpForNextLevel };
  };

  // Calculate user level data based on XP
  const userLevelData = userData ? calculateUserLevel(userData.xp) : { level: 1, xp: 0, xpForNextLevel: 1000 };

  if (!userData) {
    return <Loader />
  }

  return (
    <>
      <Navbar active="profile" />
      <div className="user-profile">
        <div className="profile-header">
          <img src={logo[userData.profile_image]} alt="Profile" className="profile-image"/>
          <div className="user-info">
            <h2 className="username">{userData.username}</h2>
            <p className="name">{userData.first_name} {userData.surname}</p>
            <p className="email">{userData.email}</p>
            <div className="user-level-info">
              <div className="user-level">Level: {userLevelData.level}</div>
              <div className="user-xp">XP: {userData.xp}/{userLevelData.xpForNextLevel}</div>
              <div className="xp-progress-container">
                <div className="xp-progress-bar" style={{ width: `${(userData.xp / userLevelData.xpForNextLevel) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
