import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, LoginCredentials } from '../services/authService';
import { storage } from '../utils/storage';

interface LoginState {
    email: string;
    password: string;
    error: string;
    isLoading: boolean;
}

interface LoginActions {
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useLogin = (): [LoginState, LoginActions] => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const credentials: LoginCredentials = { email, password };
            const response = await authService.login(credentials);

            // Save authentication data using storage utility
            storage.saveAuthData(response.token, response.expires_at, response.user);

            // Navigate to apps page on successful login
            navigate('/apps');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return [
        { email, password, error, isLoading },
        { setEmail, setPassword, handleSubmit }
    ];
}; 