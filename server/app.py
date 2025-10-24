from flask import Flask, request, jsonify
from config import Config
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from datetime import datetime
import uuid

app = Flask(__name__)

app.config.from_object(Config)

CORS(app, origins=["http://localhost:5173"]) 

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv', 'xlsx', 'doc', 'docx'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# In-memory storage for results (use a database in production)
results_storage = {}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Mock processing functions (replace with actual logic)
def process_summary(content, content_type):
    """Generate a summary from the content"""
    return {
        'icon': '📝',
        'title': 'Content Summary',
        'content': f'This is a comprehensive summary of your {content_type} content. The main topics discussed include innovation, technology trends, and future developments. Key insights reveal important patterns and actionable recommendations for implementation.',
        'word_count': len(content.split()) if isinstance(content, str) else 0,
        'key_points': [
            'First key point from the content',
            'Second important insight',
            'Third major takeaway'
        ]
    }

def process_pdf_conversion(content, content_type):
    """Convert content to PDF"""
    return {
        'icon': '📄',
        'title': 'PDF Conversion',
        'fileName': 'blog_digest_output.pdf',
        'fileSize': '234 KB',
        'content': 'Your content has been successfully converted to PDF format. Click the download button below to save the file.',
        'downloadUrl': '/downloads/generated_document.pdf',
        'pages': 5
    }

def extract_keywords(content, content_type):
    """Extract keywords from content"""
    return {
        'icon': '🔑',
        'title': 'Extracted Keywords',
        'keywords': [
            {'word': 'Technology', 'relevance': 95},
            {'word': 'Innovation', 'relevance': 87},
            {'word': 'Development', 'relevance': 82},
            {'word': 'Digital', 'relevance': 78},
            {'word': 'Future', 'relevance': 71},
            {'word': 'Transformation', 'relevance': 68},
            {'word': 'Strategy', 'relevance': 65},
            {'word': 'Business', 'relevance': 62}
        ],
        'total_keywords': 8
    }

def classify_topics(content, content_type):
    """Classify content into topics"""
    return {
        'icon': '🏷️',
        'title': 'Topic Classification',
        'primary_topic': 'Technology',
        'confidence': 89,
        'categories': [
            {'name': 'Technology', 'score': 89, 'color': 'emerald'},
            {'name': 'Business', 'score': 67, 'color': 'blue'},
            {'name': 'Innovation', 'score': 54, 'color': 'purple'},
            {'name': 'Digital Transformation', 'score': 45, 'color': 'cyan'}
        ]
    }

def analyze_sentiment(content, content_type):
    """Analyze sentiment of content"""
    return {
        'icon': '😊',
        'title': 'Sentiment Analysis',
        'overall_sentiment': 'Positive',
        'sentiment_score': 75,
        'confidence': 88,
        'emotions': [
            {'name': 'Joy', 'value': 45, 'color': 'yellow'},
            {'name': 'Trust', 'value': 62, 'color': 'green'},
            {'name': 'Anticipation', 'value': 38, 'color': 'orange'},
            {'name': 'Surprise', 'value': 22, 'color': 'pink'}
        ],
        'sentiment_breakdown': {
            'positive': 65,
            'neutral': 25,
            'negative': 10
        }
    }

def translate_content(content, content_type):
    """Translate content to multiple languages"""
    return {
        'icon': '🌐',
        'title': 'Multi-lingual Translation',
        'original_language': 'English',
        'translations': [
            {
                'language': 'Spanish',
                'code': 'es',
                'content': 'Este es un contenido traducido en español. La tecnología y la innovación están transformando el mundo digital de manera significativa.',
                'confidence': 95
            },
            {
                'language': 'French',
                'code': 'fr',
                'content': 'Ceci est un contenu traduit en français. La technologie et l\'innovation transforment considérablement le monde numérique.',
                'confidence': 93
            },
            {
                'language': 'German',
                'code': 'de',
                'content': 'Dies ist ein ins Deutsche übersetzter Inhalt. Technologie und Innovation verändern die digitale Welt erheblich.',
                'confidence': 91
            },
            {
                'language': 'Chinese',
                'code': 'zh',
                'content': '这是翻译成中文的内容。技术和创新正在显著改变数字世界。',
                'confidence': 89
            }
        ]
    }

@app.route('/')
def hello_world():
    return jsonify({
        'message': 'BlogDigest API is running',
        'status': 'active',
        'version': '1.0.0',
        'endpoints': ['/upload', '/result/<id>']
    })

@app.route('/upload', methods=['POST'])
def upload():
    try:
        # Get form data
        action = request.form.get('action', 'summary')
        input_value = request.form.get('inputValue', '')
        input_type = request.form.get('type', 'text')

        # Handle file upload
        file = request.files.get('file')
        filename = None
        file_path = None
        file_size = None
        content = input_value  # Default to text input
        
        if file and file.filename:
            if allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                file_size = os.path.getsize(file_path)
                content = filename  # Use filename as content reference
                input_type = 'picture'
                print(f"File saved: {file_path} ({file_size} bytes)")
            else:
                return jsonify({
                    'status': 'error',
                    'message': 'File type not allowed. Allowed types: ' + ', '.join(ALLOWED_EXTENSIONS)
                }), 400

        # Validate input
        if not content and not filename:
            return jsonify({
                'status': 'error',
                'message': 'No input provided. Please provide a link, text, or file.'
            }), 400

        print(f"Processing: type={input_type}, action={action}, content_length={len(str(content))}")
        
        # Generate unique ID for this processing request
        process_id = str(uuid.uuid4())
        
        # Process ALL output types and store them
        all_results = {
            'summary': process_summary(content, input_type),
            'pdf': process_pdf_conversion(content, input_type),
            'keywords': extract_keywords(content, input_type),
            'topics': classify_topics(content, input_type),
            'sentiment': analyze_sentiment(content, input_type),
            'translation': translate_content(content, input_type)
        }
        
        # Store results with metadata
        results_storage[process_id] = {
            'timestamp': datetime.now().isoformat(),
            'input': {
                'type': input_type,
                'content_preview': content[:100] + '...' if len(str(content)) > 100 else content,
                'filename': filename,
                'file_size': file_size
            },
            'results': all_results
        }
        
        # Build response with process ID
        response = {
            'status': 'success',
            'message': f'{action.capitalize()} generated successfully',
            'processedId': process_id,
            'selectedOption': action,
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'status': 'error',
            'message': f'An error occurred: {str(e)}'
        }), 500

@app.route('/result/<process_id>', methods=['GET'])
def get_result(process_id):
    """Retrieve processed results by ID"""
    try:
        if process_id not in results_storage:
            return jsonify({
                'status': 'error',
                'message': 'Results not found. The processing ID may be invalid or expired.'
            }), 404
        
        stored_data = results_storage[process_id]
        
        return jsonify({
            'status': 'success',
            'processedId': process_id,
            'timestamp': stored_data['timestamp'],
            'input': stored_data['input'],
            **stored_data['results']  # Unpack all results (summary, pdf, keywords, etc.)
        }), 200
        
    except Exception as e:
        print(f"Error retrieving result: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': f'An error occurred: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'BlogDigest API',
        'stored_results': len(results_storage)
    }), 200

if __name__ == '__main__':
    app.run(debug=True)