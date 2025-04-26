import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Alert,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tabs,
    Tab,
    Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useOrganization } from '../hooks/useOrganization';
import { useApps } from '../hooks/useApps';
import { storage } from '../utils/storage';

const Apps = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [{ organization, isLoading: orgLoading, error: orgError, isDialogOpen: orgDialogOpen, formData: orgFormData },
        { createOrganization, deleteOrganization, fetchOrganization, openDialog: openOrgDialog, closeDialog: closeOrgDialog, updateFormData: updateOrgFormData }] = useOrganization();

    const [{ apps, isLoading: appLoading, error: appError, isDialogOpen: appDialogOpen, formData: appFormData },
        { createApp, deleteApp, fetchApps, openDialog: openAppDialog, closeDialog: closeAppDialog, updateFormData: updateAppFormData }] = useApps();

    useEffect(() => {
        // Check if user is authenticated
        const authData = storage.getAuthData();
        setIsAuthenticated(!!authData?.token);

        if (authData?.token) {
            fetchOrganization();
            fetchApps();
        }
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

    console.log("apps is", apps)

    return (
        <Box sx={{ width: '100vw', minHeight: '100vh', p: { xs: 2, md: 4 } }}>
            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        Dashboard
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>


                        {!organization && (
                            <Button
                                variant="outlined"
                                startIcon={<BusinessIcon />}
                                onClick={openOrgDialog}
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
                        )}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={openAppDialog}
                            sx={{
                                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                                }
                            }}
                        >
                            Create New App
                        </Button>


                    </Box>
                </Box>

                {(appError || orgError) && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {appError || orgError}
                    </Alert>
                )}

                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
                    <Tab label="My Apps" />
                    <Tab label="Organization" />
                </Tabs>

                {activeTab === 0 && (
                    <Paper elevation={3}>
                        <List>
                            {apps?.map((app) => (
                                <ListItem key={app.id}>
                                    <ListItemText
                                        primary={app.name}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    App ID: {app.id}
                                                </Typography>
                                                <br />
                                                <Typography component="span" variant="body2" color="text.secondary">
                                                    Platform: {app.platform}
                                                </Typography>
                                                <br />
                                                <Typography component="span" variant="body2" color="text.secondary">
                                                    Created: {new Date(app.created_at).toLocaleDateString()}
                                                </Typography>
                                            </>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={() => deleteApp(app.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                            {apps?.length === 0 && (
                                <ListItem>
                                    <ListItemText
                                        primary="No apps yet"
                                        secondary="Create your first app to start managing updates"
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Paper>
                )}

                {activeTab === 1 && (
                    <Paper elevation={3}>
                        {organization ? (
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary={organization.name}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="text.secondary">
                                                    {organization.description}
                                                </Typography>
                                                <br />
                                                <Typography component="span" variant="body2" color="text.secondary">
                                                    Created: {new Date(organization.created_at).toLocaleDateString()}
                                                </Typography>
                                                <br />
                                                <Typography component="span" variant="body2" color="text.secondary">
                                                    {organization.public_token}
                                                </Typography>
                                            </>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={deleteOrganization}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        ) : (
                            <ListItem>
                                <ListItemText
                                    primary="No organization yet"
                                    secondary="Create your organization to manage your apps"
                                />
                            </ListItem>
                        )}
                    </Paper>
                )}

                <Dialog open={appDialogOpen} onClose={closeAppDialog}>
                    <DialogTitle>Create New App</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="App Name"
                            fullWidth
                            value={appFormData.name}
                            onChange={(e) => updateAppFormData('name', e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={appFormData.description}
                            onChange={(e) => updateAppFormData('description', e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeAppDialog}>Cancel</Button>
                        <Button
                            onClick={createApp}
                            disabled={appLoading || !appFormData.name}
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                                }
                            }}
                        >
                            {appLoading ? <CircularProgress size={24} /> : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={orgDialogOpen} onClose={closeOrgDialog}>
                    <DialogTitle>Create New Organization</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Organization Name"
                            fullWidth
                            value={orgFormData.name}
                            onChange={(e) => updateOrgFormData('name', e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={orgFormData.description}
                            onChange={(e) => updateOrgFormData('description', e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeOrgDialog}>Cancel</Button>
                        <Button
                            onClick={createOrganization}
                            disabled={orgLoading || !orgFormData.name}
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                                }
                            }}
                        >
                            {orgLoading ? <CircularProgress size={24} /> : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default Apps; 