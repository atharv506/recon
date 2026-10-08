from ai.gemini import extract_facial_attributes
from ai.prompt_builder import build_prompt


description = """
A man around 30 years old with a long face,
thick eyebrows, deep-set brown eyes,
a broad slightly crooked nose,
short black hair and a short beard.
"""


# TEXT → GEMINI → JSON
attributes = extract_facial_attributes(description)

print("\n========== GEMINI JSON ==========\n")
print(attributes)


# JSON → PROMPT
prompt = build_prompt(attributes)

print("\n========== IMAGE PROMPT ==========\n")
print(prompt)