import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

export default function ProtectedRoute({ children }) {
    const user = useSelector(state => state.user.profile);
    const loading = useSelector(state => state.user.loading); // добавьте этот флаг в срез

    if (user === null) {
        return null; // или спиннер
    }
    console.log('loading', loading)
    console.log('user', user)
    if (!user || user.role !== 'ADMIN') {
        console.log('popal v if');
        return <Navigate to='/' replace />
    }

    return children;
}
