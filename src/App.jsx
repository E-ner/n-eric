import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router";
import { theme, NAV } from "./constants/theme";
import { buildCss } from "./constants/styles";
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog"; // ← add this

export default function App() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = dark ? theme.dark : theme.light;
  const location = useLocation();
  const isHome = location.pathname === "/";

  const updateActive = useCallback(() => {
    if (!isHome) return;
    const threshold = window.innerHeight * 0.4;
    let best = null;
    let bestDist = Infinity;
    for (const id of NAV) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= threshold) {
        const dist = threshold - top;
        if (dist < bestDist) {
          bestDist = dist;
          best = id;
        }
      }
    }
    if (!best) best = NAV[0];
    const scrollBottom = window.scrollY + window.innerHeight;
    if (scrollBottom >= document.documentElement.scrollHeight - 10)
      best = NAV[NAV.length - 1];
    setActiveSection(best);
  }, [isHome]);

  useEffect(() => {
    setMounted(true);
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const scrollTo = (id) => {
    if (!isHome) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  if (!mounted) return null;

  const isBlog = location.pathname === "/blog";

  return (
    <>
      <style>{buildCss(t, dark)}</style>
      <div
        style={{
          background: t.bg,
          color: t.text,
          minHeight: "100vh",
          transition: "background 0.3s, color 0.3s",
        }}
      >
        <MobileHeader
          t={t}
          dark={dark}
          setDark={setDark}
          activeSection={activeSection}
          scrollTo={scrollTo}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <div
          className="page-wrapper"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            gap: isBlog ? 0 : 80, // ← blog uses its own internal gap
          }}
        >
          {/* Hide portfolio sidebar on /blog — blog has its own */}
          {!isBlog && (
            <Sidebar
              t={t}
              dark={dark}
              setDark={setDark}
              activeSection={activeSection}
              scrollTo={scrollTo}
            />
          )}
          <Routes>
            <Route path="/blog" element={<Blog t={t} dark={dark} />} />
            <Route path="/" element={<Home t={t} dark={dark} />} />
            <Route
              path="/project/:id"
              element={<ProjectDetail t={t} dark={dark} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
