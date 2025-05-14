import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials } from '@/lib/auth-config';
import { createAuthToken, setAuthCookieInResponse } from '@/lib/auth-cookies';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Validate credentials
        if (validateCredentials(username, password)) {
            // Generate auth token
            const token = createAuthToken();

            // Create response
            const response = NextResponse.json(
                { success: true, message: 'Login successful' },
                { status: 200 }
            );

            // Set auth cookie in response
            return setAuthCookieInResponse(response, token);
        } else {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
