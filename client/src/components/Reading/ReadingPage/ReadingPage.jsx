import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Navbar } from '../../Layouts';

import './ReadingPage.css';

const ReadingPage = () => {
  const { id } = useParams();
  const [context, setContext] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchContextAndQuestions = async () => {
      try {
        // Fetch context by ID
        const contextResponse = await axios.get(`http://localhost:8000/api/contexts/${id}/`);
        setContext(contextResponse.data);
  
        // Fetch questions for this context
        const questionsResponse = await axios.get(`http://localhost:8000/api/context_questions/`);
        const filteredQuestions = questionsResponse.data.filter(q => q.text.toString() === id); // Client-side filtering
        setQuestions(filteredQuestions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchContextAndQuestions();
  }, [id]);

  const handleInputChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = (questionId) => {
    const answer = answers[questionId];
    console.log(`Answer for question ${questionId}:`, answer);
    // Here you would typically send the answer to the backend
  };

  return (
    <>
      <Navbar active="reading" />
      <div className="context-page">
        <div className="context">
          <h1>{context?.title}</h1>
          <p>{context?.content}</p>
        </div>
        <div className="questions">
          {questions.map((question) => (
            <div key={question.id} className="question-item">
              <p className="question-text">{question.question_text}</p>
              <input
                type="text"
                value={answers[question.id] || ''}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
              <button onClick={() => handleSubmit(question.id)}>Submit Answer</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReadingPage;
