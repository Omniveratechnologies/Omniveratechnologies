// Minimal, single-stroke icon set used only in the sidebar.
// Kept as one file so the visual weight of every icon stays consistent.

const common = {
  width: 19,
  height: 19,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const paths = {
  home: <path d="M4 11.5 12 4l8 7.5M6 9.8V20h5v-5h2v5h5V9.8" />,
  product: <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5ZM4 8l8 4.5M12 12.5V21M20 8l-8 4.5" />,
  services: <path d="M4 6h16M4 12h10M4 18h7M17 15l3 3-3 3" />,
  about: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v6M12 7.5v.01" />,
  contact: <path d="M4 6h16v12H4V6ZM4 6l8 7 8-7" />,
  star: <path d="M12 3.5 14.5 9l6 .6-4.5 4 1.3 5.9L12 16.7 6.7 19.5 8 13.6 3.5 9.6l6-.6L12 3.5Z" />,
  profile: <path d="M6 4h9l3 3v13H6V4ZM15 4v3h3M9 12h6M9 15.5h6" />,
};

export default function NavIcon({ name }) {
  return (
    <svg {...common} aria-hidden="true">
      {paths[name] || paths.home}
    </svg>
  );
}
