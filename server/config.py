'''class Config:
    FRONTEND_URL = "http://localhost:5173/"
    DEBUG = True'''

import os

class Config:
    # Flask
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # File Upload
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10MB
    UPLOAD_FOLDER = 'uploads/'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'pdf'}
    
    # API Keys (load from environment variables)
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
    HUGGINGFACE_API_KEY = os.environ.get('HUGGINGFACE_API_KEY', '')

