// src/components/MovieSearch.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MovieSearch.css';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  const API_KEY = '696393edaadacd53f7146e384f4345b5';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
      );
      
      setSearchResults(response.data.results);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(query) && query.trim()) {
        const updatedSearches = [query, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
      }
    } catch (err) {
      setError(err);
      console.error("TMDB API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    // Trigger search immediately
    (async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&include_adult=false`
        );
        
        setSearchResults(response.data.results);
      } catch (err) {
        setError(err);
        console.error("TMDB API Error:", err);
      } finally {
        setLoading(false);
      }
    })();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="movie-search-container">
      <h1>Search Movies</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <div className="recent-searches-header">
            <h3>Recent Searches</h3>
            <button onClick={clearRecentSearches} className="clear-searches-button">
              Clear
            </button>
          </div>
          <div className="recent-searches-list">
            {recentSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearchClick(term)}
                className="recent-search-item"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {loading && <div className="loading">Searching...</div>}
      
      {error && <div className="error-message">Error: {error.message}</div>}
      
      {searchResults.length > 0 ? (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="movie-grid">
            {searchResults.map((movie) => (
              <div key={movie.id} className="movie-card">
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                ) : (
                  <div className="no-poster">No Poster</div>
                )}
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date && new Date(movie.release_date).getFullYear()}</p>
                  <Link to={`/movies/${movie.id}`} className="view-details">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : query && !loading && (
        <div className="no-results">No movies found matching your search.</div>
      )}
    </div>
  );
};

export default MovieSearch;
