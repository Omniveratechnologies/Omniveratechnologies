import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import Logo from "../components/Logo";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function submit(event) {
    event.preventDefault();
    if (!email.trim() || !password) return setError("Enter your email and password to continue.");
    const isAdmin = email.trim().toLowerCase() === "admin@omnivera.studio" && password === "Studio@2026";
    localStorage.setItem("omnivera-studio-user", JSON.stringify({ name: isAdmin ? "Omnivera Admin" : email.split("@")[0], email, role: isAdmin ? "admin" : "customer" }));
    navigate("/studio");
  }
  return <main className="studio-login-shell">
    <div className="studio-login-glow studio-login-glow-one" /><div className="studio-login-glow studio-login-glow-two" />
    <section className="studio-login-panel"><Link to="/" className="studio-login-brand"><Logo size={36} /></Link><p className="studio-kicker">Omnivera Studio</p><h1>Your work, one clear view.</h1><p className="studio-login-copy">Track product work, invoices, requests, and every update from the Omnivera team.</p><div className="studio-login-trust"><ShieldCheck size={18} /> Secure client workspace</div></section>
    <section className="studio-login-card"><div><p className="studio-kicker">Welcome back</p><h2>Sign in to Studio</h2><p className="studio-muted">Use the email connected to your Omnivera project.</p></div><form onSubmit={submit} className="studio-form"><label>Email address<span className="studio-field"><Mail size={17} /><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com" autoComplete="email" /></span></label><label>Password<span className="studio-field"><LockKeyhole size={17} /><input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" autoComplete="current-password" /></span></label>{error && <p className="studio-form-error">{error}</p>}<button className="studio-submit" type="submit">Open Studio <ArrowRight size={18} /></button></form><p className="studio-help">Need access? <Link to="/contact-us">Talk to our team</Link></p></section>
  </main>;
}
