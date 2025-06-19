import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Loading...' }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            py={4}
        >
            <CircularProgress />
            <Typography variant="body1" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
