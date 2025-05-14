import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookieFromRequest, isValidAuthToken, AUTH_COOKIE_NAME } from './lib/auth-cookies';

// Admin paths that should be protected
const PROTECTED_PATHS = ['/admin', '/admin/dashboard'];
const LOGIN_PATH = '/admin/login';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path is a protected admin path
    if (PROTECTED_PATHS.some(path => pathname.startsWith(path)) && pathname !== LOGIN_PATH) {
        // Get the auth token from the request
        const token = getAuthCookieFromRequest(request);

        // If there's no valid token, redirect to the login page
        if (!isValidAuthToken(token)) {
            const url = request.nextUrl.clone();
            url.pathname = LOGIN_PATH;
            // Add the original URL as a parameter for redirect after login
            url.search = `?redirect=${pathname}`;
            return NextResponse.redirect(url);
        }
    }    // If the user is already authenticated and tries to access the login page,
    // redirect them to the dashboard
    if (pathname === LOGIN_PATH) {
        const token = getAuthCookieFromRequest(request);
        if (isValidAuthToken(token)) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/dashboard';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};