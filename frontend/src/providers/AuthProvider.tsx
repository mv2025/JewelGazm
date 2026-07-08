import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGoogleOneTapLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface User {
  email: string;
  name: string;
  picture: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define allowed admins based on user's screenshot
const ALLOWED_ADMINS = ['mridulverma7676@gmail.com', 'abhaysaini082002@gmail.com', 'jewelgazm@gmail.com'];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load from session storage on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsReady(true);
  }, []);

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const email = decoded.email;
      
      const isAdmin = ALLOWED_ADMINS.includes(email);

      const userData: User = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        isAdmin,
      };

      setUser(userData);
      
      // Store in session storage so it persists across refreshes
      sessionStorage.setItem('adminUser', JSON.stringify(userData));
    }
  };

  // Automatically trigger One Tap if not logged in
  useGoogleOneTapLogin({
    onSuccess: handleSuccess,
    onError: () => console.log('Google One Tap Login Failed'),
    cancel_on_tap_outside: false, // Keep it open so they see it on load
  });

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('adminUser');
  };

  return (
    <AuthContext.Provider value={{ user, logout, isReady }}>
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
