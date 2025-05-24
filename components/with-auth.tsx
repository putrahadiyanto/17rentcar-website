'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth<P extends object>(Component: React.ComponentType<P>) {
    return function AuthenticatedComponent(props: P) {
        const router = useRouter();

        useEffect(() => {
            // Middleware handles the redirection if not authenticated
        }, [router]);

        // Show loading state
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary"></div>
                    <p className="mt-4 text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );

        // User is authenticated, render the component
        return <Component {...props} />;
    };
}
