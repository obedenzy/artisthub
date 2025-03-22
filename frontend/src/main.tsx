import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { validateEnv } from './config/env';

// Validate environment variables before starting the app
try {
  validateEnv();
} catch (error) {
  console.error(error);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
