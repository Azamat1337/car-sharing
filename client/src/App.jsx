import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfileRequest } from "./infrastructure/redux/user/slice.js";
import { lightTheme, darkTheme } from './infrastructure/routes/theme.js';
import { ThemeProvider, CssBaseline } from '@mui/material';

function App() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(fetchProfileRequest());
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <BrowserRouter>
                <AppRouter setDarkMode={setDarkMode} darkMode={darkMode} />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
