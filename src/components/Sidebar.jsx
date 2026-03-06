import { Github, Linkedin, Mail, Sun, Moon } from "lucide-react";
import { NAV } from "../constants/theme";

export default function Sidebar({ t, dark, setDark, activeSection, scrollTo }) {
  return (
    <aside
      className="desktop-aside fade-in"
      style={{
        width: 320,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 40,
        paddingBottom: 60,
      }}
    >
      {/* Top */}
      <div>
        {/* Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.muted,
            letterSpacing: "0.1em",
          }}
        >
          <span className="glow-dot" />
          Available for work
        </div>

        {/* Name */}
        <h1 className="hero-name" style={{ marginBottom: 8 }}>
          N.
          <br />
          ERIC
        </h1>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: t.accent,
            marginBottom: 20,
            letterSpacing: "0.01em",
          }}
        >
          Full Stack Developer
        </p>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.75,
            color: t.muted,
            maxWidth: 280,
          }}
        >
          Specialized in backend engineering with NestJS, TypeScript, and
          Node.js, complemented by strong frontend expertise in React and
          Next.js
        </p>

        {/* Nav */}
        <nav
          style={{
            marginTop: 52,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {NAV.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`nav-link ${activeSection === id ? "active" : ""}`}
            >
              {id}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <a
            href="https://github.com/e-ner"
            target="_blank"
            rel="noreferrer"
            className="social-icon"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <a href="#" className="social-icon" title="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="mailto:hello@dev.com" className="social-icon" title="Email">
            <Mail size={18} />
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Sun size={13} style={{ color: t.muted }} />
          <button
            className="theme-btn"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
          >
            <span className="theme-thumb" />
          </button>
          <Moon size={13} style={{ color: t.muted }} />
        </div>
      </div>
    </aside>
  );
}
