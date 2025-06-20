import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Typography,
    Paper,
    Container,
    Grid,
    Button,
} from '@mui/material';
import SEOScoreSidebar from '../components/common/SEOScoreSidebar';
import SEOScoreButton from '../components/common/SEOScoreButton';

const SEOTestPage = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [keyword, setKeyword] = useState('');
    const [seoSidebarOpen, setSeoSidebarOpen] = useState(false);
    const [seoScore, setSeoScore] = useState(null);

    // Demo content for testing
    const loadDemoContent = () => {
        setKeyword('digital marketing');
        setTitle('The Complete Guide to Digital Marketing in 2024');
        setContent(`Digital marketing has become an essential component of modern business strategy. In today's competitive landscape, digital marketing techniques help businesses reach their target audience effectively. 

This comprehensive guide covers all aspects of digital marketing, from social media marketing to search engine optimization. Digital marketing strategies have evolved significantly, and businesses must adapt to stay competitive.

Whether you're new to digital marketing or looking to enhance your existing digital marketing skills, this guide provides valuable insights. We'll explore various digital marketing channels and how they can boost your business growth.`);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4, fontWeight: 700 }}>
                🧪 SEO Scoring Test Page
            </Typography>
            
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            Content Input
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={loadDemoContent}
                                sx={{ mb: 2 }}
                            >
                                Load Demo Content
                            </Button>
                        </Box>

                        <TextField
                            fullWidth
                            label="Keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            sx={{ mb: 2 }}
                            placeholder="e.g., digital marketing"
                        />

                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ mb: 2 }}
                            placeholder="e.g., The Complete Guide to Digital Marketing"
                        />

                        <TextField
                            fullWidth
                            label="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            multiline
                            rows={12}
                            placeholder="Enter your content here to see real-time SEO scoring..."
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: 'fit-content' }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            Instructions
                        </Typography>
                        
                        <Typography variant="body1" paragraph>
                            This page demonstrates the real-time SEO scoring feature:
                        </Typography>

                        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
                            <li>Enter a keyword, title, and content in the form</li>
                            <li>Click "Load Demo Content" for sample data</li>
                            <li>The floating SEO button will appear when content is present</li>
                            <li>Click the floating button or use the header SEO Score button</li>
                            <li>The sidebar will show real-time SEO analysis</li>
                            <li>Modify the content to see scores update automatically</li>
                        </Typography>

                        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
                            SEO Metrics Analyzed:
                        </Typography>
                        
                        <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
                            <li><strong>Keyword Density:</strong> 1-3% is optimal</li>
                            <li><strong>Title Length:</strong> 30-60 characters ideal</li>
                            <li><strong>Content Length:</strong> Longer content ranks better</li>
                            <li><strong>Keyword in Title:</strong> Should include target keyword</li>
                            <li><strong>Readability:</strong> Average sentence length analysis</li>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Floating SEO Score Button */}
            {(content || keyword || title) && (
                <SEOScoreButton
                    score={seoScore?.overall_score || null}
                    onClick={() => setSeoSidebarOpen(true)}
                    visible={true}
                />
            )}

            {/* SEO Score Sidebar */}
            <SEOScoreSidebar
                open={seoSidebarOpen}
                onClose={() => setSeoSidebarOpen(false)}
                content={content}
                title={title}
                keyword={keyword}
            />
        </Container>
    );
};

export default SEOTestPage;
