import React, { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AuthService from '../../services/auth';
import { validateEmail, validatePassword } from '../../utils/helpers';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { actions } = useApp();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const result = await AuthService.signIn(email, password);

            if (result.success) {
                actions.setUser(result.user);
                navigate('/');
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (error) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
        >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Sign In
                </Typography>

                <Typography variant="body2" color="text.secondary" align="center" mb={3}>
                    Welcome back! Please sign in to continue.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        autoComplete="email"
                        autoFocus
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <Box textAlign="center">
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link component={RouterLink} to="/register">
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
