import React from 'react';
import { Box, CircularProgress, Typography, LinearProgress, Fade } from '@mui/material';

const Loading = ({ message = 'Loading...', variant = 'circular', showSubtext = true }) => {
    return (
        <Fade in timeout={300}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={3}
                py={6}
                px={4}
                sx={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: 3,
                    border: '1px solid #e5e7eb',
                    minHeight: 200,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '3px 3px 0 0',
                    },
                }}
            >
                {variant === 'circular' ? (
                    <Box sx={{ position: 'relative' }}>
                        <CircularProgress
                            size={60}
                            thickness={4}
                            sx={{
                                color: '#667eea',
                                '& .MuiCircularProgress-circle': {
                                    strokeLinecap: 'round',
                                },
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '24px',
                            }}
                        >
                            ✨
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ width: '100%', maxWidth: 300 }}>
                        <LinearProgress
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#e5e7eb',
                                '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: 4,
                                },
                            }}
                        />
                    </Box>
                )}

                <Box textAlign="center" maxWidth={400}>
                    <Typography
                        variant="h6"
                        color="text.primary"
                        sx={{
                            fontWeight: 600,
                            mb: showSubtext ? 1 : 0,
                        }}
                    >
                        {message}
                    </Typography>

                    {showSubtext && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ lineHeight: 1.5 }}
                        >
                            Please wait while we process your request...
                        </Typography>
                    )}
                </Box>
            </Box>
        </Fade>
    );
};

export default Loading;
