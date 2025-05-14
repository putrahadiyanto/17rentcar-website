'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();

    // Redirect ke dashboard saat mengakses halaman root admin
    useEffect(() => {
        router.push('/admin/dashboard');
    }, [router]);

    // Halaman ini hanya untuk redirect, jadi tampilkan konten minimal
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Mengalihkan ke dashboard...</p>
        </div>
    );
}
