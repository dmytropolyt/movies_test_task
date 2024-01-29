import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/main.scss';
import { AppProvider } from './context/AppContext.jsx';

const appRootNode = document.getElementById('root');

ReactDOM.createRoot(appRootNode).render(
    <AppProvider>
      <App />
    </AppProvider>
);
