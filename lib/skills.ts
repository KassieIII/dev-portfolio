export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Python", "Django", "FastAPI", "Node.js", "Express"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "Linux", "Nginx", "GitHub Actions", "Git"],
  },
  {
    category: "Other",
    skills: ["WebSocket", "REST APIs", "OSINT", "AI / LLM Integration"],
  },
];
