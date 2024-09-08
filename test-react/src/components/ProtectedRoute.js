import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // O desde donde manejas el estado de autenticación

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;