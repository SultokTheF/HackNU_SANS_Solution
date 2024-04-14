import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from '../Layouts';

import './Leaderboard.css'; 
import logo from "../../assets/avatars"; // Ensure this path is correct

import baseURL from '../../store/endpoint';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/leaders/`);
        setLeaders(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaders();
  }, []);

  return (
    <>
      <Navbar active="leaderboard" />
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <table className="leader-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Avatar</th>
              <th>Username</th>
              <th>XP</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr key={leader.id} className={`leader ${index < 3 ? `top-${index + 1}` : ''}`}>
                <td>{index + 1}</td>
                <td>
                  <a href={`/profile/${leader.id}`}>
                    <img
                      src={logo[leader.profile_image]} // Update path as needed
                      alt={`${leader.username}'s profile`}
                      className="profile-image"
                    />
                  </a>
                </td>
                <td>{leader.username}</td>
                <td>{leader.xp} XP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;
