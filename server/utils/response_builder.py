def build_response(status, original_input, input_type, option, result):
    """
    Build standardized API response
    
    Args:
        status (str): Response status
        original_input: Original input data
        input_type (str): Type of input
        option (str): Selected option
        result: Processing result
        
    Returns:
        dict: Formatted response
    """
    return {
        'status': status,
        'data': {
            'original_input': original_input,
            'input_type': input_type,
            'option': option,
            'result': result
        }
    }

def build_error_response(message):
    """
    Build error response
    
    Args:
        message (str): Error message
        
    Returns:
        dict: Error response
    """
    return {
        'status': 'error',
        'message': message
    }