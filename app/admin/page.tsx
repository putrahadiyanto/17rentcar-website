'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import debugAuthTokens from '@/lib/auth-debug';

export default function AdminPage() {
    const router = useRouter();

    // Debug authentication tokens
    useEffect(() => {
        console.log('[Admin Page] Initial load');
        // Run the auth token debug utility
        debugAuthTokens();
    }, []);

    // This page is protected by middleware. No client-side auth logic is needed.

    // Show loading or redirection message with debugging info
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <>
                    <p className="text-gray-600">Mengalihkan ke halaman yang sesuai...</p>
                </>
            </div>
        </div>
    );
}
