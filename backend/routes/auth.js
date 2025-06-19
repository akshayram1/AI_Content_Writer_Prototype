const express = require('express');
const router = express.Router();

// Mock authentication for development
// In production, you would integrate with Firebase Admin SDK or other auth providers

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Mock authentication - in production, verify against Firebase/database
        if (email && password.length >= 6) {
            const mockUser = {
                uid: `user_${Date.now()}`,
                email,
                displayName: email.split('@')[0]
            };

            req.session.user = mockUser;

            res.json({
                success: true,
                user: mockUser,
                message: 'Login successful'
            });
        } else {
            res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters long'
            });
        }

        // Mock registration - in production, create user in Firebase/database
        const mockUser = {
            uid: `user_${Date.now()}`,
            email,
            displayName: email.split('@')[0],
            createdAt: new Date().toISOString()
        };

        req.session.user = mockUser;

        res.json({
            success: true,
            user: mockUser,
            message: 'Registration successful'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Registration failed'
        });
    }
});

router.post('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: 'Logout failed'
                });
            }

            res.clearCookie('connect.sid');
            res.json({
                success: true,
                message: 'Logout successful'
            });
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: 'Logout failed'
        });
    }
});

// Get current user
router.get('/me', (req, res) => {
    res.json({
        success: true,
        user: req.session.user || null,
        isAuthenticated: !!req.session.user
    });
});

module.exports = router;
