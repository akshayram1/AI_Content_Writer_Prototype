import re
from typing import Dict, List

class SEOScorer:
    def __init__(self):
        self.scoring_rules = {
            'keyword_density': {'min': 1, 'max': 3, 'weight': 0.3},
            'title_length': {'min': 30, 'max': 60, 'weight': 0.2},
            'readability': {'weight': 0.2},
            'structure': {'weight': 0.3}
        }
    
    def analyze_content(self, content: str, keyword: str, title: str) -> Dict:
        """Analyze content for SEO factors"""
        scores = {}
        
        # Keyword density analysis
        keyword_count = len(re.findall(re.escape(keyword.lower()), content.lower()))
        word_count = len(content.split())
        keyword_density = (keyword_count / word_count) * 100 if word_count > 0 else 0
        
        scores['keyword_density'] = {
            'value': round(keyword_density, 2),
            'score': self._score_keyword_density(keyword_density),
            'feedback': self._get_keyword_feedback(keyword_density)
        }
        
        # Title length analysis
        title_length = len(title)
        scores['title_length'] = {
            'value': title_length,
            'score': self._score_title_length(title_length),
            'feedback': self._get_title_feedback(title_length)
        }
        
        # Content length analysis
        scores['content_length'] = {
            'value': word_count,
            'score': self._score_content_length(word_count),
            'feedback': self._get_content_length_feedback(word_count)
        }
        
        # Keyword in title check
        title_has_keyword = keyword.lower() in title.lower()
        scores['keyword_in_title'] = {
            'value': title_has_keyword,
            'score': 100 if title_has_keyword else 50,
            'feedback': 'Great! Keyword found in title' if title_has_keyword else 'Consider including the target keyword in the title'
        }
        
        # Overall score calculation
        overall_score = sum(
            scores[key]['score'] * self.scoring_rules.get(key, {}).get('weight', 0.1)
            for key in scores.keys()
        )
        
        # Normalize to 100
        overall_score = min(100, max(0, overall_score))
        
        return {
            'overall_score': round(overall_score, 1),
            'scores': scores,
            'recommendations': self._get_recommendations(scores)
        }
    
    def _score_keyword_density(self, density: float) -> float:
        """Score keyword density (1-3% is optimal)"""
        if 1 <= density <= 3:
            return 100
        elif density < 1:
            return max(0, density * 100)
        else:
            return max(0, 100 - (density - 3) * 20)
    
    def _get_keyword_feedback(self, density: float) -> str:
        if density < 0.5:
            return "Keyword density is very low. Consider using the target keyword more frequently."
        elif density < 1:
            return "Keyword density is low. Try to include the keyword a few more times naturally."
        elif density <= 3:
            return "Good keyword density for SEO."
        elif density <= 5:
            return "Keyword density is high. Consider reducing keyword usage to avoid over-optimization."
        else:
            return "Keyword density is too high. This might be considered keyword stuffing by search engines."
    
    def _score_title_length(self, length: int) -> float:
        """Score title length (30-60 characters is optimal)"""
        if 30 <= length <= 60:
            return 100
        elif length < 30:
            return max(0, (length / 30) * 100)
        else:
            return max(0, 100 - (length - 60) * 2)
    
    def _get_title_feedback(self, length: int) -> str:
        if length < 30:
            return "Title is too short. Consider making it more descriptive (30-60 characters is ideal)."
        elif length > 60:
            return "Title is too long. It might be truncated in search results (30-60 characters is ideal)."
        else:
            return "Title length is optimal for SEO."
    
    def _score_content_length(self, word_count: int) -> float:
        """Score content length"""
        if word_count < 100:
            return 50
        elif word_count < 300:
            return 80
        else:
            return 100
    
    def _get_content_length_feedback(self, word_count: int) -> str:
        if word_count < 100:
            return "Content is quite short. Consider adding more valuable information."
        elif word_count < 300:
            return "Content length is decent. Consider expanding with more details if relevant."
        else:
            return "Content has good length for SEO."
    
    def _get_recommendations(self, scores: Dict) -> List[str]:
        """Generate actionable recommendations"""
        recommendations = []
        
        if scores['keyword_density']['score'] < 80:
            if scores['keyword_density']['value'] < 1:
                recommendations.append("Increase keyword usage naturally throughout the content")
            else:
                recommendations.append("Reduce keyword density to avoid over-optimization")
        
        if scores['title_length']['score'] < 80:
            if scores['title_length']['value'] < 30:
                recommendations.append("Make the title longer and more descriptive")
            else:
                recommendations.append("Shorten the title to prevent truncation in search results")
        
        if scores['content_length']['score'] < 80:
            recommendations.append("Consider expanding the content with more valuable information")
        
        if scores['keyword_in_title']['score'] < 100:
            recommendations.append("Include the target keyword in the title")
        
        if not recommendations:
            recommendations.append("Great job! Your content is well-optimized for SEO")
        
        return recommendations
