'use client';

import React from 'react';
import { withAuth } from '@/components/with-auth';
import AdminHeader from '@/components/admin-header';
// Import other components as needed

function AdminDashboardPage() {
    return (
        <>
            <AdminHeader />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                {/* Dashboard content */}
            </div>
        </>
    );
}

// This page is protected by middleware. No client-side auth logic is needed.

// Export the page wrapped with authentication
export default withAuth(AdminDashboardPage);
