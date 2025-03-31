// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
        
        // Check for updates on page load
        registration.update();
        
        // Set up periodic updates
        setInterval(() => {
          registration.update();
          console.log('Checking for service worker updates');
        }, 60 * 60 * 1000); // Check every hour
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error);
      });
  });
}

// Request notification permission
if ('Notification' in window && navigator.serviceWorker) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted');
    }
  });
}

// Register for background sync if available
if ('serviceWorker' in navigator && 'SyncManager' in window) {
  navigator.serviceWorker.ready.then(registration => {
    // Register background sync
    registration.sync.register('sync-favorites')
      .then(() => {
        console.log('Background sync registered');
      })
      .catch(err => {
        console.error('Background sync registration failed:', err);
      });
  });
}

reportWebVitals();
