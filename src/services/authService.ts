import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
    company_name: string;
    created_at: string;
}

export interface LoginResponse {
    token: string;
    expires_at: string;
    user: User;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    expires_at: string;
    token: string;
    user: {
        company_name: string;
        created_at: string;
        email: string;
        id: number;
        username: string;
    };
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, credentials);
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
            const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, credentials);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Registration failed');
            }
            throw new Error('An unexpected error occurred');
        }
    }
}; 