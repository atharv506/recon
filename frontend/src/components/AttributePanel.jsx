const ATTRIBUTE_CONFIG = [
  { key: "age", label: "Age" },
  { key: "gender", label: "Gender" },
  { key: "face_shape", label: "Face Shape" },
  {
    label: "Eyes",
    compose: (a) =>
      [a.eye_characteristics, a.eye_color].filter(Boolean).join(" · "),
  },
  { key: "eyebrow_characteristics", label: "Eyebrows" },
  { key: "nose_characteristics", label: "Nose" },
  {
    label: "Hair",
    compose: (a) =>
      [a.hair_color, a.hair_style].filter(Boolean).join(" · "),
  },
  { key: "facial_hair", label: "Facial Hair" },
];

function capitalize(str) {
  if (typeof str !== "string") return String(str ?? "—");
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function AttributePanel({ attributes }) {
  if (!attributes) return null;

  return (
    <section className="animate-fade-in">
      <h3 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">
        Facial Characteristics
      </h3>

      <div className="rounded-xl border border-surface-500/40 bg-surface-800 divide-y divide-surface-600/40">
        {ATTRIBUTE_CONFIG.map(({ key, label, compose }) => {
          const value = compose
            ? compose(attributes)
            : attributes[key];

          if (!value && value !== 0) return null;

          return (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                {label}
              </span>
              <span className="text-sm font-medium text-neutral-200">
                {capitalize(value)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
