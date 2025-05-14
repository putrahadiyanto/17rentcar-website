// Admin credentials - in a real app, these would be stored securely
// and not in source code
export const ADMIN_CREDENTIALS = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
};

// Simple function to validate admin credentials
export function validateCredentials(username: string, password: string): boolean {
    return (
        username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password
    );
}
