import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Change to your backend URL

// Configure axios for Laravel Sanctum
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

// Configure axios defaults for working with Laravel Sanctum
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

export async function getCsrfCookie() {
    console.log('Getting CSRF cookie from', `${API_URL}/sanctum/csrf-cookie`);
    try {
        const response = await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
        });
        console.log('CSRF cookie response:', response.status, response.headers);
        console.log('Cookies after CSRF:', document.cookie);
        return response;
    } catch (error) {
        console.error('Failed to get CSRF cookie:', error);
        throw error;
    }
}

export async function login(email: string, password: string) {
    console.log('Login attempt with:', { email, apiUrl: API_URL });

    try {
        // Get CSRF cookie first
        console.log('Getting CSRF cookie...');
        await getCsrfCookie();
        console.log('CSRF cookie obtained');

        // Attempt login
        console.log('Sending login request...');
        const res = await axios.post(
            `${API_URL}/api/login`,
            { email, password },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }
        );

        console.log('Login response:', res.status, res.data);

        // For debugging: Log all cookies after login
        console.log('Cookies after login:', document.cookie);

        // Make an immediate check to verify authentication worked
        try {
            const userCheck = await getUser();
            console.log('User check immediately after login successful:', userCheck);
        } catch (checkError) {
            console.error('User authentication check failed immediately after login:', checkError);
        }

        return res.data;
    } catch (error: any) {
        console.error('Login API error:', error.response ? {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
        } : error.message);

        throw new Error(error.response?.data?.message || 'Login failed');
    }
}

export async function logout() {
    console.log('Logging out...');

    try {
        const response = await axios.post(
            `${API_URL}/api/logout`,
            {},
            {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        );

        console.log('Logout response:', response.status, response.data);
        console.log('Cookies after logout:', document.cookie);

        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

export async function getUser() {
    console.log('Checking authentication status...');
    console.log('Current cookies:', document.cookie);

    // Parse cookies into a more readable format
    const parsedCookies: Record<string, string> = {};
    document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name) parsedCookies[name] = value || '';
    });

    console.log('Parsed cookies:', parsedCookies);
    console.log('Important cookies check:', {
        'laravel_session': parsedCookies['laravel_session'] ? 'exists' : 'missing',
        'XSRF-TOKEN': parsedCookies['XSRF-TOKEN'] ? 'exists' : 'missing',
    });

    try {
        // Add a timestamp to prevent caching
        const timestamp = new Date().getTime();
        const res = await axios.get(`${API_URL}/api/user?_=${timestamp}`, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        console.log('User authenticated:', res.data);
        return res.data;
    } catch (error: any) {
        const statusCode = error.response?.status;
        const errorData = {
            status: statusCode,
            data: error.response?.data,
            headers: error.response?.headers,
            message: error.message
        };

        // Provide more helpful error messages based on status code
        let errorMessage = 'Not authenticated';
        if (statusCode === 401) {
            errorMessage = 'Session expired or invalid';
            console.error('Authentication check failed (401 Unauthorized):', errorData);
        } else if (statusCode === 419) {
            errorMessage = 'CSRF token mismatch';
            console.error('Authentication check failed (419 CSRF Error):', errorData);
        } else if (statusCode === 500) {
            errorMessage = 'Server error';
            console.error('Authentication check failed (500 Server Error):', errorData);
        } else {
            console.error('Authentication check failed:', errorData);
        }

        throw new Error(errorMessage);
    }
}