import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from '@/providers/AppProvider';
import AppRoutes from './routes';
import './index.css';

// Mount React Application to Document Root
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container element was not found in index.html.');
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
