export function buildCss(t, dark) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 2px; }
    a { color: inherit; text-decoration: none; }
    ::selection { background: ${t.accentGlow}; color: ${t.accent}; }

    .fade-in { animation: fadeIn 0.6s ease forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }

    .nav-link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
      color: ${t.muted}; background: none; border: none; cursor: pointer;
      padding: 0; transition: color 0.2s; display: flex; align-items: center;
      gap: 8px; text-align: left;
    }
    .nav-link::before {
      content: ''; display: block; height: 1px; width: 24px;
      background: ${t.muted}; transition: width 0.25s, background 0.2s; flex-shrink: 0;
    }
    .nav-link.active, .nav-link:hover { color: ${t.text}; }
    .nav-link.active::before, .nav-link:hover::before { width: 48px; background: ${t.text}; }

    .mobile-nav-link {
      font-family: 'JetBrains Mono', monospace; font-size: 11px;
      letter-spacing: 0.12em; text-transform: uppercase; background: none;
      border: none; cursor: pointer; padding: 10px 16px; border-radius: 8px;
      transition: color 0.2s, background 0.2s; text-align: left; width: 100%;
    }

    .tag {
      font-family: 'JetBrains Mono', monospace; font-size: 10px;
      letter-spacing: 0.08em; padding: 3px 10px; border-radius: 100px;
      background: ${t.accentGlow}; color: ${t.accent};
      border: 1px solid ${dark ? "rgba(137,180,250,0.2)" : "rgba(26,86,219,0.15)"};
      white-space: nowrap;
    }

    .card {
      border: 1px solid transparent; border-radius: 12px; padding: 24px;
      transition: border-color 0.2s, background 0.2s, transform 0.2s;
    }
    .card:hover { border-color: ${t.border}; background: ${t.surface}; transform: translateY(-2px); }

    .skill-group {
      border: 1px solid ${t.border}; border-radius: 14px; padding: 24px;
      background: ${t.surface}; transition: border-color 0.25s, box-shadow 0.25s;
    }


    .skill-pill {
      display: flex; align-items: center; gap: 7px; padding: 7px 12px;
      border-radius: 8px;
      background: ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"};
      border: 1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"};
      transition: background 0.2s, border-color 0.2s, transform 0.15s; cursor: default;
    }
    .skill-pill:hover {
      background: ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"};
      border-color: ${dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.13)"};
      transform: translateY(-1px);
    }
    .skill-pill-name {
      font-family: 'JetBrains Mono', monospace; font-size: 11px;
      letter-spacing: 0.04em; color: ${t.text}; white-space: nowrap;
    }
    .skill-dot-row { display: flex; gap: 3px; margin-left: auto; padding-left: 8px; flex-shrink: 0; }
    .skill-dot { width: 4px; height: 4px; border-radius: 50%; }

    .social-icon {
      color: ${t.muted}; transition: color 0.2s, transform 0.2s;
      cursor: pointer; text-decoration: none;
    }
    .social-icon:hover { color: ${t.text}; transform: translateY(-2px); }

    .section-title {
      font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
      letter-spacing: 0.15em; text-transform: uppercase; color: ${t.muted};
      margin-bottom: 32px; display: flex; align-items: center; gap: 12px;
    }
    .section-title::after { content: ''; flex: 1; height: 1px; background: ${t.border}; }

    .glow-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: ${t.green}; box-shadow: 0 0 8px ${t.green};
      animation: glowpulse 2s ease-in-out infinite; display: inline-block; flex-shrink: 0;
    }
    @keyframes glowpulse {
      0%, 100% { opacity: 1; box-shadow: 0 0 6px ${t.green}; }
      50% { opacity: 0.6; box-shadow: 0 0 16px ${t.green}; }
    }

    .hero-name {
      font-family: 'Syne', sans-serif; font-size: clamp(36px, 6vw, 56px);
      font-weight: 800; line-height: 1.05; letter-spacing: -0.03em; color: ${t.text};
    }

    .theme-btn {
      width: 38px; height: 22px; border-radius: 11px;
      border: 1px solid ${t.border}; background: ${t.surface};
      position: relative; cursor: pointer;
      transition: border-color 0.2s, background 0.2s; flex-shrink: 0;
    }
    .theme-thumb {
      position: absolute; top: 3px; width: 14px; height: 14px;
      border-radius: 50%; background: ${t.accent}; transition: left 0.2s;
      left: ${dark ? "20px" : "3px"};
    }

    /* Project card image */
    .project-card {
      border: 1px solid ${t.border}; border-radius: 14px;
      overflow: hidden; background: ${t.surface};
      transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    }

    .project-img {
      width: 100%; aspect-ratio: 16/9; object-fit: cover;
      display: block; filter: ${dark ? "brightness(0.75) saturate(0.8)" : "brightness(0.9)"};
      transition: filter 0.3s;
    }
    .project-card:hover .project-img {
      filter: ${dark ? "brightness(0.9) saturate(1)" : "brightness(1)"};
    }

    .mobile-header {
      display: none; position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: ${dark ? "rgba(10,10,15,0.95)" : "rgba(248,248,252,0.95)"};
      backdrop-filter: blur(12px); border-bottom: 1px solid ${t.border};
      height: 56px; align-items: center; justify-content: space-between; padding: 0 20px;
    }
    .mobile-nav {
      display: none; position: fixed; top: 56px; left: 0; right: 0; z-index: 99;
      background: ${dark ? "#0a0a0f" : "#f8f8fc"};
      border-bottom: 1px solid ${t.border};
      padding: 12px 8px; flex-direction: column; gap: 4px;
    }
    .mobile-nav.open { display: flex; }

    input::placeholder, textarea::placeholder { color: ${t.muted}; opacity: 0.6; }
    input, textarea { color-scheme: ${dark ? "dark" : "light"}; }

    @media (max-width: 1023px) {
      .mobile-header { display: flex; }
      .desktop-aside { display: none !important; }
      .main-content { padding-top: 80px !important; }
      .page-wrapper { padding: 0 20px !important; }
      .skills-grid { grid-template-columns: 1fr !important; }
      .projects-grid { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 640px) {
      .card { padding: 16px !important; }
      .exp-row { flex-direction: column !important; gap: 4px !important; }
      .exp-period { width: auto !important; }
      .contact-box { padding: 24px 20px !important; }
      .skill-group { padding: 18px !important; }
      .form-row { grid-template-columns: 1fr !important; }
    }
  `;
}
