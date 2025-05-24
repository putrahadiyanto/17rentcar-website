'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminLayoutContent>{children}</AdminLayoutContent>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin/login';

    // This is a client-side authentication check
    React.useEffect(() => {
        // Only redirect if not on login page and auth check is complete (not loading)
        if (!isAuthenticated && !isLoading && !isLoginPage) {
            console.log('AdminLayout: Not authenticated, redirecting to login');
            router.push('/admin/login');
        }
    }, [isAuthenticated, isLoading, router, isLoginPage]);

    // Show loading state while checking auth
    if (isLoading && !isLoginPage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary"></div>
                    <p className="mt-4 text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Prevent rendering children if not authenticated and not on login page
    if (!isAuthenticated && !isLoading && !isLoginPage) {
        return null; // Don't render anything while redirecting
    }

    // Allow rendering children if authenticated or on login page
    return (
        <div className="min-h-screen bg-gray-100">
            {children}
        </div>
    );
}
