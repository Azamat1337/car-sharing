import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

export default function ProtectedRoute({ children }) {
    const user = useSelector(state => state.user.profile);

    if (user === null) {
        return null;
    }

    if (!user || user.role !== 'ADMIN') {
        return <Navigate to='/' replace />
    }

    return children;
}
