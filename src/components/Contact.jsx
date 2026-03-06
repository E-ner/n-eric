import { useState } from "react";
import { Mail } from "lucide-react";

export default function Contact({ t, dark }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formFocus, setFormFocus] = useState(null);
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus("sending");
    try {
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch {
      setFormStatus("error");
    }
  };

  const field = (id, label, type = "input", placeholder = "") => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={`contact-${id}`}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: t.muted,
        }}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={`contact-${id}`}
          rows={5}
          placeholder={placeholder}
          value={formData[id]}
          onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
          style={inputStyle(t, dark, formFocus === id)}
          onFocus={() => setFormFocus(id)}
          onBlur={() => setFormFocus(null)}
        />
      ) : (
        <input
          id={`contact-${id}`}
          type={type}
          placeholder={placeholder}
          value={formData[id]}
          onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
          style={inputStyle(t, dark, formFocus === id)}
          onFocus={() => setFormFocus(id)}
          onBlur={() => setFormFocus(null)}
        />
      )}
    </div>
  );

  return (
    <section id="contact" style={{ marginBottom: 40, scrollMarginTop: 72 }}>
      <p className="section-title">Contact</p>

      <div
        className="contact-box"
        style={{
          border: `1px solid ${t.border}`,
          borderRadius: 16,
          padding: "40px 36px",
          background: t.surface,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${t.accentGlow} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: t.text,
            marginBottom: 8,
            letterSpacing: "-0.02em",
          }}
        >
          Let's build something.
        </h2>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.75,
            color: t.muted,
            maxWidth: 440,
            marginBottom: 32,
          }}
        >
          Open to new roles, freelance projects, and interesting collaborations.
          My inbox is always open — I'll respond promptly.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 520,
          }}
        >
          {/* Name + Email row */}
          <div
            className="form-row"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {field("name", "Name", "text", "Jonathan Louis")}
            {field("email", "Email", "email", "you@email.com")}
          </div>
          {field("subject", "Subject", "text", "Job offer, collab, project…")}
          {field(
            "message",
            "Message",
            "textarea",
            "Tell me about your project or opportunity…",
          )}

          {/* Submit */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 4,
            }}
          >
            <button
              onClick={handleSubmit}
              disabled={formStatus === "sending"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                background:
                  formStatus === "sent"
                    ? dark
                      ? "#a6e3a1"
                      : "#16a34a"
                    : t.accent,
                color: dark ? "#0a0a0f" : "#ffffff",
                borderRadius: 8,
                fontFamily: "'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                border: "none",
                cursor: formStatus === "sending" ? "not-allowed" : "pointer",
                opacity: formStatus === "sending" ? 0.7 : 1,
                transition: "opacity 0.2s, transform 0.2s, background 0.3s",
              }}
              onMouseEnter={(e) => {
                if (formStatus !== "sending") {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "none";
              }}
            >
              <Mail size={14} />
              {formStatus === "sending"
                ? "Sending…"
                : formStatus === "sent"
                  ? "Message sent ✓"
                  : "Send Message"}
            </button>

            <a
              href="mailto:hello@yoursite.com"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: t.muted,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderBottom: "1px solid transparent",
                paddingBottom: 1,
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = t.accent;
                e.currentTarget.style.borderColor = t.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = t.muted;
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              or email directly →
            </a>
          </div>

          {formStatus === "error" && (
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#f38ba8",
                letterSpacing: "0.04em",
              }}
            >
              ✗ Something went wrong. Please try again or email directly.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function inputStyle(t, dark, focused) {
  return {
    background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    border: `1px solid ${focused ? t.accent : t.border}`,
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    color: t.text,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
    resize: "vertical",
  };
}
