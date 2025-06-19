const express = require('express');
const router = express.Router();
const llmService = require('../services/llmService');

router.post('/research', async (req, res) => {
    try {
        const { seedKeyword } = req.body;

        if (!seedKeyword || typeof seedKeyword !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Seed keyword is required'
            });
        }

        // Call LLM service to generate keywords
        const keywords = await llmService.generateKeywords(seedKeyword);

        // Store in session for continuity
        req.session.seedKeyword = seedKeyword;
        req.session.keywords = keywords;
        req.session.timestamp = new Date().toISOString();

        res.json({
            success: true,
            data: {
                seedKeyword,
                keywords,
                timestamp: req.session.timestamp
            }
        });
    } catch (error) {
        console.error('Keyword research error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate keywords'
        });
    }
});

// Get current session keywords
router.get('/current', (req, res) => {
    res.json({
        success: true,
        data: {
            seedKeyword: req.session.seedKeyword || '',
            keywords: req.session.keywords || [],
            timestamp: req.session.timestamp
        }
    });
});

module.exports = router;
