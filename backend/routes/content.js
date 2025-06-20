const express = require('express');
const router = express.Router();
const llmService = require('../services/llmService');

router.post('/generate', async (req, res) => {
    try {
        const {
            title,
            keyword,
            outline,
            contentType = 'blog_intro',
            wordCount = 150
        } = req.body;

        if (!title || typeof title !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Title is required'
            });
        }

        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Keyword is required'
            });
        }

        // Call LLM service to generate content
        const content = await llmService.generateContent(
            title,
            keyword,
            outline,
            contentType,
            wordCount
        );

        // Generate SEO score
        const seoScore = await llmService.analyzeSEO(content, keyword, title);

        // Store in session
        req.session.generatedContent = content;
        req.session.seoScore = seoScore;
        req.session.contentOptions = { contentType, wordCount };
        req.session.contentTimestamp = new Date().toISOString();

        res.json({
            success: true,
            data: {
                content,
                seoScore,
                metadata: {
                    title,
                    keyword,
                    contentType,
                    wordCount,
                    wordCountActual: content.split(' ').length
                },
                timestamp: req.session.contentTimestamp
            }
        });
    } catch (error) {
        console.error('Content generation error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate content'
        });
    }
});

// Get current session content
router.get('/current', (req, res) => {
    res.json({
        success: true,
        data: {
            content: req.session.generatedContent || '',
            seoScore: req.session.seoScore || null,
            options: req.session.contentOptions || {},
            timestamp: req.session.contentTimestamp
        }
    });
});

// Analyze SEO score for any content
router.post('/analyze-seo', async (req, res) => {
    try {
        const { content, keyword, title } = req.body;

        if (!content || typeof content !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Content is required'
            });
        }

        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Keyword is required'
            });
        }

        if (!title || typeof title !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Title is required'
            });
        }

        // Call LLM service to analyze SEO
        const seoAnalysis = await llmService.analyzeSEO(content, keyword, title);

        res.json({
            success: true,
            data: seoAnalysis
        });
    } catch (error) {
        console.error('SEO analysis error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to analyze SEO'
        });
    }
});

module.exports = router;
