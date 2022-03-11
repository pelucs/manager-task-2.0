import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ActiveContextProvider } from './contextAPI/ActiveElement';
import { AuthContextProvider } from './contextAPI/AuthContext';
import { TaskContextProvider } from './contextAPI/TaskContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TaskContextProvider>
        <ActiveContextProvider>
          <App />
        </ActiveContextProvider>
      </TaskContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);