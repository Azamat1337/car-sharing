import { cloneElement } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { authRoutes, publicRoutes } from '../routes.jsx';
import Header from './Header.jsx'
import { useSelector } from 'react-redux';

const AppRouter = ({ setDarkMode, darkMode }) => {
    const profile = useSelector(state => state.user.profile);
    const isAuth = !!profile;
    const location = useLocation();

    const isHome = location.pathname === '/';

    return (
        <>
            {isAuth && !isHome && (
                <Header setDarkMode={setDarkMode} darkMode={darkMode} />
            )}
            <Routes>
                {isAuth &&
                    authRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            element={cloneElement(element, { setDarkMode, darkMode })}
                            path={path}
                        />
                    ))}
                {publicRoutes.map(({ path, element }) => (
                    <Route
                        key={path}
                        element={cloneElement(element, { setDarkMode, darkMode })}
                        path={path}
                    />
                ))}
            </Routes>
        </>

    );
};

export default AppRouter;
