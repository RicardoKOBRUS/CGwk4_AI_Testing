// src/components/auth/LoginPlaceholder.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPlaceholder.css';

const LoginPlaceholder = () => {
  return (
    <div className="login-placeholder-container">
      <div className="login-placeholder-header">
        <h2>Login Page (Coming Soon)</h2>
        <p>
          This login page is currently under development. In the meantime, you can explore the movie features as a guest.
        </p>
        <div className="placeholder-links">
          <Link to="/movies" className="placeholder-link">Browse Movies</Link>
          <Link to="/search" className="placeholder-link">Search Movies</Link>
        </div>
      </div>
      
      <div className="password-security-container">
        <h2>Understanding Password Security</h2>
        
        <div className="security-section">
          <h3>Password Salting</h3>
          <p>
            <strong>What is salting?</strong> Salting is a technique where random data (a "salt") is added to a password before hashing it. 
            This ensures that even if two users have the same password, their stored hashes will be different.
          </p>
          <p>
            <strong>Why is it important?</strong> Salting protects against:
          </p>
          <ul>
            <li>Rainbow table attacks (pre-computed hash tables)</li>
            <li>Dictionary attacks</li>
            <li>Identifying users with the same password</li>
          </ul>
          <div className="code-example">
            <pre>
              {`// Example of password salting in Node.js
const crypto = require('crypto');

function hashPassword(password) {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');
  
  // Hash the password with the salt
  const hash = crypto.pbkdf2Sync(
    password, 
    salt, 
    1000,  // iterations
    64,    // key length
    'sha512'
  ).toString('hex');
  
  // Store both the salt and hash
  return { salt, hash };
}

function verifyPassword(password, storedSalt, storedHash) {
  // Hash the provided password with the stored salt
  const hash = crypto.pbkdf2Sync(
    password, 
    storedSalt, 
    1000, 
    64, 
    'sha512'
  ).toString('hex');
  
  // Compare the hashes
  return storedHash === hash;
}`}
            </pre>
          </div>
        </div>
        
        <div className="security-section">
          <h3>Bcrypt</h3>
          <p>
            <strong>What is bcrypt?</strong> Bcrypt is a password-hashing function designed specifically for passwords. 
            It automatically handles salting and implements a slow hashing algorithm to make brute-force attacks impractical.
          </p>
          <p>
            <strong>Key advantages:</strong>
          </p>
          <ul>
            <li>Adaptive work factor (can be increased as computers get faster)</li>
            <li>Built-in salt generation and management</li>
            <li>Designed to be slow, making brute-force attacks expensive</li>
            <li>Industry standard for password storage</li>
          </ul>
          <div className="code-example">
            <pre>
              {`// Example of using bcrypt in Node.js
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  // The cost factor (10) determines how slow the hash function will be
  const saltRounds = 10;
  
  // Generate a salt and hash the password
  const hash = await bcrypt.hash(password, saltRounds);
  
  // The salt is automatically included in the hash
  return hash;
}

async function verifyPassword(password, storedHash) {
  // Compare the provided password with the stored hash
  const match = await bcrypt.compare(password, storedHash);
  return match;
}`}
            </pre>
          </div>
        </div>
        
        <div className="security-section">
          <h3>Best Practices for Password Security</h3>
          <ul>
            <li>Never store passwords in plain text</li>
            <li>Use bcrypt or Argon2 for password hashing</li>
            <li>Implement rate limiting to prevent brute-force attacks</li>
            <li>Enforce strong password policies</li>
            <li>Consider implementing multi-factor authentication</li>
            <li>Regularly audit and update your security practices</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPlaceholder;
