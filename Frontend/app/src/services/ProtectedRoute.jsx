import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" />;
  }

  const userRoles = user.roles || [];
  if (!roles.some(role => userRoles.includes(role))) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
