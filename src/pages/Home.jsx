import Positioning from "../components/Positioning";
import DevelopmentGear from "../components/DevelopmentGear";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Cpu,
  Globe2,
  Layers3,
} from "lucide-react";

import { nav } from "../data/content";

const quickLinkCopy = {
  "/products": "Explore our in-house software products.",

  "/services":
    "Web, mobile, SaaS, CRM, PMS and automation engineering.",

  "/about-us":
    "Learn about Omnivera and how we build technology.",

  "/contact-us":
    "Start a conversation about your next product.",

  "/why-choose-us":
    "A product-led approach to building technology.",

  "/company-profile":
    "Company information for partners and procurement teams.",
};

const capabilities = [
  {
    icon: Layers3,
    title: "Product Engineering",
    description:
      "From product strategy to scalable production-ready software.",
  },

  {
    icon: Globe2,
    title: "Web & Mobile",
    description:
      "Modern web platforms and mobile experiences built for real users.",
  },

  {
    icon: Building2,
    title: "Business Systems",
    description:
      "PMS, POS, CRM and operational platforms for growing businesses.",
  },

  {
    icon: Cpu,
    title: "AI & Automation",
    description:
      "Intelligent workflows that reduce repetitive operational work.",
  },
];

export default function Home() {
  const tiles = nav.filter((n) => n.to !== "/");

  return (
    <main className="overflow-hidden bg-[#05070d] text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="relative min-h-[calc(100vh-80px)] overflow-hidden border-b border-white/[0.07]"
      >

        {/* Background glow */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -left-[180px] -top-[180px] h-[600px] w-[600px] rounded-full bg-cyan-500/[0.08] blur-[150px]" />

          <div className="absolute right-[5%] top-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/[0.08] blur-[160px]" />

          <div className="absolute bottom-[-300px] left-[35%] h-[650px] w-[650px] rounded-full bg-indigo-600/[0.06] blur-[170px]" />

          {/* Grid */}

          <div className="hero-grid absolute inset-0 opacity-20" />

        </div>

        <div className="container relative z-10">

          <div className="grid min-h-[calc(100vh-80px)] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-10">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="max-w-[720px]">

              {/* Eyebrow */}

              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-400/10 bg-cyan-400/[0.04] px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

                <span className="text-xs font-medium tracking-wide text-gray-400">
                  Product engineering studio
                </span>

              </div>


              {/* =================================================
                  DESKTOP / TABLET POSITIONING COPY
              ================================================= */}

              <div className="home-positioning-copy">

                <h1 className="font-display text-[42px] font-semibold leading-[1] tracking-[-0.035em] sm:text-[52px] lg:text-[60px] xl:text-[66px]">

                  <span className="block">
                    In-House Products.
                  </span>

                  <span className="block">
                    Custom Client
                  </span>

                  <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                    Solutions.
                  </span>

                </h1>

                <p className="mt-8 max-w-[620px] text-[16px] leading-7 text-gray-400 sm:text-[17px]">
                  Omnivera is a technology company building its own software
                  products while creating bespoke digital solutions for
                  ambitious businesses. From product engineering to automation,
                  we turn ideas into scalable technology.
                </p>

              </div>


              {/* =================================================
                  MOBILE DEVELOPMENT STATE

                  This is deliberately wrapped so the gear
                  cannot appear on desktop/tablet.
              ================================================= */}

              <div className="mobile-development-gear">
                <DevelopmentGear />
              </div>


              {/* =================================================
                  CTA
              ================================================= */}

              <div className="mt-9 flex flex-wrap gap-3">

                <Link
                  to="/contact-us"
                  className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-4 font-medium text-white shadow-[0_10px_50px_rgba(14,165,233,0.2)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_70px_rgba(14,165,233,0.35)]"
                >
                  Innovate with Omnivera

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>


                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-7 py-4 text-gray-200 transition hover:bg-white/[0.05]"
                >
                  Explore Products

                  <ArrowRight size={16} />
                </Link>

              </div>


              {/* =================================================
                  SMALL STATS
              ================================================= */}

              <div className="mt-12 flex flex-wrap gap-8 border-t border-white/[0.07] pt-7">

                <div>

                  <p className="font-display text-xl font-semibold">
                    Products
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Built in-house
                  </p>

                </div>


                <div>

                  <p className="font-display text-xl font-semibold">
                    Custom
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Client solutions
                  </p>

                </div>


                <div>

                  <p className="font-display text-xl font-semibold">
                    AI
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Automation ready
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT VISUAL
            ================================================= */}

            <div className="relative hidden min-h-[620px] lg:block">

              {/* Orb */}

              <div className="absolute left-[20%] top-[5%] h-[130px] w-[130px] rotate-[18deg] rounded-[35%] bg-gradient-to-br from-white/60 via-cyan-200/20 to-blue-500/10 shadow-[0_0_100px_rgba(34,211,238,0.15)]" />


              {/* Main device */}

              <div className="absolute right-[8%] top-[12%] h-[510px] w-[390px] rotate-[12deg] rounded-[45px] border-[8px] border-gray-700/70 bg-gradient-to-br from-gray-800 to-gray-950 shadow-[0_50px_120px_rgba(0,0,0,0.65)]">

                <div className="absolute inset-[8px] overflow-hidden rounded-[36px] bg-[#07101c]">

                  {/* Screen glow */}

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(34,211,238,0.16),transparent_38%),radial-gradient(circle_at_75%_80%,rgba(37,99,235,0.2),transparent_45%)]" />

                  <div className="relative p-7">

                    {/* Top buttons */}

                    <div className="mb-10 flex gap-3">

                      <span className="h-3 w-16 rounded-full bg-white/20" />

                      <span className="h-3 w-12 rounded-full border border-white/20" />

                      <span className="h-3 w-12 rounded-full border border-white/20" />

                    </div>


                    {/* UI panel */}

                    <div className="relative h-[180px] overflow-hidden rounded-xl border border-cyan-300/20">

                      <div className="absolute left-6 right-6 top-10 h-px bg-cyan-300/30" />

                      <div className="absolute left-6 right-6 top-20 h-px bg-cyan-300/20" />

                      <div className="absolute left-6 right-6 top-32 h-px bg-cyan-300/20" />


                      {/* Graph */}

                      <div className="absolute bottom-7 left-8 right-8 flex h-[90px] items-end gap-3">

                        {[30, 55, 40, 75, 50, 90, 60, 78].map(
                          (height, index) => (
                            <span
                              key={index}
                              className="w-2 rounded-t bg-gradient-to-t from-blue-600 to-cyan-300"
                              style={{
                                height: `${height}%`,
                              }}
                            />
                          )
                        )}

                      </div>

                    </div>


                    {/* Fake content */}

                    <div className="mt-8 space-y-3">

                      <div className="h-3 w-[80%] rounded-full bg-white/10" />

                      <div className="h-3 w-[55%] rounded-full bg-white/10" />

                      <div className="h-3 w-[68%] rounded-full bg-cyan-300/10" />

                    </div>

                  </div>

                </div>

              </div>


              {/* Floating Product card */}

              <div className="absolute left-[0%] top-[36%] w-[210px] rounded-xl border border-cyan-300/20 bg-[#0a1523]/90 p-5 shadow-2xl backdrop-blur-xl">

                <div className="mb-4 flex h-[45px] items-end gap-1">

                  {[30, 50, 35, 70, 55, 90, 62, 75].map(
                    (height, index) => (
                      <span
                        key={index}
                        className="w-[6px] rounded-t bg-gradient-to-t from-blue-600 to-cyan-300"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    )
                  )}

                </div>

                <p className="text-sm font-semibold">
                  Product Studio
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  PMS • POS • SaaS • AI
                </p>

              </div>


              {/* Client card */}

              <div className="absolute right-[-1%] top-[28%] w-[215px] rounded-xl border border-white/10 bg-[#0a101c]/90 p-5 backdrop-blur-xl">

                <p className="text-sm font-semibold">
                  Client Solutions
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Web • Mobile • Automation
                </p>

              </div>


              {/* Edge card */}

              <div className="absolute bottom-[8%] right-[5%] w-[255px] rounded-xl border border-cyan-300/15 bg-[#0a1523]/90 p-5 backdrop-blur-xl">

                <p className="text-sm font-semibold">
                  The Omnivera Edge
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">

                  <span>Ideas</span>

                  <ArrowRight
                    size={13}
                    className="text-cyan-300"
                  />

                  <span>Products</span>

                  <ArrowRight
                    size={13}
                    className="text-cyan-300"
                  />

                  <span>Impact</span>

                </div>

              </div>


              {/* Light beams */}

              <div className="absolute left-[-5%] top-[47%] h-[80px] w-[650px] rotate-[-7deg]">

                <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]" />

                <div className="absolute left-[10%] right-0 top-[30%] h-px rotate-[3deg] bg-blue-400/60" />

                <div className="absolute left-[25%] right-[-10%] top-[70%] h-px rotate-[-4deg] bg-cyan-300/40" />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          POSITIONING
      ===================================================== */}

      <Positioning />


      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section className="border-t border-white/[0.07] py-20 lg:py-28">

        <div className="container">

          <div className="max-w-2xl">

            <p className="eyebrow">
              What we build
            </p>

            <h2 className="mt-3.5 font-display text-[32px] leading-tight sm:text-[40px] lg:text-[48px]">
              Technology designed around real business problems.
            </h2>

          </div>


          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {capabilities.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05]">

                    <Icon
                      size={20}
                      className="text-cyan-300"
                    />

                  </div>

                  <h3 className="mt-6 font-display text-[17px] font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>

                </div>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK LINKS
      ===================================================== */}

      <section className="border-t border-white/[0.07] py-16 lg:py-24">

        <div className="container">

          <p className="eyebrow">
            Explore Omnivera
          </p>

          <h2 className="mt-3.5 font-display text-[28px] leading-tight sm:text-[32px] lg:text-[38px]">
            Everything you need to know
          </h2>


          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {tiles.map((t) => (

              <Link
                key={t.to}
                to={t.to}
                className="group flex flex-col gap-2.5 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20"
              >

                <div className="flex items-center justify-between">

                  <span className="font-display text-[16.5px] font-semibold">
                    {t.label}
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-gray-600 transition group-hover:text-cyan-300"
                  />

                </div>

                <span className="text-[14px] leading-6 text-gray-500">
                  {quickLinkCopy[t.to]}
                </span>

              </Link>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}