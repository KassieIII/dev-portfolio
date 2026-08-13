import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected Product & Engineering Work — Kassym Yermakhanbet",
  description: "Current SaaS, self-hosted visual CMS/CRM, client platforms, RAG systems, LLM infrastructure and AWS engineering by Kassym Yermakhanbet.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="section-label"><span>[INDEX]</span> Product archive</div>
        <h1>Selected<br />systems.</h1>
        <p>Commercial products and open engineering systems. Each one was designed to make a real workflow clearer, faster or more dependable.</p>
      </section>
      <main className="section projects-index">
        <div className="project-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </main>
    </>
  );
}
