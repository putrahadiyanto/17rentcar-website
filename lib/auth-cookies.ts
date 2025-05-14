import { NextRequest, NextResponse } from 'next/server';

export const AUTH_COOKIE_NAME = 'admin_auth_token';

// Create a token for admin authentication
export function createAuthToken(): string {
    return `admin-token-${Date.now()}`;
}

// Set auth cookie in a response
export function setAuthCookieInResponse(response: NextResponse, token: string): NextResponse {
    response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
}

// Get auth cookie from request
export function getAuthCookieFromRequest(request: NextRequest): string | undefined {
    return request.cookies.get(AUTH_COOKIE_NAME)?.value;
}

// Check if the auth cookie is valid
export function isValidAuthToken(token: string | undefined): boolean {
    return token !== undefined && token.startsWith('admin-token-');
}