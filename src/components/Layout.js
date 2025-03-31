import { Outlet, Link } from "react-router-dom";
import React, { useState } from 'react';
import '../App.css';
import CGpick from "../images/CGpick.png";

const Layout = () => {

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
    <div className="StreamList">
      <div className="CG-marquee">
        <p className="CG-marquee-box">CG StreamList</p>
       <img src={CGpick} className="CG-marquee-image" alt='CG pick icon image'></img> 
      </div>

      <nav>
        <table className="App-divcontainer">
          <td> <Link to="/" className="CGsl-button">  {"  MyList   "} </Link></td>
          <td><Link to="/movies" className="CGsl-button">  {"  movies   "} </Link></td>
          
          <td><Link to="/cart" className="CGsl-button">  {"  cart  "} </Link></td>
          <td><Link to="/about" className="CGsl-button">  {"  about   "} </Link></td>
          

        </table>
      </nav>

      <Outlet />
    </div>
  )
};

export default Layout;



// <td><Link to="/TMDBTemplate" className="CGsl-button">  {"  TMDBTemplate   "} </Link></td>