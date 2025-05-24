'use client';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // All authentication is handled by middleware. No client-side logic needed.
    return (
        <div className="min-h-screen bg-gray-100">
            {children}
        </div>
    );
}
