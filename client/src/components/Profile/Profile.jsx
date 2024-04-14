import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Navbar } from '../Layouts';
import { Loader } from '../UI';

import './UserProfile.css'; // Make sure the styles provided are here
import logo from "../../assets/avatars";

import baseURL from '../../store/endpoint';

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/user/${id}/`);
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

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

  if (isLoading) {
    return <Loader />;
  }

  if (!userData) {
    return <div>User not found.</div>;
  }

  const userLevelData = calculateUserLevel(userData.xp);

  return (
    <>
      <Navbar active="profile" />
      <div className="user-profile">
        <div className="profile-header">
          <img 
            src={logo[userData.profile_image]} 
            alt={`${userData.username}'s profile`} 
            className="profile-image"
          />
          <div className="user-info">
            <h2 className="username">{userData.username}</h2>
            <p className="name">{userData.first_name} {userData.surname}</p>
            <p className="email">{userData.email}</p>
            <div className="user-level-info">
              <div className="user-level">Level: {userLevelData.level}</div>
              <div className="user-xp">XP: {userData.xp}/{userLevelData.xpForNextLevel}</div>
              <div className="xp-progress-container">
                <div 
                  className="xp-progress-bar" 
                  style={{ width: `${(userData.xp / userLevelData.xpForNextLevel) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
