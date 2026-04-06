from flask import Flask, request, jsonify
from flask_cors import CORS
from src.utils import get_chat_response

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

SYSTEM_PROMPT = {
    "role": "system",
    "content": "You are a helpful, friendly AI assistant. Answer clearly and concisely."
}

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "ChatBot API is running!"})

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        if not data or "messages" not in data:
            return jsonify({"error": "Missing 'messages' in request body"}), 400

        messages = [SYSTEM_PROMPT] + data["messages"]
        response_text = get_chat_response(messages)
        return jsonify({"reply": response_text, "status": "success"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)