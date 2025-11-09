// ============================================================================
// GRADLY V2.5 - FRONTEND ENTRY POINT
// ============================================================================
// Point d'entrée principal de l'application React
// (Sentry frontend optionnel si activé)
// ============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ============================================================================
// SENTRY FRONTEND (Optionnel)
// ============================================================================
// Décommenter si vous voulez activer Sentry frontend
/*
import * as Sentry from '@sentry/react';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay()
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: process.env.NODE_ENV || 'development'
  });
}
*/

// ============================================================================
// DÉSACTIVATION CONSOLE.LOG EN PRODUCTION
// ============================================================================
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  
  // Obfusquer React DevTools (pas de sécurité réelle, juste cosmétique)
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
  }
}

// ============================================================================
// RENDER REACT APP
// ============================================================================
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ============================================================================
// SERVICE WORKER (PWA - Optionnel)
// ============================================================================
// Si vous voulez activer le mode PWA, décommenter ci-dessous
/*
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.error('SW registration failed:', error);
      });
  });
}
*/