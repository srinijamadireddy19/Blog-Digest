import re
import string
import logging

logger = logging.getLogger(__name__)

class TextPreprocessor:
    """Preprocess text data"""
    
    def preprocess(self, text):
        """
        Clean and normalize text
        
        Args:
            text (str): Raw text
            
        Returns:
            str: Preprocessed text
        """
        logger.info("Preprocessing text")
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        # Remove special characters (optional - keep for now)
        # text = re.sub(r'[^\w\s\.\,\!\?]', '', text)
        
        # Normalize line breaks
        text = text.replace('\r\n', '\n').replace('\r', '\n')
        
        # Remove multiple consecutive newlines
        text = re.sub(r'\n{3,}', '\n\n', text)
        
        return text.strip()
