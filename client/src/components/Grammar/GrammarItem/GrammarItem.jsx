// GrammarItem.js
import React from 'react';

import "./GrammarItem.css";

const GrammarItem = ({ id, title, content }) => {
  return (
    <div className="grammar-item card">
      <h3 className="grammar-item-title">{title}</h3>
      <p className="grammar-item-content">{content}</p>
      <a href={`grammar/${id}`} className='btn'>Go to Grammar Topic</a>
    </div>
  );
};

export default GrammarItem;
