import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './infrastructure/redux/store.js'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
        </LocalizationProvider>
    </Provider>
);
