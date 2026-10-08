from ai.image_generator import generate_image


prompt = """
Highly realistic facial portrait of a 30 year old man,
long face, deep-set brown eyes, thick eyebrows,
broad slightly crooked nose, short black hair,
short beard, front-facing, looking directly at camera,
neutral expression, head and shoulders,
plain neutral background, natural skin texture,
photorealistic, high facial detail
"""


image_bytes = generate_image(prompt)

output_path = "generated_face.png"

with open(output_path, "wb") as f:
    f.write(image_bytes)

print(f"\nImage generated successfully!")
print(f"Saved to: {output_path}")