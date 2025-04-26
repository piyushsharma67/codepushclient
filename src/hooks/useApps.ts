import { useState } from 'react';
import { appService, App, AppFormData } from '../services/app_service';

interface AppState {
    apps: App[];
    isLoading: boolean;
    error: string;
    isDialogOpen: boolean;
    formData: AppFormData;
}

interface AppActions {
    createApp: () => Promise<void>;
    deleteApp: (id: string) => Promise<void>;
    fetchApps: () => Promise<void>;
    openDialog: () => void;
    closeDialog: () => void;
    updateFormData: (field: keyof AppFormData, value: string) => void;
    resetForm: () => void;
}

const initialFormData: AppFormData = {
    name: '',
    description: ''
};

export const useApps = (): [AppState, AppActions] => {
    const [apps, setApps] = useState<App[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState<AppFormData>(initialFormData);

    const createApp = async () => {
        setIsLoading(true);
        setError('');
        try {
            const newApp = await appService.create(formData);
            setApps(prev => [...prev, newApp]);
            closeDialog();
            resetForm();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create app');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteApp = async (id: string) => {
        setIsLoading(true);
        setError('');
        try {
            await appService.delete(id);
            setApps(prev => prev.filter(app => app.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete app');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchApps = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await appService.fetch();
            setApps(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch apps');
        } finally {
            setIsLoading(false);
        }
    };

    const openDialog = () => setIsDialogOpen(true);

    const closeDialog = () => {
        setIsDialogOpen(false);
        resetForm();
    };

    const updateFormData = (field: keyof AppFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return [
        { apps, isLoading, error, isDialogOpen, formData },
        { createApp, deleteApp, fetchApps, openDialog, closeDialog, updateFormData, resetForm }
    ];
};
