import { ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card tone-${project.tone}`}>
      <div className="project-card-head">
        <span className="project-index">[{project.index}]</span>
        <span className="project-eyebrow">{project.eyebrow}</span>
      </div>

      <div className="project-display" aria-hidden="true">
        <span className="project-signal" />
        <span className="project-grid-label">SYS/{project.index}</span>
        <strong>{project.title.split(" ").map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}</strong>
      </div>

      <div className="project-card-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-outcome"><span>Output</span>{project.outcome}</div>
        <div className="tag-row">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>

      <div className="project-links">
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer">
            Live product <ArrowUpRight size={16} />
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer">
            Source <Code2 size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
