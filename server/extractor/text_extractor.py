import logging
from preprocessors.text_preprocessor import TextPreprocessor

logger = logging.getLogger(__name__)

class TextExtractor:
    """Extract and preprocess text input"""
    
    def __init__(self):
        self.preprocessor = TextPreprocessor()
    
    def extract(self, text):
        """
        Extract text and preprocess it
        
        Args:
            text (str): Raw text input
            
        Returns:
            dict: Preprocessed text data
        """
        logger.info("Extracting text input")
        
        if not text or not text.strip():
            raise ValueError("Empty text provided")
        
        # Preprocess the text
        preprocessed_text = self.preprocessor.preprocess(text)
        
        return {
            'raw_text': text,
            'preprocessed_text': preprocessed_text,
            'word_count': len(preprocessed_text.split()),
            'char_count': len(preprocessed_text)
        }