import { Sun, Moon, Menu, X } from "lucide-react";
import { NAV } from "../constants/theme";

export default function MobileHeader({
  t,
  dark,
  setDark,
  activeSection,
  scrollTo,
  menuOpen,
  setMenuOpen,
}) {
  return (
    <>
      <div className="mobile-header">
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          <span style={{ color: t.accent }}>eric</span>
          <span style={{ color: t.muted }}>@dev</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Sun size={12} style={{ color: t.muted }} />
            <button
              className="theme-btn"
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
            >
              <span className="theme-thumb" />
            </button>
            <Moon size={12} style={{ color: t.muted }} />
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: t.text,
              padding: 6,
              borderRadius: 8,
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {NAV.map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="mobile-nav-link"
            style={{ color: activeSection === id ? t.accent : t.muted }}
          >
            {activeSection === id ? "▸ " : "  "}
            {id}
          </button>
        ))}
      </div>
    </>
  );
}
