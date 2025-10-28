from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import logging

from extractor.text_extractor import TextExtractor
from extractor.link_extractor import LinkExtractor
from extractor.image_extractor import ImageExtractor
from utils.validators import validate_request
from utils.response_builder import build_response, build_error_response
from handlers import get_handler

process_bp = Blueprint('process', __name__)
logger = logging.getLogger(__name__)

# Initialize extractors
text_extractor = TextExtractor()
link_extractor = LinkExtractor()
image_extractor = ImageExtractor()

@process_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "BlogDigest API"}), 200

@process_bp.route('/process', methods=['POST'])
def process_input():
    """Main endpoint for processing all input types"""
    try:
        # Check if it's a file upload or JSON
        if 'file' in request.files:
            return handle_image_input(request)
        else:
            return handle_text_or_link_input(request)
            
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return build_error_response(str(e)), 500

def handle_text_or_link_input(request):
    """Handle text or link input"""
    data = request.get_json()
    
    # Validate request
    is_valid, error_msg = validate_request(data)
    if not is_valid:
        return build_error_response(error_msg), 400
    
    input_text = data.get('input')
    input_type = data.get('input_type')
    option = data.get('option')
    
    # Extract content based on input type
    if input_type == 'link':
        extracted_data = link_extractor.extract(input_text)
    else:  # text
        extracted_data = text_extractor.extract(input_text)
    
    # Get appropriate handler and process
    handler = get_handler(option, input_type)
    result = handler.process(extracted_data)
    
    return build_response(
        status='success',
        original_input=input_text,
        input_type=input_type,
        option=option,
        result=result
    ), 200

def handle_image_input(request):
    """Handle image file upload"""
    file = request.files['file']
    option = request.form.get('option', 'extract_text')
    
    if file.filename == '':
        return build_error_response('No file selected'), 400
    
    # Save file temporarily
    filename = secure_filename(file.filename)
    upload_folder = request.current_app.config['UPLOAD_FOLDER']
    filepath = os.path.join(upload_folder, filename)
    file.save(filepath)
    
    try:
        # Extract from image
        extracted_data = image_extractor.extract(filepath)
        
        # Get handler and process
        handler = get_handler(option, 'image')
        result = handler.process(extracted_data)
        
        return build_response(
            status='success',
            original_input=filename,
            input_type='image',
            option=option,
            result=result
        ), 200
        
    finally:
        # Clean up uploaded file
        if os.path.exists(filepath):
            os.remove(filepath)
