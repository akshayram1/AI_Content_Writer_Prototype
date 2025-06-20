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
    Card,
    CardContent,
    Grid,
    InputAdornment,
    Fade,
} from '@mui/material';
import { Search as SearchIcon, TrendingUp, Speed, Visibility } from '@mui/icons-material';
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
    }; return (
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
            <Paper
                elevation={2}
                sx={{
                    p: 4,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    border: '1px solid #e5e7eb',
                    borderRadius: 3,
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        🔍 Keyword Research
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                        Discover high-impact keywords to boost your content's SEO potential
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        label="Enter your seed keyword"
                        value={seedKeyword}
                        onChange={(e) => setSeedKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
                        placeholder="e.g., digital marketing, web development, content strategy"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                fontSize: '1.1rem',
                                py: 1,
                            },
                        }}
                    />

                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={handleResearch}
                            disabled={!seedKeyword.trim() || state.loading}
                            startIcon={<SearchIcon />}
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                minWidth: 200,
                            }}
                        >
                            {state.loading ? 'Researching Keywords...' : 'Research Keywords'}
                        </Button>
                    </Box>
                </Box>

                {state.loading && (
                    <Loading
                        message="Analyzing your keyword and finding related suggestions..."
                        variant="linear"
                    />
                )}

                <ErrorMessage
                    error={state.error}
                    onRetry={handleRetry}
                    onDismiss={actions.clearError}
                />

                {state.keywords.length > 0 && !state.loading && (
                    <Fade in timeout={500}>
                        <Box>
                            <Box sx={{ mb: 3, textAlign: 'center' }}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                    ✨ Suggested Keywords
                                </Typography>
                                <Chip
                                    label={`Based on: "${state.seedKeyword}"`}
                                    size="medium"
                                    sx={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        fontWeight: 500,
                                    }}
                                />
                            </Box>

                            <Grid container spacing={2}>
                                {state.keywords.map((keyword, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease-in-out',
                                                border: state.selectedKeyword === keyword
                                                    ? '2px solid #667eea'
                                                    : '1px solid #e5e7eb',
                                                background: state.selectedKeyword === keyword
                                                    ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
                                                    : 'white',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                    borderColor: '#667eea',
                                                },
                                            }}
                                            onClick={() => handleKeywordSelect(keyword)}
                                        >
                                            <CardContent sx={{ p: 3 }}>
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: state.selectedKeyword === keyword ? '#1e40af' : '#374151',
                                                        mb: 2,
                                                    }}
                                                >
                                                    {keyword}
                                                </Typography>

                                                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                                    <Chip
                                                        icon={<TrendingUp />}
                                                        label="High Potential"
                                                        size="small"
                                                        color="success"
                                                        variant="outlined"
                                                    />
                                                </Box>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Click to select this keyword and continue to title generation
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            {state.selectedKeyword && (
                                <Fade in timeout={300}>
                                    <Alert
                                        severity="success"
                                        sx={{
                                            mt: 3,
                                            borderRadius: 2,
                                            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                                            border: '1px solid #bbf7d0',
                                        }}
                                    >
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                            🎉 Great choice! Keyword selected: <strong>{state.selectedKeyword}</strong>
                                        </Typography>
                                        <Typography variant="body2">
                                            Ready to generate titles! The workflow will continue automatically.
                                        </Typography>
                                    </Alert>
                                </Fade>
                            )}
                        </Box>
                    </Fade>
                )}

                {state.keywords.length === 0 && !state.loading && !state.error && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            🚀 Ready to discover keywords?
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Enter a seed keyword above to start discovering related keywords for your content.
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default KeywordResearch;
