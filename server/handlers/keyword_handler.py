from collections import Counter
import re
import logging

logger = logging.getLogger(__name__)

class KeywordHandler:
    """Extract keywords from text"""
    
    def __init__(self):
        self.stop_words = set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'])
    
    def process(self, data):
        """
        Extract keywords
        
        Args:
            data (dict): Preprocessed data
            
        Returns:
            dict: Keyword extraction results
        """
        logger.info("Extracting keywords")
        
        text = data.get('preprocessed_text')
        
        # Simple keyword extraction (in production, use TF-IDF or RAKE)
        words = re.findall(r'\b[a-zA-Z]{4,}\b', text.lower())
        filtered_words = [w for w in words if w not in self.stop_words]
        
        word_freq = Counter(filtered_words)
        top_keywords = word_freq.most_common(10)
        
        # Calculate relevance scores
        max_freq = top_keywords[0][1] if top_keywords else 1
        keywords = [
            {
                'word': word.capitalize(),
                'relevance': round((freq / max_freq) * 100)
            }
            for word, freq in top_keywords
        ]
        
        return {'keywords': keywords}