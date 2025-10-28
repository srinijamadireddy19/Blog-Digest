from PIL import Image, ImageEnhance, ImageFilter
import logging

logger = logging.getLogger(__name__)

class ImagePreprocessor:
    """Preprocess images for OCR and analysis"""
    
    def __init__(self):
        self.target_size = (1024, 1024)
    
    def preprocess(self, image_path):
        """
        Preprocess image for better OCR results
        
        Args:
            image_path (str): Path to image
            
        Returns:
            tuple: (processed_image, metadata)
        """
        logger.info(f"Preprocessing image: {image_path}")
        
        # Open image
        img = Image.open(image_path)
        
        # Store original metadata
        metadata = {
            'original_size': img.size,
            'format': img.format,
            'mode': img.mode
        }
        
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize if too large
        if img.size[0] > self.target_size[0] or img.size[1] > self.target_size[1]:
            img.thumbnail(self.target_size, Image.Resampling.LANCZOS)
        
        # Enhance for better OCR
        img = self._enhance_for_ocr(img)
        
        metadata['processed_size'] = img.size
        
        return img, metadata
    
    def _enhance_for_ocr(self, img):
        """Apply enhancements for better OCR"""
        # Increase contrast
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.5)
        
        # Increase sharpness
        enhancer = ImageEnhance.Sharpness(img)
        img = enhancer.enhance(1.5)
        
        # Apply slight blur to reduce noise
        img = img.filter(ImageFilter.MedianFilter(size=3))
        
        return img

