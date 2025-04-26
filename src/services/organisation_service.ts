import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export interface Organization {
    id: string;
    name: string;
    description: string;
    created_at: string;
    public_token: string
}

export interface OrganizationFormData {
    name: string;
    description: string;
}

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('@auth_token')}`
});

export const organizationService = {
    create: async (formData: OrganizationFormData): Promise<Organization> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/v1/organizations`, formData, {
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Failed to create organization');
            }
            throw new Error('An unexpected error occurred');
        }
    },

    delete: async (id: string): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}/v1/organizations/${id}`, {
                headers: getAuthHeaders()
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Failed to delete organization');
            }
            throw new Error('An unexpected error occurred');
        }
    },

    fetch: async (): Promise<Organization | null> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/organizations`, {
                headers: getAuthHeaders()
            });
            return response.data.organizations[0];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw new Error(error.response?.data?.error || 'Failed to fetch organization');
            }
            throw new Error('An unexpected error occurred');
        }
    }
};
