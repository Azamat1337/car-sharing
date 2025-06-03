import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfileRequest } from "./infrastructure/redux/user/slice.js";
import { lightTheme, darkTheme } from './infrastructure/routes/theme.js';
import { ThemeProvider, CssBaseline } from '@mui/material';

function App() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token && !profile) {
            dispatch(fetchProfileRequest());
        }
    }, [dispatch, profile]);

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