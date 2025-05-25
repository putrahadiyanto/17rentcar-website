import { NextRequest, NextResponse } from 'next/server';

// This API route will fetch a single car by ID from your Laravel backend
export async function GET(
    request: NextRequest,
    context: { params: { id: number } }
) {
    try {
        // Await params for Next.js App Router compliance
        const { id } = await context.params;

        // Get the Laravel API URL from environment variables or use the default
        // Make sure we're using the server-side env variable, not the NEXT_PUBLIC_ one
        const API_BASE_URL = process.env.LARAVEL_API_URL || 'http://backend-17rentcar.test/api';
        const LARAVEL_API_URL = `${API_BASE_URL}/cars/${id}`;

        console.log(`[API Route] Fetching car data from: ${LARAVEL_API_URL}`);

        // Make a request to your Laravel API
        const response = await fetch(LARAVEL_API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Ensure we get fresh data
            cache: 'no-store',
        });

        if (!response.ok) {
            // If Laravel returns 404, return a proper 404 response
            if (response.status === 404) {
                return NextResponse.json({ error: 'Car not found' }, { status: 404 });
            }
            throw new Error(`Error fetching car: ${response.status}`);
        }

        // Get the data from the response
        const data = await response.json();

        // Return the car data
        return NextResponse.json(data);
    } catch (error) {
        console.error('Car API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch car data',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
