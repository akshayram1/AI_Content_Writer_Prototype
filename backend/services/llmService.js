const axios = require('axios');

const LLM_SERVICE_URL = process.env.LLM_SERVICE_URL || 'http://localhost:5001';

class LLMService {
    constructor() {
        this.client = axios.create({
            baseURL: LLM_SERVICE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async generateKeywords(seedKeyword) {
        try {
            const response = await this.client.post('/generate-keywords', {
                seed_keyword: seedKeyword
            });

            // Parse the JSON string response
            const keywords = JSON.parse(response.data.keywords);
            return keywords;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                // Fallback to mock data if LLM service is not available
                console.warn('LLM service not available, using mock data');
                return this.getMockKeywords(seedKeyword);
            }
            throw new Error(`Failed to generate keywords: ${error.message}`);
        }
    }

    async generateTitles(keyword, tone = 'professional') {
        try {
            const response = await this.client.post('/generate-titles', {
                keyword,
                tone
            });

            const titles = JSON.parse(response.data.titles);
            return titles;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.warn('LLM service not available, using mock data');
                return this.getMockTitles(keyword, tone);
            }
            throw new Error(`Failed to generate titles: ${error.message}`);
        }
    }

    async generateTopics(title, keyword) {
        try {
            const response = await this.client.post('/generate-topics', {
                title,
                keyword
            });

            const topics = JSON.parse(response.data.topics);
            return topics;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.warn('LLM service not available, using mock data');
                return this.getMockTopics(title, keyword);
            }
            throw new Error(`Failed to generate topics: ${error.message}`);
        }
    }

    async generateContent(title, keyword, outline, contentType = 'blog_intro', wordCount = 150) {
        try {
            const response = await this.client.post('/generate-content', {
                title,
                keyword,
                outline,
                content_type: contentType,
                word_count: wordCount
            });

            return response.data.content;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.warn('LLM service not available, using mock data');
                return this.getMockContent(title, keyword, contentType, wordCount);
            }
            throw new Error(`Failed to generate content: ${error.message}`);
        }
    }

    async analyzeSEO(content, keyword, title) {
        try {
            const response = await this.client.post('/analyze-seo', {
                content,
                keyword,
                title
            });

            return response.data;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.warn('LLM service not available, using mock SEO score');
                return this.getMockSEOScore(content, keyword, title);
            }
            throw new Error(`Failed to analyze SEO: ${error.message}`);
        }
    }

    // Mock data fallbacks for development
    getMockKeywords(seedKeyword) {
        const mockKeywords = [
            `${seedKeyword} guide`,
            `best ${seedKeyword} practices`,
            `${seedKeyword} tips`,
            `how to ${seedKeyword}`,
            `${seedKeyword} strategy`
        ];
        return mockKeywords.slice(0, 5);
    }

    getMockTitles(keyword, tone) {
        const templates = {
            professional: [
                `The Complete Guide to ${keyword}`,
                `${keyword}: Best Practices and Strategies`,
                `How to Master ${keyword} in 2024`
            ],
            casual: [
                `Everything You Need to Know About ${keyword}`,
                `${keyword} Made Simple`,
                `The Ultimate ${keyword} Handbook`
            ],
            friendly: [
                `Your Friendly Guide to ${keyword}`,
                `Let's Talk About ${keyword}`,
                `${keyword}: A Beginner's Journey`
            ]
        };

        return templates[tone] || templates.professional;
    }

    getMockTopics(title, keyword) {
        return [
            {
                title: "Introduction and Overview",
                sections: [
                    {
                        heading: "What is " + keyword + "?",
                        points: ["Definition and importance", "Key benefits", "Common misconceptions"]
                    },
                    {
                        heading: "Getting Started",
                        points: ["Prerequisites", "Basic setup", "First steps"]
                    },
                    {
                        heading: "Best Practices",
                        points: ["Industry standards", "Common pitfalls to avoid", "Expert recommendations"]
                    }
                ]
            },
            {
                title: "Detailed Analysis and Implementation",
                sections: [
                    {
                        heading: "Deep Dive into " + keyword,
                        points: ["Technical aspects", "Advanced strategies", "Case studies"]
                    },
                    {
                        heading: "Implementation Guide",
                        points: ["Step-by-step process", "Tools and resources", "Measuring success"]
                    },
                    {
                        heading: "Conclusion and Next Steps",
                        points: ["Key takeaways", "Future considerations", "Additional resources"]
                    }
                ]
            }
        ];
    }

    getMockContent(title, keyword, contentType, wordCount) {
        const templates = {
            blog_intro: `In today's digital landscape, understanding ${keyword} has become crucial for success. This comprehensive guide will walk you through everything you need to know about ${keyword}, from basic concepts to advanced strategies.

Whether you're a beginner looking to get started or an experienced professional seeking to refine your approach, this article covers the essential aspects of ${keyword} that will help you achieve your goals.

Throughout this guide, we'll explore practical examples, industry best practices, and actionable insights that you can implement immediately. Let's dive into the world of ${keyword} and discover how it can transform your approach to digital success.`,

            meta_description: `Discover everything you need to know about ${keyword}. Our comprehensive guide covers best practices, strategies, and actionable tips to help you master ${keyword} effectively.`,

            product_description: `Transform your approach with our comprehensive ${keyword} solution. Designed for professionals and beginners alike, this resource provides everything you need to succeed with ${keyword}. Get started today and see immediate results.`,

            landing_page: `Ready to master ${keyword}? You're in the right place. Our proven approach has helped thousands of users achieve success with ${keyword}. Don't let another day pass without taking action. Start your journey today and join the ranks of ${keyword} experts who are already seeing incredible results.`
        };

        let content = templates[contentType] || templates.blog_intro;

        // Adjust content length based on word count
        const words = content.split(' ');
        if (words.length > wordCount) {
            content = words.slice(0, wordCount).join(' ') + '...';
        } else if (words.length < wordCount * 0.8) {
            // Add more content if too short
            content += `\n\nExploring ${keyword} further reveals numerous opportunities for growth and improvement. By implementing the strategies outlined in this guide, you'll be well-equipped to navigate the complexities of ${keyword} and achieve your desired outcomes.`;
        }

        return content;
    }

    getMockSEOScore(content, keyword, title) {
        // Simple keyword density calculation
        const keywordCount = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
        const wordCount = content.split(' ').length;
        const keywordDensity = (keywordCount / wordCount) * 100;

        let score = 70; // Base score

        // Adjust based on keyword density
        if (keywordDensity >= 1 && keywordDensity <= 3) {
            score += 20;
        } else if (keywordDensity > 3) {
            score -= 10;
        }

        // Check title length
        if (title.length >= 30 && title.length <= 60) {
            score += 10;
        }

        const recommendations = [];
        if (keywordDensity < 1) {
            recommendations.push('Increase keyword usage in content');
        } else if (keywordDensity > 3) {
            recommendations.push('Reduce keyword density to avoid keyword stuffing');
        }

        if (title.length < 30) {
            recommendations.push('Consider making the title longer and more descriptive');
        } else if (title.length > 60) {
            recommendations.push('Consider shortening the title for better search visibility');
        }

        return {
            overall_score: Math.min(100, Math.max(0, score)),
            scores: {
                keyword_density: {
                    value: keywordDensity,
                    score: keywordDensity >= 1 && keywordDensity <= 3 ? 100 : 60
                },
                title_length: {
                    value: title.length,
                    score: title.length >= 30 && title.length <= 60 ? 100 : 70
                }
            },
            recommendations
        };
    }
}

module.exports = new LLMService();
