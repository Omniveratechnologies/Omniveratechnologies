import { useEffect, useState } from "react";
import { api } from "../services/api";
import RecentWorkModal from "./RecentWorkModal";

export default function RecentWork() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await api.get("/recent-works");
        if (active) setWorks(res.data.works || []);
      } catch (e) {
        if (active) setError("Could not load recent work.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <section className="py-14 lg:py-24" id="recent-work">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <p className="eyebrow">Our recent work</p>
            <h2 className="mt-3.5 text-[28px] leading-tight sm:text-[32px] lg:text-[38px]">
              Projects we have recently delivered
            </h2>
            <p className="mt-5 text-[16.5px] text-fog">
              A selection of recent engagements — from mobile apps and web platforms to business systems and
              automation. Click any card to read the full story.
            </p>
          </div>
        </div>

        {loading && <p className="mt-10 text-fog">Loading recent work…</p>}
        {error && <p className="mt-10 text-fog">{error}</p>}

        {!loading && !error && works.length === 0 && (
          <p className="mt-10 text-fog">No recent work published yet.</p>
        )}

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <button
              key={w._id}
              type="button"
              onClick={() => setSelected(w)}
              className="group flex flex-col overflow-hidden rounded-l border border-line bg-gradient-to-br from-white/[0.03] to-white/[0.005] text-left transition-[border-color,transform] duration-300 ease-brand hover:-translate-y-1 hover:border-line-strong"
              aria-haspopup="dialog"
            >
              {w.imageUrl ? (
                <div className="h-44 w-full overflow-hidden border-b border-line bg-white/[0.02]">
                  <img
                    src={w.imageUrl}
                    alt={w.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-44 w-full items-center justify-center border-b border-line bg-white/[0.02] text-fog-dim">
                  No image
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-fog-dim">
                  {w.category && <span>{w.category}</span>}
                  {w.year && <span>· {w.year}</span>}
                  {w.featured && <span className="text-brand-300">· Featured</span>}
                </div>
                <h3 className="mt-2 text-[18px] font-semibold leading-tight">{w.title}</h3>
                {w.client && <p className="mt-1 text-[13px] text-fog-dim">for {w.client}</p>}
                {w.summary && <p className="mt-3 text-[14px] text-fog line-clamp-3">{w.summary}</p>}
                <div className="mt-auto pt-4 text-[13px] font-semibold text-platinum transition-colors group-hover:text-brand-300">
                  View details →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <RecentWorkModal work={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}