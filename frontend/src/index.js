import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClickContextProvider } from './context/ClickContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClickContextProvider>
      <App />
    </ClickContextProvider>
  </React.StrictMode>
);
