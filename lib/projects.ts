export interface Project {
  slug: string;
  index: string;
  title: string;
  eyebrow: string;
  description: string;
  outcome: string;
  tags: string[];
  github?: string;
  demo?: string;
  preview?: string;
  featured?: boolean;
  tone: "amber" | "mint" | "blue" | "coral";
}

export const projects: Project[] = [
  {
    slug: "seven-hills-builder",
    index: "01",
    title: "Seven Hills Visual CMS",
    eyebrow: "Product system / 2026",
    description:
      "A self-hosted visual website builder with an integrated CRM and CMS. Editors assemble pages on-canvas, manage leads, publish content and operate the site without touching code — including in closed networks.",
    outcome: "30+ widgets · 26-language content layer · CRM, chat, analytics and audit log",
    tags: ["React", "TypeScript", "Node.js", "Express", "Docker"],
    demo: "https://forensic.7hills.kz/",
    preview: "/project-previews/seven-hills.png",
    featured: true,
    tone: "amber",
  },
  {
    slug: "proposalflow",
    index: "02",
    title: "ProposalFlow",
    eyebrow: "SaaS product / 2026",
    description:
      "An end-to-end workspace for freelancers and agencies: AI-assisted proposals, branded client links, browser e-signatures, invoices and a client portal in one coherent workflow.",
    outcome: "From brief to signed proposal and payment handoff in one product",
    tags: ["React", "TypeScript", "AI", "E-signatures", "SaaS"],
    demo: "https://getproposalflow.com/",
    preview: "/project-previews/proposalflow.png",
    featured: true,
    tone: "mint",
  },
  {
    slug: "olzhas-stroy",
    index: "03",
    title: "Olzhas Stroy",
    eyebrow: "Client platform / 2026",
    description:
      "A multilingual lead-generation site for an Astana renovation company, built around real project media, transparent service packages and an interactive cost calculator.",
    outcome: "3 locales · price calculator · project video and photo library · technical SEO",
    tags: ["Next.js", "TypeScript", "SEO", "UX", "Media"],
    demo: "https://olzhasstroy.kz/",
    preview: "/project-previews/olzhas-stroy.png",
    featured: true,
    tone: "coral",
  },
  {
    slug: "rag-docs",
    index: "04",
    title: "Citation-grounded RAG",
    eyebrow: "AI infrastructure / 2025",
    description:
      "A production-shaped document intelligence service: PDF and Markdown ingestion, pgvector retrieval, optional reranking, local LLM answers and source citations on every supported claim.",
    outcome: "25-question evaluation harness · citation-grounded output · reproducible quality checks",
    tags: ["FastAPI", "pgvector", "Ollama", "RAG", "Docker"],
    github: "https://github.com/KassieIII/rag-docs",
    demo: "https://huggingface.co/spaces/KassieIII/rag-docs-demo",
    preview: "/project-previews/rag-docs.png",
    featured: true,
    tone: "blue",
  },
  {
    slug: "llm-gateway",
    index: "05",
    title: "LLM Gateway",
    eyebrow: "Backend infrastructure / 2026",
    description:
      "An OpenAI-compatible gateway with API-key authentication, atomic Redis rate limiting, response caching, provider fallback, usage accounting, SSE streaming and Prometheus metrics.",
    outcome: "One observable control layer across multiple model providers",
    tags: ["FastAPI", "Redis", "Prometheus", "SSE", "Docker"],
    github: "https://github.com/KassieIII/llm-gateway",
    preview: "/project-previews/llm-gateway.png",
    featured: false,
    tone: "mint",
  },
  {
    slug: "aws-serverless-ingest",
    index: "06",
    title: "AWS Event Ingest",
    eyebrow: "Cloud pipeline / 2026",
    description:
      "An event-driven S3 → SQS → Lambda → DynamoDB ingest pipeline defined in Terraform, with partial-batch retries, a dead-letter queue, least-privilege IAM and moto-based tests.",
    outcome: "Infrastructure and failure paths are reproducible and testable without an AWS account",
    tags: ["AWS", "Terraform", "Lambda", "SQS", "DynamoDB"],
    github: "https://github.com/KassieIII/aws-serverless-ingest",
    preview: "/project-previews/aws-ingest.png",
    featured: false,
    tone: "amber",
  },
  {
    slug: "geotracker",
    index: "07",
    title: "GeoTracker",
    eyebrow: "Operational platform / 2025",
    description:
      "A real-time geolocation dashboard that turns live device events into an operator-friendly map and monitoring workflow.",
    outcome: "Live WebSocket updates · interactive mapping · operational visibility",
    tags: ["React", "TypeScript", "WebSocket", "Leaflet"],
    github: "https://github.com/KassieIII/GeoTracker",
    preview: "/project-previews/geotracker.png",
    featured: false,
    tone: "coral",
  },
  {
    slug: "go-pingmon",
    index: "08",
    title: "Pingmon",
    eyebrow: "Observability tool / 2026",
    description:
      "A concurrent uptime monitor in Go with a worker-pool HTTP prober, JSON API, health endpoint, Prometheus metrics and automated container publishing.",
    outcome: "Small, observable and production-ready monitoring service",
    tags: ["Go", "Prometheus", "Docker", "GHCR"],
    github: "https://github.com/KassieIII/go-pingmon",
    preview: "/project-previews/pingmon.png",
    featured: false,
    tone: "blue",
  },
];
