import React from 'react';
import { 
    Fab, 
    Badge, 
    Tooltip, 
    Box,
    Typography,
    Zoom,
} from '@mui/material';
import { 
    Analytics as AnalyticsIcon,
    TrendingUp,
    TrendingDown,
} from '@mui/icons-material';

const SEOScoreButton = ({ score, onClick, visible = true }) => {
    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981'; // Green
        if (score >= 60) return '#f59e0b'; // Orange  
        return '#ef4444'; // Red
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        return 'Needs Work';
    };

    const ScoreIcon = () => {
        if (score >= 70) return <TrendingUp />;
        return <TrendingDown />;
    };

    return (
        <Zoom in={visible} timeout={300}>
            <Box
                sx={{
                    position: 'fixed',
                    right: 24,
                    bottom: 24,
                    zIndex: 1000,
                }}
            >
                <Tooltip 
                    title={
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                SEO Score: {score !== null ? score : 'N/A'}
                            </Typography>
                            <Typography variant="caption">
                                {score !== null ? getScoreLabel(score) : 'Start creating content to see your score'}
                            </Typography>
                        </Box>
                    } 
                    placement="left"
                    arrow
                >
                    <Badge
                        badgeContent={score !== null ? score : '?'}
                        color="primary"
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: score !== null ? getScoreColor(score) : '#6b7280',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                minWidth: '24px',
                                height: '24px',
                                borderRadius: '12px',
                                border: '2px solid white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            },
                        }}
                    >
                        <Fab
                            color="primary"
                            onClick={onClick}
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                width: 64,
                                height: 64,
                                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            {score !== null ? <ScoreIcon /> : <AnalyticsIcon />}
                        </Fab>
                    </Badge>
                </Tooltip>
            </Box>
        </Zoom>
    );
};

export default SEOScoreButton;
