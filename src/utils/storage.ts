import { User } from '../services/authService';

const STORAGE_KEYS = {
    TOKEN: '@auth_token',
    USER: '@auth_user',
    APP_ID: '@app_id',
    APP_TOKEN: '@app_token',
} as const;

export const storage = {
    // Save authentication data
    saveAuthData: (token: string, user: User) => {
        try {
            localStorage.setItem(STORAGE_KEYS.TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
            localStorage.setItem(STORAGE_KEYS.APP_ID, user.app_id);
            localStorage.setItem(STORAGE_KEYS.APP_TOKEN, user.token);
        } catch (error) {
            console.error('Error saving auth data:', error);
            throw new Error('Failed to save authentication data');
        }
    },

    // Get authentication data
    getAuthData: () => {
        try {
            const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
            const userStr = localStorage.getItem(STORAGE_KEYS.USER);
            const appId = localStorage.getItem(STORAGE_KEYS.APP_ID);
            const appToken = localStorage.getItem(STORAGE_KEYS.APP_TOKEN);

            if (!token || !userStr) {
                return null;
            }

            return {
                token,
                user: JSON.parse(userStr),
                appId,
                appToken,
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
            localStorage.removeItem(STORAGE_KEYS.USER);
            localStorage.removeItem(STORAGE_KEYS.APP_ID);
            localStorage.removeItem(STORAGE_KEYS.APP_TOKEN);
        } catch (error) {
            console.error('Error clearing auth data:', error);
            throw new Error('Failed to clear authentication data');
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        try {
            const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
            return !!token;
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    },
}; 