import re
from typing import Dict, List

class SEOScorer:
    def __init__(self):
        # Fixed weight system - all weights now sum to 1.0
        self.scoring_rules = {
            'keyword_density': {'min': 1, 'max': 3, 'weight': 0.30},
            'title_length': {'min': 30, 'max': 60, 'weight': 0.25},
            'keyword_in_title': {'weight': 0.20},
            'content_length': {'weight': 0.15},
            'readability': {'weight': 0.10}
        }
    
    def analyze_content(self, content: str, keyword: str, title: str) -> Dict:
        """Enhanced content analysis with same interface"""
        scores = {}
        
        # Keyword density analysis (enhanced)
        keyword_count = len(re.findall(re.escape(keyword.lower()), content.lower()))
        word_count = len(content.split())
        keyword_density = (keyword_count / word_count) * 100 if word_count > 0 else 0
        
        scores['keyword_density'] = {
            'value': round(keyword_density, 2),
            'score': self._score_keyword_density(keyword_density),
            'feedback': self._get_keyword_feedback(keyword_density)
        }
        
        # Title length analysis (same as before)
        title_length = len(title)
        scores['title_length'] = {
            'value': title_length,
            'score': self._score_title_length(title_length),
            'feedback': self._get_title_feedback(title_length)
        }
        
        # Content length analysis (enhanced)
        scores['content_length'] = {
            'value': word_count,
            'score': self._score_content_length(word_count),
            'feedback': self._get_content_length_feedback(word_count)
        }
        
        # Keyword in title check (enhanced)
        title_has_keyword = keyword.lower() in title.lower()
        keyword_at_start = title.lower().startswith(keyword.lower())
        
        # Better scoring for keyword placement
        if keyword_at_start:
            keyword_title_score = 100
            keyword_feedback = 'Excellent! Keyword is at the beginning of title'
        elif title_has_keyword:
            keyword_title_score = 85
            keyword_feedback = 'Good! Keyword found in title'
        else:
            keyword_title_score = 40
            keyword_feedback = 'Consider including the target keyword in the title'
        
        scores['keyword_in_title'] = {
            'value': title_has_keyword,
            'score': keyword_title_score,
            'feedback': keyword_feedback
        }
        
        # NEW: Basic readability analysis
        scores['readability'] = {
            'value': self._calculate_readability_score(content),
            'score': self._score_readability(content),
            'feedback': self._get_readability_feedback(content)
        }
        
        # Fixed overall score calculation - now properly weighted
        overall_score = 0
        for key, score_data in scores.items():
            weight = self.scoring_rules.get(key, {}).get('weight', 0)
            overall_score += score_data['score'] * weight
        
        # Ensure score is between 0-100
        overall_score = min(100, max(0, overall_score))
        
        return {
            'overall_score': round(overall_score, 1),
            'scores': scores,
            'recommendations': self._get_recommendations(scores)
        }
    
    def _score_keyword_density(self, density: float) -> float:
        """Enhanced keyword density scoring"""
        if 1 <= density <= 3:
            return 100
        elif density < 1:
            # More gradual penalty for low density
            if density < 0.5:
                return max(0, density * 60)  # Very low gets lower score
            else:
                return max(0, density * 85)  # Slightly low gets better score
        else:
            # More forgiving for slightly high density
            if density <= 4:
                return max(0, 100 - (density - 3) * 15)
            else:
                return max(0, 100 - (density - 3) * 20)
    
    def _get_keyword_feedback(self, density: float) -> str:
        """Enhanced keyword feedback"""
        if density < 0.5:
            return f"Keyword density is very low ({density:.1f}%). Consider using the target keyword more naturally throughout the content."
        elif density < 1:
            return f"Keyword density is low ({density:.1f}%). Try to include the keyword a few more times naturally."
        elif density <= 3:
            return f"Good keyword density ({density:.1f}%) for SEO."
        elif density <= 4:
            return f"Keyword density is slightly high ({density:.1f}%). Consider reducing keyword usage slightly."
        else:
            return f"Keyword density is too high ({density:.1f}%). This might be considered keyword stuffing by search engines."
    
    def _score_title_length(self, length: int) -> float:
        """Same title length scoring as before"""
        if 30 <= length <= 60:
            return 100
        elif length < 30:
            return max(0, (length / 30) * 100)
        else:
            # More gradual penalty for long titles
            return max(0, 100 - (length - 60) * 1.5)
    
    def _get_title_feedback(self, length: int) -> str:
        """Enhanced title feedback"""
        if length < 30:
            return f"Title is too short ({length} chars). Consider making it more descriptive (30-60 characters is ideal)."
        elif length > 60:
            return f"Title is too long ({length} chars). It might be truncated in search results (30-60 characters is ideal)."
        else:
            return f"Title length is optimal ({length} characters) for SEO."
    
    def _score_content_length(self, word_count: int) -> float:
        """Enhanced content length scoring"""
        if word_count < 100:
            return 40
        elif word_count < 200:
            return 70
        elif word_count < 300:
            return 85
        elif word_count < 500:
            return 95
        else:
            return 100
    
    def _get_content_length_feedback(self, word_count: int) -> str:
        """Enhanced content length feedback"""
        if word_count < 100:
            return f"Content is quite short ({word_count} words). Consider adding more valuable information for better SEO."
        elif word_count < 200:
            return f"Content length is decent ({word_count} words). Consider expanding with more details if relevant."
        elif word_count < 300:
            return f"Good content length ({word_count} words) for SEO."
        else:
            return f"Excellent content length ({word_count} words) for comprehensive SEO coverage."
    
    # NEW: Readability analysis methods
    def _calculate_readability_score(self, content: str) -> float:
        """Calculate basic readability metrics"""
        sentences = re.split(r'[.!?]+', content)
        sentences = [s.strip() for s in sentences if s.strip()]
        
        words = content.split()
        word_count = len(words)
        sentence_count = len(sentences)
        
        if sentence_count == 0 or word_count == 0:
            return 0
        
        avg_sentence_length = word_count / sentence_count
        return avg_sentence_length
    
    def _score_readability(self, content: str) -> float:
        """Score content readability"""
        avg_sentence_length = self._calculate_readability_score(content)
        
        if avg_sentence_length == 0:
            return 50
        
        # Optimal sentence length is 15-20 words
        if 15 <= avg_sentence_length <= 20:
            return 100
        elif 10 <= avg_sentence_length < 15:
            return 90
        elif 20 < avg_sentence_length <= 25:
            return 85
        elif avg_sentence_length < 10:
            return 75  # Too short
        else:
            return max(50, 100 - (avg_sentence_length - 25) * 3)  # Too long
    
    def _get_readability_feedback(self, content: str) -> str:
        """Provide readability feedback"""
        avg_length = self._calculate_readability_score(content)
        
        if avg_length == 0:
            return "Unable to analyze readability - insufficient content."
        elif avg_length < 10:
            return f"Sentences are very short (avg: {avg_length:.1f} words). Consider combining some sentences for better flow."
        elif avg_length <= 20:
            return f"Good sentence length (avg: {avg_length:.1f} words) for readability."
        elif avg_length <= 25:
            return f"Sentences are slightly long (avg: {avg_length:.1f} words). Consider breaking some into shorter sentences."
        else:
            return f"Sentences are too long (avg: {avg_length:.1f} words). Break them into shorter sentences for better readability."
    
    def _get_recommendations(self, scores: Dict) -> List[str]:
        """Enhanced recommendations with priority ordering"""
        recommendations = []
        
        # Sort by score to prioritize worst performing areas
        sorted_scores = sorted(scores.items(), key=lambda x: x[1]['score'])
        
        for key, score_data in sorted_scores:
            if score_data['score'] < 80:
                if key == 'keyword_density':
                    if score_data['value'] < 1:
                        recommendations.append("🔍 Increase keyword usage naturally throughout the content")
                    else:
                        recommendations.append("⚠️ Reduce keyword density to avoid over-optimization")
                
                elif key == 'title_length':
                    if score_data['value'] < 30:
                        recommendations.append("📝 Make the title longer and more descriptive")
                    else:
                        recommendations.append("✂️ Shorten the title to prevent truncation in search results")
                
                elif key == 'keyword_in_title':
                    recommendations.append("🎯 Include the target keyword in the title")
                
                elif key == 'content_length':
                    recommendations.append("📄 Expand the content with more valuable information")
                
                elif key == 'readability':
                    avg_length = self._calculate_readability_score(scores.get('content_length', {}).get('value', 0))
                    if avg_length > 25:
                        recommendations.append("📖 Break long sentences into shorter ones for better readability")
                    elif avg_length < 10:
                        recommendations.append("📖 Combine very short sentences for better flow")
                    else:
                        recommendations.append("📖 Improve content readability and sentence structure")
        
        # Add positive reinforcement if score is good
        overall_good = all(score['score'] >= 80 for score in scores.values())
        if overall_good:
            recommendations.append("🎉 Excellent! Your content is well-optimized for SEO")
        elif not recommendations:
            recommendations.append("✅ Good SEO optimization! Minor improvements could enhance performance further")
        
        # Limit to top 5 recommendations
        return recommendations[:5]
