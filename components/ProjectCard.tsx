import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import SkillBadge from "./SkillBadge";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-accent transition-colors flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <div className="flex gap-2 text-zinc-500">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub`}
              className="hover:text-accent transition-colors"
            >
              <Github size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} demo`}
              className="hover:text-accent transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {project.tags.map((tag) => (
          <SkillBadge key={tag} name={tag} small />
        ))}
      </div>
    </article>
  );
}
