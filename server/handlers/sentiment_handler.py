import logging
from textblob import TextBlob

logger = logging.getLogger(__name__)

class SentimentHandler:
    """Handle sentiment analysis"""
    
    def process(self, data):
        """
        Analyze sentiment of text
         
        Args:
            data (dict): Preprocessed data
            
        Returns:
            dict: Sentiment analysis result
        """
        logger.info("Analyzing sentiment")
        
        text = data.get('preprocessed_text') or data.get('extracted_text')
        
        if not text:
            raise ValueError("No text available for sentiment analysis")
        
        # Analyze sentiment using TextBlob
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity  # -1 to 1
        subjectivity = blob.sentiment.subjectivity  # 0 to 1
        
        # Calculate overall sentiment
        if polarity > 0.1:
            overall = "Positive"
            score = int((polarity + 1) * 50)  # Convert to 0-100 scale
        elif polarity < -0.1:
            overall = "Negative"
            score = int((polarity + 1) * 50)
        else:
            overall = "Neutral"
            score = 50
        
        # Calculate breakdown percentages
        positive_pct = max(0, int((polarity + 1) * 50))
        negative_pct = max(0, int((1 - polarity) * 50 - 50))
        neutral_pct = 100 - positive_pct - negative_pct
        
        # Generate insights
        insights = self._generate_insights(polarity, subjectivity, text)
        
        return {
            'overall': overall,
            'score': score,
            'polarity': round(polarity, 2),
            'subjectivity': round(subjectivity, 2),
            'breakdown': {
                'positive': positive_pct,
                'neutral': neutral_pct,
                'negative': negative_pct
            },
            'insights': insights
        }
    
    def _generate_insights(self, polarity, subjectivity, text):
        """Generate human-readable insights"""
        insights = []
        
        # Sentiment insights
        if polarity > 0.5:
            insights.append("The content expresses strong positive emotions.")
        elif polarity > 0.1:
            insights.append("The content maintains a generally positive tone.")
        elif polarity < -0.5:
            insights.append("The content expresses strong negative emotions.")
        elif polarity < -0.1:
            insights.append("The content has a somewhat negative tone.")
        else:
            insights.append("The content maintains a neutral, balanced tone.")
        
        # Subjectivity insights
        if subjectivity > 0.7:
            insights.append("The text is highly subjective with many opinions.")
        elif subjectivity > 0.4:
            insights.append("The text contains a mix of facts and opinions.")
        else:
            insights.append("The text is mostly objective and factual.")
        
        return ' '.join(insights)