import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from '../../Layouts';

import GrammarItem from '../GrammarItem/GrammarItem'; // Assuming you have a GrammarItem component

import "./GrammarList.css";

const GrammarList = () => {
  const [grammarTopics, setGrammarTopics] = useState([]);

  useEffect(() => {
    const fetchGrammarTopics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/grammar_topics/');
        setGrammarTopics(response.data);
      } catch (error) {
        console.error('There was an error fetching the grammar topics!', error);
      }
    };

    fetchGrammarTopics();
  }, []);

  return (
    <div className="grammar-list">
      <Navbar active="grammar" />
      {grammarTopics.map((topic) => (
        <GrammarItem key={topic.id} id={topic.id} title={topic.title} content={topic.content} />
      ))}
    </div>
  );
};

export default GrammarList;