import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loginToShopify, logoutFromShopify, checkAuthStatus } from '../shopify/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  customer: any | null; // Ideally strongly typed based on your Shopify Customer model
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use TanStack Query to verify the session based on cookies/tokens depending on your flow
  const { data, isLoading } = useQuery({
    queryKey: ['authStatus'],
    queryFn: checkAuthStatus,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: data?.isAuthenticated || false, 
        customer: data?.customer || null, 
        isLoading, 
        login: loginToShopify, 
        logout: logoutFromShopify 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
