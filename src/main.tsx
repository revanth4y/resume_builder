import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BuildProvider } from './context/BuildContext';
import { ResumeProvider } from './context/ResumeContext';
import { TemplateProvider } from './context/TemplateContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BuildProvider>
        <ResumeProvider>
          <TemplateProvider>
            <App />
          </TemplateProvider>
        </ResumeProvider>
      </BuildProvider>
    </BrowserRouter>
  </React.StrictMode>
);
