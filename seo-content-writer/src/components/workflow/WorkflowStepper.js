import React from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Paper,
    Box,
    Typography,
    LinearProgress,
    Chip,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import {
    Search as SearchIcon,
    Title as TitleIcon,
    Topic as TopicIcon,
    Create as CreateIcon,
    CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useApp } from '../../context/AppContext';
import { WORKFLOW_STEPS } from '../../utils/constants';

const WorkflowStepper = () => {
    const { state } = useApp();

    const stepIcons = [SearchIcon, TitleIcon, TopicIcon, CreateIcon];
    const progress = state.currentStep >= 0 ? ((state.currentStep + 1) / WORKFLOW_STEPS.length) * 100 : 0;

    const StepIcon = ({ step, index }) => {
        const Icon = stepIcons[index];
        const isActive = state.currentStep === index;
        const isCompleted = state.currentStep > index;

        return (
            <Box
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isCompleted
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : isActive
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : '#e5e7eb',
                    color: isCompleted || isActive ? 'white' : '#6b7280',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: isCompleted || isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                }}
            >
                {isCompleted ? <CheckIcon /> : <Icon />}
            </Box>
        );
    };

    return (
        <Paper
            elevation={2}
            sx={{
                p: 4,
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid #e5e7eb',
                borderRadius: 3,
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        color: '#1f2937',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    🚀 Content Creation Workflow
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
                    Follow these simple steps to create your SEO-optimized content
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#e5e7eb',
                                '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: 4,
                                },
                            }}
                        />
                    </Box>
                    <Chip
                        label={`${Math.round(progress)}% Complete`}
                        size="small"
                        sx={{
                            fontWeight: 600,
                            background: progress === 100
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                        }}
                    />
                </Box>
            </Box>

            <Grid container spacing={3}>
                {WORKFLOW_STEPS.map((step, index) => {
                    const isActive = state.currentStep === index;
                    const isCompleted = state.currentStep > index;
                    const isUpcoming = state.currentStep < index;

                    return (
                        <Grid item xs={12} sm={6} md={3} key={step.label}>
                            <Card
                                sx={{
                                    height: '100%',
                                    border: isActive ? '2px solid #667eea' : '1px solid #e5e7eb',
                                    boxShadow: isActive ? '0 8px 24px rgba(102, 126, 234, 0.15)' : 'none',
                                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                                    transition: 'all 0.3s ease-in-out',
                                    background: isCompleted
                                        ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                                        : isActive
                                            ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
                                            : 'white',
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                        <StepIcon step={step} index={index} />
                                    </Box>

                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 600,
                                            color: isActive ? '#1e40af' : isCompleted ? '#059669' : '#374151',
                                        }}
                                    >
                                        {step.label}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ lineHeight: 1.5 }}
                                    >
                                        {step.description}
                                    </Typography>

                                    {isCompleted && (
                                        <Chip
                                            label="Completed"
                                            size="small"
                                            sx={{
                                                mt: 2,
                                                bgcolor: '#10b981',
                                                color: 'white',
                                                fontWeight: 500,
                                            }}
                                        />
                                    )}

                                    {isActive && (
                                        <Chip
                                            label="In Progress"
                                            size="small"
                                            sx={{
                                                mt: 2,
                                                bgcolor: '#667eea',
                                                color: 'white',
                                                fontWeight: 500,
                                            }}
                                        />
                                    )}

                                    {isUpcoming && (
                                        <Chip
                                            label="Upcoming"
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                mt: 2,
                                                borderColor: '#d1d5db',
                                                color: '#6b7280',
                                            }}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Paper>
    );
};

export default WorkflowStepper;
