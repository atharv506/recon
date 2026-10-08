from ai.recon_pipeline import generate_composite


description = """
A man around 30 years old with a long face,
thick eyebrows, deep-set brown eyes,
a broad slightly crooked nose,
short black hair and a short beard.
"""


result = generate_composite(description)


print("\n========== EXTRACTED ATTRIBUTES ==========\n")

for key, value in result["attributes"].items():
    print(f"{key}: {value}")


print("\n========== GENERATED PROMPT ==========\n")
print(result["prompt"])


with open("recon_composite.png", "wb") as f:
    f.write(result["image"])


print("\n========== SUCCESS ==========")
print("Image saved as recon_composite.png")