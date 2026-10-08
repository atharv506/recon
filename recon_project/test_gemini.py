import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load .env
env_path = Path(__file__).parent / ".env"
load_dotenv(env_path)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found")

print("API key loaded successfully")

# Gemini client
client = genai.Client(
    api_key=api_key,
    http_options=types.HttpOptions(timeout=30000),
)

# Simple test
response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Say hello in one sentence."
)

print("\nGemini response:")
print(response.text)