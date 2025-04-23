# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests
from google import genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow cross-origin requests

# Initialize the Google GenAI client with your API key
client = genai.Client(api_key="AIzaSyDfVf4L9-HPg6X_83b1H6VbGG3mPS48Xko")

@app.route('/get-response', methods=['POST'])
def get_response():
    data = request.get_json()  # Receive the POST data
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        return jsonify({"response": response.text})  # Return the response as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests
from google import genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow cross-origin requests

# Initialize the Google GenAI client with your API key
client = genai.Client(api_key="AIzaSyDfVf4L9-HPg6X_83b1H6VbGG3mPS48Xko")

@app.route('/get-response', methods=['POST'])
def get_response():
    data = request.get_json()  # Receive the POST data
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        return jsonify({"response": response.text})  # Return the response as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
