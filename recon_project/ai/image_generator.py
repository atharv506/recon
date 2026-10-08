import os
import base64
from pathlib import Path

import requests
from dotenv import load_dotenv


# --------------------------------------------------
# Load environment variables
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
env_path = BASE_DIR / ".env"

load_dotenv(env_path)


# --------------------------------------------------
# Pollinations configuration
# --------------------------------------------------
# --------------------------------------------------


API_KEY = os.getenv("POLLINATIONS_API_KEY")

if not API_KEY:
    raise ValueError("POLLINATIONS_API_KEY not found in .env")


API_URL = "https://gen.pollinations.ai/v1/images/generations"


# --------------------------------------------------
# Generate image
# --------------------------------------------------

def generate_image(prompt: str) -> bytes:

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "flux",
        "prompt": prompt,
        "n": 1,
        "response_format": "b64_json"
    }

    response = requests.post(
        API_URL,
        headers=headers,
        json=payload,
        timeout=180
    )

    response.raise_for_status()

    data = response.json()

    image_b64 = data["data"][0]["b64_json"]

    return base64.b64decode(image_b64)
