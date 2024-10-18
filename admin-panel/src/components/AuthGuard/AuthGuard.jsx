// src/components/AuthGuard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem('authToken'); // Assume token is stored in localStorage

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, render the child components (protected routes)
};

export default AuthGuard;