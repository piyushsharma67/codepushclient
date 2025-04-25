import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    app_id: string;
    token: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
    app_id: string;
    token: string;
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/v2/auth/login`, credentials);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Login failed');
            }
            throw new Error('An unexpected error occurred');
        }
    },

    register: async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, credentials);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Registration failed');
            }
            throw new Error('An unexpected error occurred');
        }
    }
}; 