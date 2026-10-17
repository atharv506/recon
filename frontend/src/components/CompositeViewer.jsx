export default function CompositeViewer({ result, onGenerateAgain }) {
  if (!result) {
    return <EmptyState />;
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(result.image_url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recon_composite.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open image in new tab
      window.open(result.image_url, "_blank");
    }
  };

  return (
    <div className="animate-fade-in flex flex-col gap-5">
      {/* Image container */}
      <div className="rounded-xl border border-surface-500/40 bg-surface-800 p-2 overflow-hidden">
        <img
          id="composite-image"
          src={result.image_url}
          alt="Generated facial composite"
          className="w-full rounded-lg object-contain max-h-[540px] bg-surface-900"
        />
      </div>

      {/* Caption */}
      <p className="text-sm font-medium text-neutral-400 text-center">
        Generated Composite
      </p>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          id="generate-again-button"
          onClick={onGenerateAgain}
          className="flex-1 rounded-lg border border-surface-500/50 bg-surface-700 px-4 py-2.5 text-sm font-medium text-neutral-300 hover:bg-surface-600 hover:text-neutral-100 transition-colors cursor-pointer"
        >
          Generate Again
        </button>
        <button
          id="download-button"
          onClick={handleDownload}
          className="flex-1 rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Image
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-surface-500/40 bg-surface-800/50 p-12 text-center min-h-[360px]">
      {/* Placeholder icon */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-700 border border-surface-500/30">
        <svg
          className="h-8 w-8 text-neutral-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
        </svg>
      </div>
      <p className="text-sm font-medium text-neutral-400">
        Your composite will appear here
      </p>
      <p className="mt-2 max-w-xs text-xs text-neutral-600 leading-relaxed">
        Describe the suspect and generate an AI-assisted facial composite.
      </p>
    </div>
  );
}
