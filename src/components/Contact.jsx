import { useState } from "react";
import { contact, company } from "../data/content";
import { submitContactForm } from "../services/api";

const initialForm = { name: "", company: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Wired to the MERN backend via src/services/api.js. Point
      // VITE_API_URL at your Express server and implement a matching
      // POST /api/contact route to start receiving these submissions.
      await submitContactForm(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <section className="py-14 sm:py-16" id="contact">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 rounded-l border border-line-strong bg-gradient-to-br from-brand-500/[0.07] to-violet-500/[0.05] p-7 sm:p-9 lg:grid-cols-2 lg:gap-14 lg:p-14">
          <div>
            <p className="eyebrow">Start a project</p>
            <h2 className="text-[26px] sm:text-[32px]">{contact.heading}</h2>
            <p className="mt-4 max-w-[40ch] text-[15.5px] text-fog">{contact.sub}</p>

            <div className="mt-8 flex flex-col gap-3.5">
              <div>
                <span className="mb-0.5 block text-[12.5px] text-fog-dim">Email</span>
                <a className="text-[14.5px] text-platinum" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </div>
              <div>
                <span className="mb-0.5 block text-[12.5px] text-fog-dim">Phone</span>
                <span className="text-[14.5px] text-platinum">{company.phone}</span>
              </div>
              <div>
                <span className="mb-0.5 block text-[12.5px] text-fog-dim">Studio</span>
                <span className="text-[14.5px] text-platinum">{company.address}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-3.5">
              <a
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line-strong text-[12px] text-fog transition-colors duration-200 ease-brand hover:border-brand-300 hover:text-platinum"
                href={company.social.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                in
              </a>
              <a
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line-strong text-[12px] text-fog transition-colors duration-200 ease-brand hover:border-brand-300 hover:text-platinum"
                href={company.social.twitter}
                aria-label="Twitter / X"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
              <a
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line-strong text-[12px] text-fog transition-colors duration-200 ease-brand hover:border-brand-300 hover:text-platinum"
                href={company.social.Instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                Ig
              </a>
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-fog" htmlFor="name">Name</label>
                <input
                  className="rounded-s border border-line-strong bg-[#060a12]/50 px-3.5 py-3 text-[14.5px] text-platinum transition-colors duration-200 ease-brand focus:border-brand-300 focus:outline-none"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-fog" htmlFor="company">Company</label>
                <input
                  className="rounded-s border border-line-strong bg-[#060a12]/50 px-3.5 py-3 text-[14.5px] text-platinum transition-colors duration-200 ease-brand focus:border-brand-300 focus:outline-none"
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company name"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-fog" htmlFor="email">Email</label>
              <input
                className="rounded-s border border-line-strong bg-[#060a12]/50 px-3.5 py-3 text-[14.5px] text-platinum transition-colors duration-200 ease-brand focus:border-brand-300 focus:outline-none"
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-fog" htmlFor="message">What are you looking to build?</label>
              <textarea
                className="min-h-[96px] resize-y rounded-s border border-line-strong bg-[#060a12]/50 px-3.5 py-3 text-[14.5px] text-platinum transition-colors duration-200 ease-brand focus:border-brand-300 focus:outline-none"
                id="message"
                name="message"
                placeholder="Tell us about your product or project"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary btn-block disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            {status === "success" && (
              <p className="text-[13px] text-brand-300">Thanks — your message is on its way. We'll reply within one business day.</p>
            )}
            {status === "error" && (
              <p className="text-[13px] text-red-400">
                Couldn't reach the server. Once the backend is live at the URL in your .env, this form will work end to end.
              </p>
            )}

            <p className="-mt-1 text-[12.5px] text-fog-dim">{contact.formNote}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
