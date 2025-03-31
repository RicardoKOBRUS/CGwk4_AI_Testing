import React, { useState } from 'react';
import CGpick from "../images/CGpick.png";

function StreamList() {

  const [movie, setMovie] = useState('');
  const [movieList, setMovieList] = useState([]);

  const handleChange = (e) => {
    setMovie(e.target.value);
  };

  const handleAddMovie = () => {
    if (movie) {
      setMovieList([...movieList, movie]);
      setMovie('');
      console.log(movieList);
    }
  };

  return (
    
    <div className="CGsl-paragraph">

      <div className="streamlist">      
        <input
          type="text"
          value={movie}
          onChange={handleChange}
          placeholder="Enter a movie or program"
        />
        <button onClick={handleAddMovie}>Add to List</button>
        <ul>
          {movieList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      
    </div>

  );
}

export default StreamList