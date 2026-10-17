from ai.refinement import refine_facial_attributes


current_attributes = {
    "age": 30,
    "gender": "man",
    "face_shape": "long",
    "eye_characteristics": "deep-set",
    "eye_color": "brown",
    "eyebrow_characteristics": "thick",
    "nose_characteristics": "broad, slightly crooked",
    "hair_color": "black",
    "hair_style": "short",
    "facial_hair": "short beard"
}


modification = """
Make the nose wider and more crooked.
Make the eyebrows thinner.
"""


updated_attributes = refine_facial_attributes(
    current_attributes,
    modification
)


print("\n========== ORIGINAL ==========\n")

for key, value in current_attributes.items():
    print(f"{key}: {value}")


print("\n========== MODIFICATION ==========\n")
print(modification)


print("\n========== UPDATED ==========\n")

for key, value in updated_attributes.items():
    print(f"{key}: {value}")