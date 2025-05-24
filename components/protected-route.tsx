'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, Suspense } from 'react';
import { useRouter } from 'next/navigation';

// Create a loading component
function AuthLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary"></div>
                <p className="mt-4 text-gray-600">Authentication in progress...</p>
            </div>
        </div>
    );
}

// Create a protected route component
export function ProtectedRoute({ children, loginPath = '/admin/login' }: { children: ReactNode, loginPath?: string }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const isLoginPage = pathname === loginPath;

    useEffect(() => {
        if (!isLoading && !isAuthenticated && !isLoginPage) {
            router.push(loginPath);
        }
    }, [isAuthenticated, isLoading, router, isLoginPage, loginPath]);

    if (isLoading) {
        return <AuthLoading />;
    }

    if (!isAuthenticated && !isLoginPage) {
        return null;
    }

    return <>{children}</>;
}

// Your existing AuthContext and Provider here
// ...
