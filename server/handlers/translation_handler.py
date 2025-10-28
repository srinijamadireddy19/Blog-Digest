import logging
from deep_translator import GoogleTranslator

logger = logging.getLogger(__name__)

class TranslationHandler:
    """Handle text translation"""
    
    def __init__(self):
        self.supported_languages = {
            'spanish': 'es',
            'french': 'fr',
            'german': 'de',
            'italian': 'it',
            'portuguese': 'pt',
            'russian': 'ru',
            'chinese': 'zh-CN',
            'japanese': 'ja',
            'korean': 'ko',
            'arabic': 'ar'
        }
    
    def process(self, data, target_language='spanish'):
        """
        Translate text to target language
        
        Args:
            data (dict): Preprocessed data
            target_language (str): Target language name
            
        Returns:
            dict: Translation result
        """
        logger.info(f"Translating text to {target_language}")
        
        text = data.get('preprocessed_text') or data.get('extracted_text')
        
        if not text:
            raise ValueError("No text available for translation")
        
        # Get language code
        lang_code = self.supported_languages.get(target_language.lower(), 'es')
        
        try:
            # Split into chunks if text is too long (max 5000 chars per request)
            max_chunk_size = 4500
            if len(text) > max_chunk_size:
                chunks = self._split_text(text, max_chunk_size)
                translated_chunks = []
                
                for chunk in chunks:
                    translator = GoogleTranslator(source='auto', target=lang_code)
                    translated_chunk = translator.translate(chunk)
                    translated_chunks.append(translated_chunk)
                
                translated_text = ' '.join(translated_chunks)
            else:
                translator = GoogleTranslator(source='auto', target=lang_code)
                translated_text = translator.translate(text)
            
            return {
                'original_language': 'English',
                'target_language': target_language.capitalize(),
                'translated_text': translated_text,
                'original_length': len(text.split()),
                'translated_length': len(translated_text.split())
            }
            
        except Exception as e:
            logger.error(f"Translation error: {str(e)}")
            raise ValueError(f"Translation failed: {str(e)}")
    
    def _split_text(self, text, max_size):
        """Split text into smaller chunks"""
        sentences = text.split('. ')
        chunks = []
        current_chunk = []
        current_size = 0
        
        for sentence in sentences:
            sentence_size = len(sentence)
            if current_size + sentence_size > max_size and current_chunk:
                chunks.append('. '.join(current_chunk) + '.')
                current_chunk = [sentence]
                current_size = sentence_size
            else:
                current_chunk.append(sentence)
                current_size += sentence_size
        
        if current_chunk:
            chunks.append('. '.join(current_chunk))
        
        return chunks
