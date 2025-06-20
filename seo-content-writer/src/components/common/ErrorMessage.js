import React from 'react';
import { Alert, AlertTitle, Button, Box, Fade, IconButton } from '@mui/material';
import { Refresh as RefreshIcon, Close as CloseIcon } from '@mui/icons-material';

const ErrorMessage = ({ error, onRetry, onDismiss, title = "Oops! Something went wrong" }) => {
    if (!error) return null;

    return (
        <Fade in timeout={300}>
            <Alert
                severity="error"
                sx={{
                    mb: 2,
                    borderRadius: 2,
                    border: '1px solid #fecaca',
                    background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                    '& .MuiAlert-icon': {
                        fontSize: '1.5rem',
                    },
                }}
                action={
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {onRetry && (
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={onRetry}
                                sx={{
                                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                                    '&:hover': {
                                        bgcolor: 'rgba(239, 68, 68, 0.2)',
                                    },
                                }}
                            >
                                <RefreshIcon fontSize="small" />
                            </IconButton>
                        )}
                        {onDismiss && (
                            <IconButton
                                color="inherit"
                                size="small"
                                onClick={onDismiss}
                                sx={{
                                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                                    '&:hover': {
                                        bgcolor: 'rgba(239, 68, 68, 0.2)',
                                    },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                }
            >
                <AlertTitle sx={{ fontWeight: 600, fontSize: '1rem' }}>
                    {title}
                </AlertTitle>
                <Box sx={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                    {error}
                </Box>
            </Alert>
        </Fade>
    );
};

export default ErrorMessage;
