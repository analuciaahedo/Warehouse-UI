import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from './Components/Context/UserContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2) Envuelve <App /> con <UserProvider> */}
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();

