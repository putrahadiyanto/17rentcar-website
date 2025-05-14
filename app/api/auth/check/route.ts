import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookieFromRequest, isValidAuthToken } from '@/lib/auth-cookies';

export async function GET(request: NextRequest) {
    try {
        // Get the auth token from the request
        const token = getAuthCookieFromRequest(request);

        // Check if the token is valid
        if (isValidAuthToken(token)) {
            return NextResponse.json({ authenticated: true }, { status: 200 });
        } else {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
