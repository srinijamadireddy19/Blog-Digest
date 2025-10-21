from flask import Flask, request, jsonify
from config import Config
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": app.config["FRONTEND_URL"]}})

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route("/api/process", methods=["POST"])
def process_text():
    data = request.get_json()
    user_text = data.get("text", "")
    processed_text = user_text.upper()
    return jsonify(result=processed_text)

if __name__ == '__main__':
    app.run(debug=True)