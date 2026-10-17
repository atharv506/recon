from ai.prompt_builder import build_prompt
from ai.image_generator import generate_image


def generate_from_attributes(attributes: dict):

    prompt = build_prompt(attributes)

    image_bytes = generate_image(prompt)

    return {
        "attributes": attributes,
        "prompt": prompt,
        "image": image_bytes
    }