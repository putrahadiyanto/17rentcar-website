import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAdminRoute = pathname.startsWith('/admin');
    const isLoginPage = pathname === '/admin/login';

    console.log(`[Middleware] Incoming request to: ${pathname}`);
    // Only protect admin routes except /admin/login
    if (isAdminRoute && !isLoginPage) {
        // Get all cookies from the request
        const cookieHeader = request.headers.get('cookie');
        const sessionCookie = request.cookies.get('laravel_session')?.value;
        console.log(`[Middleware] Admin route detected. Session cookie: ${sessionCookie ? 'present' : 'absent'}`);

        if (!sessionCookie) {
            console.log('[Middleware] No session cookie found. Redirecting to /admin/login');
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Use the correct env variable for Edge Runtime
        const apiUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;
        if (!apiUrl) {
            console.log('[Middleware] LARAVEL_API_URL is not defined in environment variables.');
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Validate session with backend
        try {
            const endpoint = `${apiUrl.replace(/\/api$/, '')}/user`;
            console.log(`[Middleware] Validating session with backend at: ${endpoint}`);
            const response = await fetch(endpoint, {
                headers: {
                    Cookie: cookieHeader || '',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                credentials: 'include',
            });
            console.log(`[Middleware] Backend response status: ${response.status}`);

            if (!response.ok) {
                console.log('[Middleware] Backend validation failed. Redirecting to /admin/login');
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }

            const user = await response.json();
            console.log(`[Middleware] User data:`, user);
            if (!user.is_admin) {
                console.log('[Middleware] User is not admin. Redirecting to /');
                return NextResponse.redirect(new URL('/', request.url));
            }
            console.log('[Middleware] User is admin. Access granted.');
        } catch (error) {
            console.log('[Middleware] Error during backend validation:', error);
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    console.log('[Middleware] Access granted. Proceeding to next handler.');
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};