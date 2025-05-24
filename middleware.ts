import { NextRequest, NextResponse } from 'next/server';

// No authentication check here! Let the React app handle it.
export function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};