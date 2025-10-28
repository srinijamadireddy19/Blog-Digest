import re

def validate_request(data):
    """
    Validate incoming request data
    
    Args:
        data (dict): Request data
        
    Returns:
        tuple: (is_valid, error_message)
    """
    if not data:
        return False, "No data provided"
    
    input_text = data.get('input', '').strip()
    input_type = data.get('input_type')
    option = data.get('option')
    
    if not input_text:
        return False, "Input cannot be empty"
    
    if input_type not in ['text', 'link', 'image']:
        return False, f"Invalid input type: {input_type}"
    
    if not option:
        return False, "Option must be specified"
    
    # Validate URL format for link type
    if input_type == 'link':
        url_pattern = re.compile(
            r'^https?://'  # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain
            r'localhost|'  # localhost
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # or IP
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        
        if not url_pattern.match(input_text):
            return False, "Invalid URL format"
    
    return True, None