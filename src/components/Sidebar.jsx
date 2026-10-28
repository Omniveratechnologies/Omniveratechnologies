import logo from "../public/Images/logo.png";
import { NavLink } from "react-router-dom";
import NavIcon from "./NavIcon";
import { nav } from "../data/content";
import { LogIn } from "lucide-react";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside
        className={`
          sidebar
          ${open ? "sidebar-open" : ""}
          flex
          flex-col
          bg-[#05070d]
          border-r
          border-white/[0.07]
        `}
        aria-label="Primary navigation"
      >
        {/* =====================================================
            LOGO
        ====================================================== */}
        <div className="sidebar-logo-wrap">
          <NavLink
            to="/"
            onClick={onClose}
            aria-label="Omnivera home"
            className="flex items-center justify-center w-full"
          >
            <img
  src={logo}
  alt="Omnivera"
  className="sidebar-logo"
/>
          </NavLink>
        </div>

        {/* =====================================================
            NAVIGATION LABEL
        ====================================================== */}
        <div className="sidebar-label">
          Navigation
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <nav className="sidebar-nav">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon">
                <NavIcon name={item.icon} />
              </span>

              <span className="truncate">
                {item.label}
              </span>

              <span className="nav-active-dot" />
            </NavLink>
          ))}
        </nav>

        {/* =====================================================
            SIDEBAR BOTTOM
        ====================================================== */}
        <div className="sidebar-bottom">
          <NavLink to="/login" onClick={onClose} className="sidebar-account-link">
            <LogIn size={18} />
            <span>My Account</span>
          </NavLink>

          {/* Project card */}
          <div className="sidebar-project-card">
            <div className="project-card-icon">
              ↗
            </div>

            <div className="min-w-0">
              <strong>
                Ready to build?
              </strong>

              <span>
                Let's make it real.
              </span>
            </div>
          </div>

          {/* CTA */}
          <NavLink
            to="/contact-us"
            onClick={onClose}
            className="sidebar-cta"
          >
            <span>
              Start a Project
            </span>

            <span aria-hidden="true">
              →
            </span>
          </NavLink>

          {/* Quote */}
          <p className="sidebar-quote">
            “Technology should solve problems,
            not create more of them.”
          </p>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {open && (
        <div
          className="
            sidebar-overlay
            lg:hidden
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-sm
          "
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}
