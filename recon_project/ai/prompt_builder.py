def build_prompt(attributes: dict) -> str:
    """
    Convert structured facial attributes into
    an image-generation prompt.
    """

    parts = [
        "highly realistic facial portrait",
        "front-facing",
        "looking directly at the camera",
        "neutral expression",
        "head and shoulders",
        "plain neutral background",
        "natural skin texture",
        "subtle facial imperfections",
        "photorealistic",
        "high facial detail"
    ]

    if attributes.get("age"):
        parts.append(f"{attributes['age']} year old")

    if attributes.get("gender"):
        parts.append(attributes["gender"])

    if attributes.get("face_shape"):
        parts.append(f"{attributes['face_shape']} face")

    if attributes.get("eye_characteristics"):
        parts.append(
            f"{attributes['eye_characteristics']} eyes"
        )

    if attributes.get("eye_color"):
        parts.append(
            f"{attributes['eye_color']} eyes"
        )

    if attributes.get("eyebrow_characteristics"):
        parts.append(
            f"{attributes['eyebrow_characteristics']} eyebrows"
        )

    if attributes.get("nose_characteristics"):
        parts.append(
            f"{attributes['nose_characteristics']} nose"
        )

    if attributes.get("hair_color"):
        parts.append(
            f"{attributes['hair_color']} hair"
        )

    if attributes.get("hair_style"):
        parts.append(
            f"{attributes['hair_style']} hair"
        )

    if attributes.get("facial_hair"):
        parts.append(
            attributes["facial_hair"]
        )

    return ", ".join(parts)