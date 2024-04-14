import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Navbar } from '../../Layouts';

import './GrammarPage.css';

const GrammarPage = () => {
  const { id } = useParams();
  const [grammarTopic, setGrammarTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    const fetchGrammarTopicAndQuestions = async () => {
      try {
        // Fetch grammar topic by ID
        const grammarTopicResponse = await axios.get(`http://localhost:8000/api/grammar_topics/${id}/`);
        setGrammarTopic(grammarTopicResponse.data);
  
        // Fetch questions for this grammar topic
        const questionsResponse = await axios.get(`http://localhost:8000/api/questions/`);
        const filteredQuestions = questionsResponse.data.filter(q => q.grammar_topic === parseInt(id)); // Client-side filtering
        setQuestions(filteredQuestions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchGrammarTopicAndQuestions();
  }, [id]);

  const handleInputChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async (questionId) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/submit_answer/',
        {
          question_id: questionId,
          user_answer: answers[questionId]
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      // Update the results state based on the response
      setResults((prevResults) => ({
        ...prevResults,
        [questionId]: response.data.correct
      }));
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <>
      <Navbar active="grammar" />
      <div className="grammar-page">
        <div className="grammar-topic">
          <h1>{grammarTopic?.title}</h1>
          <p>{grammarTopic?.content}</p>
        </div>
        <div className="questions">
          {questions.map((question) => (
            <div key={question.id} className="question-item">
              <p className="question-text">{question.text}</p>
              <div className="answer-options">
                <label>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={question.option_one}
                    checked={answers[question.id] === question.option_one}
                    onChange={() => handleInputChange(question.id, question.option_one)}
                  />
                  {question.option_one}
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={question.option_two}
                    checked={answers[question.id] === question.option_two}
                    onChange={() => handleInputChange(question.id, question.option_two)}
                  />
                  {question.option_two}
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={question.option_three}
                    checked={answers[question.id] === question.option_three}
                    onChange={() => handleInputChange(question.id, question.option_three)}
                  />
                  {question.option_three}
                </label>
              </div>
              <button onClick={() => handleSubmit(question.id)}>Submit Answer</button>
              {results[question.id] !== undefined && (
                <div className="result-feedback">
                  {results[question.id] ? (
                    <p className="correct-answer">Your answer is correct!</p>
                  ) : (
                    <p className="wrong-answer">Your answer is incorrect!</p>
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

export default GrammarPage;
