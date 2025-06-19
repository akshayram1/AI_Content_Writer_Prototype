import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AuthService from '../../services/auth';

const Header = () => {
    const { state, actions } = useApp();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await AuthService.signOut();
            actions.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleNewProject = () => {
        actions.resetWorkflow();
    };

    return (
        <AppBar position="static" elevation={1}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    SEO Content Writer
                </Typography>

                {state.isAuthenticated && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {state.currentStep > 0 && (
                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={handleNewProject}
                                sx={{ borderColor: 'white', color: 'white' }}
                            >
                                New Project
                            </Button>
                        )}
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {state.user?.email}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
