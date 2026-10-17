import { useState } from "react";

export default function GenerationDetails({ prompt }) {
  const [open, setOpen] = useState(false);

  if (!prompt) return null;

  return (
    <section className="animate-fade-in">
      <button
        id="toggle-generation-details"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-surface-500/30 bg-surface-800 px-4 py-3 text-left transition-colors hover:bg-surface-700 cursor-pointer"
      >
        <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
          Generation Details
        </span>
        <svg
          className={`h-4 w-4 text-neutral-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="mt-2 rounded-lg border border-surface-500/30 bg-surface-800 px-4 py-3 animate-fade-in">
          <p className="text-xs text-neutral-500 mb-2 font-medium">
            Generated Prompt
          </p>
          <p className="text-xs leading-relaxed text-neutral-400 font-mono break-words">
            {prompt}
          </p>
        </div>
      )}
    </section>
  );
}
