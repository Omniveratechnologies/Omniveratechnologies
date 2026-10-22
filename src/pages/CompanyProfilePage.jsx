import { companyProfile as cp } from "../data/companyProfile";
import { company } from "../data/content";

export default function CompanyProfilePage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <p className="eyebrow">{cp.eyebrow}</p>
        <h1 className="mt-3.5 max-w-[20ch] text-[30px] leading-tight sm:text-[36px] lg:text-[42px]">
          {cp.heading}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[16.5px] text-fog">{cp.intro}</p>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="mb-6 text-[20px]">Quick facts</h2>
            <dl className="flex flex-col gap-3.5">
              {cp.quickFacts.map((f) => (
                <div
                  className="grid grid-cols-[130px_1fr] gap-4 border-b border-line pb-3"
                  key={f.label}
                >
                  <dt className="m-0 text-[13px] text-fog-dim">{f.label}</dt>
                  <dd className="m-0 text-[14.5px] text-platinum">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="mb-6 text-[20px]">Focus areas</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {cp.focusAreas.map((f) => (
                <li key={f} className="relative pl-4 text-[14.5px] text-platinum">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="mb-6 mt-16 text-[20px]">Leadership</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cp.leadership.map((l) => (
            <div className="flex items-center gap-3.5 rounded-m border border-line p-5" key={l.name}>
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-line-strong font-display text-[14px] font-semibold text-brand-300">
                {l.name.split(" ").map((w) => w[0]).join("")}
              </div>
              <div>
                <h3 className="text-[15px] font-semibold">{l.name}</h3>
                <p className="mt-0.5 text-[13px] text-fog">{l.role}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 max-w-[60ch] text-[13.5px] text-fog-dim">{cp.documentNote}</p>
        <p className="mt-2.5 max-w-[60ch] text-[13.5px] text-fog-dim">
          Registered as {company.legalName}, headquartered in {company.address}.
        </p>
      </div>
    </section>
  );
}
