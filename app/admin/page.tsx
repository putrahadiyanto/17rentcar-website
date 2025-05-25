'use client';

import { useEffect } from 'react';
import debugAuthTokens from '@/lib/auth-debug';

export default function AdminPage() {
    // Debug authentication tokens
    useEffect(() => {
        console.log('[Admin Page] Initial load');
        // Run the auth token debug utility
        debugAuthTokens();

        // This page should never actually be shown as middleware will redirect
        // to /admin/dashboard before this component renders
    }, []);

    // Show loading message while redirecting
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <p className="text-gray-600">Mengalihkan ke dashboard admin...</p>
            </div>
        </div>
    );
}
