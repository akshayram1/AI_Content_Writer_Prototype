import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Box,
    Typography,
    LinearProgress,
    Card,
    CardContent,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    IconButton,
    Tooltip,
    Collapse,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Close as CloseIcon,
    TrendingUp,
    TrendingDown,
    CheckCircle,
    Warning,
    Error,
    ExpandMore,
    ExpandLess,
    Refresh,
} from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import ApiService from '../../services/api';

const SEOScoreSidebar = ({ open, onClose, content = '', title = '', keyword = '' }) => {
    const { state } = useApp();
    const [seoAnalysis, setSeoAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedSections, setExpandedSections] = useState({
        overview: true,
        details: true,
        recommendations: true,
    });

    // Real-time analysis effect
    useEffect(() => {
        const analyzeContent = async () => {
            if (!content || !keyword || !title) {
                setSeoAnalysis(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Call the backend SEO scoring service
                const response = await ApiService.analyzeSEO({
                    content,
                    keyword,
                    title
                });
                setSeoAnalysis(response.data);
            } catch (err) {
                setError(err.message || 'Failed to analyze SEO score');
                console.error('SEO Analysis Error:', err);
            } finally {
                setLoading(false);
            }
        };

        // Debounce the analysis to avoid too many API calls
        const timeoutId = setTimeout(analyzeContent, 1000);
        return () => clearTimeout(timeoutId);
    }, [content, keyword, title]);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981'; // Green
        if (score >= 60) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    };

    const getScoreIcon = (score) => {
        if (score >= 80) return <CheckCircle sx={{ color: '#10b981' }} />;
        if (score >= 60) return <Warning sx={{ color: '#f59e0b' }} />;
        return <Error sx={{ color: '#ef4444' }} />;
    };

    const formatMetricValue = (key, value) => {
        switch (key) {
            case 'keyword_density':
                return `${value}%`;
            case 'title_length':
                return `${value} chars`;
            case 'content_length':
                return `${value} words`;
            case 'keyword_in_title':
                return value ? 'Yes' : 'No';
            case 'readability':
                return `${value.toFixed(1)} avg words/sentence`;
            default:
                return value;
        }
    };

    const getMetricLabel = (key) => {
        const labels = {
            'keyword_density': 'Keyword Density',
            'title_length': 'Title Length',
            'content_length': 'Content Length',
            'keyword_in_title': 'Keyword in Title',
            'readability': 'Readability'
        };
        return labels[key] || key;
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 400,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    borderLeft: '1px solid #e5e7eb',
                },
            }}
        >
            <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1f2937' }}>
                        📊 SEO Score
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Loading State */}
                {loading && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <CircularProgress size={40} sx={{ color: '#667eea', mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                            Analyzing SEO performance...
                        </Typography>
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* No Data State */}
                {!loading && !error && !seoAnalysis && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            🚀 Ready to analyze!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Start creating content with a keyword and title to see real-time SEO scoring.
                        </Typography>
                    </Box>
                )}

                {/* SEO Analysis Results */}
                {!loading && !error && seoAnalysis && (
                    <Box>
                        {/* Overall Score Card */}
                        <Card 
                            sx={{ 
                                mb: 3, 
                                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                                border: '1px solid #bfdbfe',
                            }}
                        >
                            <CardContent sx={{ textAlign: 'center', pb: '16px !important' }}>
                                <Typography variant="h3" sx={{ 
                                    fontWeight: 700, 
                                    color: getScoreColor(seoAnalysis.overall_score),
                                    mb: 1,
                                }}>
                                    {seoAnalysis.overall_score}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    Overall SEO Score
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={seoAnalysis.overall_score}
                                    sx={{
                                        height: 8,
                                        borderRadius: 4,
                                        backgroundColor: '#e5e7eb',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: getScoreColor(seoAnalysis.overall_score),
                                            borderRadius: 4,
                                        },
                                    }}
                                />
                                <Box sx={{ mt: 2 }}>
                                    <Chip
                                        label={
                                            seoAnalysis.overall_score >= 80 ? 'Excellent' :
                                            seoAnalysis.overall_score >= 60 ? 'Good' : 'Needs Improvement'
                                        }
                                        sx={{
                                            backgroundColor: getScoreColor(seoAnalysis.overall_score),
                                            color: 'white',
                                            fontWeight: 600,
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Detailed Metrics */}
                        <Card sx={{ mb: 3 }}>
                            <CardContent sx={{ pb: '16px !important' }}>
                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => toggleSection('details')}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        📋 Detailed Metrics
                                    </Typography>
                                    {expandedSections.details ? <ExpandLess /> : <ExpandMore />}
                                </Box>
                                
                                <Collapse in={expandedSections.details}>
                                    <List sx={{ mt: 1 }}>
                                        {Object.entries(seoAnalysis.scores).map(([key, data], index) => (
                                            <React.Fragment key={key}>
                                                <ListItem sx={{ px: 0 }}>
                                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                                        {getScoreIcon(data.score)}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                                                    {getMetricLabel(key)}
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ fontWeight: 600, color: getScoreColor(data.score) }}>
                                                                    {data.score}/100
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        secondary={
                                                            <Box sx={{ mt: 1 }}>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    Value: {formatMetricValue(key, data.value)}
                                                                </Typography>
                                                                <LinearProgress
                                                                    variant="determinate"
                                                                    value={data.score}
                                                                    sx={{
                                                                        height: 4,
                                                                        borderRadius: 2,
                                                                        backgroundColor: '#e5e7eb',
                                                                        mt: 0.5,
                                                                        '& .MuiLinearProgress-bar': {
                                                                            backgroundColor: getScoreColor(data.score),
                                                                            borderRadius: 2,
                                                                        },
                                                                    }}
                                                                />
                                                                <Typography variant="caption" sx={{ mt: 0.5, display: 'block', fontStyle: 'italic' }}>
                                                                    {data.feedback}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                                {index < Object.entries(seoAnalysis.scores).length - 1 && <Divider />}
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </Collapse>
                            </CardContent>
                        </Card>

                        {/* Recommendations */}
                        <Card>
                            <CardContent sx={{ pb: '16px !important' }}>
                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => toggleSection('recommendations')}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        💡 Recommendations
                                    </Typography>
                                    {expandedSections.recommendations ? <ExpandLess /> : <ExpandMore />}
                                </Box>
                                
                                <Collapse in={expandedSections.recommendations}>
                                    <List sx={{ mt: 1 }}>
                                        {seoAnalysis.recommendations.map((recommendation, index) => (
                                            <ListItem key={index} sx={{ px: 0, alignItems: 'flex-start' }}>
                                                <ListItemText
                                                    primary={
                                                        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                            {recommendation}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Box>
        </Drawer>
    );
};

export default SEOScoreSidebar;
