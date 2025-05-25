import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Use the environment variables from .env.local
const API_BASE_URL = `${process.env.LARAVEL_API_URL}/admin/cars`;

/**
 * Helper to get auth token/cookie from request for Sanctum authentication
 */
function getAuthHeaders(req: NextRequest) {
  const cookies = req.headers.get('cookie') || '';
  return {
    headers: {
      Cookie: cookies,
    },
    withCredentials: true,
  };
}

/**
 * GET handler - List all cars or get a specific car
 * Corresponding Laravel route: 
 * - GET /api/admin/cars
 * - GET /api/admin/cars/{car}
 */
export async function GET(request: NextRequest) {
  try {
    // Parse URL to extract car ID if present
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get('id');
    const url = carId ? `${API_BASE_URL}/${carId}` : API_BASE_URL;

    console.log(`[BFF] GET request to ${url}`);
    const response = await axios.get(url, getAuthHeaders(request));

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(`[BFF ERROR] GET request:`, error?.response?.data || error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message;

    return NextResponse.json({ error: message }, { status });
  }
}

/**
 * POST handler - Create a new car
 * Corresponding Laravel route: POST /api/admin/cars
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(`[BFF] Creating new car with data:`, body);

    const response = await axios.post(API_BASE_URL, body, getAuthHeaders(request));

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error(`[BFF ERROR] POST request:`, error?.response?.data || error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message;

    return NextResponse.json({ error: message }, { status });
  }
}

/**
 * PUT handler - Update a car (complete update)
 * Corresponding Laravel route: PUT /api/admin/cars/{car}
 */
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get('id');

    if (!carId) {
      return NextResponse.json({ error: 'Car ID required' }, { status: 400 });
    }

    const url = `${API_BASE_URL}/${carId}`;
    const body = await request.json();

    console.log(`[BFF] Updating car ${carId} with data:`, body);
    const response = await axios.put(url, body, getAuthHeaders(request));

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(`[BFF ERROR] PUT request:`, error?.response?.data || error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message;

    return NextResponse.json({ error: message }, { status });
  }
}

/**
 * PATCH handler - Partially update a car
 * Corresponding Laravel route: PATCH /api/admin/cars/{car}
 */
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get('id');

    if (!carId) {
      return NextResponse.json({ error: 'Car ID required' }, { status: 400 });
    }

    const url = `${API_BASE_URL}/${carId}`;
    const body = await request.json();

    console.log(`[BFF] Partially updating car ${carId} with data:`, body);
    const response = await axios.patch(url, body, getAuthHeaders(request));

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(`[BFF ERROR] PATCH request:`, error?.response?.data || error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message;

    return NextResponse.json({ error: message }, { status });
  }
}

/**
 * DELETE handler - Delete a car
 * Corresponding Laravel route: DELETE /api/admin/cars/{car}
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get('id');

    if (!carId) {
      return NextResponse.json({ error: 'Car ID required' }, { status: 400 });
    }

    const url = `${API_BASE_URL}/${carId}`;
    console.log(`[BFF] Deleting car ${carId}`);

    const response = await axios.delete(url, getAuthHeaders(request));

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error(`[BFF ERROR] DELETE request:`, error?.response?.data || error);
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message;

    return NextResponse.json({ error: message }, { status });
  }
}