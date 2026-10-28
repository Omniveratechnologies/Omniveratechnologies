import { aboutUs } from "../data/aboutUs";

export default function AboutUsPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <p className="eyebrow">{aboutUs.eyebrow}</p>
        <h1 className="mt-3.5 max-w-[20ch] text-[30px] leading-tight sm:text-[36px] lg:text-[42px]">
          {aboutUs.heading}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[16.5px] text-fog">{aboutUs.intro}</p>
        <p className="mt-3.5 text-[13.5px] text-fog-dim">{aboutUs.founded}</p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-l border border-line-strong bg-gradient-to-br from-brand-500/[0.06] to-violet-500/[0.04] p-7">
            <h3 className="text-[15px] text-brand-300">Mission</h3>
            <p className="mt-2.5 text-[15px] text-platinum">{aboutUs.mission}</p>
          </div>
          <div className="rounded-l border border-line-strong bg-gradient-to-br from-brand-500/[0.06] to-violet-500/[0.04] p-7">
            <h3 className="text-[15px] text-brand-300">Vision</h3>
            <p className="mt-2.5 text-[15px] text-platinum">{aboutUs.vision}</p>
          </div>
        </div>

        <h2 className="mb-6 mt-16 text-[20px]">What we hold ourselves to</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {aboutUs.values.map((v) => (
            <div className="rounded-m border border-line p-6" key={v.title}>
              <h3 className="text-[16px] font-semibold">{v.title}</h3>
              <p className="mt-2 text-[14px] text-fog">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
