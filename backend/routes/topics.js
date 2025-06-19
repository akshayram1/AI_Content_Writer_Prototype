const express = require('express');
const router = express.Router();
const llmService = require('../services/llmService');

router.post('/generate', async (req, res) => {
    try {
        const { title, keyword } = req.body;

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

        // Call LLM service to generate topics
        const topics = await llmService.generateTopics(title, keyword);

        // Store in session
        req.session.selectedTitle = title;
        req.session.topics = topics;
        req.session.topicsTimestamp = new Date().toISOString();

        res.json({
            success: true,
            data: {
                title,
                keyword,
                topics,
                timestamp: req.session.topicsTimestamp
            }
        });
    } catch (error) {
        console.error('Topic generation error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate topics'
        });
    }
});

// Get current session topics
router.get('/current', (req, res) => {
    res.json({
        success: true,
        data: {
            title: req.session.selectedTitle || '',
            keyword: req.session.selectedKeyword || '',
            topics: req.session.topics || [],
            timestamp: req.session.topicsTimestamp
        }
    });
});

module.exports = router;
