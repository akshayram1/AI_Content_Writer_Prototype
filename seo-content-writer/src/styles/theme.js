import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#667eea',
            light: '#8fa5f0',
            dark: '#4d64d6',
        },
        secondary: {
            main: '#764ba2',
            light: '#9575cd',
            dark: '#5e3572',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
        },
        grey: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.2,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
            lineHeight: 1.3,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.3,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.4,
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.4,
        },
        subtitle1: {
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
        button: {
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '0.875rem',
        },
        caption: {
            fontSize: '0.75rem',
            lineHeight: 1.4,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '10px 20px',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transform: 'translateY(-1px)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                    },
                    '&:disabled': {
                        background: '#e5e7eb',
                        color: '#9ca3af',
                    },
                },
                outlined: {
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                        backgroundColor: 'rgba(102, 126, 234, 0.04)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #f1f5f9',
                    transition: 'box-shadow 0.2s ease-in-out',
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                },
                elevation2: {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                },
                elevation3: {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#667eea',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '2px',
                            borderColor: '#667eea',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#667eea',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 500,
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #f1f5f9',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    fontSize: '1.5rem',
                    '&.Mui-active': {
                        color: '#667eea',
                    },
                    '&.Mui-completed': {
                        color: '#10b981',
                    },
                },
            },
        },
    },
});

export default theme;
