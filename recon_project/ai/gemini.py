import os
import time
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from google.genai import errors
from google.genai import types
from pydantic import BaseModel


# --------------------------------------------------
# Load environment variables
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent
env_path = BASE_DIR / ".env"

load_dotenv(env_path)


# --------------------------------------------------
# Gemini client
# --------------------------------------------------

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=api_key)


# --------------------------------------------------
# Structured output schema
# --------------------------------------------------

class FacialAttributes(BaseModel):
    age: int | None
    gender: str | None
    face_shape: str | None
    eye_characteristics: str | None
    eye_color: str | None
    eyebrow_characteristics: str | None
    nose_characteristics: str | None
    hair_color: str | None
    hair_style: str | None
    facial_hair: str | None


# --------------------------------------------------
# Extract facial attributes
# --------------------------------------------------

def extract_facial_attributes(description: str) -> dict:
    """
    Convert a natural-language witness description
    into structured facial attributes using Gemini.
    """

    request_contents = f"""
You are an assistant for an AI-assisted facial composite
generation system.

Extract ONLY the facial characteristics explicitly mentioned
in the witness description.

Do NOT invent, assume, or guess characteristics that are
not present in the description.

If a characteristic is not mentioned, return null.

Witness description:

{description}
"""

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-3.7-flash",
                contents=request_contents,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=FacialAttributes,
                ),
            )
            break
        except errors.ServerError:
            if attempt == 2:
                raise
            time.sleep(2 ** attempt)

    # Pydantic validates Gemini's structured response
    attributes = response.parsed

    return attributes.model_dump()