export default function DescriptionPanel({
  description,
  onDescriptionChange,
  onGenerate,
  loading,
  error,
}) {
  const maxChars = 2000;
  const charCount = description.length;

  return (
    <section className="flex flex-col gap-5">
      {/* Panel heading */}
      <div>
        <h2 className="text-base font-semibold text-neutral-100 tracking-wide">
          Witness Description
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Describe the suspect using natural language.
        </p>
      </div>

      {/* Textarea card */}
      <div className="rounded-xl border border-surface-500/40 bg-surface-800 p-1">
        <textarea
          id="description-input"
          className="w-full min-h-[200px] resize-y rounded-lg bg-surface-700 px-4 py-3 text-sm leading-relaxed text-neutral-200 placeholder-neutral-600 border border-transparent focus:border-accent-500/40 transition-colors"
          placeholder="Example: A man around 30 years old with a long face, thick eyebrows, deep-set brown eyes, a broad slightly crooked nose, short black hair and a short beard."
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= maxChars) {
              onDescriptionChange(e.target.value);
            }
          }}
          disabled={loading}
        />
      </div>

      {/* Character count */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-mono ${
            charCount > maxChars * 0.9
              ? "text-accent-400"
              : "text-neutral-600"
          }`}
        >
          {charCount.toLocaleString()} / {maxChars.toLocaleString()} characters
        </span>
      </div>

      {/* Error message */}
      {error && (
        <div className="animate-fade-in rounded-lg border border-accent-500/30 bg-accent-500/10 px-4 py-3">
          <p className="text-sm text-accent-400">{error}</p>
        </div>
      )}

      {/* Generate button */}
      <button
        id="generate-button"
        onClick={onGenerate}
        disabled={loading}
        className={`
          w-full rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-all
          ${
            loading
              ? "bg-surface-600 text-neutral-500 cursor-not-allowed"
              : "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 cursor-pointer"
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="spinner h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Generating…
          </span>
        ) : (
          "Generate Composite"
        )}
      </button>
    </section>
  );
}
