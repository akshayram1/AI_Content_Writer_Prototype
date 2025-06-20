import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
    constructor() {
        this.client = axios.create({
            baseURL: API_BASE,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add session ID to requests
        this.client.interceptors.request.use(config => {
            const sessionId = localStorage.getItem('session-id');
            if (sessionId) {
                config.headers['session-id'] = sessionId;
            }
            return config;
        });

        // Store session ID from responses
        this.client.interceptors.response.use(
            response => {
                const sessionId = response.headers['session-id'];
                if (sessionId) {
                    localStorage.setItem('session-id', sessionId);
                }
                return response;
            },
            error => {
                // Handle common errors
                if (error.response?.status === 401) {
                    // Handle unauthorized
                    localStorage.removeItem('session-id');
                }
                return Promise.reject(error);
            }
        );
    }

    async researchKeywords(seedKeyword) {
        try {
            const response = await this.client.post('/keywords/research', {
                seedKeyword
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to research keywords');
        }
    }

    async generateTitles(keyword, tone = 'professional') {
        try {
            const response = await this.client.post('/titles/generate', {
                keyword,
                tone
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to generate titles');
        }
    }

    async generateTopics(title, keyword) {
        try {
            const response = await this.client.post('/topics/generate', {
                title,
                keyword
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to generate topics');
        }
    }

    async generateContent(title, keyword, outline, contentType = 'blog_intro', wordCount = 150) {
        try {
            const response = await this.client.post('/content/generate', {
                title,
                keyword,
                outline,
                contentType,
                wordCount
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to generate content');
        }
    }

    async login(email, password) {
        try {
            const response = await this.client.post('/auth/login', {
                email,
                password
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    }

    async register(email, password) {
        try {
            const response = await this.client.post('/auth/register', {
                email,
                password
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Registration failed');
        }
    }

    async logout() {
        try {
            const response = await this.client.post('/auth/logout');
            localStorage.removeItem('session-id');
            return response.data;
        } catch (error) {
            // Even if logout fails on server, clear local session
            localStorage.removeItem('session-id');
            throw new Error(error.response?.data?.error || 'Logout failed');
        }
    }

    async analyzeSEO(data) {
        try {
            const response = await this.client.post('/content/analyze-seo', {
                content: data.content,
                keyword: data.keyword,
                title: data.title
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to analyze SEO score');
        }
    }
}

export default new ApiService();
