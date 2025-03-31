// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // Get user from localStorage
  const userStr = localStorage.getItem('user');
  const currentUser = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie Explorer</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/movies" className="navbar-item">Movies</Link>
        <Link to="/search" className="navbar-item">Search</Link>
        <Link to="/reviews" className="navbar-item">My Reviews</Link>
        {isAuthenticated ? (
          <>
            <span className="navbar-item user-greeting">
              Hello, {currentUser?.username || 'User'}
            </span>
            <button onClick={handleLogout} className="navbar-item logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
