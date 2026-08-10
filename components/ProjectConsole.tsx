"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink, Terminal } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/lib/projects";

export default function ProjectConsole({ projects }: { projects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const active = projects.find((project) => project.slug === activeSlug) ?? projects[0];

  if (!active) return null;

  return (
    <div className="project-console">
      <div className="console-topbar">
        <div className="console-dots" aria-hidden="true"><i /><i /><i /></div>
        <span>KY_PORTFOLIO / SELECTED_SYSTEMS.exe</span>
        <span className="console-online"><i /> LIVE INDEX</span>
      </div>

      <div className="console-body">
        <div className="console-list" role="tablist" aria-label="Selected projects">
          <div className="console-list-label"><Terminal size={14} /> SELECT A SYSTEM</div>
          {projects.map((project) => (
            <button
              type="button"
              role="tab"
              aria-selected={project.slug === active.slug}
              key={project.slug}
              onMouseEnter={() => setActiveSlug(project.slug)}
              onFocus={() => setActiveSlug(project.slug)}
              onClick={() => setActiveSlug(project.slug)}
              data-cursor="SELECT"
            >
              <span>[{project.index}]</span>
              <strong>{project.title}</strong>
              <small>{project.eyebrow}</small>
              <i aria-hidden="true">{project.slug === active.slug ? "[-]" : "[+]"}</i>
            </button>
          ))}
        </div>

        <div className={`console-monitor tone-${active.tone}`} role="tabpanel" key={active.slug}>
          <div className="monitor-chrome">
            <span>PREVIEW / {active.index}</span>
            <span>1440 × 900</span>
          </div>
          <div className="monitor-image">
            {active.preview ? (
              <Image src={active.preview} alt={`${active.title} live product preview`} fill sizes="(max-width: 900px) 100vw, 66vw" priority={active.index === "01"} />
            ) : (
              <div className="monitor-fallback">{active.title}</div>
            )}
            <div className="monitor-scan" aria-hidden="true" />
            <span className="monitor-reticle" aria-hidden="true" />
          </div>
          <div className="monitor-caption">
            <div>
              <span>{active.eyebrow}</span>
              <h3>{active.title}</h3>
              <p>{active.outcome}</p>
            </div>
            {active.demo && (
              <a href={active.demo} target="_blank" rel="noreferrer" data-cursor="OPEN">
                Open live <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="console-statusbar">
        <span>HOVER / FOCUS / TAP TO INSPECT</span>
        <span>{active.tags.join(" · ")}</span>
        <a href="/projects">FULL ARCHIVE <ArrowUpRight size={14} /></a>
      </div>
    </div>
  );
}
