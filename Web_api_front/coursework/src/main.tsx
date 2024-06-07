import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="161766947259-dbj0a2bde7nk063ocl1049jje6194qi0.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
