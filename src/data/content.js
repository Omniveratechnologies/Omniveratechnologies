// EDITABLE: Core company info, nav labels, hero copy, and contact copy.

export const company = {
  name: "Omnivera",
  legalName: "Omniware Technologies Private Limited",
  tagline: "We build software. Then we build yours.",
  email: "contact@omniveratechnologies.com",
  phone: "+91 7003219541",
  address: " 63 G Christopher Road , Kolkata, West Bengal, India",
  social: {
    linkedin: "https://www.linkedin.com/company/omnivera-technologies-pvt-ltd/",
    twitter: "https://twitter.com/omniveratech",
    Instagram: "https://www.instagram.com/_omnivera?srtk=ZGgzdGRrdHV6dDJh&utm_source=qr",
  },
};

// Sidebar navigation, in the order requested. `end` marks exact-path
// matching for the active-link highlight (used for the Home route).
export const nav = [
  { label: "Home", to: "/", end: true, icon: "home" },
  { label: "Product", to: "/products", icon: "product" },
  { label: "Services", to: "/services", icon: "services" },
  { label: "About Omnivera", to: "/about-us", icon: "about" },
  { label: "Contact Us", to: "/contact-us", icon: "contact" },
  { label: "Why Choose Omnivera", to: "/why-choose-us", icon: "star" },
  { label: "Company Profile", to: "/company-profile", icon: "profile" },
];

export const hero = {
  eyebrow: "Product engineering studio",
  headline: "Software products built in-house. Software solutions built for you.",
  sub:
    "Omnivera is a product and engineering company. We design our own software, and we bring the same product discipline to every system we build for our clients.",
  primaryCta: { label: "Explore Products", href: "/products" },
  secondaryCta: { label: "View Services", href: "/services" },
};

export const positioning = {
  heading: "One team, two disciplines",
  body:
    "Most technology partners only write code to a spec. We do that, and we also ship our own products end to end — from idea to interface to infrastructure. That means every client engagement is led by people who have felt the weight of owning a product in production, not just delivering a handoff.",
  pillars: [
    {
      title: "Product instincts",
      body: "We treat every client engagement like it's our own roadmap — questioning scope, protecting usability, and thinking past the first release.",
    },
    {
      title: "Engineering discipline",
      body: "Architecture, testing, and documentation are never an afterthought. What we build today is built to still make sense in three years.",
    },
    {
      title: "Long-term ownership",
      body: "We stay close after launch. Support, iteration, and scaling are part of the relationship, not a separate contract.",
    },
  ],
};

export const contact = {
  heading: "Have a product idea or a system to build?",
  sub: "Tell us where you're stuck and where you want to be. We'll reply within one business day.",
  formNote: "Submits to POST /api/contact via src/services/api.js — connect your Express backend to start receiving messages.",
};
