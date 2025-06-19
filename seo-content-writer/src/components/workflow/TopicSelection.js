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
    Alert,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Topic as TopicIcon
} from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import ApiService from '../../services/api';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const TopicSelection = () => {
    const { state, actions } = useApp();
    const [expandedTopic, setExpandedTopic] = useState(null);

    useEffect(() => {
        // Auto-generate topics when component loads
        if (state.selectedTitle && state.selectedKeyword && state.topics.length === 0) {
            handleGenerateTopics();
        }
    }, [state.selectedTitle, state.selectedKeyword]);

    const handleGenerateTopics = async () => {
        if (!state.selectedTitle || !state.selectedKeyword) return;

        actions.setLoading(true);
        actions.clearError();

        try {
            const result = await ApiService.generateTopics(state.selectedTitle, state.selectedKeyword);
            actions.setTopics(result.data.topics);
        } catch (error) {
            actions.setError(error.message || 'Failed to generate topics. Please try again.');
        }
    };

    const handleTopicSelect = (topic) => {
        actions.setSelectedTopic(topic);
        actions.setStep(3);
    };

    const handleRetry = () => {
        actions.clearError();
        handleGenerateTopics();
    };

    const handleBackToTitles = () => {
        actions.setStep(1);
    };

    const handleAccordionChange = (topicIndex) => (event, isExpanded) => {
        setExpandedTopic(isExpanded ? topicIndex : null);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Topic Selection & Outline
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                    Choose a content structure and outline for your article.
                </Typography>

                {/* Current Selections */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Your Selections:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <Chip label={`Keyword: ${state.selectedKeyword}`} variant="outlined" />
                        <Chip label={`Title: ${state.selectedTitle}`} variant="outlined" />
                    </Box>
                    <Button
                        size="small"
                        onClick={handleBackToTitles}
                        variant="outlined"
                    >
                        Change Title
                    </Button>
                </Box>

                {/* Generate Topics Button */}
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="contained"
                        onClick={handleGenerateTopics}
                        disabled={state.loading}
                        startIcon={<TopicIcon />}
                    >
                        {state.loading ? 'Generating Outlines...' : 'Generate Topic Outlines'}
                    </Button>
                </Box>

                {state.loading && (
                    <Loading message="Creating topic outlines and content structure..." />
                )}

                <ErrorMessage
                    error={state.error}
                    onRetry={handleRetry}
                    onDismiss={actions.clearError}
                />

                {state.topics.length > 0 && !state.loading && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Content Outlines
                        </Typography>

                        {state.topics.map((topic, index) => (
                            <Accordion
                                key={index}
                                expanded={expandedTopic === index}
                                onChange={handleAccordionChange(index)}
                                sx={{ mb: 1 }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                                            {topic.title || `Outline ${index + 1}`}
                                        </Typography>
                                        {state.selectedTopic === topic && (
                                            <Chip
                                                label="Selected"
                                                color="primary"
                                                size="small"
                                                sx={{ mr: 2 }}
                                            />
                                        )}
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box>
                                        {topic.sections ? (
                                            <List dense>
                                                {topic.sections.map((section, sectionIndex) => (
                                                    <ListItem key={sectionIndex}>
                                                        <ListItemText
                                                            primary={section.heading}
                                                            secondary={section.points?.join(' • ') || section.description}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">
                                                {topic.description || 'Detailed outline structure will be generated for content creation.'}
                                            </Typography>
                                        )}

                                        <Box sx={{ mt: 2 }}>
                                            <Button
                                                variant={state.selectedTopic === topic ? "contained" : "outlined"}
                                                onClick={() => handleTopicSelect(topic)}
                                                fullWidth
                                            >
                                                {state.selectedTopic === topic ? "Selected - Continue to Content" : "Select This Outline"}
                                            </Button>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))}

                        {state.selectedTopic && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                Topic outline selected! Ready to generate your content.
                            </Alert>
                        )}
                    </Box>
                )}

                {state.topics.length === 0 && !state.loading && !state.error && (
                    <Alert severity="info">
                        Click "Generate Topic Outlines" to create content structures for your title.
                    </Alert>
                )}
            </Paper>
        </Box>
    );
};

export default TopicSelection;
