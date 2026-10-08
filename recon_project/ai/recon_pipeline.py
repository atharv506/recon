from ai.gemini import extract_facial_attributes
from ai.prompt_builder import build_prompt
from ai.image_generator import generate_image


def generate_composite(description: str):
    """
    Complete RECON AI pipeline:

    Witness description
        ↓
    Gemini
        ↓
    Structured facial attributes
        ↓
    Prompt builder
        ↓
    Pollinations
        ↓
    Generated image
    """

    # 1. Extract facial attributes
    attributes = extract_facial_attributes(description)

    # 2. Build image-generation prompt
    prompt = build_prompt(attributes)

    # 3. Generate image
    image_bytes = generate_image(prompt)

    return {
        "attributes": attributes,
        "prompt": prompt,
        "image": image_bytes
    }