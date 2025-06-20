import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Alert,
    Chip,
    Divider,
    LinearProgress,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Create as CreateIcon,
    ContentCopy as CopyIcon,
    Download as DownloadIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import ApiService from '../../services/api';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';
import SEOScoreButton from '../common/SEOScoreButton';
import SEOScoreSidebar from '../common/SEOScoreSidebar';
import { CONTENT_TYPES, WORD_COUNTS } from '../../utils/constants';
import { exportToFile, copyToClipboard, getSEOScoreColor, getSEOScoreLabel } from '../../utils/helpers';

const ContentCreation = () => {
    const { state, actions } = useApp();
    const [contentType, setContentType] = useState('blog_intro');
    const [wordCount, setWordCount] = useState(150);
    const [copySuccess, setCopySuccess] = useState(false);
    const [seoSidebarOpen, setSeoSidebarOpen] = useState(false);

    const generateContent = async () => {
        actions.setLoading(true);
        actions.clearError();

        try {
            const result = await ApiService.generateContent(
                state.selectedTitle,
                state.selectedKeyword,
                state.selectedTopic,
                contentType,
                wordCount
            );

            actions.setContent(result.data.content, result.data.seoScore);
        } catch (error) {
            actions.setError(error.message || 'Failed to generate content. Please try again.');
        }
    };

    const handleExport = () => {
        const content = `Title: ${state.selectedTitle}
Keyword: ${state.selectedKeyword}
Content Type: ${CONTENT_TYPES.find(t => t.value === contentType)?.label}
Word Count: ${wordCount}

${state.generatedContent}`;

        const filename = `seo-content-${Date.now()}.txt`;
        exportToFile(content, filename);
    };

    const handleCopy = async () => {
        const result = await copyToClipboard(state.generatedContent);
        if (result.success) {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    const handleRetry = () => {
        actions.clearError();
        generateContent();
    };

    const handleBackToTopics = () => {
        actions.setStep(2);
    };

    const renderSEOScore = () => {
        if (!state.seoScore) return null;

        return (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                    SEO Analysis
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                        Overall Score:
                    </Typography>
                    <Chip
                        label={`${state.seoScore.overall_score}/100 - ${getSEOScoreLabel(state.seoScore.overall_score)}`}
                        color={getSEOScoreColor(state.seoScore.overall_score)}
                        size="small"
                    />
                </Box>

                <LinearProgress
                    variant="determinate"
                    value={state.seoScore.overall_score}
                    color={getSEOScoreColor(state.seoScore.overall_score)}
                    sx={{ mb: 2 }}
                />

                {state.seoScore.recommendations && state.seoScore.recommendations.length > 0 && (
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Recommendations:
                        </Typography>
                        <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                            {state.seoScore.recommendations.map((rec, index) => (
                                <li key={index}>
                                    <Typography variant="caption">{rec}</Typography>
                                </li>
                            ))}
                        </ul>
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Content Creation
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                    Generate your final SEO-optimized content based on your selections.
                </Typography>

                {/* Selection Summary */}
                <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Your Selections:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <Chip label={`Keyword: ${state.selectedKeyword}`} size="small" />
                        <Chip label={`Title: ${state.selectedTitle}`} size="small" />
                        <Chip label="Outline Selected" size="small" />
                    </Box>
                    <Button
                        size="small"
                        onClick={handleBackToTopics}
                        variant="outlined"
                    >
                        Change Outline
                    </Button>
                </Paper>

                {/* Content Options */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Content Type</InputLabel>
                        <Select
                            value={contentType}
                            onChange={(e) => setContentType(e.target.value)}
                            label="Content Type"
                        >
                            {CONTENT_TYPES.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Word Count</InputLabel>
                        <Select
                            value={wordCount}
                            onChange={(e) => setWordCount(e.target.value)}
                            label="Word Count"
                        >
                            {WORD_COUNTS.map((count) => (
                                <MenuItem key={count.value} value={count.value}>
                                    {count.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        onClick={generateContent}
                        disabled={state.loading}
                        startIcon={<CreateIcon />}
                        size="large"
                    >
                        {state.loading ? 'Generating...' : 'Generate Content'}
                    </Button>
                </Box>

                {state.loading && (
                    <Loading message="Creating your SEO-optimized content..." />
                )}

                <ErrorMessage
                    error={state.error}
                    onRetry={handleRetry}
                    onDismiss={actions.clearError}
                />

                {/* Generated Content */}
                {state.generatedContent && !state.loading && (
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">
                                Generated Content
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Generate new version">
                                    <IconButton onClick={generateContent} disabled={state.loading}>
                                        <RefreshIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={copySuccess ? "Copied!" : "Copy to clipboard"}>
                                    <IconButton onClick={handleCopy}>
                                        <CopyIcon color={copySuccess ? "success" : "inherit"} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Download as text file">
                                    <IconButton onClick={handleExport}>
                                        <DownloadIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        <Paper sx={{ p: 3, mb: 3, bgcolor: 'background.paper' }}>
                            <Typography
                                component="pre"
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: 'inherit',
                                    fontSize: '1rem',
                                    lineHeight: 1.6,
                                    margin: 0,
                                }}
                            >
                                {state.generatedContent}
                            </Typography>
                        </Paper>

                        {renderSEOScore()}

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                variant="outlined"
                                onClick={handleCopy}
                                startIcon={<CopyIcon />}
                            >
                                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleExport}
                                startIcon={<DownloadIcon />}
                            >
                                Download as Text
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => actions.resetWorkflow()}
                            >
                                Start New Project
                            </Button>
                        </Box>
                    </Box>
                )}

                {!state.generatedContent && !state.loading && !state.error && (
                    <Alert severity="info">
                        Configure your content options above and click "Generate Content" to create your SEO-optimized content.
                    </Alert>
                )}
            </Paper>

            {/* Floating SEO Score Button */}
            {state.generatedContent && (
                <SEOScoreButton
                    score={state.seoScore?.overall_score || null}
                    onClick={() => setSeoSidebarOpen(true)}
                    visible={true}
                />
            )}

            {/* SEO Score Sidebar */}
            <SEOScoreSidebar
                open={seoSidebarOpen}
                onClose={() => setSeoSidebarOpen(false)}
                content={state.generatedContent}
                title={state.selectedTitle}
                keyword={state.selectedKeyword}
            />
        </Box>
    );
};

export default ContentCreation;
