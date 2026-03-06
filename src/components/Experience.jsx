import { ArrowUpRight } from "lucide-react";
import { experience } from "../constants/data";

export default function Experience({ t }) {
  return (
    <section id="experience" style={{ marginBottom: 96, scrollMarginTop: 72 }}>
      <p className="section-title">Experience</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {experience.map((exp) => (
          <div key={exp.role} className="card">
            <div className="exp-row" style={{ display: "flex", gap: 24 }}>
              <span
                className="exp-period"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: t.muted,
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  paddingTop: 3,
                  flexShrink: 0,
                  width: 110,
                }}
              >
                {exp.period}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: t.text,
                    }}
                  >
                    {exp.role} ·
                  </h3>
                  <a
                    href={exp.url}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: t.accent,
                    }}
                  >
                    {exp.company}
                    <ArrowUpRight size={13} style={{ flexShrink: 0 }} />
                  </a>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: t.muted,
                    marginBottom: 14,
                  }}
                >
                  {exp.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <a
        href="#"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginTop: 28,
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
        View Full Résumé <ArrowUpRight size={12} />
      </a>
    </section>
  );
}
