// src/components/PWAInstallPrompt.js
import React, { useState, useEffect } from 'react';
import '../App.css';

const PWAInstallPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPromptEvent(event);
      // Show the install button
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPromptEvent) {
      return;
    }
    
    // Show the install prompt
    installPromptEvent.prompt();
    
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the saved prompt since it can't be used again
      setInstallPromptEvent(null);
      setShowPrompt(false);
    });
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="pwa-install-container">
      <div className="pwa-install-prompt">
        <div className="pwa-install-content">
          <img src="/logo192.png" alt="CGStreamList Logo" className="pwa-logo" />
          <div className="pwa-text">
            <h3>Install CGStreamList</h3>
            <p>Install this app on your device for quick and easy access when you're on the go.</p>
          </div>
        </div>
        <div className="pwa-install-actions">
          <button className="pwa-install-button" onClick={handleInstallClick}>
            Install
          </button>
          <button className="pwa-dismiss-button" onClick={() => setShowPrompt(false)}>
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
