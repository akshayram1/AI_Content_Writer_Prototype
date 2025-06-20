import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/common/Header';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SEOTestPage from './components/SEOTestPage';
import { useApp } from './context/AppContext';
import AuthService from './services/auth';

function App() {
    const { state, actions } = useApp();

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = AuthService.onAuthStateChanged((user) => {
            actions.setUser(user);
        });

        return unsubscribe;
    }, [actions]);

    return (
        <div className="App">
            <Header />
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            state.isAuthenticated ? (
                                <Dashboard />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !state.isAuthenticated ? (
                                <Login />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !state.isAuthenticated ? (
                                <Register />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route path="/seo-test" element={
                        state.isAuthenticated ? (
                            <SEOTestPage />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;
