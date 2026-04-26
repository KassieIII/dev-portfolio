export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "ip-osint-bot",
    title: "IP OSINT Bot",
    description:
      "Telegram bot for IP geolocation, DNS, WHOIS and subnet scanning. Built with async Python and aiohttp.",
    tags: ["Python", "Telegram", "OSINT", "Async"],
    github: "https://github.com/KassieIII/ip-osint-bot",
    featured: true,
  },
  {
    slug: "taskflow-api",
    title: "TaskFlow API",
    description:
      "REST API for task management with JWT authentication, role-based access and PostgreSQL.",
    tags: ["FastAPI", "PostgreSQL", "SQLAlchemy", "JWT"],
    github: "https://github.com/KassieIII/taskflow-api",
    featured: true,
  },
  {
    slug: "geo-tracker",
    title: "GeoTracker Dashboard",
    description:
      "Real-time geolocation tracking dashboard with interactive Leaflet map and WebSocket updates.",
    tags: ["React", "TypeScript", "Leaflet", "WebSocket"],
    github: "https://github.com/KassieIII/GeoTracker",
    featured: true,
  },
  {
    slug: "url-shortener",
    title: "URL Shortener",
    description:
      "Tiny production-style URL shortener with Redis storage, click analytics, rate limiting and Docker deployment.",
    tags: ["Node.js", "Express", "TypeScript", "Redis", "Docker"],
    github: "https://github.com/KassieIII/url-shortener",
    featured: true,
  },
  {
    slug: "vue-notes",
    title: "Vue Notes",
    description:
      "Offline-first Markdown note app built with Vue 3, Pinia and IndexedDB. Live preview with sanitised HTML.",
    tags: ["Vue 3", "Pinia", "TypeScript", "IndexedDB"],
    github: "https://github.com/KassieIII/vue-notes",
  },
  {
    slug: "dev-portfolio",
    title: "Developer Portfolio",
    description:
      "This site. Built with Next.js 14 App Router, TypeScript, Tailwind CSS and dark mode.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/KassieIII/dev-portfolio",
  },
];
