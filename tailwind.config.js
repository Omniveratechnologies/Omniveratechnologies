/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1180px" },
    },
    extend: {
      colors: {
        // Background layers — deep ink/navy, matched to the logo's dark backdrop.
        ink: "#05070c",
        navy: "#0a0e18",
        slate: "#111827",

        // Chrome / silver — the metallic ring + "omn" of the wordmark.
        chrome: {
          50: "#f7f9fb",
          100: "#eceff3",
          200: "#d7dde5",
          300: "#b9c2cf",
          400: "#94a0b1",
          500: "#727f92",
          600: "#556275",
          700: "#404b5c",
          800: "#2a3341",
        },

        // Brand blue — sampled from the "ivera" gradient in the logo mark.
        brand: {
          50: "#eaf6fc",
          100: "#cdeaf6",
          200: "#9bd7ee",
          300: "#66bee0",
          400: "#3fa4cd",
          500: "#2489b6",
          600: "#1a6f95",
          700: "#175a79",
          800: "#164a63",
          900: "#123c50",
          950: "#0b2634",
        },

        // Secondary accent kept for product differentiation (violet card).
        violet: {
          400: "#a78bfa",
          500: "#8b7cf6",
          600: "#7c6bef",
        },

        platinum: "#e9edf6",
        fog: "#8b93a9",
        "fog-dim": "#5c6478",
        line: "rgba(233, 238, 250, 0.09)",
        "line-strong": "rgba(233, 238, 250, 0.16)",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
        display: ["Inter", "Segoe UI", "sans-serif"],
        body: ["Inter", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        s: "6px",
        m: "10px",
        l: "18px",
      },
      boxShadow: {
        glow: "0 8px 24px -8px rgba(36, 137, 182, 0.55)",
        "glow-lg": "0 12px 30px -8px rgba(36, 137, 182, 0.7)",
        panel: "0 40px 70px -30px rgba(0,0,0,0.7)",
        modal: "0 60px 120px -40px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "app-glow":
          "radial-gradient(760px 480px at 14% 6%, rgba(36,137,182,0.18), transparent 60%), radial-gradient(620px 420px at 88% 30%, rgba(139,124,246,0.10), transparent 60%), linear-gradient(180deg, #060a10 0%, #0a0e18 40%, #070b13 100%)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
