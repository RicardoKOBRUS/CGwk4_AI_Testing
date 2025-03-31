// src/components/MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  const API_KEY = '696393edaadacd53f7146e384f4345b5';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      
      // Check if we have cached data
      const cachedData = localStorage.getItem(`movie_${id}`);
      const cacheTimestamp = localStorage.getItem(`movie_${id}_timestamp`);
      
      // Cache is valid for 24 hours
      const cacheValid = cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < 24 * 60 * 60 * 1000;
      
      if (cachedData && cacheValid) {
        const data = JSON.parse(cachedData);
        setMovie(data);
        setLoading(false);
      } else {
        try {
          // Fetch movie details
          const movieResponse = await axios.get(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images`
          );
          
          // Fetch cast information
          const creditsResponse = await axios.get(
            `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
          );
          
          // Save to localStorage with timestamp
          localStorage.setItem(`movie_${id}`, JSON.stringify(movieResponse.data));
          localStorage.setItem(`movie_${id}_timestamp`, Date.now().toString());
          
          setMovie(movieResponse.data);
          setCast(creditsResponse.data.cast.slice(0, 10)); // Get top 10 cast members
        } catch (err) {
          setError(err);
          console.error("TMDB API Error:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMovieDetails();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (!movie) {
    return <div className="error-message">Movie not found</div>;
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get trailer key if available
  const getTrailerKey = () => {
    if (!movie.videos || !movie.videos.results) return null;
    const trailer = movie.videos.results.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer ? trailer.key : null;
  };

  const trailerKey = getTrailerKey();

  return (
    <div className="movie-details-container">
      {movie.backdrop_path && (
        <div 
          className="movie-backdrop" 
          style={{ backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})` }}
        >
          <div className="backdrop-overlay"></div>
        </div>
      )}
      
      <div className="movie-details-content">
        <div className="movie-details-header">
          <div className="movie-poster-container">
            {movie.poster_path ? (
              <img 
                src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                alt={movie.title} 
                className="movie-poster"
              />
            ) : (
              <div className="no-poster">No Poster</div>
            )}
          </div>
          
          <div className="movie-info-container">
            <h1 className="movie-title">
              {movie.title} 
              <span className="movie-year">
                ({movie.release_date && new Date(movie.release_date).getFullYear()})
              </span>
            </h1>
            
            <div className="movie-meta">
              <span className="movie-release-date">
                {movie.release_date && new Date(movie.release_date).toLocaleDateString()}
              </span>
              {movie.genres && (
                <span className="movie-genres">
                  {movie.genres.map(genre => genre.name).join(', ')}
                </span>
              )}
              {movie.runtime > 0 && (
                <span className="movie-runtime">{formatRuntime(movie.runtime)}</span>
              )}
            </div>
            
            <div className="movie-rating">
              <span className="rating-value">
                <span className="star">★</span> {movie.vote_average.toFixed(1)}/10
              </span>
              <span className="vote-count">({movie.vote_count} votes)</span>
            </div>
            
            {movie.tagline && (
              <div className="movie-tagline">"{movie.tagline}"</div>
            )}
            
            <div className="movie-overview-section">
              <h3>Overview</h3>
              <p className="movie-overview">{movie.overview}</p>
            </div>
            
            <div className="movie-details-actions">
              <Link to={`/movies/${id}/review`} className="review-button">
                Write a Review
              </Link>
              {trailerKey && (
                <a 
                  href={`https://www.youtube.com/watch?v=${trailerKey}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="trailer-button"
                >
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="movie-details-body">
          <div className="movie-cast-section">
            <h3>Top Cast</h3>
            <div className="cast-list">
              {cast.length > 0 ? (
                cast.map(person => (
                  <div key={person.id} className="cast-item">
                    {person.profile_path ? (
                      <img 
                        src={`${IMAGE_BASE_URL}${person.profile_path}`} 
                        alt={person.name} 
                        className="cast-profile"
                      />
                    ) : (
                      <div className="no-profile">
                        <span>{person.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="cast-info">
                      <div className="cast-name">{person.name}</div>
                      <div className="cast-character">{person.character}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-cast">No cast information available</div>
              )}
            </div>
          </div>
          
          <div className="movie-additional-info">
            <h3>Additional Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Status</span>
                <span className="info-value">{movie.status}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Original Language</span>
                <span className="info-value">
                  {movie.original_language && movie.original_language.toUpperCase()}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Budget</span>
                <span className="info-value">{formatCurrency(movie.budget)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Revenue</span>
                <span className="info-value">{formatCurrency(movie.revenue)}</span>
              </div>
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div className="info-item">
                  <span className="info-label">Production</span>
                  <span className="info-value">
                    {movie.production_companies.map(company => company.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
