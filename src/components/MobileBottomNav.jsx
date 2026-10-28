import { NavLink } from "react-router-dom";
import { Home, Package, BriefcaseBusiness, UserRound } from "lucide-react";

const items = [
  { label: "Home", to: "/", end: true, Icon: Home },
  { label: "Product", to: "/products", Icon: Package },
  { label: "Services", to: "/services", Icon: BriefcaseBusiness },
  { label: "My Account", to: "/login", Icon: UserRound },
];

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {items.map(({ label, to, end, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `mobile-bottom-nav-item ${isActive ? "is-active" : ""}`
          }
          aria-label={label}
        >
          <span className="mobile-bottom-nav-icon">
            <Icon size={19} strokeWidth={2} />
          </span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
