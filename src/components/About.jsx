import { skillGroups } from "../constants/data";

export default function About({ t, dark }) {
  return (
    <section id="about" style={{ marginBottom: 96, scrollMarginTop: 72 }}>
      <p className="section-title">About</p>

      {/* Bio */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontSize: 15,
          lineHeight: 1.85,
          color: t.muted,
        }}
      >
        <p>
          Hi, I'm <strong style={{ color: t.accentGrow }}>Eric</strong> — a
          backend-focused full-stack developer with over 4 years of experience.
          I specialize in designing scalable, secure, high-performance web
          applications. Using{" "}
          <span style={{ color: t.highlight, fontWeight: 500 }}>
            Node.js, TypeScript, NestJS, and Express
          </span>
          , I build clean, reliable APIs that solve real-world problems.
        </p>

        <p>
          On the frontend, I create modern interfaces with{" "}
          <span style={{ color: t.text, fontWeight: 500 }}>
            React and Next.js
          </span>
          , turning ideas into complete working applications. I'm experienced in
          developing modular REST APIs with guards, interceptors, and middleware
          to ensure security and maintainability. I focus on optimizing
          performance and ensuring production-grade reliability for all systems.
        </p>

        <p>
          Currently, I'm expanding my skill set by learning{" "}
          <span style={{ color: t.accent, fontWeight: 500 }}>Java</span> in the
          JVM ecosystem. I also contribute to open-source projects and mentor
          other developers, always aiming to build software that makes a
          positive impact.
        </p>
      </div>

      {/* Skills */}
      <div style={{ marginTop: 48 }}>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: t.muted,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          Skills
          <span
            style={{
              flex: 1,
              height: 1,
              background: t.border,
              display: "block",
            }}
          />
        </p>

        <div
          className="skills-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          {skillGroups.map((group) => (
            <div key={group.label} className="skill-group">
              <div style={{ marginBottom: 16 }}>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.text,
                    marginBottom: 3,
                  }}
                >
                  {group.label}
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.08em",
                    color: t.muted,
                    textTransform: "uppercase",
                  }}
                >
                  {group.desc}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {group.skills.map((s) => {
                  const Icon = s.icon;
                  const dots = Math.round(s.level / 20);
                  return (
                    <div key={s.name} className="skill-pill">
                      <Icon
                        size={12}
                        style={{ color: s.color, flexShrink: 0 }}
                      />
                      <span className="skill-pill-name">{s.name}</span>
                      <div className="skill-dot-row">
                        {[1, 2, 3, 4, 5].map((d) => (
                          <div
                            key={d}
                            className="skill-dot"
                            style={{
                              background:
                                d <= dots
                                  ? s.color
                                  : dark
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(0,0,0,0.1)",
                              opacity: d <= dots ? 1 : 0.4,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: t.muted,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {[
            { label: "Learning", filled: 1 },
            { label: "Proficient", filled: 3 },
            { label: "Mastered", filled: 5 },
          ].map(({ label, filled }) => (
            <span
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <span style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map((d) => (
                  <span
                    key={d}
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      display: "inline-block",
                      background:
                        d <= filled
                          ? t.accent
                          : dark
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                    }}
                  />
                ))}
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
