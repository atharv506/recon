import time

from ai.gemini import client, FacialAttributes
from google.genai import types


def refine_facial_attributes(
    current_attributes: dict,
    modification: str
) -> dict:

    prompt = f"""
You are an assistant for an AI-assisted facial composite
generation system.

Current facial attributes:

{current_attributes}

Witness modification:

"{modification}"

Update ONLY the facial characteristics affected by the
witness's modification.

Rules:

1. Do NOT change characteristics that were not requested.
2. Preserve all existing attributes unless explicitly changed.
3. Do NOT invent new characteristics.
4. Return the COMPLETE updated attribute object.
5. Preserve existing details when adding a modification.

Example:

If the current nose is:
"broad, slightly crooked"

and the witness says:
"make the nose wider"

the result should preserve the crooked characteristic,
for example:
"wider, slightly crooked".
"""

    last_error = None

    for attempt in range(3):

        try:

            response = client.models.generate_content(
                model="gemini-3.5-flash-lite",
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=FacialAttributes,
                )
            )

            attributes = response.parsed

            if attributes is None:
                raise ValueError(
                    "Gemini returned no structured attributes."
                )

            return attributes.model_dump()

        except Exception as e:

            last_error = e

            if attempt < 2:
                wait_time = 2 ** attempt
                print(
                    f"Gemini unavailable. "
                    f"Retrying in {wait_time} seconds..."
                )
                time.sleep(wait_time)

    raise last_error