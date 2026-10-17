export default function Header() {
  return (
    <header className="border-b border-surface-600/50 bg-surface-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            {/* Icon mark */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/15 border border-accent-500/25">
              <svg
                className="h-5 w-5 text-accent-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
                <line x1="1" y1="1" x2="23" y2="23" opacity="0.3" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider text-neutral-100">
                RECON
              </h1>
              <p className="text-[11px] font-medium tracking-widest text-neutral-500 uppercase -mt-0.5">
                AI-Assisted Facial Composite
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 rounded-full border border-surface-500/50 bg-surface-800 px-3 py-1.5">
            <span className="status-pulse relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-status-green opacity-40"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-green"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-widest text-status-green uppercase">
              AI System Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
