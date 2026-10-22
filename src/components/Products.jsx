import { products } from "../data/products";

const theme = {
  cyan: {
    glow: "bg-[radial-gradient(220px_160px_at_20%_0%,rgba(36,137,182,0.25),transparent_70%)]",
    hoverBorder: "hover:border-brand-400/60",
    mark: "text-brand-300",
    hint: "group-hover:text-brand-300",
  },
  violet: {
    glow: "bg-[radial-gradient(220px_160px_at_20%_0%,rgba(139,124,246,0.25),transparent_70%)]",
    hoverBorder: "hover:border-violet-400/60",
    mark: "text-violet-400",
    hint: "group-hover:text-violet-400",
  },
};

export default function Products({ onSelectProduct }) {
  const initialsOf = (name) =>
    name
      .split(/(?=[A-Z])/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <section className="py-14 lg:py-[108px]" id="products">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Our products</p>
            <h2 className="mt-3.5 text-[28px] leading-tight sm:text-[32px] lg:text-[38px]">
              Software we build, own, and use as proof of our craft.
            </h2>
          </div>
          <p className="max-w-[32ch] text-[15px] text-fog">
            Two flagship products, actively in market. Click a card to see the full picture.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="product-rail flex gap-6 overflow-x-auto px-1 pb-7 pt-5">
            {products.map((p) => {
              const t = theme[p.color] || theme.cyan;
              return (
                <button
                  key={p.id}
                  className={`product-box-3d group relative flex h-[380px] w-[320px] flex-none flex-col justify-between rounded-l border border-line-strong bg-gradient-to-br from-white/[0.045] to-white/[0.01] p-7 text-left transition-[transform,border-color,box-shadow] duration-500 ease-brand hover:shadow-panel sm:w-[320px] max-sm:h-[350px] max-sm:w-[268px] max-sm:p-6 ${t.hoverBorder}`}
                  onClick={() => onSelectProduct(p)}
                  aria-haspopup="dialog"
                >
                  <div className={`pointer-events-none absolute inset-0 rounded-l opacity-50 ${t.glow}`} />
                  <div
                    className={`relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-m border border-line-strong bg-white/[0.03] font-display text-lg font-semibold ${t.mark}`}
                  >
                    {initialsOf(p.name)}
                  </div>
                  <div className="relative z-10">
                    <h3 className="mt-5 text-[23px]">{p.name}</h3>
                    <p className="mt-2.5 max-w-[26ch] text-[14.5px] text-fog">{p.tagline}</p>
                  </div>
                  <div className="relative z-10 flex items-center justify-between text-[13.5px] text-fog-dim">
                    <span>Software product</span>
                    <span className={`inline-flex items-center gap-1.5 font-semibold text-platinum ${t.hint}`}>
                      View details
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-[13px] text-fog-dim">Scroll sideways to see both products.</p>
        </div>
      </div>
    </section>
  );
}
