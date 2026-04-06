import { Sun, Moon, Menu, X, ChevronLeft } from "lucide-react";
import { NAV } from "../constants/theme";
import { useLocation, useNavigate } from "react-router";

export default function MobileHeader({
  t,
  dark,
  setDark,
  activeSection,
  scrollTo,
  menuOpen,
  setMenuOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isBlog = location.pathname === "/blog";

  return (
    <>
      <div className="mobile-header">
        {/* Left: back button on blog, logo elsewhere */}
        {isBlog ? (
          <button
            onClick={() => navigate("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.muted,
              letterSpacing: "0.08em",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
          >
            <ChevronLeft size={13} />
            <span style={{ color: t.accent }}>eric</span>
            <span style={{ color: t.muted }}>@dev</span>
          </button>
        ) : (
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
        )}

        {/* Right: theme toggle + hamburger (hamburger hidden on blog) */}
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

          {/* Only show hamburger on portfolio pages */}
          {!isBlog && (
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
          )}
        </div>
      </div>

      {/* Dropdown nav — only renders on portfolio pages */}
      {!isBlog && (
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
      )}
    </>
  );
}
