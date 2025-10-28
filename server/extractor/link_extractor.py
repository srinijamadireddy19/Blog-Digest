import requests
from bs4 import BeautifulSoup
import trafilatura
import logging
from preprocessors.link_preprocessor import LinkPreprocessor

logger = logging.getLogger(__name__)

class LinkExtractor:
    """Extract content from URLs using trafilatura with BeautifulSoup fallback"""
    
    def __init__(self, timeout=10):
        self.preprocessor = LinkPreprocessor()
        self.timeout = timeout
    
    def extract(self, url):
        """
        Extract content from URL
        
        Args:
            url (str): URL to scrape
            
        Returns:
            dict: Extracted and preprocessed content
        """
        logger.info(f"Extracting content from URL: {url}")
        
        # --- Method 1: Try trafilatura first ---
        try:
            downloaded = trafilatura.fetch_url(url)
            if downloaded:
                text = trafilatura.extract(
                    downloaded,
                    output_format="txt",
                    include_comments=False,
                    include_tables=True
                )
                
                if text:
                    preprocessed = self.preprocessor.preprocess(text, url)
                    return {
                        'url': url,
                        'title': url,  # Trafilatura doesn't extract title directly
                        'raw_text': text,
                        'preprocessed_text': preprocessed['text'],
                        'metadata': preprocessed['metadata']
                    }
                else:
                    logger.warning("Trafilatura returned empty text, falling back to BeautifulSoup")
            else:
                logger.warning("Trafilatura failed to fetch the URL, falling back to BeautifulSoup")
        
        except Exception as e:
            logger.warning(f"Trafilatura extraction failed: {str(e)}, trying BeautifulSoup")
        
        # --- Method 2: Fallback to BeautifulSoup ---
        try:
            response = requests.get(url, timeout=self.timeout)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Remove scripts, styles, and noscript
            for tag in soup(["script", "style", "noscript"]):
                tag.decompose()
            
            # Get text
            text = soup.get_text(separator='\n')
            # Collapse multiple newlines and strip
            text = "\n".join(line.strip() for line in text.splitlines() if line.strip())
            
            title = soup.title.string if soup.title else url
            
            preprocessed = self.preprocessor.preprocess(text, title)
            
            return {
                'url': url,
                'title': title,
                'raw_text': text,
                'preprocessed_text': preprocessed['text'],
                'metadata': preprocessed['metadata']
            }
        
        except requests.RequestException as e:
            logger.error(f"Failed to fetch URL with BeautifulSoup: {str(e)}")
            raise ValueError(f"Could not fetch content from URL: {str(e)}")
