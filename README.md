# TasteRoaster - Spotify Playlist Analyzer

TasteRoaster is a full-stack web application that logs users into their Spotify accounts, reads their top 10 most played songs, and creates a sarcastic text roast based on how popular or obscure their music taste is. It also displays an analytics dashboard with a custom percentage score.

## How It Works

1. The user clicks the login button on the website interface.
2. The website securely sends the user to Spotify to grant permission to read their top listening data.
3. Spotify sends back a secure access token to our backend server.
4. The frontend application uses this token to fetch the user's top 10 songs and calculate their average popularity rating to display the roast.

## Technologies Used

* Frontend: React.js, React Router, Axios
* Backend: Node.js, Express.js, Dotenv
* External Connection: Spotify Web API

## Local Installation Guide

Follow these steps to run the project on your computer:

### 1. Prerequisites
Make sure you have Node.js installed on your machine.

### 2. Clone the Repository
Run this command in your terminal:
git clone https://github.com/YOUR_USERNAME/Spotify-TasteRoaster.git
cd Spotify-TasteRoaster

### 3. Setup the Backend Engine
Go into the backend folder, install the packages, and turn on the server:
cd backend
npm install
node server.js

Note: Make sure your .env file is present inside this backend folder with your private Spotify Client ID and Client Secret keys.

### 4. Setup the Frontend Website
Open a second terminal window, go into the frontend folder, install its packages, and start the development website:
cd frontend
npm install
npm run dev

Open your internet browser and visit http://localhost:5173 to use the application.
