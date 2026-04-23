import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { projects } from "@/lib/projects";
import { skillGroups } from "@/lib/skills";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      {/* Hero */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Hey, I'm <span className="text-accent">Kassym</span>.
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Full-stack developer based in Astana. I build OSINT intelligence
          tools, real-time geolocation platforms, and AI-integrated systems.
          Currently working at Seven Hills, previously at the Ministry of
          Internal Affairs of Kazakhstan.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Projects <ArrowRight size={16} />
          </Link>
          <a
            href="mailto:honormorethangold@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Mail size={16} /> Contact
          </a>
        </div>

        <div className="flex gap-4 pt-2 text-zinc-500">
          <a href="https://github.com/KassieIII" aria-label="GitHub" className="hover:text-accent transition-colors">
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/kassym-yermakhanbet-635163235/"
            aria-label="LinkedIn"
            className="hover:text-accent transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </section>

      {/* Featured projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-accent hover:underline inline-flex items-center gap-1"
          >
            All projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Tech Stack</h2>
        <div className="space-y-4">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
