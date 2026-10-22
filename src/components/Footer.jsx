import Logo from "./Logo";
import { company } from "../data/content";

export default function Footer() {
  return (
    <footer className="container flex flex-wrap items-center justify-between gap-5 border-t border-line py-9 text-[12px] text-fog-dim">
      <Logo size={22} />
      <span>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</span>
    </footer>
  );
}
