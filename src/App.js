// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import MovieSearch from './components/MovieSearch';
import MovieReview from './components/MovieReview';
import ReviewHistory from './components/ReviewHistory';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflineDetector from './components/OfflineDetector';
import PWAStatus from './components/PWAStatus';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <OfflineDetector />
        <PWAInstallPrompt />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/movies/:id/review" element={<MovieReview />} />
            <Route path="/search" element={<MovieSearch />} />
            <Route path="/reviews" element={<ReviewHistory />} />
            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route 
              path="/login" 
              element={
                <div className="placeholder-page">
                  <h2>Login Page (Coming Soon)</h2>
                  <div className="password-security">
                    <h3>Password Security: Salting and Bcrypt</h3>
                    <p>
                      <strong>Password Salting</strong> is a technique where random data (a "salt") is added to a password before hashing it.
                      This ensures that even if two users have the same password, their stored hashes will be different.
                    </p>
                    <p>
                      <strong>Bcrypt</strong> is a password-hashing function designed specifically for passwords.
                      It automatically handles salting and implements a slow hashing algorithm to make brute-force attacks impractical.
                    </p>
                    <p>
                      These techniques are essential for modern password security, protecting against rainbow table attacks,
                      dictionary attacks, and other common password cracking methods.
                    </p>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/register" 
              element={
                <div className="placeholder-page">
                  Register Page (Coming Soon)
                </div>
              } 
            />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
