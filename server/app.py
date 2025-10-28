from flask import Flask
from flask_cors import CORS
from routes.process_routes import process_bp
import logging
import os

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Load configuration
    app.config.from_object('config.Config')
    
    # Setup logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Ensure upload directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Register blueprints
    app.register_blueprint(process_bp, url_prefix='/')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)