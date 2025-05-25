import axios, { AxiosError } from 'axios';
import { CarType } from '@/types/car';

// BFF API endpoint for cars
const ADMIN_CARS_API_URL = '/api/admin/cars';
const ADMIN_UPLOAD_API_URL = '/api/admin/upload';

/**
 * Admin Car Service - BFF implementation for car management
 * Uses the Next.js API routes as a Backend-For-Frontend pattern
 */
export const AdminCarService = {
    /**
     * Get all cars from the admin API
     * @returns Promise with array of cars
     */
    getAllCars: async (): Promise<CarType[]> => {
        try {
            console.log('[AdminCarService] Getting all cars');
            const response = await axios.get(ADMIN_CARS_API_URL);
            // Return only the array part
            return response.data.data || [];
        } catch (error) {
            console.error('[AdminCarService] Error getting cars:', error);
            handleApiError(error as AxiosError);
            return []; // Return empty array to avoid null checks
        }
    },

    /**
     * Get a specific car by ID
     * @param id Car ID
     * @returns Promise with car data
     */
    getCarById: async (id: string): Promise<CarType | null> => {
        try {
            console.log(`[AdminCarService] Getting car with ID: ${id}`);
            const response = await axios.get(`${ADMIN_CARS_API_URL}?id=${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`[AdminCarService] Error getting car ${id}:`, error);
            handleApiError(error as AxiosError);
            return null;
        }
    },

    /**
     * Create a new car
     * @param carData Car data to create
     * @returns Promise with created car data
     */
    createCar: async (carData: Omit<CarType, 'id'>): Promise<CarType | null> => {
        try {
            console.log('[AdminCarService] Creating new car:', carData);
            const response = await axios.post(ADMIN_CARS_API_URL, carData);
            return response.data;
        } catch (error) {
            console.error('[AdminCarService] Error creating car:', error);
            handleApiError(error as AxiosError);
            return null;
        }
    },

    /**
     * Update an existing car
     * @param id Car ID
     * @param carData Updated car data
     * @returns Promise with updated car data
     */
    updateCar: async (id: string, carData: Partial<CarType>): Promise<CarType | null> => {
        try {
            console.log(`[AdminCarService] Updating car ${id}:`, carData);
            const response = await axios.put(`${ADMIN_CARS_API_URL}?id=${id}`, carData);
            return response.data;
        } catch (error) {
            console.error(`[AdminCarService] Error updating car ${id}:`, error);
            handleApiError(error as AxiosError);
            return null;
        }
    },

    /**
     * Delete a car
     * @param id Car ID to delete
     * @returns Promise indicating success or failure
     */
    deleteCar: async (id: string): Promise<boolean> => {
        try {
            console.log(`[AdminCarService] Deleting car ${id}`);
            await axios.delete(`${ADMIN_CARS_API_URL}?id=${id}`);
            return true;
        } catch (error) {
            console.error(`[AdminCarService] Error deleting car ${id}:`, error);
            handleApiError(error as AxiosError);
            return false;
        }
    },

    /**
     * Toggle car visibility (Not a server endpoint - would require a PATCH)
     * @param id Car ID
     * @param isVisible Visibility status
     * @returns Promise indicating success or failure
     */    toggleCarVisibility: async (id: string, isVisible: boolean): Promise<boolean> => {
        try {
            console.log(`[AdminCarService] Setting car ${id} visibility to: ${isVisible}`);
            const response = await axios.patch(`${ADMIN_CARS_API_URL}?id=${id}`, {
                isShowing: isVisible,
            });
            return !!response.data;
        } catch (error) {
            console.error(`[AdminCarService] Error toggling car visibility ${id}:`, error);
            handleApiError(error as AxiosError);
            return false;
        }
    },

    /**
     * Upload an image file
     * @param file File object to upload
     * @returns Promise with the image path
     */
    uploadImage: async (file: File): Promise<string | null> => {
        try {
            console.log('[AdminCarService] Uploading image file:', file.name);

            // Create form data for the file
            const formData = new FormData();
            formData.append('file', file);

            // Send the file to the upload endpoint
            const response = await axios.post(ADMIN_UPLOAD_API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Return the relative path to the image
            return response.data.filePath || null;
        } catch (error) {
            console.error('[AdminCarService] Error uploading image:', error);
            handleApiError(error as AxiosError);
            return null;
        }
    },
};

/**
 * Helper function to handle API errors
 */
function handleApiError(error: AxiosError): void {
    const status = error.response?.status;

    // Handle authentication errors
    if (status === 401) {
        console.error('[AdminCarService] Authentication error. Redirecting to login...');
        window.location.href = '/admin/login';
        return;
    }

    // Handle other errors
    const errorMessage = error.response?.data || error.message;
    throw new Error(`API Error: ${JSON.stringify(errorMessage)}`);
}

export default AdminCarService;
