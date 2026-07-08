import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isReady } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  // If user is not logged in, redirect to home page and prompt them to login
  if (!user || !user.isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
