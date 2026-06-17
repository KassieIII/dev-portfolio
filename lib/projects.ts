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
    slug: "rag-docs",
    title: "rag-docs",
    description:
      "Ask-your-docs RAG service: ingest Markdown/PDF, retrieve with pgvector HNSW, answer with a local Ollama LLM, every claim cited as [chunk:N]. FastAPI + SQLAlchemy async + bge-small embeddings, with a 25-question eval harness.",
    tags: ["FastAPI", "pgvector", "Ollama", "RAG", "Embeddings", "Docker"],
    github: "https://github.com/KassieIII/rag-docs",
    demo: "https://huggingface.co/spaces/KassieIII/rag-docs-demo",
    featured: true,
  },
  {
    slug: "llm-gateway",
    title: "llm-gateway",
    description:
      "OpenAI-compatible gateway in front of LLM providers: API-key auth, per-key token-bucket rate limiting (atomic in Redis via Lua), response caching, token/cost accounting, provider fallback, SSE streaming and Prometheus metrics. Typed FastAPI, mypy --strict, multi-stage Docker, image published to GHCR.",
    tags: ["FastAPI", "Redis", "Rate limiting", "LLM", "Prometheus", "Docker"],
    github: "https://github.com/KassieIII/llm-gateway",
    featured: true,
  },
  {
    slug: "aws-serverless-ingest",
    title: "aws-serverless-ingest",
    description:
      "Event-driven ingest pipeline on AWS (S3 → SQS → Lambda → DynamoDB) defined end-to-end in Terraform, with a dead-letter queue, least-privilege IAM and SQS partial-batch retries. Tested with moto — no AWS account or network needed — and CI runs terraform validate.",
    tags: ["AWS", "Terraform", "Lambda", "SQS", "DynamoDB", "moto"],
    github: "https://github.com/KassieIII/aws-serverless-ingest",
    featured: true,
  },
  {
    slug: "rag-chat-ui",
    title: "rag-chat-ui",
    description:
      "Streaming Next.js chat UI for rag-docs: POST-based SSE over fetch + ReadableStream, citations-first rendering, abortable generation and a tested parser.",
    tags: ["Next.js", "React", "TypeScript", "SSE", "RAG", "Tailwind"],
    github: "https://github.com/KassieIII/rag-chat-ui",
    demo: "https://rag-chat-ui-roan.vercel.app/?demo=1",
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
    slug: "go-pingmon",
    title: "Pingmon",
    description:
      "Concurrent uptime monitor in Go: worker-pool HTTP prober, JSON API, /healthz, Prometheus metrics and GHCR Docker publishing.",
    tags: ["Go", "HTTP", "Prometheus", "GHCR", "Docker"],
    github: "https://github.com/KassieIII/go-pingmon",
    featured: true,
  },
  {
    slug: "taskflow-api",
    title: "TaskFlow API",
    description:
      "REST API for task management with JWT authentication, role-based access and PostgreSQL.",
    tags: ["FastAPI", "PostgreSQL", "SQLAlchemy", "JWT"],
    github: "https://github.com/KassieIII/TaskFlow-API",
    featured: true,
  },
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
    slug: "url-shortener",
    title: "URL Shortener",
    description:
      "Tiny production-style URL shortener with Redis storage, click analytics, rate limiting and Docker deployment.",
    tags: ["Node.js", "Express", "TypeScript", "Redis", "Docker"],
    github: "https://github.com/KassieIII/url-shortener",
  },
  {
    slug: "vue-notes",
    title: "Vue Notes",
    description:
      "Offline-first Markdown note app built with Vue 3, Pinia and IndexedDB. Live preview with sanitised HTML.",
    tags: ["Vue 3", "Pinia", "TypeScript", "IndexedDB"],
    github: "https://github.com/KassieIII/vue-notes",
    featured: true,
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
