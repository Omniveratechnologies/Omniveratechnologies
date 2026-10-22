import { Link } from "react-router-dom";
import { hero } from "../data/content";

function MiniIcon({ type }) {
  if (type === "cube") return <span className="mini-icon">◇</span>;
  if (type === "bolt") return <span className="mini-icon">ϟ</span>;
  return <span className="mini-icon">•••</span>;
}

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-topbar">
        <div className="hero-breadcrumb"><span className="pulse-dot" /> Product engineering studio</div>
        <div className="hero-top-links">
          <span>Build</span>
          <span>Innovate</span>
          <span>Deliver</span>
          <Link to="/contact-us" className="top-contact">Get in Touch <span>→</span></Link>
        </div>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>
            Software products built <span>in-house.</span><br />
            Solutions built <em>for you.</em>
          </h1>
          <p className="hero-sub">{hero.sub}</p>

          <div className="hero-actions">
            <Link className="btn btn-primary hero-primary" to={hero.primaryCta.href}>
              {hero.primaryCta.label} <span>→</span>
            </Link>
            <Link className="btn btn-ghost hero-secondary" to={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-grid" />
          <div className="visual-ring" />
          <div className="visual-glow" />

          <div className="visual-main-card">
            <div className="main-card-top">
              <LogoMark />
              <span>OMNIVERA / PRODUCT</span>
            </div>
            <div className="main-card-content">
              <span className="main-card-kicker">IDEAS → PRODUCTS → IMPACT</span>
              <strong>Build what<br />matters.</strong>
              <div className="chart"><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>

          <div className="floating-card card-build">
            <MiniIcon type="cube" />
            <div><strong>Build</strong><span>Scalable products</span></div>
          </div>
          <div className="floating-card card-solve">
            <MiniIcon type="bolt" />
            <div><strong>Solve</strong><span>Real problems</span></div>
          </div>
          <div className="floating-card card-create">
            <MiniIcon type="people" />
            <div><strong>Create</strong><span>Lasting impact</span></div>
          </div>

          <div className="visual-note">From idea to impact <span>↗</span></div>
        </div>
      </div>

      <div className="hero-stats">
        <Stat icon="◇" value="2+" label="Products in market" />
        <Stat icon="•••" value="40+" label="Client systems shipped" />
        <Stat icon="◷" value="6 yrs" label="Building software" />
        <Stat icon="☆" value="100%" label="Client focused" />
      </div>
    </section>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="hero-stat">
      <div className="stat-icon">{icon}</div>
      <div><strong>{value}</strong><span>{label}</span></div>
    </div>
  );
}

function LogoMark() {
  return <span className="logo-mark"><i /> omnivera</span>;
}
