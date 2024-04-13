import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from '../Layouts';
import './UserProfile.css'; // Ensure this CSS file contains the styles provided

import logo from "../../assets/avatars";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No access token available.');
        // Handle the lack of a token, e.g., by redirecting to login
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error, e.g., by showing an error message
      }
    };

    fetchUserData();
  }, []);

  // Calculate user level data based on XP
  const userLevelData = userData ? calculateUserLevel(userData.xp) : { level: 1, xp: 0, xpForNextLevel: 1000 };

  if (!userData) {
    return <div>Loading...</div>;
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
