'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';

interface LayoutWrapperProps {
    children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');

    return (
        <div className="flex min-h-screen flex-col">
            {!isAdminPage && <Navbar />}
            <main className="flex-1">{children}</main>
            {!isAdminPage && <Footer />}
            {!isAdminPage && <ScrollToTop />}
        </div>
    );
}
