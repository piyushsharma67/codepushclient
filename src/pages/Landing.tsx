import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Fade,
    Backdrop,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Landing = () => {
    const navigate = useNavigate();
    const [showTitle, setShowTitle] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState<'login' | 'register' | null>(null);

    useEffect(() => {
        setShowTitle(true);
    }, []);

    const handleFormOpen = (type: 'login' | 'register') => {
        setShowTitle(false);
        setTimeout(() => {
            setFormType(type);
            setShowForm(true);
        }, 500);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setTimeout(() => {
            setFormType(null);
            setShowTitle(true);
        }, 500);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundColor: 'white',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ width: '100%', px: { xs: 2, md: 4 } }}>
                <Fade in={showTitle} timeout={1000}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                mb: 4,
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                background: 'linear-gradient(45deg, #1976d2 30%, #dc004e 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% auto',
                                animation: 'gradient 3s ease infinite',
                                '@keyframes gradient': {
                                    '0%': {
                                        backgroundPosition: '0% 50%',
                                    },
                                    '50%': {
                                        backgroundPosition: '100% 50%',
                                    },
                                    '100%': {
                                        backgroundPosition: '0% 50%',
                                    },
                                },
                            }}
                        >
                            React Native Code Push
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'text.secondary',
                                mb: 6,
                                maxWidth: '800px',
                                mx: 'auto',
                            }}
                        >
                            Seamlessly update your React Native apps without going through the app store review process
                        </Typography>
                    </Box>
                </Fade>
            </Box>

            <Backdrop
                open={showForm}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(8px)',
                }}
                onClick={handleFormClose}
            >
                <Paper
                    elevation={24}
                    sx={{
                        p: 4,
                        width: '100%',
                        maxWidth: '600px',
                        mx: 2,
                        position: 'relative',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {formType === 'login' && <Login />}
                    {formType === 'register' && <Register />}
                </Paper>
            </Backdrop>
        </Box>
    );
};

export default Landing; 