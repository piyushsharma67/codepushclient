import { useState } from 'react';
import { organizationService } from '../services/organisation_service'; // adjust path as needed
import { Organization } from '../services/organisation_service';

interface OrganizationState {
    organization: Organization | null;
    isLoading: boolean;
    error: string;
    isDialogOpen: boolean;
    formData: {
        name: string;
        description: string;
    };
}

interface OrganizationActions {
    createOrganization: () => Promise<void>;
    deleteOrganization: () => Promise<void>;
    fetchOrganization: () => Promise<void>;
    openDialog: () => void;
    closeDialog: () => void;
    updateFormData: (field: 'name' | 'description', value: string) => void;
    resetForm: () => void;
}

const initialFormData = {
    name: '',
    description: ''
};

export const useOrganization = (): [OrganizationState, OrganizationActions] => {
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const createOrganization = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await organizationService.create(formData);
            setOrganization(data);
            closeDialog();
            resetForm();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create organization');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteOrganization = async () => {
        if (!organization) return;

        setIsLoading(true);
        setError('');
        try {
            await organizationService.delete(organization.id);
            setOrganization(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete organization');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOrganization = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await organizationService.fetch();
            console.log("data is", data)
            setOrganization(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch organization');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const openDialog = () => setIsDialogOpen(true);

    const closeDialog = () => {
        setIsDialogOpen(false);
        resetForm();
    };

    const updateFormData = (field: 'name' | 'description', value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => setFormData(initialFormData);

    return [
        { organization, isLoading, error, isDialogOpen, formData },
        { createOrganization, deleteOrganization, fetchOrganization, openDialog, closeDialog, updateFormData, resetForm }
    ];
};
