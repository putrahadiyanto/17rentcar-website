'use client';

/**
 * This is a debugging utility to help identify authentication tokens.
 * You can import this in a component to log authentication information.
 */

export function debugAuthTokens() {
    if (typeof window === 'undefined') {
        console.log('[Auth Debug] Running on server side, no cookies available');
        return;
    }

    console.log('[Auth Debug] === AUTH TOKEN DEBUGGING ===');

    // Log all cookies
    console.log('[Auth Debug] All cookies:', document.cookie);

    // Parse cookies into an object for easier inspection
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        if (key) acc[key] = value || true;
        return acc;
    }, {} as Record<string, string | boolean>);

    console.log('[Auth Debug] Parsed cookies:', cookies);

    // Check local storage
    try {
        console.log('[Auth Debug] LocalStorage items:');
        Object.keys(localStorage).forEach(key => {
            console.log(`- ${key}: ${localStorage.getItem(key)?.substring(0, 20)}...`);
        });
    } catch (e) {
        console.log('[Auth Debug] Unable to access localStorage:', e);
    }

    // Check session storage
    try {
        console.log('[Auth Debug] SessionStorage items:');
        Object.keys(sessionStorage).forEach(key => {
            console.log(`- ${key}: ${sessionStorage.getItem(key)?.substring(0, 20)}...`);
        });
    } catch (e) {
        console.log('[Auth Debug] Unable to access sessionStorage:', e);
    }

    console.log('[Auth Debug] === END DEBUG INFO ===');
}

export default debugAuthTokens;
