import { NextRequest, NextResponse } from 'next/server';

// This API route will test connectivity to your Laravel backend
export async function GET(request: NextRequest) {
    try {
        // Replace this URL with your Laravel API endpoint
        const LARAVEL_API_URL = 'http://backend-17rentcar.test/api/cars';

        // Make a request to your Laravel API
        const response = await fetch(LARAVEL_API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you might need (like authorization)
            },
        });

        // Get the data from the response
        const data = await response.json();

        // Return the data from the Laravel API
        return NextResponse.json(
            {
                success: true,
                message: 'Successfully connected to Laravel API',
                data: data.data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Laravel API test error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to connect to Laravel API',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
