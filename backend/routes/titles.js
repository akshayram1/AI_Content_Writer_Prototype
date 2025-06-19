const express = require('express');
const router = express.Router();
const llmService = require('../services/llmService');

router.post('/generate', async (req, res) => {
    try {
        const { keyword, tone = 'professional' } = req.body;

        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Keyword is required'
            });
        }

        // Call LLM service to generate titles
        const titles = await llmService.generateTitles(keyword, tone);

        // Store in session
        req.session.selectedKeyword = keyword;
        req.session.titles = titles;
        req.session.tone = tone;
        req.session.titlesTimestamp = new Date().toISOString();

        res.json({
            success: true,
            data: {
                keyword,
                titles,
                tone,
                timestamp: req.session.titlesTimestamp
            }
        });
    } catch (error) {
        console.error('Title generation error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate titles'
        });
    }
});

// Get current session titles
router.get('/current', (req, res) => {
    res.json({
        success: true,
        data: {
            keyword: req.session.selectedKeyword || '',
            titles: req.session.titles || [],
            tone: req.session.tone || 'professional',
            timestamp: req.session.titlesTimestamp
        }
    });
});

module.exports = router;
