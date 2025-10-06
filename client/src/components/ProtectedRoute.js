import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = usePortfolio();

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
