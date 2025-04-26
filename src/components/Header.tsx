import { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessIcon from '@mui/icons-material/Business';

const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('@auth_token');
            setIsAuthenticated(!!token);
        };

        // Run on mount
        checkAuth();

        // Listen for localStorage changes
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleSignOut = () => {
        // Clear local storage
        localStorage.clear();
        // Clear session storage
        sessionStorage.clear();
        // Update authentication state
        setIsAuthenticated(false);
        // Redirect to login page
        navigate('/login');
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleCreateOrganization = () => {
        navigate('/apps');
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: 'transparent',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    >
                        React Native Code Push
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {isAuthenticated ? (
                            <>
                                <Button
                                    variant="outlined"
                                    startIcon={<BusinessIcon />}
                                    onClick={handleCreateOrganization}
                                    sx={{
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        '&:hover': {
                                            borderColor: 'primary.dark',
                                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                        }
                                    }}
                                >
                                    Create Organization
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<LogoutIcon />}
                                    onClick={handleSignOut}
                                    sx={{
                                        borderColor: 'error.main',
                                        color: 'error.main',
                                        '&:hover': {
                                            borderColor: 'error.dark',
                                            backgroundColor: 'rgba(211, 47, 47, 0.04)',
                                        }
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    onClick={handleSignIn}
                                    sx={{
                                        borderColor: 'primary.main',
                                        color: 'primary.main',
                                        '&:hover': {
                                            borderColor: 'primary.dark',
                                            backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                        }
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSignUp}
                                    sx={{
                                        background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                                        }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header; 