// src/components/OfflineDetector.js
import React, { useState, useEffect } from 'react';
import '../App.css';

const OfflineDetector = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <div className="offline-banner">
      <span role="img" aria-label="offline">📶</span> You are currently offline. Some features may be unavailable.
    </div>
  );
};

export default OfflineDetector;
