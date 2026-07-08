import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from '@/providers/AppProvider';
import AppRoutes from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

// Mount React Application to Document Root
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container element was not found in index.html.');
}

createRoot(container).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-client-id.apps.googleusercontent.com'}>
      <BrowserRouter>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
