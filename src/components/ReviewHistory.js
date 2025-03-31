// src/components/ReviewHistory.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ReviewHistory.css';

const ReviewHistory = () => {
  const [reviewHistory, setReviewHistory] = useState([]);
  
  useEffect(() => {
    // Load review history from localStorage
    const savedHistory = localStorage.getItem('reviewHistory');
    if (savedHistory) {
      setReviewHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your review history?')) {
      localStorage.removeItem('reviewHistory');
      setReviewHistory([]);
    }
  };
  
  if (reviewHistory.length === 0) {
    return (
      <div className="review-history-container">
        <h2>Your Review History</h2>
        <div className="no-reviews">
          <p>You haven't reviewed any movies yet.</p>
          <Link to="/movies" className="browse-link">Browse Movies</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="review-history-container">
      <div className="history-header">
        <h2>Your Review History</h2>
        <button onClick={clearHistory} className="clear-history-button">
          Clear History
        </button>
      </div>
      
      <div className="review-list">
        {reviewHistory.map((item, index) => (
          <div key={index} className="review-item">
            <div className="review-item-title">{item.movieTitle}</div>
            <div className="review-item-date">
              Reviewed on: {new Date(item.date).toLocaleDateString()}
            </div>
            <div className="review-item-actions">
              <Link to={`/movies/${item.movieId}`} className="view-movie-link">
                View Movie
              </Link>
              <Link to={`/movies/${item.movieId}/review`} className="view-review-link">
                View/Edit Review
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewHistory;
