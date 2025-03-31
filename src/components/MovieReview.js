// src/components/MovieReview.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieReview.css';

const MovieReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [savedReview, setSavedReview] = useState(null);
  const [movieTitle, setMovieTitle] = useState('');
  
  // Load movie title and existing review from localStorage on component mount
  useEffect(() => {
    const savedMovieData = localStorage.getItem(`movie_${id}`);
    if (savedMovieData) {
      const parsedData = JSON.parse(savedMovieData);
      setMovieTitle(parsedData.title || 'This Movie');
    }
    
    const existingReview = localStorage.getItem(`review_${id}`);
    if (existingReview) {
      const parsedReview = JSON.parse(existingReview);
      setSavedReview(parsedReview);
      setReview(parsedReview.text);
      setRating(parsedReview.rating);
    }
  }, [id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const reviewData = {
      movieId: id,
      text: review,
      rating: rating,
      date: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem(`review_${id}`, JSON.stringify(reviewData));
    
    // Update state
    setSavedReview(reviewData);
    
    // Add to review history
    const reviewHistory = JSON.parse(localStorage.getItem('reviewHistory') || '[]');
    const updatedHistory = [
      { movieId: id, movieTitle, date: new Date().toISOString() },
      ...reviewHistory.filter(item => item.movieId !== id)
    ].slice(0, 10); // Keep only the 10 most recent
    
    localStorage.setItem('reviewHistory', JSON.stringify(updatedHistory));
    
    alert('Your review has been saved!');
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      localStorage.removeItem(`review_${id}`);
      setSavedReview(null);
      setReview('');
      setRating(5);
      
      // Remove from review history
      const reviewHistory = JSON.parse(localStorage.getItem('reviewHistory') || '[]');
      const updatedHistory = reviewHistory.filter(item => item.movieId !== id);
      localStorage.setItem('reviewHistory', JSON.stringify(updatedHistory));
      
      alert('Your review has been deleted.');
    }
  };
  
  return (
    <div className="movie-review-container">
      <h2>Review for {movieTitle}</h2>
      
      {savedReview ? (
        <div className="saved-review">
          <div className="review-header">
            <div className="review-rating">
              Rating: {savedReview.rating}/10
            </div>
            <div className="review-date">
              Reviewed on: {new Date(savedReview.date).toLocaleDateString()}
            </div>
          </div>
          <div className="review-text">
            {savedReview.text}
          </div>
          <div className="review-actions">
            <button onClick={() => setSavedReview(null)} className="edit-button">
              Edit Review
            </button>
            <button onClick={handleDelete} className="delete-button">
              Delete Review
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="rating">Rating (1-10):</label>
            <input
              type="range"
              id="rating"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="rating-slider"
            />
            <span className="rating-value">{rating}</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="review">Your Review:</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="6"
              placeholder="Write your thoughts about this movie..."
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">
            Save Review
          </button>
        </form>
      )}
      
      <div className="back-links">
        <Link to={`/movies/${id}`} className="back-link">
          Back to Movie Details
        </Link>
      </div>
    </div>
  );
};

export default MovieReview;
