// frontend/src/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [searchParams] = useSearchParams();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roastText, setRoastText] = useState('');
  const [mainstreamScore, setMainstreamScore] = useState(0);

  useEffect(() => {
    // 1. Grab the access token out of the browser URL address bar
    const token = searchParams.get('token');

    if (!token) {
      setLoading(false);
      return;
    }

    // 2. Use Axios to send a request to our Node backend to fetch top tracks
    axios.get('http://127.0.0.1:5000/api/top-tracks', {
      headers: { 'Authorization': token }
    })
    .then(response => {
      const data = response.data;
      setTracks(data);

      // 3. ROAST LOGIC: Calculate how basic your music taste is safely
      if (data.length > 0) {
        const totalPopularity = data.reduce((sum, track) => {
          // Fallback to 0 if a track lacks popularity metadata to prevent NaN
          const popularityValue = track.popularity || 0; 
          return sum + popularityValue;
        }, 0);

        // Declared exactly ONCE with a safe fallback check
        const averagePopularity = data.length > 0 ? Math.round(totalPopularity / data.length) : 0;
        setMainstreamScore(averagePopularity);

        // Conditional rendering of the roast text based on quantitative data metrics
        if (averagePopularity > 75) {
          setRoastText("Your music taste is so incredibly basic it could power a commercial shopping mall playlist. You don't find music; the radio finds you. Have you ever considered listening to an independent artist, or does that cause physical hives?");
        } else if (averagePopularity > 45) {
          setRoastText("You are caught in the boring middle. You try so hard to look unique by listening to indie songs, but you still panic-stream Top 40 billboard hits when someone hands you the aux cord. Pick a side.");
        } else {
          setRoastText("Oh look at you, aren't we a unique snowflake? Your average popularity score is rock bottom. You listen to songs that sound like a malfunctioning microwave just so you can tell people 'you've probably never heard of them'.");
        }
      }
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching data from backend:", error);
      setLoading(false);
    });
  }, [searchParams]);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#121212', color: '#fff', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <h2>Parsing your questionable playlists... 🤔</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', borderBottom: '2px solid #282828', paddingBottom: '10px' }}>🎸 Your Reality Check Dashboard</h1>
        
        {/* THE ROAST BLOCK CARD */}
        <div style={{ backgroundColor: '#1c1c1e', padding: '25px', borderRadius: '15px', marginTop: '30px', borderLeft: '5px solid #ff453a', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          <h3 style={{ color: '#ff453a', marginTop: 0, fontSize: '1.3rem' }}>The Verdict:</h3>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#f2f2f7', fontStyle: 'italic' }}>"{roastText}"</p>
          <div style={{ marginTop: '20px', fontWeight: 'bold', color: '#b3b3b3' }}>
            Mainstream Score Index: <span style={{ color: '#1DB954', fontSize: '1.4rem' }}>{mainstreamScore}% basic</span>
          </div>
        </div>

        {/* TOP TRACKS LIST GENERATION */}
        <h2 style={{ marginTop: '50px', color: '#b3b3b3' }}>Your Top 10 Most Played Tracks:</h2>
        <div style={{ marginTop: '20px' }}>
          {tracks.map((track, index) => (
            <div key={track.id} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#181818', padding: '12px 20px', borderRadius: '8px', marginBottom: '10px', border: '1px solid #282828' }}>
              <span style={{ fontWeight: 'bold', marginRight: '20px', color: '#b3b3b3', width: '20px' }}>{index + 1}</span>
              <img src={track.album.images[2]?.url} alt="album art" style={{ width: '50px', height: '50px', borderRadius: '4px', marginRight: '20px' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{track.name}</div>
                <div style={{ color: '#b3b3b3', fontSize: '0.9rem', marginTop: '4px' }}>{track.artists.map(a => a.name).join(', ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;