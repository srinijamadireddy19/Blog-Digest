import re
import logging

logger = logging.getLogger(__name__)

class LinkPreprocessor:
    """Preprocess content extracted from links"""
    
    def preprocess(self, text, title=None, authors=None, publish_date=None):
        """
        Clean and structure content from web pages
        
        Args:
            text (str): Extracted text
            title (str): Article title
            authors (list): List of authors
            publish_date: Publication date
            
        Returns:
            dict: Preprocessed content with metadata
        """
        logger.info("Preprocessing link content")
        
        # Clean text
        text = self._clean_web_text(text)
        
        # Build metadata
        metadata = {
            'title': title,
            'authors': authors or [],
            'publish_date': publish_date,
            'word_count': len(text.split()),
            'estimated_read_time': self._calculate_read_time(text)
        }
        
        return {
            'text': text,
            'metadata': metadata
        }
    
    def _clean_web_text(self, text):
        """Remove web-specific artifacts"""
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        # Remove common web artifacts
        text = re.sub(r'\[.*?\]', '', text)  # Remove [1], [citation needed], etc.
        text = re.sub(r'\{.*?\}', '', text)  # Remove {...}
        
        return text.strip()
    
    def _calculate_read_time(self, text):
        """Calculate estimated reading time (average 200 words/minute)"""
        word_count = len(text.split())
        minutes = max(1, round(word_count / 200))
        return f"{minutes} min read"


