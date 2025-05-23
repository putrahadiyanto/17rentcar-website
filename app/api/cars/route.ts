import { NextRequest, NextResponse } from 'next/server';

// This API route will fetch cars from your Laravel backend
export async function GET(request: NextRequest) {
    try {
        // Get the base Laravel API URL from environment variables and append /cars
        const baseApiUrl = process.env.LARAVEL_API_URL || 'http://backend-17rentcar.test/api';
        const LARAVEL_API_URL = `${baseApiUrl}/cars`;

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
            throw new Error(`Error fetching cars: ${response.status}`);
        }

        // Get the data from the response
        const data = await response.json();

        // Return the cars data
        return NextResponse.json(data);
    } catch (error) {
        console.error('Cars API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch cars data',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
