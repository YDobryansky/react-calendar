import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

const rootElement = document.querySelector('#root');

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
