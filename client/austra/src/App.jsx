import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'; // Import Router components
import RegisterForm from './components/RegisterForm '; // Corrected import without extra space
import LoginForm from "./components/LoginForm" // You can create a LoginForm component

function App() {
  return (
   <Router>
      <div className="min-h-screen bg-gray-100">
      
        
        <Routes>
          {/* Redirect root to login page */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Route for login */}
          <Route path="/login" element={<LoginForm />} />
          
          {/* Route for register */}
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
