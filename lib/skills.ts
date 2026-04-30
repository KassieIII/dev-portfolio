export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "Go", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Vue 3", "Pinia", "Tailwind CSS", "Vite"],
  },
  {
    category: "Backend",
    skills: [
      "FastAPI",
      "Django",
      "Express",
      "Go net/http",
      "SQLAlchemy 2.0",
      "Alembic",
      "asyncio",
    ],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "IndexedDB"],
  },
  {
    category: "DevOps",
    skills: [
      "Docker",
      "Distroless images",
      "GitHub Actions",
      "Linux",
      "Nginx",
      "Makefile",
    ],
  },
  {
    category: "Testing",
    skills: ["pytest", "pytest-asyncio", "vitest", "go test -race", "ruff", "gofmt"],
  },
  {
    category: "AI / RAG",
    skills: ["RAG", "pgvector", "Embeddings", "Ollama", "sentence-transformers"],
  },
  {
    category: "Other",
    skills: ["WebSocket", "REST APIs", "JWT", "OSINT", "AI / LLM Integration"],
  },
];
