import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import { authRoutes, publicRoutes } from '../routes.jsx';
import Header from './Header.jsx'

const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <>
            <Header />
            <Routes>
                {!isAuth &&
                    authRoutes.map(({ path, element }) => (
                        <Route key={path} element={element} path={path} />
                    ))}
                {publicRoutes.map(({ path, element }) => (
                    <Route key={path} element={element} path={path} />
                ))}
            </Routes>
        </>

    );
};

export default AppRouter;
