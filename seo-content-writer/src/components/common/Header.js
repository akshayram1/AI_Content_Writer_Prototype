import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Tooltip,
    Chip,
} from '@mui/material';
import {
    AccountCircle as AccountIcon,
    Add as AddIcon,
    Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AuthService from '../../services/auth';

const Header = () => {
    const { state, actions } = useApp();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLogout = async () => {
        try {
            await AuthService.signOut();
            actions.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
        setAnchorEl(null);
    };

    const handleNewProject = () => {
        actions.resetWorkflow();
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getStepLabel = () => {
        const steps = ['Keyword Research', 'Title Generation', 'Topic Selection', 'Content Creation'];
        return steps[state.currentStep] || 'Getting Started';
    };

    return (
        <AppBar
            position="static"
            elevation={2}
            sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        ✨ SEO Content Writer
                    </Typography>
                    {state.isAuthenticated && state.currentStep >= 0 && (
                        <Chip
                            label={getStepLabel()}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                fontWeight: 'medium',
                                '& .MuiChip-label': {
                                    fontSize: '0.75rem',
                                },
                            }}
                        />
                    )}
                </Box>

                {state.isAuthenticated && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {state.currentStep >= 0 && (
                            <Tooltip title="Start new project">
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    onClick={handleNewProject}
                                    startIcon={<AddIcon />}
                                    sx={{
                                        borderColor: 'rgba(255,255,255,0.5)',
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255,255,255,0.1)'
                                        },
                                        borderRadius: 2,
                                    }}
                                >
                                    New Project
                                </Button>
                            </Tooltip>
                        )}

                        <IconButton
                            color="inherit"
                            onClick={handleMenuOpen}
                            sx={{ ml: 1 }}
                        >
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>
                                <AccountIcon />
                            </Avatar>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            PaperProps={{
                                sx: {
                                    minWidth: 200,
                                    mt: 1,
                                    borderRadius: 2,
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                }
                            }}
                        >
                            <MenuItem disabled>
                                <Typography variant="body2" color="text.secondary">
                                    {state.user?.email}
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleNewProject}>
                                <AddIcon sx={{ mr: 2, fontSize: 20 }} />
                                New Project
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
