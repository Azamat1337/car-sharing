import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

export const Context = createContext(null);

createRoot(document.getElementById('root')).render(<App />);
