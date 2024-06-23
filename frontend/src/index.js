import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TasksContextProvider } from "./context/TasksContext";
import { SettingsContextProvider } from './context/SettingsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </SettingsContextProvider>

  </React.StrictMode>
);

