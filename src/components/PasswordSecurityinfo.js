// src/components/PasswordSecurityInfo.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PasswordSecurityInfo.css';

const PasswordSecurityInfo = () => {
  return (
    <div className="security-container">
      <div className="security-content">
        <h1>Password Security Information</h1>
        
        <section className="security-section">
          <h2>Why Password Security Matters</h2>
          <p>
            Strong passwords are your first line of defense against unauthorized access to your accounts.
            With the increasing number of data breaches, it's more important than ever to understand
            how to create and manage secure passwords.
          </p>
        </section>
        
        <section className="security-section">
          <h2>Password Hashing</h2>
          <p>
            When you create an account on our platform, we don't store your actual password.
            Instead, we use a technique called "hashing" to convert your password into a
            fixed-length string of characters that appears random.
          </p>
          <p>
            Hashing is a one-way function, meaning that once your password is hashed,
            it cannot be reversed to reveal the original password.
          </p>
        </section>
        
        <section className="security-section">
          <h2>What is Salting?</h2>
          <p>
            A "salt" is a random string that is added to your password before hashing.
            This ensures that even if two users have the same password, their hashed
            passwords will be different due to the unique salt.
          </p>
          <p>
            Salting provides protection against:
          </p>
          <ul>
            <li>Rainbow table attacks (pre-computed tables of hash values)</li>
            <li>Dictionary attacks (trying common passwords)</li>
            <li>Brute force attacks (trying all possible combinations)</li>
          </ul>
        </section>
        
        <section className="security-section">
          <h2>How We Protect Your Password</h2>
          <p>
            Our application uses bcrypt, a powerful hashing algorithm specifically designed for passwords.
            Bcrypt automatically handles salting and includes a "work factor" that makes the hashing process
            deliberately slow to resist brute force attacks.
          </p>
        </section>
        
        <section className="security-section">
          <h2>Tips for Creating Strong Passwords</h2>
          <ul>
            <li>Use at least 12 characters</li>
            <li>Include a mix of uppercase and lowercase letters</li>
            <li>Add numbers and special characters</li>
            <li>Avoid common words or phrases</li>
            <li>Don't use personal information</li>
            <li>Use different passwords for different accounts</li>
            <li>Consider using a password manager</li>
          </ul>
        </section>
        
        <div className="security-navigation">
          <Link to="/login" className="security-button">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordSecurityInfo;
/* src/components/PasswordSecurityInfo.css */
.security-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f5f5f5;
}

.security-content {
  max-width: 800px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.security-content h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 2px solid #2196f3;
  padding-bottom: 15px;
}

.security-section {
  margin-bottom: 30px;
}

.security-section h2 {
  color: #2196f3;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.security-section p {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #555;
}

.security-section ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.security-section li {
  margin-bottom: 8px;
  line-height: 1.5;
  color: #555;
}

.security-navigation {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.security-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #2196f3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.security-button:hover {
  background-color: #1976d2;
}

@media (max-width: 768px) {
  .security-content {
    padding: 20px;
  }
}
