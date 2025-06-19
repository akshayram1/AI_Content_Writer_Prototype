import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';

const ErrorMessage = ({ error, onRetry, onDismiss }) => {
    if (!error) return null;

    return (
        <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {onRetry && (
                        <Button color="inherit" size="small" onClick={onRetry}>
                            Retry
                        </Button>
                    )}
                    {onDismiss && (
                        <Button color="inherit" size="small" onClick={onDismiss}>
                            Dismiss
                        </Button>
                    )}
                </Box>
            }
        >
            <AlertTitle>Error</AlertTitle>
            {error}
        </Alert>
    );
};

export default ErrorMessage;
