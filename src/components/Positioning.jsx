import { positioning } from "../data/content";

export default function Positioning() {
  return (
    <section className="border-t border-line py-16 lg:py-24" id="positioning">
      <div className="container">
        <div className="max-w-[640px]">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-3.5 text-[28px] leading-tight sm:text-[32px] lg:text-[38px]">
            {positioning.heading}
          </h2>
          <p className="mt-5 text-[16.5px] text-fog">{positioning.body}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-l border border-line bg-line md:grid-cols-3">
          {positioning.pillars.map((p) => (
            <div className="bg-navy p-8" key={p.title}>
              <h3 className="text-[17px] font-semibold">{p.title}</h3>
              <p className="mt-3 text-[14.5px] text-fog">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
