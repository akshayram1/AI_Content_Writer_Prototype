import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Chip,
} from '@mui/material';
import { Title as TitleIcon } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import ApiService from '../../services/api';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import { TONE_OPTIONS } from '../../utils/constants';

const TitleGeneration = () => {
    const { state, actions } = useApp();
    const [tone, setTone] = useState('professional');

    useEffect(() => {
        // Auto-generate titles when component loads and we have a selected keyword
        if (state.selectedKeyword && state.titles.length === 0) {
            handleGenerateTitles();
        }
    }, [state.selectedKeyword]);

    const handleGenerateTitles = async () => {
        if (!state.selectedKeyword) return;

        actions.setLoading(true);
        actions.clearError();

        try {
            const result = await ApiService.generateTitles(state.selectedKeyword, tone);
            actions.setTitles(result.data.titles);
        } catch (error) {
            actions.setError(error.message || 'Failed to generate titles. Please try again.');
        }
    };

    const handleTitleSelect = (title) => {
        actions.setSelectedTitle(title);
        actions.setStep(2);
    };

    const handleRetry = () => {
        actions.clearError();
        handleGenerateTitles();
    };

    const handleBackToKeywords = () => {
        actions.setStep(0);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Title Generation
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                    Generate SEO-optimized titles for your selected keyword.
                </Typography>

                {/* Current Selection */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Selected Keyword:
                    </Typography>
                    <Chip
                        label={state.selectedKeyword}
                        color="primary"
                        sx={{ mr: 1 }}
                    />
                    <Button
                        size="small"
                        onClick={handleBackToKeywords}
                        variant="outlined"
                    >
                        Change Keyword
                    </Button>
                </Box>

                {/* Tone Selection */}
                <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Tone</InputLabel>
                        <Select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            label="Tone"
                        >
                            {TONE_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        onClick={handleGenerateTitles}
                        disabled={state.loading}
                        startIcon={<TitleIcon />}
                    >
                        {state.loading ? 'Generating...' : 'Generate Titles'}
                    </Button>
                </Box>

                {state.loading && (
                    <Loading message="Creating SEO-optimized titles for your keyword..." />
                )}

                <ErrorMessage
                    error={state.error}
                    onRetry={handleRetry}
                    onDismiss={actions.clearError}
                />

                {state.titles.length > 0 && !state.loading && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Generated Titles
                        </Typography>

                        <List>
                            {state.titles.map((title, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton
                                        onClick={() => handleTitleSelect(title)}
                                        selected={state.selectedTitle === title}
                                        sx={{
                                            borderRadius: 1,
                                            mb: 1,
                                            border: '1px solid',
                                            borderColor: state.selectedTitle === title ? 'primary.main' : 'divider'
                                        }}
                                    >
                                        <ListItemText
                                            primary={title}
                                            secondary={`${title.length} characters • Click to select and continue`}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>

                        {state.selectedTitle && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                Selected title: <strong>{state.selectedTitle}</strong>
                                <br />
                                Ready to generate topic outline! The workflow will continue automatically.
                            </Alert>
                        )}
                    </Box>
                )}

                {state.titles.length === 0 && !state.loading && !state.error && (
                    <Alert severity="info">
                        Click "Generate Titles" to create SEO-optimized titles for your keyword.
                    </Alert>
                )}
            </Paper>
        </Box>
    );
};

export default TitleGeneration;
