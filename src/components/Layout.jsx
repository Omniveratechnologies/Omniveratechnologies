import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isStudio = location.pathname === "/login" || location.pathname.startsWith("/studio");

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  if (isStudio) return <Outlet />;

  return (
    <div className="min-h-screen bg-ink text-platinum selection:bg-brand-400/30">
      {/* Global background effects */}
      <div className="site-noise" aria-hidden="true" />
      <div className="site-orb site-orb-one" aria-hidden="true" />
      <div className="site-orb site-orb-two" aria-hidden="true" />

      {/* Desktop sidebar */}
      <Sidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main application area */}
      <div className="app-main-area">

        {/* Mobile fixed header */}
        <header
  className="mobile-header lg:hidden"
  aria-label="Mobile header"
>
  <img
    src="/Images/logo.png"
    alt="Omnivera"
    className="mobile-header-logo"
  />
</header>

        {/* Page content */}
        <main className="relative z-10 min-h-screen mobile-page-shell">
          <Outlet />
          <Footer />
        </main>

      </div>

      {/* Keep the bottom navigation outside the scrolling app content so it
          remains fixed to the viewport while only the page content scrolls. */}
      <MobileBottomNav />
    </div>
  );
}
