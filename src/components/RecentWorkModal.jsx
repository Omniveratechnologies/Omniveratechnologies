import { useEffect } from "react";

export default function RecentWorkModal({ work, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!work) return null;

  const techs = Array.isArray(work.technologies) ? work.technologies : [];
  const gallery = Array.isArray(work.gallery) ? work.gallery : [];

  return (
    <div
      className="animate-overlay-in fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#05080e]/60 px-4 py-10 sm:px-6"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="animate-panel-in relative w-full max-w-[920px] rounded-l border border-line-strong bg-gradient-to-br from-[#131b2e] to-[#0d1322] p-6 shadow-modal sm:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recent-work-title"
      >
        <button
          className="absolute right-5 top-5 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line-strong text-fog transition-colors duration-200 ease-brand hover:border-brand-300 hover:bg-brand-500/10 hover:text-platinum"
          onClick={onClose}
          aria-label="Close work details"
        >
          ✕
        </button>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {work.imageUrl && (
            <div className="lg:w-[42%]">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="h-auto w-full rounded-m border border-line-strong object-cover"
              />
              {gallery.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {gallery.map((src, i) => (
                    <img key={i} src={src} alt={`${work.title} ${i + 1}`} className="h-20 w-full rounded-s border border-line object-cover" />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-wider text-fog-dim">
              {work.category && <span className="rounded-full border border-line-strong px-2.5 py-1">{work.category}</span>}
              {work.year && <span className="rounded-full border border-line-strong px-2.5 py-1">{work.year}</span>}
              {work.featured && <span className="rounded-full border border-brand-300/40 bg-brand-500/10 px-2.5 py-1 text-brand-300">Featured</span>}
            </div>
            <h3 id="recent-work-title" className="mt-3 text-[26px] leading-tight sm:text-[30px]">{work.title}</h3>
            {work.client && <p className="mt-1 text-[15px] text-fog">Client: {work.client}</p>}
            {work.summary && <p className="mt-4 text-[15.5px] text-fog">{work.summary}</p>}
          </div>
        </div>

        {work.description && (
          <div className="mt-7">
            <h4 className="text-[13px] font-bold text-fog-dim">Overview</h4>
            <p className="mt-2.5 whitespace-pre-wrap text-[14.5px] leading-relaxed text-platinum">{work.description}</p>
          </div>
        )}

        {work.details && (
          <div className="mt-6">
            <h4 className="text-[13px] font-bold text-fog-dim">Details</h4>
            <p className="mt-2.5 whitespace-pre-wrap text-[14.5px] leading-relaxed text-platinum">{work.details}</p>
          </div>
        )}

        {techs.length > 0 && (
          <div className="mt-6">
            <h4 className="text-[13px] font-bold text-fog-dim">Technologies / Stack</h4>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {techs.map((t) => (
                <span key={t} className="rounded-full border border-line-strong bg-white/[0.03] px-3 py-1 text-[13px] text-platinum">{t}</span>
              ))}
            </div>
          </div>
        )}

        {work.link && (
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <span className="text-[13px] text-fog-dim">View the live project or case study.</span>
            <a className="btn btn-primary" href={work.link} target="_blank" rel="noreferrer">
              View project
            </a>
          </div>
        )}
      </div>
    </div>
  );
}