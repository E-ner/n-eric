import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { projects } from "../constants/data";

export default function Projects({ t, dark }) {
  return (
    <section id="projects" style={{ marginBottom: 96, scrollMarginTop: 72 }}>
      <p className="section-title">Projects</p>

      <div
        className="projects-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
      >
        {projects.map((p) => (
          <div key={p.id} className="project-card">
            {/* Project image */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={p.image}
                alt={p.title}
                className="project-img"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, ${dark ? "rgba(10,10,15,0.7)" : "rgba(248,248,252,0.5)"} 0%, transparent 60%)`,
                  pointerEvents: "none",
                }}
              />
              {/* Star badge */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#fff",
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(6px)",
                  padding: "3px 8px",
                  borderRadius: 100,
                }}
              >
                ★ {p.stars}
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: "18px 20px 20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: t.text,
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </h3>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: t.muted,
                    transition: "color 0.2s",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
                  title="View on GitHub"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.7,
                  color: t.muted,
                  marginBottom: 14,
                }}
              >
                {p.desc}
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 5,
                  marginBottom: 14,
                }}
              >
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* View details link */}
              <Link
                to={`/project/${p.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: t.accent,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  borderBottom: "1px solid transparent",
                  paddingBottom: 1,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = t.accent)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "transparent")
                }
              >
                View details <ArrowUpRight size={11} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://github.com/e-ner"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginTop: 20,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: t.accent,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          borderBottom: "1px solid transparent",
          paddingBottom: 2,
          transition: "border-color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accent)}
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "transparent")
        }
      >
        All repos on GitHub <ArrowUpRight size={12} />
      </a>
    </section>
  );
}
