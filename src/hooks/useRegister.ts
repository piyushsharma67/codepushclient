import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, RegisterCredentials } from '../services/authService';
import { storage } from '../utils/storage';

interface RegisterState {
    username: string;
    email: string;
    password: string;
    error: string;
    isLoading: boolean;
}

interface RegisterActions {
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useRegister = (): [RegisterState, RegisterActions] => {
    const [username, setUsername] = useState('');
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
            const credentials: RegisterCredentials = { username, email, password };
            const response = await authService.register(credentials);

            // Save registration data with token and expiration
            storage.saveAuthData(response.token, response.expires_at, response.user);

            // Navigate to apps page on successful registration
            navigate('/apps');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return [
        { username, email, password, error, isLoading },
        { setUsername, setEmail, setPassword, handleSubmit }
    ];
}; 