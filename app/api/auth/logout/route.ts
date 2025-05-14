import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth-cookies';

export async function POST() {
    // Create a response
    const response = NextResponse.json(
        { success: true, message: 'Logged out successfully' },
        { status: 200 }
    );

    // Clear the auth cookie
    response.cookies.delete(AUTH_COOKIE_NAME);

    return response;
}
