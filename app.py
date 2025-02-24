import os
import google.generativeai as genai
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify

load_dotenv()  # Load API key from .env file

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = Flask(__name__)

def chat_with_gemini(user_input):
    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(user_input)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")  # Receive JSON data
    if not user_input:
        return jsonify({"error": "No message received"}), 400

    response = chat_with_gemini(user_input)
    return jsonify({"reply": response})

if __name__ == "__main__":
    app.run(debug=True)
