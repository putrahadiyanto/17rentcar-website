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
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    // This is a client-side authentication check
    // The middleware will handle server-side auth validation
    React.useEffect(() => {
        if (!isAuthenticated && window.location.pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [isAuthenticated, router]);

    return (
        <div className="min-h-screen bg-gray-100">
            {children}
        </div>
    );
}
