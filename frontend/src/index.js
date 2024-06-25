import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TasksContextProvider } from "./context/TasksContext";
import { SettingsContextProvider } from './context/SettingsContext';
import { MainClockContextProvider } from './context/MainClockContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainClockContextProvider>
      <SettingsContextProvider>
        <TasksContextProvider>
          <App />
        </TasksContextProvider>
      </SettingsContextProvider>
    </MainClockContextProvider>
  </React.StrictMode>
);

