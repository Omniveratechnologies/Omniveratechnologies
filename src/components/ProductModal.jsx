import { useEffect, useRef } from "react";

const theme = {
  cyan: { mark: "text-brand-300", bullet: "bg-brand-300" },
  violet: { mark: "text-violet-400", bullet: "bg-violet-400" },
};

export default function ProductModal({ product, onClose }) {
  const panelRef = useRef(null);
  const t = theme[product.color] || theme.cyan;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const initials = product.name
    .split(/(?=[A-Z])/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className="animate-overlay-in fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#05080e]/55 px-5 py-12"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-panel-in relative w-full max-w-[880px] rounded-l border border-line-strong bg-gradient-to-br from-[#131b2e] to-[#0d1322] p-7 shadow-modal sm:p-11"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={panelRef}
        tabIndex={-1}
      >
        <button
          className="absolute right-6 top-6 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line-strong text-fog transition-colors duration-200 ease-brand hover:border-brand-300 hover:bg-brand-500/10 hover:text-platinum"
          onClick={onClose}
          aria-label="Close product details"
        >
          ✕
        </button>

        <div className="flex items-center gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-m border border-line-strong bg-white/[0.03] font-display text-[19px] font-semibold ${t.mark}`}
          >
            {initials}
          </div>
          <div>
            <h3 id="modal-title" className="text-[26px]">{product.name}</h3>
            <p className="mt-1 text-[15px] text-fog">{product.tagline}</p>
          </div>
        </div>

        <p className="mt-7 max-w-[70ch] text-[15.5px] text-fog">{product.description}</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-[13px] font-bold text-fog-dim">Key features</h4>
            <ul className="mt-3.5 flex flex-col gap-2.5">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[14.5px] text-platinum">
                  <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${t.bullet}`} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold text-fog-dim">Product preview</h4>
            <div className="mt-3.5 flex h-[130px] items-center justify-center rounded-m border border-line-strong bg-gradient-to-br from-white/5 to-white/[0.01] px-4 text-center text-[13px] text-fog-dim">
              {product.imageAlt} — replace with product screenshot
            </div>
            <div className="mt-3.5 flex h-[130px] flex-col items-center justify-center gap-2 rounded-m border border-dashed border-line-strong text-[13px] text-fog-dim">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 8.5L15.5 12L10 15.5V8.5Z" fill="currentColor" />
              </svg>
              Product walkthrough video — placeholder
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-7">
          <span className="text-[13.5px] text-fog-dim">Typical rollout: 2–6 weeks, tailored to your team.</span>
          <a className="btn btn-primary" href="#contact" onClick={onClose}>
            {product.ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
