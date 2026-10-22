import { whyChooseUs } from "../data/whyChooseUs";

export default function WhyChooseUsPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <p className="eyebrow">{whyChooseUs.eyebrow}</p>
        <h1 className="mt-3.5 max-w-[20ch] text-[30px] leading-tight sm:text-[36px] lg:text-[42px]">
          {whyChooseUs.heading}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[16.5px] text-fog">{whyChooseUs.intro}</p>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-l border border-line bg-line md:grid-cols-3">
          {whyChooseUs.pillars.map((p) => (
            <div className="bg-navy p-8" key={p.title}>
              <h3 className="text-[17px] font-semibold">{p.title}</h3>
              <p className="mt-3 text-[14.5px] text-fog">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-px overflow-hidden rounded-l border border-line bg-line">
            {whyChooseUs.points.map((p) => (
              <div
                className="grid grid-cols-1 gap-2 bg-navy p-6 sm:grid-cols-[200px_1fr] sm:gap-6 sm:p-7"
                key={p.title}
              >
                <h3 className="text-[16px] font-semibold">{p.title}</h3>
                <p className="text-[14.5px] text-fog">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 rounded-l border border-line p-7">
            {whyChooseUs.stats.map((s) => (
              <div key={s.label}>
                <strong className="block bg-gradient-to-r from-brand-300 to-violet-400 bg-clip-text font-display text-[30px] font-semibold text-transparent">
                  {s.value}
                </strong>
                <span className="text-[13px] text-fog-dim">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
