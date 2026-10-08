from ai.gemini import extract_facial_attributes


description = """
A man around 30 years old with a long face,
thick eyebrows, deep-set brown eyes,
a broad slightly crooked nose,
short black hair and a short beard.
"""


attributes = extract_facial_attributes(description)

print("\nExtracted facial attributes:\n")

for key, value in attributes.items():
    print(f"{key}: {value}")