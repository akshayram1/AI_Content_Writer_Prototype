import openai
import os
import json
from typing import List, Dict, Any

class OpenAIService:
    def __init__(self):
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            print("Warning: OPENAI_API_KEY not found, service will use mock responses")
            self.client = None
        else:
            self.client = openai.OpenAI(api_key=api_key)
    
    def generate_keywords(self, seed_keyword: str) -> str:
        """Generate SEO keywords based on seed keyword"""
        if not self.client:
            return self._get_mock_keywords(seed_keyword)
        
        prompt = f"""
        Generate 5 SEO-focused keywords related to: "{seed_keyword}"
        
        Requirements:
        - Include long-tail keywords
        - Focus on commercial intent when appropriate
        - Avoid overly competitive terms
        - Return as JSON array only
        
        Format: ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=200
            )
            
            content = response.choices[0].message.content.strip()
            # Clean up the response to ensure it's valid JSON
            if content.startswith('```json'):
                content = content.replace('```json', '').replace('```', '').strip()
            
            # Validate JSON
            keywords = json.loads(content)
            return json.dumps(keywords)
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return self._get_mock_keywords(seed_keyword)
    
    def generate_titles(self, keyword: str, tone: str = "professional") -> str:
        """Generate SEO-optimized titles"""
        if not self.client:
            return self._get_mock_titles(keyword, tone)
        
        prompt = f"""
        Create 3 SEO-optimized blog titles for keyword: "{keyword}"
        
        Requirements:
        - Include target keyword naturally
        - 50-60 characters ideal length
        - {tone} tone
        - Click-worthy and engaging
        - Follow SEO best practices
        
        Return as JSON array: ["title1", "title2", "title3"]
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.8,
                max_tokens=300
            )
            
            content = response.choices[0].message.content.strip()
            if content.startswith('```json'):
                content = content.replace('```json', '').replace('```', '').strip()
            
            titles = json.loads(content)
            return json.dumps(titles)
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return self._get_mock_titles(keyword, tone)
    
    def generate_topics(self, title: str, keyword: str) -> str:
        """Generate topic outlines"""
        if not self.client:
            return self._get_mock_topics(title, keyword)
        
        prompt = f"""
        Create 2 detailed blog outlines for the title: "{title}"
        Target keyword: "{keyword}"
        
        Structure each outline as:
        {{
            "title": "outline variation name",
            "sections": [
                {{
                    "heading": "section heading",
                    "points": ["key point 1", "key point 2", "key point 3"]
                }}
            ]
        }}
        
        Return as JSON array with 2 outline variations.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=800
            )
            
            content = response.choices[0].message.content.strip()
            if content.startswith('```json'):
                content = content.replace('```json', '').replace('```', '').strip()
            
            topics = json.loads(content)
            return json.dumps(topics)
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return self._get_mock_topics(title, keyword)
    
    def generate_content(self, title: str, keyword: str, outline: Dict, 
                        content_type: str = 'blog_intro', word_count: int = 150) -> str:
        """Generate content based on parameters"""
        if not self.client:
            return self._get_mock_content(title, keyword, content_type, word_count)
        
        prompt = f"""
        Write a {content_type} for:
        Title: "{title}"
        Target keyword: "{keyword}"
        Outline: {json.dumps(outline) if outline else 'None provided'}
        
        Requirements:
        - Approximately {word_count} words
        - Include target keyword naturally 2-3 times
        - Engaging and informative tone
        - SEO-optimized structure
        - Ready for publication
        
        Return clean, formatted text only.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                max_tokens=word_count * 2  # Allow for some flexibility
            )
            
            content = response.choices[0].message.content.strip()
            return content
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return self._get_mock_content(title, keyword, content_type, word_count)
    
    # Mock responses for development/fallback
    def _get_mock_keywords(self, seed_keyword: str) -> str:
        keywords = [
            f"{seed_keyword} guide",
            f"best {seed_keyword} practices",
            f"{seed_keyword} tips and tricks",
            f"how to {seed_keyword}",
            f"{seed_keyword} strategy 2024"
        ]
        return json.dumps(keywords)
    
    def _get_mock_titles(self, keyword: str, tone: str) -> str:
        titles = [
            f"The Complete Guide to {keyword}",
            f"{keyword}: Best Practices and Expert Tips",
            f"How to Master {keyword} in 2024"
        ]
        return json.dumps(titles)
    
    def _get_mock_topics(self, title: str, keyword: str) -> str:
        topics = [
            {
                "title": "Comprehensive Overview",
                "sections": [
                    {
                        "heading": f"Introduction to {keyword}",
                        "points": ["Definition and importance", "Key benefits", "Common misconceptions"]
                    },
                    {
                        "heading": "Getting Started",
                        "points": ["Prerequisites", "Basic setup", "First steps"]
                    },
                    {
                        "heading": "Best Practices",
                        "points": ["Industry standards", "Expert recommendations", "Common pitfalls"]
                    }
                ]
            },
            {
                "title": "Practical Implementation",
                "sections": [
                    {
                        "heading": f"Understanding {keyword}",
                        "points": ["Core concepts", "Technical aspects", "Real-world applications"]
                    },
                    {
                        "heading": "Implementation Strategy",
                        "points": ["Step-by-step approach", "Tools and resources", "Measuring success"]
                    },
                    {
                        "heading": "Advanced Techniques",
                        "points": ["Expert strategies", "Optimization tips", "Future trends"]
                    }
                ]
            }
        ]
        return json.dumps(topics)
    
    def _get_mock_content(self, title: str, keyword: str, content_type: str, word_count: int) -> str:
        if content_type == 'meta_description':
            return f"Discover everything you need to know about {keyword}. Our comprehensive guide covers best practices, expert tips, and actionable strategies to help you master {keyword} effectively."
        
        content = f"""In today's digital landscape, understanding {keyword} has become essential for success. Whether you're new to {keyword} or looking to enhance your existing knowledge, this comprehensive guide will provide you with valuable insights and practical strategies.

{keyword} plays a crucial role in modern business and technology. By implementing the right approach to {keyword}, you can achieve significant improvements in your results and overall performance.

Throughout this guide, we'll explore the fundamental concepts of {keyword}, share expert tips, and provide actionable advice that you can implement immediately. Our goal is to help you master {keyword} and use it effectively to achieve your objectives.

The importance of {keyword} cannot be overstated. As we continue to evolve in this digital age, having a solid understanding of {keyword} will set you apart from the competition and position you for long-term success."""

        # Adjust length based on word count
        words = content.split()
        if len(words) > word_count:
            content = ' '.join(words[:word_count]) + '...'
        
        return content
