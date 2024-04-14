import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from '../../Layouts';

import ReadingItem from '../ReadingItem/ReadingItem';

import baseURL from '../../../store/endpoint';

import "./ReadingList.css";

const ReadingList = () => {
  const [contexts, setContexts] = useState([]);

  useEffect(() => {
    const fetchContexts = async () => {
      const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
      if (!accessToken) {
        console.error('No access token available.');
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/contexts/`);
        setContexts(response.data);
      } catch (error) {
        console.error('There was an error fetching the context questions!', error);
      }
    };

    fetchContexts();
  }, []);

  return (
    <div className="reading-list">
      <Navbar active="reading" />
      {contexts.map((context) => (
        <ReadingItem key={context.id} id={context.id} title={context.title} content={context.content} />
      ))}
    </div>
  );
};

export default ReadingList;
