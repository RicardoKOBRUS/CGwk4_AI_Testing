// src/components/Movies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '696393edaadacd53f7146e384f4345b5';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        setMovies(response.data.results);
      } catch (err) {
        setError(err);
        console.error("TMDB API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="movies-container">
      <h1>Popular Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
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
  );
};

export default Movies;
