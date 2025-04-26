// services/appService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export interface App {
    id: string;
    name: string;
    platform: 'ios' | 'android';
    created_at: string;
}

export interface AppFormData {
    name: string;
    description: string
}

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('@auth_token')}`,
    'Content-Type': 'application/json'
});

export const appService = {
    create: async (formData: AppFormData): Promise<App> => {
        const response = await axios.post(`${API_BASE_URL}/v1/user/apps`, formData, {
            headers: getAuthHeaders()
        });
        return response.data.app;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/v1/user/apps/${id}`, {
            headers: getAuthHeaders()
        });
    },

    fetch: async (): Promise<App[]> => {
        const response = await axios.get(`${API_BASE_URL}/v1/user/apps`, {
            headers: getAuthHeaders()
        });
        return response.data.apps;
    },

    getOne: async (id: string): Promise<App> => {
        const response = await axios.get(`${API_BASE_URL}/v1/user/apps/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    },

    update: async (id: string, formData: AppFormData): Promise<App> => {
        const response = await axios.put(`${API_BASE_URL}/v1/user/apps/${id}`, formData, {
            headers: getAuthHeaders()
        });
        return response.data;
    }
};
