import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

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
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/login')}
                            sx={{
                                color: 'primary.main',
                                borderColor: 'primary.main',
                                '&:hover': {
                                    borderColor: 'primary.dark',
                                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/register')}
                            sx={{
                                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                                },
                            }}
                        >
                            Create Account
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header; 