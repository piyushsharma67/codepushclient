import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Alert,
    CircularProgress
} from '@mui/material';
import { useRegister } from '../hooks/useRegister';

const Register = () => {
    const [{ username, email, password, error, isLoading }, { setUsername, setEmail, setPassword, handleSubmit }] = useRegister();

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container maxWidth={false} sx={{ width: '100%', px: { xs: 2, md: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
                    <Box sx={{ flex: 1, pr: { md: 4 } }}>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                mb: 3,
                                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Update Your React Native Apps on the Fly
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'text.secondary',
                                mb: 3,
                                lineHeight: 1.6
                            }}
                        >
                            Seamlessly push updates to your React Native apps without going through the app store review process. Keep your users up to date with the latest features and bug fixes instantly.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                lineHeight: 1.6
                            }}
                        >
                            • Instant updates without app store approval<br />
                            • Roll back updates if needed<br />
                            • Target specific user groups<br />
                            • Monitor update deployment status
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h2" variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Create Account
                            </Typography>
                            {error && (
                                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                                    {error}
                                </Alert>
                            )}
                            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{ mb: 2 }}
                                    disabled={isLoading}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{ mb: 2 }}
                                    disabled={isLoading}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ mb: 2 }}
                                    disabled={isLoading}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isLoading}
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                                        },
                                        '&:disabled': {
                                            background: 'linear-gradient(45deg, #9e9e9e 30%, #bdbdbd 90%)',
                                        }
                                    }}
                                >
                                    {isLoading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Sign Up'
                                    )}
                                </Button>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Register; 