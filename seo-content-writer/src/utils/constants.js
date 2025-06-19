export const WORKFLOW_STEPS = [
    { label: 'Keyword Research', description: 'Find relevant keywords for your content' },
    { label: 'Title Generation', description: 'Generate SEO-optimized titles' },
    { label: 'Topic Selection', description: 'Choose content structure and topics' },
    { label: 'Content Creation', description: 'Generate your final content' },
];

export const CONTENT_TYPES = [
    { value: 'blog_intro', label: 'Blog Introduction' },
    { value: 'meta_description', label: 'Meta Description' },
    { value: 'product_description', label: 'Product Description' },
    { value: 'landing_page', label: 'Landing Page Copy' },
    { value: 'social_media', label: 'Social Media Post' },
];

export const WORD_COUNTS = [
    { value: 100, label: '100 words' },
    { value: 150, label: '150 words' },
    { value: 200, label: '200 words' },
    { value: 300, label: '300 words' },
    { value: 500, label: '500 words' },
];

export const TONE_OPTIONS = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'conversational', label: 'Conversational' },
];

export const API_ENDPOINTS = {
    KEYWORDS: '/keywords/research',
    TITLES: '/titles/generate',
    TOPICS: '/topics/generate',
    CONTENT: '/content/generate',
    AUTH_LOGIN: '/auth/login',
    AUTH_REGISTER: '/auth/register',
    AUTH_LOGOUT: '/auth/logout',
};
