// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';

// What this file does: 
// This is the absolute root entry point of your frontend. It maps out your 
// website URLs so your browser knows which component to show on screen.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* If the URL is just http://localhost:5173, show the Home Login screen */}
        <Route path="/" element={<App />} />
        
        {/* If the URL is http://localhost:5173/dashboard, show the Roast screen */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);