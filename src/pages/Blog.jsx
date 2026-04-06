import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Server,
  ShieldCheck,
  Layers,
  Container,
  Database,
  Palette,
  Briefcase,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  Rss,
  FileSearch,
  ChevronLeft,
} from "lucide-react";

// ── POSTS DATA ──────────────────────────────────────────────────────────────
const POSTS = [
  {
    id: "api-gateway",
    category: "Backend",
    catColor: null,
    date: "Apr 02, 2026",
    readTime: "8 min",
    featured: true,
    Icon: Server,
    title: "Building a 50M req/day API Gateway with Node.js and Redis",
    desc: "How I architected a high-throughput API gateway — covering rate limiting, JWT verification caching, and the WebSocket layer that powers real-time dashboards.",
    body: `<p>When we first started seeing traffic spikes that broke our monolithic Express server, I knew we had to rethink our architecture from the ground up. This post covers the entire journey — from identifying bottlenecks to shipping a production gateway that now handles over 50 million requests every day.</p>
<h2>The Problem</h2>
<p>Our original setup was a single Express instance behind Nginx. At 1M req/day it was fine. At 10M we saw timeouts. At 20M the service was crashing under memory pressure.</p>
<pre>// The old bottleneck
app.use('/api', (req, res, next) => {
  verifyJWT(req.headers.authorization); // blocking!
  rateLimitCheck(req.ip);               // db call!
  next();
});</pre>
<h2>The Redis Layer</h2>
<p>We moved all rate limiting state into Redis using sliding window counters. A single INCR + EXPIRE pipeline is sub-millisecond and non-blocking. JWT verification results are cached with a short TTL. Middleware overhead dropped from 12ms to under 0.8ms.</p>
<h2>Result</h2>
<p>99.98% uptime over the last quarter, P99 latency under 40ms, and a system that scales horizontally by just adding nodes to the cluster.</p>`,
  },
  {
    id: "jwt-vs-session",
    category: "Backend",
    catColor: null,
    date: "Mar 18, 2026",
    readTime: "5 min",
    featured: false,
    Icon: ShieldCheck,
    title: "JWT vs Session Auth — When to choose which",
    desc: "A practical deep-dive into stateless vs stateful auth, with real-world trade-offs for scaling distributed systems.",
    body: `<p>This is probably the most common architecture question I get. The short answer: it depends on your deployment topology.</p>
<h2>Sessions: Simple and battle-tested</h2>
<p>If you're running a single-origin app with sticky sessions or a shared Redis session store, sessions are usually the right call. They're instantly revocable and easy to audit.</p>
<h2>JWTs: Right for distributed systems</h2>
<p>When your API serves mobile clients or microservices without a shared session store, JWTs shine. They carry their own claims and are verifiable by any service with your public key.</p>
<pre>const payload = jwt.verify(token, PUBLIC_KEY, {
  algorithms: ['RS256']
});
// payload.sub, payload.roles — all there</pre>
<p>The catch: you can't revoke them without a blocklist. Short expiry (15 min) + refresh token rotation is the practical answer most teams land on.</p>`,
  },
  {
    id: "nextjs-ssr",
    category: "Frontend",
    catColor: "highlight",
    date: "Mar 05, 2026",
    readTime: "7 min",
    featured: false,
    Icon: Layers,
    title: "Next.js App Router: SSR patterns that actually scale",
    desc: "Moving beyond the basics — streaming, partial pre-rendering, and cache invalidation strategies I've learned the hard way.",
    body: `<p>The App Router was a paradigm shift. After six months in production, here are the patterns that held up under real load.</p>
<h2>Streaming for perceived performance</h2>
<p>Wrapping slow data fetches in Suspense boundaries lets the shell render immediately. Users see something in under 200ms even when the underlying query takes 800ms.</p>
<h2>Cache invalidation that makes sense</h2>
<p>Tag cache entries by the data they depend on, not by the route that uses them. A product page might pull from three tags — invalidate one, only that slice re-fetches.</p>
<pre>fetch('/api/products', { next: { tags: ['products'] } });
// In a server action:
revalidateTag('products');</pre>`,
  },
  {
    id: "docker-deploys",
    category: "DevOps",
    catColor: "green",
    date: "Feb 20, 2026",
    readTime: "6 min",
    featured: false,
    Icon: Container,
    title: "Zero-downtime deploys with Docker & GitHub Actions",
    desc: "The CI/CD pipeline setup that cut our deployment time by 60% — with blue-green strategy and health-check rollbacks.",
    body: `<p>Before this setup, every deploy was a nervous moment. Services would briefly return 503s and engineers would get paged. Here's the full pipeline that eliminated that entirely.</p>
<h2>Blue-green with Docker Compose</h2>
<p>We run two identical stacks. Nginx routes to whichever is live. On deploy we spin up the inactive stack, run health checks, and only then cut over. If checks fail, we never switch — zero user impact.</p>
<h2>Result</h2>
<p>From 8-minute manual deploys to a hands-off 90-second pipeline. Zero downtime incidents in the last 6 months.</p>`,
  },
  {
    id: "postgres-opt",
    category: "Backend",
    catColor: null,
    date: "Feb 08, 2026",
    readTime: "9 min",
    featured: false,
    Icon: Database,
    title: "PostgreSQL query optimisation — from 4s to 40ms",
    desc: "Indexes, explain plans, and the three changes that made our slowest endpoint 100× faster in production.",
    body: `<p>There's a particular pain that comes from watching a production query sit at 4 seconds while users stare at a spinner.</p>
<h2>EXPLAIN ANALYZE is your best friend</h2>
<p>Before touching anything, run EXPLAIN (ANALYZE, BUFFERS). Look for sequential scans on large tables and nested loop joins with high row estimates.</p>
<h2>The index we were missing</h2>
<p>A composite index on (user_id, created_at DESC) dropped our user timeline query from 4.2s to 38ms.</p>
<pre>CREATE INDEX CONCURRENTLY idx_posts_user_date
ON posts (user_id, created_at DESC)
WHERE deleted_at IS NULL;</pre>
<p>The partial index on deleted_at IS NULL halved the index size and made writes faster too.</p>`,
  },
  {
    id: "design-system",
    category: "Frontend",
    catColor: "highlight",
    date: "Jan 25, 2026",
    readTime: "5 min",
    featured: false,
    Icon: Palette,
    title: "Design system architecture for a solo dev",
    desc: "How I built a token-based design system using CSS variables and Tailwind that scales without a design team.",
    body: `<p>You don't need a Figma team or a dedicated design systems engineer. Here's the setup I use across all my projects.</p>
<h2>CSS variables as the foundation</h2>
<p>All colors, spacing, radius, and type scale live as CSS custom properties on :root. Swapping themes means swapping a class — one source of truth, zero duplication.</p>
<h2>Tailwind on top</h2>
<p>Tailwind's utility classes reference your custom properties. You get the speed of utility-first with the consistency of a token system. No fighting the framework.</p>`,
  },
  {
    id: "career-lessons",
    category: "Career",
    catColor: "peach",
    date: "Jan 10, 2026",
    readTime: "4 min",
    featured: false,
    Icon: Briefcase,
    title: "4 years in — what I wish I'd known as a junior dev",
    desc: "Lessons on communication, code quality, and career growth that no bootcamp or CS course taught me.",
    body: `<p>Four years ago I was refreshing job boards and writing code that made my future self cringe. Here's what changed.</p>
<h2>Communication > code quality</h2>
<p>Your PRs will be merged or rejected by humans. Writing clear PR descriptions and being explicit about trade-offs matters more than the cleverest solution. Every time.</p>
<h2>Ship imperfect things</h2>
<p>The best code is code in production. Perfect code that never ships helps nobody. Build the habit of getting things over the line — you can always improve in the next PR.</p>`,
  },
];

const CATS = ["All", "Backend", "Frontend", "DevOps", "Career"];

// ── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ── CHIP ────────────────────────────────────────────────────────────────────
function Chip({ label, t, colorKey }) {
  const color = colorKey ? t[colorKey] : t.accent;
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 9,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "3px 10px",
        borderRadius: 100,
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// ── BLOG SIDEBAR ─────────────────────────────────────────────────────────────
function BlogSidebar({ t, dark, cat, setCat, search, setSearch, onBack }) {
  const counts = { All: POSTS.length };
  POSTS.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: 40,
        paddingBottom: 56,
        borderRight: `1px solid ${t.border}`,
        paddingRight: 28,
      }}
    >
      <div>
        {/* ── Back to portfolio ── */}
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: t.muted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: 0,
            marginBottom: 24,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
        >
          <ChevronLeft size={11} /> Portfolio
        </button>

        {/* Blog heading */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: t.text,
            marginBottom: 8,
          }}
        >
          Dev<span style={{ color: t.accent }}>Notes.</span>
        </h2>
        <p
          style={{
            fontSize: 13,
            color: t.muted,
            lineHeight: 1.7,
            maxWidth: 200,
            marginBottom: 28,
          }}
        >
          Thoughts on backend systems, TypeScript patterns, and building things
          that scale.
        </p>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 22 }}>
          <Search
            size={13}
            style={{
              position: "absolute",
              left: 11,
              top: "50%",
              transform: "translateY(-50%)",
              color: t.muted,
              pointerEvents: "none",
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts…"
            style={{
              width: "100%",
              background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              padding: "9px 12px 9px 34px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: t.text,
              outline: "none",
              transition: "border-color 0.2s",
              letterSpacing: "0.04em",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = t.accent)}
            onBlur={(e) => (e.target.style.borderColor = t.border)}
          />
        </div>

        {/* Categories */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: t.muted,
            marginBottom: 10,
          }}
        >
          Topics
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {CATS.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: active ? t.accentGlow : "none",
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: active ? t.accent : t.muted,
                  transition: "color 0.2s, background 0.2s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = t.accentGlow;
                    e.currentTarget.style.color = t.text;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.color = t.muted;
                  }
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: active ? t.accent : t.muted,
                    flexShrink: 0,
                    opacity: active ? 1 : 0.45,
                    transition: "background 0.2s, opacity 0.2s",
                  }}
                />
                {c}
                <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.5 }}>
                  {counts[c] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RSS */}
      <button
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: t.muted,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          border: "none",
          background: "none",
          cursor: "pointer",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
        onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
      >
        <Rss size={11} /> RSS Feed
      </button>
    </aside>
  );
}

// ── MOBILE TOP BAR ──────────────────────────────────────────────────────────
function MobileBlogBar({ t, dark, cat, setCat, search, setSearch, onBack }) {
  return (
    <div style={{ paddingTop: 20, paddingBottom: 8 }}>
      {/* Back + title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            border: `1px solid ${t.border}`,
            background: "none",
            cursor: "pointer",
            borderRadius: 8,
            padding: "6px 12px",
            transition: "color 0.2s, border-color 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = t.accent;
            e.currentTarget.style.borderColor = t.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = t.muted;
            e.currentTarget.style.borderColor = t.border;
          }}
        >
          <ChevronLeft size={11} /> Portfolio
        </button>

        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: t.text,
            margin: 0,
          }}
        >
          Dev<span style={{ color: t.accent }}>Notes.</span>
        </h2>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <Search
          size={13}
          style={{
            position: "absolute",
            left: 11,
            top: "50%",
            transform: "translateY(-50%)",
            color: t.muted,
            pointerEvents: "none",
          }}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts…"
          style={{
            width: "100%",
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${t.border}`,
            borderRadius: 8,
            padding: "9px 12px 9px 34px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: t.text,
            outline: "none",
            letterSpacing: "0.04em",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = t.accent)}
          onBlur={(e) => (e.target.style.borderColor = t.border)}
        />
      </div>

      {/* Category pills — horizontal scroll */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 4,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {CATS.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.08em",
                padding: "6px 14px",
                borderRadius: 100,
                border: `1px solid ${active ? t.accent : t.border}`,
                background: active ? t.accentGlow : "none",
                color: active ? t.accent : t.muted,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── FEATURED CARD ────────────────────────────────────────────────────────────
function FeaturedCard({ post, t, dark, onClick }) {
  const [hov, setHov] = useState(false);
  const { Icon: PostIcon } = post;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${hov ? t.accent : t.border}`,
        borderRadius: 16,
        overflow: "hidden",
        background: t.surface,
        marginBottom: 16,
        cursor: "pointer",
        transition: "border-color 0.25s, transform 0.25s",
        transform: hov ? "translateY(-2px)" : "none",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: dark ? "#0a0a0f" : "#fff",
          background: t.accent,
          padding: "4px 10px",
          borderRadius: 100,
          zIndex: 1,
        }}
      >
        Featured
      </span>

      {/* Banner */}
      <div
        style={{
          width: "100%",
          height: 160,
          background: `linear-gradient(135deg, ${t.surface} 0%, ${t.bg} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 35% 55%, ${t.accentGlow}, transparent 65%)`,
          }}
        />
        <PostIcon size={48} style={{ color: t.accent, opacity: 0.3 }} />
      </div>

      <div style={{ padding: "20px 22px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          <Chip label={post.category} t={t} colorKey={post.catColor} />
          <span style={{ color: t.muted, fontSize: 10 }}>·</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: t.muted,
              letterSpacing: "0.06em",
            }}
          >
            {post.date}
          </span>
          <span style={{ color: t.muted, fontSize: 10 }}>·</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: t.muted,
            }}
          >
            {post.readTime} read
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(16px, 2.5vw, 19px)",
            fontWeight: 800,
            color: t.text,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            marginBottom: 10,
          }}
        >
          {post.title}
        </h2>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.75,
            color: t.muted,
            marginBottom: 18,
          }}
        >
          {post.desc}
        </p>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.accent,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderBottom: `1px solid ${hov ? t.accent : "transparent"}`,
            paddingBottom: 1,
            transition: "border-color 0.2s",
          }}
        >
          Read article <ArrowRight size={11} />
        </span>
      </div>
    </div>
  );
}

// ── POST CARD ────────────────────────────────────────────────────────────────
function PostCard({ post, t, dark, onClick }) {
  const [hov, setHov] = useState(false);
  const { Icon: PostIcon } = post;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${hov ? t.accent : t.border}`,
        borderRadius: 14,
        padding: "20px 20px 18px",
        background: t.surface,
        cursor: "pointer",
        transition: "border-color 0.25s, transform 0.25s",
        transform: hov ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: t.accent,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      />

      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: t.accentGlow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <PostIcon size={17} style={{ color: t.accent }} />
      </div>

      <div>
        <div
          style={{ display: "flex", gap: 7, marginBottom: 8, flexWrap: "wrap" }}
        >
          <Chip label={post.category} t={t} colorKey={post.catColor} />
        </div>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: t.text,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {post.title}
        </h3>
      </div>

      <p style={{ fontSize: 12, lineHeight: 1.7, color: t.muted, flex: 1 }}>
        {post.desc}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: t.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {post.readTime} · {post.date}
        </span>
        <ArrowUpRight
          size={14}
          style={{ color: hov ? t.accent : t.muted, transition: "color 0.2s" }}
        />
      </div>
    </div>
  );
}

// ── POST DETAIL ──────────────────────────────────────────────────────────────
function PostDetail({ post, t, dark, onClose }) {
  const { Icon: PostIcon } = post;

  const bodyHtml = post.body
    .replace(
      /<h2>/g,
      `<h2 style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:${t.text};margin:32px 0 10px;letter-spacing:-0.02em;">`,
    )
    .replace(
      /<p>/g,
      `<p style="font-size:14px;line-height:1.9;color:${t.muted};margin-bottom:18px;">`,
    )
    .replace(
      /<code>/g,
      `<code style="background:${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"};border:1px solid ${t.border};color:${t.accent};padding:2px 7px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:11px;">`,
    )
    .replace(
      /<pre>/g,
      `<pre style="background:${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"};border:1px solid ${t.border};border-radius:10px;padding:20px;font-family:'JetBrains Mono',monospace;font-size:11px;color:${t.text};overflow-x:auto;margin:18px 0;line-height:1.85;white-space:pre;">`,
    );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: t.bg,
        overflowY: "auto",
        animation: "fadeIn 0.3s ease forwards",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "40px 20px 100px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: t.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            border: "none",
            background: "none",
            cursor: "pointer",
            marginBottom: 40,
            padding: 0,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
        >
          <ArrowLeft size={12} /> Back to blog
        </button>

        {/* Icon banner */}
        <div
          style={{
            width: "100%",
            height: 140,
            borderRadius: 14,
            border: `1px solid ${t.border}`,
            background: `linear-gradient(135deg, ${t.surface}, ${t.bg})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 30% 60%, ${t.accentGlow}, transparent 65%)`,
            }}
          />
          <PostIcon size={48} style={{ color: t.accent, opacity: 0.3 }} />
        </div>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <Chip label={post.category} t={t} colorKey={post.catColor} />
          <span style={{ color: t.muted, fontSize: 10 }}>·</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: t.muted,
            }}
          >
            {post.date}
          </span>
          <span style={{ color: t.muted, fontSize: 10 }}>·</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: t.muted,
            }}
          >
            {post.readTime} read
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(20px, 4vw, 28px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: t.text,
            lineHeight: 1.15,
            marginBottom: 28,
          }}
        >
          {post.title}
        </h1>

        <div style={{ height: 1, background: t.border, marginBottom: 32 }} />
        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </div>
    </div>
  );
}

// ── BLOG PAGE (default export) ───────────────────────────────────────────────
export default function Blog({ t, dark }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [openPost, setOpenPost] = useState(null);
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;

  const filtered = POSTS.filter((p) => {
    const catOk = cat === "All" || p.category === cat;
    const q = search.toLowerCase();
    const searchOk =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return catOk && searchOk;
  });

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  const handleBack = () => navigate("/");

  // ── MOBILE LAYOUT ──
  if (isMobile) {
    return (
      <div style={{ flex: 1, minWidth: 0, paddingLeft: 0, paddingRight: 0 }}>
        <MobileBlogBar
          t={t}
          dark={dark}
          cat={cat}
          setCat={setCat}
          search={search}
          setSearch={setSearch}
          onBack={handleBack}
        />

        <main style={{ paddingBottom: 80 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 20,
              marginTop: 12,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: t.muted,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {cat === "All" ? "Latest Posts" : cat}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: t.muted,
                letterSpacing: "0.08em",
              }}
            >
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {featured && (
            <FeaturedCard
              post={featured}
              t={t}
              dark={dark}
              onClick={() => setOpenPost(featured)}
            />
          )}

          {rest.length > 0 && (
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: t.muted,
                marginBottom: 14,
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              More articles
              <span style={{ flex: 1, height: 1, background: t.border }} />
            </p>
          )}

          {/* Single column on mobile */}
          {rest.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {rest.map((p) => (
                <PostCard
                  key={p.id}
                  post={p}
                  t={t}
                  dark={dark}
                  onClick={() => setOpenPost(p)}
                />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <FileSearch
                size={28}
                style={{
                  color: t.muted,
                  margin: "0 auto 14px",
                  display: "block",
                }}
              />
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: t.muted,
                }}
              >
                No posts found.
              </p>
            </div>
          )}

          <div
            style={{
              marginTop: 40,
              paddingTop: 20,
              borderTop: `1px solid ${t.border}`,
            }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: t.muted,
                letterSpacing: "0.08em",
              }}
            >
              © 2026 · Nsengiyumva Eric · All writing my own
            </p>
          </div>
        </main>

        {openPost && (
          <PostDetail
            post={openPost}
            t={t}
            dark={dark}
            onClose={() => setOpenPost(null)}
          />
        )}
      </div>
    );
  }

  // ── DESKTOP LAYOUT ──
  return (
    <div style={{ display: "flex", gap: 48, flex: 1, minWidth: 0 }}>
      <BlogSidebar
        t={t}
        dark={dark}
        cat={cat}
        setCat={setCat}
        search={search}
        setSearch={setSearch}
        onBack={handleBack}
      />

      <main
        className="main-content"
        style={{ flex: 1, paddingTop: 40, paddingBottom: 120, minWidth: 0 }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <p className="section-title" style={{ marginBottom: 0 }}>
            {cat === "All" ? "Latest Posts" : cat}
          </p>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: t.muted,
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Featured */}
        {featured && (
          <FeaturedCard
            post={featured}
            t={t}
            dark={dark}
            onClick={() => setOpenPost(featured)}
          />
        )}

        {/* Grid label */}
        {rest.length > 0 && (
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: t.muted,
              marginBottom: 14,
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            More articles
            <span style={{ flex: 1, height: 1, background: t.border }} />
          </p>
        )}

        {/* 2-col grid on desktop */}
        {rest.length > 0 && (
          <div
            className="projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            {rest.map((p) => (
              <PostCard
                key={p.id}
                post={p}
                t={t}
                dark={dark}
                onClick={() => setOpenPost(p)}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <FileSearch
              size={32}
              style={{
                color: t.muted,
                margin: "0 auto 14px",
                display: "block",
              }}
            />
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: t.muted,
              }}
            >
              No posts found.
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: `1px solid ${t.border}`,
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: t.muted,
              letterSpacing: "0.08em",
            }}
          >
            © 2026 · Nsengiyumva Eric · All writing my own
          </p>
        </div>
      </main>

      {/* Post detail overlay */}
      {openPost && (
        <PostDetail
          post={openPost}
          t={t}
          dark={dark}
          onClose={() => setOpenPost(null)}
        />
      )}
    </div>
  );
}
