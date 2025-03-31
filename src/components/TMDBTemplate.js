import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TMDBTemplate = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//  const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Store in .env.local
  const API_KEY = 'e1d40ffd3f975bd0804dc8a31ce6e170';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Or another size

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
  }, [API_KEY]); // Dependency array, re-run if API_KEY changes (unlikely)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message} API key is {API_KEY}</div>;
  }

  return (
    <div>
      <h1>Popular Movies</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ margin: '10px', textAlign: 'center' }}>
            {movie.poster_path && (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                style={{ maxWidth: '100px' }}
              />
            )}
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TMDBTemplate;