import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logout as apiLogout } from '@/lib/auth-api';

export default function AdminHeader() {
    const router = useRouter();

    return (
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/admin/dashboard" className="text-xl font-bold text-gray-900">
                            17RentCar Admin
                        </Link>
                    </div>                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            onClick={async () => {
                                try {
                                    await apiLogout();
                                    router.push('/admin/login');
                                } catch (error) {
                                    console.error('Logout failed:', error);
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
