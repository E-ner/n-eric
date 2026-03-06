import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home({ t, dark }) {
  return (
    <main
      className="main-content"
      style={{ flex: 1, paddingTop: 80, paddingBottom: 120, minWidth: 0 }}
    >
      <About t={t} dark={dark} />
      <Experience t={t} />
      <Projects t={t} dark={dark} />
      <Contact t={t} dark={dark} />

      <footer style={{ paddingTop: 40, borderTop: `1px solid ${t.border}` }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.muted,
            letterSpacing: "0.08em",
          }}
        >
          © 2026 · Designed & built with care · Nsengiyumva Eric
        </p>
      </footer>
    </main>
  );
}
