import { useParams, Link } from "react-router";
import { ArrowUpRight, ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "../constants/data";

export default function ProjectDetail({ t, dark }) {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div
        style={{
          flex: 1,
          paddingTop: 120,
          paddingBottom: 120,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: t.text,
          }}
        >
          Project not found.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.accent,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <ArrowLeft size={12} /> Back home
        </Link>
      </div>
    );
  }

  return (
    <main
      className="main-content"
      style={{ flex: 1, paddingTop: 80, paddingBottom: 120, minWidth: 0 }}
    >
      {/* Back link */}
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: t.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 40,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
        onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
      >
        <ArrowLeft size={12} /> Back to projects
      </Link>

      {/* Hero image */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 36,
          border: `1px solid ${t.border}`,
          position: "relative",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            aspectRatio: "16/7",
            objectFit: "cover",
            display: "block",
            filter: dark ? "brightness(0.8)" : "brightness(0.95)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${dark ? "rgba(10,10,15,0.6)" : "rgba(248,248,252,0.4)"} 0%, transparent 50%)`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Header row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 32,
              fontWeight: 800,
              color: t.text,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            {project.title}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{ display: "flex", align: "center", gap: 12, flexShrink: 0 }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.muted,
            }}
          >
            ★ {project.stars}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 20px",
              background: t.accent,
              color: dark ? "#0a0a0f" : "#ffffff",
              borderRadius: 8,
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.04em",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "none";
            }}
          >
            <ExternalLink size={13} /> View on GitHub
          </a>
        </div>
      </div>

      {/* Description */}
      <div style={{ maxWidth: 640 }}>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: t.muted }}>
          {project.longDesc}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: t.border, margin: "40px 0" }} />

      {/* Other projects */}
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: t.muted,
          marginBottom: 20,
        }}
      >
        Other Projects
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {projects
          .filter((p) => p.id !== id)
          .map((p) => (
            <Link
              key={p.id}
              to={`/project/${p.id}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                borderRadius: 10,
                border: `1px solid transparent`,
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.border;
                e.currentTarget.style.background = t.surface;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: 3,
                  }}
                >
                  {p.title}
                </p>
                <div style={{ display: "flex", gap: 5 }}>
                  {p.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight
                size={15}
                style={{ color: t.muted, flexShrink: 0 }}
              />
            </Link>
          ))}
      </div>
    </main>
  );
}
