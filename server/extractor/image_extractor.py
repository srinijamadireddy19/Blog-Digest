from PIL import Image
import pytesseract
import logging
from preprocessors.image_preprocessor import ImagePreprocessor

logger = logging.getLogger(__name__)

class ImageExtractor:
    """Extract text and data from images"""
    
    def __init__(self):
        self.preprocessor = ImagePreprocessor()
    
    def extract(self, image_path):
        """
        Extract text from image using OCR
        
        Args:
            image_path (str): Path to image file
            
        Returns:
            dict: Extracted text and image metadata
        """
        logger.info(f"Extracting from image: {image_path}")
        
        try:
            # Preprocess image
            processed_image, metadata = self.preprocessor.preprocess(image_path)
            
            # Extract text using OCR
            text = pytesseract.image_to_string(processed_image)
            
            return {
                'image_path': image_path,
                'extracted_text': text.strip(),
                'metadata': metadata,
                'processed_image': processed_image
            }
            
        except Exception as e:
            logger.error(f"Error extracting from image: {str(e)}")
            raise ValueError(f"Could not process image: {str(e)}")
