import { services } from "../data/services";
import RecentWork from "./RecentWork";

const sizeClass = {
  large: "md:col-span-2 md:row-span-2",
  medium: "md:col-span-2",
  small: "md:col-span-2 lg:col-span-1",
};

export default function Services() {
  return (
    <>
      <section className="py-14 lg:py-24" id="services">
        <div className="container">
          <div className="max-w-[640px]">
            <p className="eyebrow">Capabilities</p>
            <h2 className="mt-3.5 text-[28px] leading-tight sm:text-[32px] lg:text-[38px]">
              Engineering services, delivered with product discipline
            </h2>
            <p className="mt-5 text-[16.5px] text-fog">
              Every engagement below is staffed by people who have shipped software they were
              personally accountable for — not a rotating bench of generalists.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[168px] lg:grid-cols-4">
            {services.map((s) => (
              <div
                className={`flex flex-col justify-end rounded-l border border-line bg-gradient-to-br from-white/[0.03] to-white/[0.005] p-6 transition-[border-color,transform] duration-300 ease-brand hover:-translate-y-1 hover:border-line-strong ${sizeClass[s.size]}`}
                key={s.id}
              >
                <h3 className="text-[17px] font-semibold">{s.title}</h3>
                <p className="mt-2 text-[14px] text-fog">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RecentWork />
    </>
  );
}
