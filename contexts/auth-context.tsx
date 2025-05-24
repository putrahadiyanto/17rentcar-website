'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean; // Added loading state
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();    // Check authentication status on initial load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);
                // Import axios for direct check
                const axios = (await import('axios')).default;

                // First, try a direct authentication check
                try {
                    // Add a timestamp to prevent caching
                    const timestamp = new Date().getTime();
                    const response = await axios.get(`http://localhost:8000/api/user?_=${timestamp}`, {
                        withCredentials: true,
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache'
                        }
                    });

                    console.log('Auth context: Direct auth check successful:', response.data);
                    setIsAuthenticated(true);
                } catch (directError) {
                    console.log('Auth context: Direct auth check failed, trying with CSRF refresh');

                    // Try with CSRF refresh as fallback
                    try {
                        // Use the getUser function from auth-api.ts to check directly with Laravel
                        const { getCsrfCookie, getUser } = await import('@/lib/auth-api');

                        // Refresh CSRF token first
                        await getCsrfCookie();

                        const userData = await getUser();
                        console.log('Auth context: User authenticated with CSRF refresh:', userData);
                        setIsAuthenticated(true);
                    } catch (error) {
                        console.log('Auth context: User not authenticated after all attempts');
                        setIsAuthenticated(false);
                    }
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []); const login = async (username: string, password: string): Promise<boolean> => {
        try {
            // Use the login function from auth-api.ts to login directly with Laravel
            const { login: apiLogin } = require('@/lib/auth-api');

            await apiLogin(username, password);
            console.log('Auth context: Login successful');
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }; const logout = async () => {
        try {
            // Use the logout function from auth-api.ts to logout directly with Laravel
            const { logout: apiLogout } = require('@/lib/auth-api');

            await apiLogout();
            console.log('Auth context: Logout successful');

            setIsAuthenticated(false);
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }; return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};