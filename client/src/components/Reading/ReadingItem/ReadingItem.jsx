import React from 'react';

import "./ReadingItem.css";

const ReadingItem = ({ id, title, content }) => {
  return (
    <div className="reading-item card">
      <h3 className="reading-item-title">{title}</h3>
      <p className="reading-item-content">{content}</p>
      <a href={`reading/${id}`} className='btn'>Go to Context</a>
    </div>
  );
};

export default ReadingItem;
