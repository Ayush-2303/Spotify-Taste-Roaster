const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Pulling your secret keys out of the hidden .env file safely
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

// ROUTE 1: Kickstart the login process
// When the user clicks login on our frontend, we send them to Spotify's official login page.
// We bundle our Client ID and the permissions (scopes) we need—like reading their top tracks.
app.get('/api/login', (req, res) => {
    const scope = 'user-read-private user-read-email user-top-read';
    
    const spotifyAuthUrl = 'https://accounts.spotify.com/authorize?' + 
        new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI
        }).toString();
        
    res.redirect(spotifyAuthUrl);
});

// ROUTE 2: Handle Spotify's response after the user successfully logs in
// Spotify sends a temporary "authorization code" to this callback endpoint.
// Our backend takes that code, mixes it with our hidden Client Secret, and sends a fast, secure
// handshake back to Spotify via Axios to trade it for a permanent "Access Token".
app.get('/api/callback', async (req, res) => {
    const code = req.query.code || null;

    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI
            }).toString(),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                // Basic authentication header formatting required by Spotify
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
            }
        });

        // This is the golden key that allows us to fetch their real music data later
        const accessToken = response.data.access_token;
        
        // Redirect the user back to our React frontend dashboard, passing along the token in the URL
        res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${accessToken}`);
    } catch (error) {
        console.error('Authentication Error:', error.response?.data || error.message);
        res.redirect(`${process.env.FRONTEND_URL}?error=auth_failed`);
    }
});

// ROUTE 3: Fetch the music data using the access token
app.get('/api/top-tracks', async (req, res) => {
    const token = req.headers.authorization; // The frontend will pass the token here

    try {
        const spotifyResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            params: {
                limit: 10,               // Fetch top 10 songs
                time_range: 'medium_term' // Data from the last ~6 months
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        res.json(spotifyResponse.data.items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch music statistics from Spotify' });
    }
});

// Turn the server on and listen for incoming traffic on Port 5000
app.listen(5000, () => console.log('🚀 Backend server running on http://127.0.0.1:5000'));