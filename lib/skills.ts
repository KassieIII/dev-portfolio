export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "Go", "TypeScript", "SQL"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Vue 3", "Vite", "Responsive UI", "UX implementation"],
  },
  {
    category: "Backend",
    skills: [
      "FastAPI",
      "Node.js / Express",
      "Go net/http",
      "SQLAlchemy 2.0",
      "asyncio",
      "REST",
      "WebSocket",
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
      "AWS Lambda / S3 / SQS / DynamoDB",
      "Terraform",
      "GitHub Actions",
      "Nginx",
      "Prometheus",
    ],
  },
  {
    category: "Testing",
    skills: ["moto-based AWS tests", "Retrieval evaluation", "CI quality checks"],
  },
  {
    category: "AI / RAG",
    skills: ["RAG", "pgvector HNSW", "Embeddings", "Ollama", "Reranking", "Evaluation harnesses", "LLM gateways"],
  },
  {
    category: "Commercial delivery",
    skills: ["CMS / CRM", "Multilingual sites", "On-page SEO", "Analytics", "Lead funnels", "E-signatures"],
  },
];
