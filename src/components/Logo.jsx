/**
 * Brand mark — a chrome ring with an inner steel-blue crescent, echoing
 * the reference logo. Swap for an <img src="/logo.svg" /> if you land on
 * a final vector asset; the color tokens here (chrome + brand blue) are
 * shared with tailwind.config.js so they stay in sync with the rest of
 * the UI.
 */
export default function Logo({ size = 28, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-xl font-semibold ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="20" cy="20" r="17" stroke="url(#ring-outer)" strokeWidth="3.4" />
        <path
          d="M20 8.5a11.5 11.5 0 0 1 0 23"
          stroke="url(#ring-inner)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ring-outer" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F4F6F9" />
            <stop offset="0.55" stopColor="#B9C2CF" />
            <stop offset="1" stopColor="#2489B6" />
          </linearGradient>
          <linearGradient id="ring-inner" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#66BEE0" />
            <stop offset="1" stopColor="#164A63" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-chrome-200">
        omn<span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">ivera</span>
      </span>
    </span>
  );
}
