// Services for API calls
import { CarType } from '@/types/car';

// Using relative URLs to call our Next.js API routes instead of direct Laravel API calls
// This helps avoid CORS issues and environment variable problems in client components

/**
 * Fetch all cars from Laravel API via Next.js API route
 */
export async function fetchCars(): Promise<CarType[]> {
    try {
        // Using our Next.js API route instead of direct Laravel API
        const response = await fetch('/api/cars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Client components should use default cache behavior
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        });

        if (!response.ok) {
            throw new Error(`Error fetching cars: ${response.status}`);
        }

        const result = await response.json();

        // If your API returns data in a nested format like { data: [...] }
        // Make sure to return the actual array of cars
        return result.data || [];
    } catch (error) {
        console.error('Failed to fetch cars:', error);
        // Re-throw the error so the component can handle it
        throw error;
    }
}

/**
 * Fetch a single car by ID from Laravel API
 */
export async function fetchCarById(id: string): Promise<CarType | null> {
    try {
        // Using our Next.js API route instead of direct Laravel API
        const response = await fetch(`/api/cars/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`Error fetching car: ${response.status}`);
        }

        const result = await response.json();

        // If your API returns data in a nested format
        return result.data || null;
    } catch (error) {
        console.error(`Failed to fetch car with ID ${id}:`, error);
        throw error;
    }
}
