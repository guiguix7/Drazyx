import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="h-screen w-screen bg-[#070810] flex items-center justify-center text-[#F2EDF5]">Loading Drazyx Admin...</div>;
    if (!user) return <Navigate to="/admin/login" replace />;

    return <Outlet />;
};