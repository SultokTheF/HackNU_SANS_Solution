import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Navbar } from '../../Layouts';

import baseURL from '../../../store/endpoint';

import './ReadingPage.css';

const ReadingPage = () => {
  const { id } = useParams();
  const [context, setContext] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchContextAndQuestions = async () => {
      try {
        // Fetch context by ID
        const contextResponse = await axios.get(`${baseURL}/api/contexts/${id}/`);
        setContext(contextResponse.data);
  
        // Fetch questions for this context
        const questionsResponse = await axios.get(`${baseURL}/api/context_questions/`);
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

  const handleSubmit = async (questionId) => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
    if (!accessToken) {
      console.error('No access token available.');
      // Handle the lack of a token, e.g., by showing an error message to the user
      return;
    }
  
    const answer = answers[questionId];
    const questionText = questions.find(q => q.id === questionId).question_text;
    const contextText = context?.content;
  
    try {
      const response = await axios.post(`${baseURL}/api/compare_answers/`, {
        context: contextText,
        question: questionText,
        user_answer: answer
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      // Update the results state with the response data
      setResults(prevResults => ({
        ...prevResults,
        [questionId]: response.data
      }));
  
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
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

              {results[question.id] && (
                <div className="result-feedback">
                  <p>Model Answer: {results[question.id].model_answer}</p>
                  {results[question.id].similarity_score >= 0.50 && (
                    <p className="correct-answer">✔️ This is correct</p>
                  )}
                  {results[question.id].similarity_score < 0.50 && (
                    <p className="wrong-answer">X This is wrong</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReadingPage;
