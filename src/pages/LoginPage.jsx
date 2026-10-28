import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, UserRound, Eye, EyeOff } from "lucide-react";
import Logo from "../components/Logo";
import { api } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault(); setError(""); setBusy(true);
    try {
      const payload = mode === "register"
        ? { name: name.trim(), email: email.trim().toLowerCase(), password }
        : { identifier: (username || email).trim(), password };
      const { data } = await api.post(mode === "register" ? "/auth/register" : "/auth/login", payload);
      localStorage.setItem("omnivera-auth-token", data.token);
      localStorage.setItem("omnivera-studio-user", JSON.stringify(data.user));
      navigate(data.user.role === "admin" ? "/studio/admin" : "/studio", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not connect to the server. Check that the backend is running.");
    } finally { setBusy(false); }
  }

  return <main className="studio-login-shell">
    <div className="studio-login-glow studio-login-glow-one" /><div className="studio-login-glow studio-login-glow-two" />
    <section className="studio-login-panel"><Link to="/" className="studio-login-brand"><Logo size={36} /></Link><p className="studio-kicker">OMNIVERA STUDIO</p><h1>Your work, one clear view.</h1><p className="studio-login-copy">Track project work, requests, files, and updates from the Omnivera team in one secure workspace.</p><div className="studio-login-trust"><ShieldCheck size={18} /> Secure account access</div></section>
    <section className="studio-login-card">
      <div><p className="studio-kicker">{mode === "login" ? "WELCOME BACK" : "GET STARTED"}</p><h2>{mode === "login" ? "Sign in to Studio" : "Create your account"}</h2><p className="studio-muted">{mode === "login" ? "Sign in with your account email or admin username." : "Create a client account to access your workspace."}</p></div>
      <div className="studio-auth-tabs"><button type="button" className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setError(""); }}>Sign in</button><button type="button" className={mode === "register" ? "active" : ""} onClick={() => { setMode("register"); setError(""); }}>Create account</button></div>
      <form onSubmit={submit} className="studio-form">
        {mode === "register" && <label>Full name<span className="studio-field"><UserRound size={17} /><input required value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="Your full name" /></span></label>}
        {mode === "login" ? <label>Email or admin username<span className="studio-field"><Mail size={17} /><input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" placeholder="you@company.com or admin" /></span></label> : <label>Email address<span className="studio-field"><Mail size={17} /><input required type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" placeholder="you@company.com" /></span></label>}
        <label>Password<span className="studio-field"><LockKeyhole size={17} /><input required minLength={8} value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="At least 8 characters" /><button className="studio-password-toggle" type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></span></label>
        {error && <p role="alert" className="studio-form-error">{error}</p>}
        <button className="studio-submit" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"} <ArrowRight size={18} /></button>
      </form>
      <p className="studio-help">{mode === "login" ? <>New to Omnivera? <button className="studio-inline-link" onClick={() => { setMode("register"); setError(""); }}>Create an account</button></> : <>Already registered? <button className="studio-inline-link" onClick={() => { setMode("login"); setError(""); }}>Sign in</button></>}</p>
      <p className="studio-security-note">Admin access is verified by the server. Selecting a role in the browser cannot grant admin privileges.</p>
    </section>
  </main>;
}
