import { User } from '../services/authService';

const STORAGE_KEYS = {
    TOKEN: '@auth_token',
    TOKEN_EXPIRY: '@auth_token_expiry',
    USER: '@auth_user',
} as const;

export const storage = {
    // Save authentication data
    saveAuthData: (token: string, expiresAt: string, user: User) => {
        try {
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiresAt);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        } catch (error) {
            console.error('Error saving auth data:', error);
            throw new Error('Failed to save authentication data');
        }
    },

    // Get authentication data
    getAuthData: () => {
        try {
            const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
            const tokenExpiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
            const userStr = localStorage.getItem(STORAGE_KEYS.USER);

            if (!token || !userStr || !tokenExpiry) {
                return null;
            }

            // Check if token is expired
            if (new Date(tokenExpiry) < new Date()) {
                storage.clearAuthData();
                return null;
            }

            return {
                token,
                tokenExpiry,
                user: JSON.parse(userStr),
            };
        } catch (error) {
            console.error('Error getting auth data:', error);
            return null;
        }
    },

    // Clear authentication data
    clearAuthData: () => {
        try {
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
            localStorage.removeItem(STORAGE_KEYS.USER);
        } catch (error) {
            console.error('Error clearing auth data:', error);
            throw new Error('Failed to clear authentication data');
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        try {
            const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
            const tokenExpiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);

            if (!token || !tokenExpiry) {
                return false;
            }

            // Check if token is expired
            return new Date(tokenExpiry) > new Date();
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    },
}; 