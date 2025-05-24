import axios from 'axios';

interface LoginData {
    email: string
    password: string
}

// Helper to get the base URL (client-side, uses NEXT_PUBLIC_ env var)
function getLaravelBaseUrl() {
    const apiUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;
    if (!apiUrl) throw new Error('NEXT_PUBLIC_LARAVEL_API_URL is not defined');
    return apiUrl.replace(/\/api$/, '');
}

export async function login(data: LoginData) {
    console.log('[auth] Starting login process for', data.email);
    // First, get the CSRF cookie
    try {
        const baseUrl = getLaravelBaseUrl();
        await axios.get(`${baseUrl}/sanctum/csrf-cookie`, {
            withCredentials: true,
        });
        console.log('[auth] CSRF cookie set');
    } catch (err) {
        console.error('[auth] Failed to get CSRF cookie:', err);
        throw new Error('Failed to get CSRF cookie');
    }

    // Then login
    try {
        const baseUrl = getLaravelBaseUrl();
        const response = await axios.post(`${baseUrl}/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log('[auth] Login response:', response.status);
        return response.data;
    } catch (err: any) {
        const errorMsg = err.response?.data?.message || 'Login failed';
        console.error('[auth] Login error:', err);
        throw new Error(errorMsg);
    }
}

export async function logout() {
    console.log('[auth] Logging out...');
    try {
        const baseUrl = getLaravelBaseUrl();
        const response = await axios.post(`${baseUrl}/logout`, {}, {
            withCredentials: true,
        });
        console.log('[auth] Logout response:', response.status);
        return response.data;
    } catch (err: any) {
        const errorMsg = err.response?.data?.message || 'Logout failed';
        console.error('[auth] Logout error:', err);
        throw new Error(errorMsg);
    }
}

export async function getUser() {
    console.log('[auth] Fetching user info...');
    try {
        const apiUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;
        if (!apiUrl) throw new Error('NEXT_PUBLIC_LARAVEL_API_URL is not defined');
        const response = await axios.get(`${apiUrl}/user`, {
            withCredentials: true,
        });
        console.log('[auth] getUser response:', response.status);
        return response.data;
    } catch (err: any) {
        if (err.response && err.response.status === 401) {
            console.warn('[auth] getUser: not authenticated');
            return null;
        }
        console.error('[auth] getUser error:', err);
        return null;
    }
}