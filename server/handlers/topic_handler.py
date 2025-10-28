import logging
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import numpy as np

logger = logging.getLogger(__name__)

class TopicHandler:
    """Handle topic classification"""
    
    def __init__(self):
        self.predefined_topics = {
            'technology': ['technology', 'software', 'computer', 'digital', 'ai', 'data', 'code', 'programming'],
            'business': ['business', 'company', 'market', 'financial', 'investment', 'sales', 'profit'],
            'health': ['health', 'medical', 'doctor', 'patient', 'treatment', 'disease', 'wellness'],
            'science': ['science', 'research', 'study', 'experiment', 'theory', 'discovery', 'scientific'],
            'education': ['education', 'learning', 'student', 'teacher', 'school', 'university', 'course'],
            'entertainment': ['entertainment', 'movie', 'music', 'game', 'show', 'celebrity', 'fun'],
            'sports': ['sports', 'game', 'team', 'player', 'match', 'championship', 'tournament'],
            'politics': ['politics', 'government', 'election', 'policy', 'law', 'parliament', 'vote']
        }
    
    def process(self, data):
        """
        Classify text into topics
        
        Args:
            data (dict): Preprocessed data
            
        Returns:
            dict: Topic classification result
        """
        logger.info("Classifying topics")
        
        text = data.get('preprocessed_text') or data.get('extracted_text')
        
        if not text:
            raise ValueError("No text available for topic classification")
        
        text_lower = text.lower()
        
        # Calculate topic scores based on keyword matching
        topic_scores = {}
        
        for topic, keywords in self.predefined_topics.items():
            score = 0
            for keyword in keywords:
                # Count occurrences
                count = text_lower.count(keyword)
                score += count * 10  # Weight each occurrence
            
            if score > 0:
                topic_scores[topic] = min(100, score)  # Cap at 100
        
        # Sort by score
        sorted_topics = sorted(topic_scores.items(), key=lambda x: x[1], reverse=True)
        
        # Get top 4 topics
        top_topics = sorted_topics[:4] if len(sorted_topics) >= 4 else sorted_topics
        
        # Assign colors
        colors = [
            'from-blue-500 to-blue-600',
            'from-purple-500 to-purple-600',
            'from-pink-500 to-pink-600',
            'from-orange-500 to-orange-600'
        ]
        
        topics = [
            {
                'name': topic.capitalize(),
                'confidence': confidence,
                'color': colors[i] if i < len(colors) else 'from-gray-500 to-gray-600'
            }
            for i, (topic, confidence) in enumerate(top_topics)
        ]
        
        return {'topics': topics}