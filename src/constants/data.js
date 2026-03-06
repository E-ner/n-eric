import {
  Server,
  Zap,
  Blocks,
  ShieldCheck,
  Globe,
  Database,
  Layers,
  FileJson,
  Layout,
  Code2,
} from "lucide-react";

// ─── SKILLS ──────────────────────────────────────────────────────────────────
export const skillGroups = [
  {
    label: "Backend & Core",
    desc: "Primary expertise — production systems at scale",
    skills: [
      { name: "Node.js", level: 100, color: "#a6e3a1", icon: Server },
      { name: "Express.js", level: 95, color: "#94a3b8", icon: Zap },
      { name: "NestJS", level: 80, color: "#e0234e", icon: Blocks },
      { name: "API Integration", level: 95, color: "#2dd4bf", icon: Globe },
      {
        name: "Authentication (JWT/OAuth)",
        level: 90,
        color: "#fbbf24",
        icon: ShieldCheck,
      },
    ],
  },
  {
    label: "Database & Caching",
    desc: "Data layer design, querying, and performance",
    skills: [
      { name: "PostgreSQL", level: 85, color: "#336791", icon: Database },
      { name: "MongoDB", level: 90, color: "#47a248", icon: Database },
      { name: "MySQL", level: 80, color: "#00758f", icon: Database },
      { name: "Redis", level: 70, color: "#dc2626", icon: Zap },
    ],
  },
  {
    label: "Frontend & UI",
    desc: "Building polished, fast interfaces",
    skills: [
      { name: "React.js / Next.js", level: 85, color: "#61dafb", icon: Layers },
      { name: "TypeScript / JS", level: 95, color: "#3178c6", icon: FileJson },
      { name: "Tailwind CSS", level: 90, color: "#38bdf8", icon: Layout },
      { name: "HTML5 & CSS3", level: 100, color: "#f06529", icon: Layout },
    ],
  },
  {
    label: "JVM Ecosystem",
    desc: "Active learning path — enterprise distributed systems",
    skills: [
      { name: "Java / JVM", level: 15, color: "#f87171", icon: Code2 },
      { name: "Kotlin", level: 10, color: "#c084fc", icon: Code2 },
    ],
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
export const experience = [
  {
    period: "2024 — Present",
    role: "Senior Backend Engineer",
    company: "TechCorp",
    url: "#",
    desc: "Architected and maintained high-throughput microservices handling 50M+ requests/day. Led migration from monolith to event-driven architecture using Kafka and Node.js.",
    tags: ["Node.js", "Kafka", "PostgreSQL", "AWS"],
  },
  {
    period: "2022 — 2024",
    role: "Full Stack Developer",
    company: "Startup Labs",
    url: "#",
    desc: "Built scalable REST and GraphQL APIs. Delivered Next.js frontends with SSR/SSG strategies improving core web vitals by 40%.",
    tags: ["Next.js", "GraphQL", "Redis", "Docker"],
  },
  {
    period: "2020 — 2022",
    role: "Backend Developer",
    company: "Agency Co.",
    url: "#",
    desc: "Developed and deployed Node.js services for clients across fintech and e-commerce. Implemented CI/CD pipelines reducing deployment time by 60%.",
    tags: ["Node.js", "Express", "MongoDB", "GCP"],
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
// image: use a real screenshot URL or import from src/assets/
// Placeholder images use https://picsum.photos with a seed for consistency
export const projects = [
  {
    id: "nexus-api",
    title: "Nexus API Gateway",
    desc: "A high-performance API gateway built on Node.js with rate limiting, JWT auth, and a real-time analytics dashboard.",
    longDesc:
      "Nexus handles request routing, rate limiting, JWT authentication, and live traffic analytics across distributed microservices. Built for throughput — serves 5M+ daily requests.",
    tags: ["Node.js", "Redis", "WebSockets"],
    url: "https://github.com/e-ner",
    stars: "1.2k",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80", // server/network visual
  },
  {
    id: "streamline-cms",
    title: "Streamline CMS",
    desc: "Headless CMS with a Next.js admin panel, supporting multi-tenant deployments and webhook-driven content workflows.",
    longDesc:
      "A fully headless content platform supporting unlimited tenants, webhook pipelines, role-based access, and a clean admin UI. Powers several production content teams.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    url: "https://github.com/e-ner",
    stars: "840",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", // dashboard visual
  },
  {
    id: "jvm-explorer",
    title: "JVM Explorer",
    desc: "Open-source toolkit for profiling Java/Kotlin apps with real-time flame graphs and memory leak detection.",
    longDesc:
      "A developer tool that surfaces JVM bottlenecks through visual flame graphs and heap analysis. Integrates with IntelliJ and ships as a standalone CLI.",
    tags: ["Kotlin", "JVM", "React"],
    url: "https://github.com/e-ner",
    stars: "310",
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=80", // code/terminal visual
  },
];
