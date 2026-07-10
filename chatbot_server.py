"""
chatbot_server.py  –  Flask backend for the portfolio AI chat widget.

Run:
    pip install flask flask-cors langchain-mistralai python-dotenv
    python chatbot_server.py
"""

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_mistralai import ChatMistralAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

app = Flask(__name__)
CORS(app)   # allow requests from the portfolio page

# Initialise the model once at startup
model = ChatMistralAI(model="mistral-small-2506")

SYSTEM_PROMPT = (
    "You are Ali Naqvi's personal AI assistant embedded in his portfolio. "
    "Ali is a first-year Computer Science student who loves web development, "
    "machine learning, and game development. Be friendly, concise and helpful. "
    "Format code blocks with markdown triple-backticks."
)

def build_lc_messages(history: list, new_message: str):
    """Convert history array + new message into LangChain message objects."""
    messages = [SystemMessage(content=SYSTEM_PROMPT)]
    for turn in history:
        role    = turn.get("role", "")
        content = turn.get("content", "")
        if role == "user":
            messages.append(HumanMessage(content=content))
        elif role == "assistant":
            messages.append(AIMessage(content=content))
    messages.append(HumanMessage(content=new_message))
    return messages


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/chat", methods=["POST"])
def chat():
    data    = request.get_json(silent=True) or {}
    message = data.get("message", "").strip()
    history = data.get("history", [])

    if not message:
        return jsonify({"error": "message is required"}), 400

    try:
        lc_messages = build_lc_messages(history, message)
        response    = model.invoke(lc_messages)
        return jsonify({"response": response.content}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("[AI] Chatbot server running at http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)
