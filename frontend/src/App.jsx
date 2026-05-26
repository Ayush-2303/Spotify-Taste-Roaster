// frontend/src/App.jsx
import React from 'react';

// What this file does:
// This is your Home Page screen. It has a single, massive design mission:
// Send the user over to our backend login endpoint to kickstart the Spotify OAuth process.
function App() {
  const handleLogin = () => {
    // Redirects the browser directly to our Node.js backend port
    window.location.href = 'http://127.0.0.1:5000/api/login';
  };

  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#ffffff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>🎵 TasteRoaster</h1>
      <p style={{ color: '#b3b3b3', marginBottom: '30px', fontSize: '1.2rem' }}>
        Let's give your music taste a brutal reality check.
      </p>
      
      <button 
        onClick={handleLogin}
        style={{
          backgroundColor: '#1DB954', // Spotify Green
          color: '#ffffff',
          border: 'none',
          padding: '15px 35px',
          borderRadius: '30px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0px 4px 15px rgba(29, 185, 84, 0.4)',
          transition: 'transform 0.2s ease'
        }}
      >
        Connect Your Spotify
      </button>
    </div>
  );
}

export default App;