import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Typography,
    Paper,
    Alert,
    Chip,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import ApiService from '../../services/api';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const KeywordResearch = () => {
    const { state, actions } = useApp();
    const [seedKeyword, setSeedKeyword] = useState(state.seedKeyword || '');

    const handleResearch = async () => {
        if (!seedKeyword.trim()) return;

        actions.setLoading(true);
        actions.clearError();

        try {
            const result = await ApiService.researchKeywords(seedKeyword);
            actions.setKeywords(result.data.keywords);
            actions.setSeedKeyword(seedKeyword);
        } catch (error) {
            actions.setError(error.message || 'Failed to generate keywords. Please try again.');
        }
    };

    const handleKeywordSelect = (keyword) => {
        actions.setSelectedKeyword(keyword);
        actions.setStep(1);
    };

    const handleRetry = () => {
        actions.clearError();
        handleResearch();
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Keyword Research
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                    Enter a seed keyword to discover related SEO keywords for your content.
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="Enter seed keyword"
                        value={seedKeyword}
                        onChange={(e) => setSeedKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
                        placeholder="e.g., digital marketing, web development, content strategy"
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleResearch}
                        disabled={!seedKeyword.trim() || state.loading}
                        startIcon={<SearchIcon />}
                        size="large"
                    >
                        {state.loading ? 'Researching Keywords...' : 'Research Keywords'}
                    </Button>
                </Box>

                {state.loading && (
                    <Loading message="Analyzing your keyword and finding related suggestions..." />
                )}

                <ErrorMessage
                    error={state.error}
                    onRetry={handleRetry}
                    onDismiss={actions.clearError}
                />

                {state.keywords.length > 0 && !state.loading && (
                    <Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Suggested Keywords
                            </Typography>
                            <Chip
                                label={`Based on: "${state.seedKeyword}"`}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        </Box>

                        <List>
                            {state.keywords.map((keyword, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton
                                        onClick={() => handleKeywordSelect(keyword)}
                                        selected={state.selectedKeyword === keyword}
                                        sx={{
                                            borderRadius: 1,
                                            mb: 1,
                                            border: '1px solid',
                                            borderColor: state.selectedKeyword === keyword ? 'primary.main' : 'divider'
                                        }}
                                    >
                                        <ListItemText
                                            primary={keyword}
                                            secondary={`Click to select this keyword and continue`}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>

                        {state.selectedKeyword && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                Selected keyword: <strong>{state.selectedKeyword}</strong>
                                <br />
                                Ready to generate titles! The workflow will continue automatically.
                            </Alert>
                        )}
                    </Box>
                )}

                {state.keywords.length === 0 && !state.loading && !state.error && state.seedKeyword && (
                    <Alert severity="info">
                        Enter a seed keyword above to start discovering related keywords for your content.
                    </Alert>
                )}
            </Paper>
        </Box>
    );
};

export default KeywordResearch;
