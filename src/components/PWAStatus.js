// src/components/PWAStatus.js
import React, { useState, useEffect } from 'react';
import '../App.css';

const PWAStatus = () => {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Check if app is running in standalone mode
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches || 
                   window.navigator.standalone === true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isStandalone) {
    return null;
  }

  return (
    <div className={`pwa-status ${!isOnline ? 'offline' : ''}`}>
      <span role="img" aria-label="status">
        {isOnline ? '🟢' : '🔴'}
      </span>
      {isOnline ? 'Connected' : 'Offline'}
    </div>
  );
};

export default PWAStatus;
