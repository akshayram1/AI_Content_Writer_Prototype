from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
from dotenv import load_dotenv
from services.openai_service import OpenAIService
from services.seo_scorer import SEOScorer

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize services
openai_service = OpenAIService()
seo_scorer = SEOScorer()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'timestamp': time.time(),
        'service': 'LLM Service'
    })

@app.route('/generate-keywords', methods=['POST'])
def generate_keywords():
    try:
        data = request.get_json()
        seed_keyword = data.get('seed_keyword')
        
        if not seed_keyword:
            return jsonify({'error': 'seed_keyword is required'}), 400
        
        start_time = time.time()
        keywords = openai_service.generate_keywords(seed_keyword)
        processing_time = time.time() - start_time
        
        return jsonify({
            'keywords': keywords,
            'processing_time': processing_time
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-titles', methods=['POST'])
def generate_titles():
    try:
        data = request.get_json()
        keyword = data.get('keyword')
        tone = data.get('tone', 'professional')
        
        if not keyword:
            return jsonify({'error': 'keyword is required'}), 400
        
        start_time = time.time()
        titles = openai_service.generate_titles(keyword, tone)
        processing_time = time.time() - start_time
        
        return jsonify({
            'titles': titles,
            'processing_time': processing_time
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-topics', methods=['POST'])
def generate_topics():
    try:
        data = request.get_json()
        title = data.get('title')
        keyword = data.get('keyword')
        
        if not title or not keyword:
            return jsonify({'error': 'title and keyword are required'}), 400
        
        start_time = time.time()
        topics = openai_service.generate_topics(title, keyword)
        processing_time = time.time() - start_time
        
        return jsonify({
            'topics': topics,
            'processing_time': processing_time
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate-content', methods=['POST'])
def generate_content():
    try:
        data = request.get_json()
        title = data.get('title')
        keyword = data.get('keyword')
        outline = data.get('outline')
        content_type = data.get('content_type', 'blog_intro')
        word_count = data.get('word_count', 150)
        
        if not title or not keyword:
            return jsonify({'error': 'title and keyword are required'}), 400
        
        start_time = time.time()
        content = openai_service.generate_content(
            title, keyword, outline, content_type, word_count
        )
        processing_time = time.time() - start_time
        
        return jsonify({
            'content': content,
            'processing_time': processing_time
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/analyze-seo', methods=['POST'])
def analyze_seo():
    try:
        data = request.get_json()
        content = data.get('content')
        keyword = data.get('keyword')
        title = data.get('title')
        
        if not content or not keyword or not title:
            return jsonify({'error': 'content, keyword, and title are required'}), 400
        
        analysis = seo_scorer.analyze_content(content, keyword, title)
        
        return jsonify(analysis)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    print(f"LLM Service starting on port {port}")
    print(f"Debug mode: {debug}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
