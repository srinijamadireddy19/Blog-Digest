from handlers.summarization_handler import SummarizationHandler
from handlers.translation_handler import TranslationHandler
from handlers.sentiment_handler import SentimentHandler
from handlers.keyword_handler import KeywordHandler
from handlers.topic_handler import TopicHandler
from handlers.pdf_handler import PDFHandler

# Handler registry
HANDLERS = {
    'text': {
        'summarize': SummarizationHandler,
        'translate': TranslationHandler,
        'sentiment': SentimentHandler,
        'keywords': KeywordHandler,
        'topics': TopicHandler,
        'pdf': PDFHandler
    },
    'link': {
        'summarize': SummarizationHandler,
        'translate': TranslationHandler,
        'sentiment': SentimentHandler,
        'keywords': KeywordHandler,
        'topics': TopicHandler,
        'pdf': PDFHandler
    },
    'image': {
        'extract_text': SummarizationHandler,  # Use summarization for extracted text
        'detect_objects': None,  # Implement object detection
        'classify_image': None   # Implement image classification
    }
}

def get_handler(option, input_type):
    """
    Get appropriate handler for option and input type
    
    Args:
        option (str): Processing option
        input_type (str): Type of input (text/link/image)
        
    Returns:
        Handler instance
    """
    handler_class = HANDLERS.get(input_type, {}).get(option)
    
    if handler_class is None:
        raise ValueError(f"No handler found for option '{option}' with input type '{input_type}'")
    
    return handler_class()