import React from 'react';
import './GetStarted.css';

const GetStarted = ({ onGetStarted }) => {
  return (
    <div className="gs-container">
      <h1 className="gs-title">Baybayin Application</h1>
      <p className="gs-tagline">Discover heritage, daily posts, history, and more.</p>
      <button className="gs-button" onClick={onGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default GetStarted;
