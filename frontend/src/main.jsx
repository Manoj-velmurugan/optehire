// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { ClerkProvider } from '@clerk/clerk-react'

// // Import your Publishable Key
// const PUBLISHABLE_KEY = import.meta.env.local.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error(PUBLISHABLE_KEY)
// }

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ClerkProvider frontendApi={PUBLISHABLE_KEY}>
//       <App />
//      </ClerkProvider>
//   </StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
