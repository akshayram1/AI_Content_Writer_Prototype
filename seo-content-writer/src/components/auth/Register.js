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

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const result = await AuthService.signUp(email, password);

            if (result.success) {
                actions.setUser(result.user);
                navigate('/');
            } else {
                setError(result.error || 'Registration failed');
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
                    Sign Up
                </Typography>

                <Typography variant="body2" color="text.secondary" align="center" mb={3}>
                    Create your account to start generating SEO content.
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
                        autoComplete="new-password"
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        required
                        autoComplete="new-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>

                    <Box textAlign="center">
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login">
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Register;
