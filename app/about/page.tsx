import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Kassym Yermakhanbet — Full-Stack & AI Software Engineer",
  description: "Current experience, technical capabilities and working approach of full-stack and AI software engineer Kassym Yermakhanbet.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="section-label"><span>[PROFILE]</span> Kassym Yermakhanbet</div>
        <h1>Builder by<br />default.</h1>
        <p>I connect product judgment, interaction design and production engineering so useful ideas make it all the way to users.</p>
      </section>

      <main className="section profile-grid">
        <aside className="profile-aside">
          <dl>
            <div><dt>Base</dt><dd>Astana, Kazakhstan</dd></div>
            <div><dt>Availability</dt><dd>Remote worldwide</dd></div>
            <div><dt>Languages</dt><dd>English C1 · Russian/Kazakh native · German conversational</dd></div>
            <div><dt>Core stack</dt><dd>TypeScript · React · Python · FastAPI · PostgreSQL · AWS</dd></div>
            <div><dt>Current focus</dt><dd>SaaS · self-hosted CMS/CRM · production AI</dd></div>
            <div><dt>Engagement</dt><dd>Full-time or contract · relocation open</dd></div>
          </dl>
        </aside>

        <div className="profile-copy">
          <h2>I like difficult workflows and simple interfaces.</h2>
          <p>
            I&apos;m a full-stack and AI software engineer with more than four years
            of experience delivering customer-facing SaaS, internal platforms,
            self-hosted CMS/CRM systems and production AI infrastructure. I work
            from the business constraint inward: understand the decision, prototype
            the interaction, engineer the system and verify it in production.
          </p>
          <p>
            Day to day, that means TypeScript, React, Next.js, Vite and Vue 3 on
            the interface; Python, FastAPI, Node.js/Express, Go and SQLAlchemy 2.0
            behind it; PostgreSQL, Redis, MongoDB and MySQL underneath; Docker,
            Nginx, AWS and Terraform in delivery; and measured RAG/LLM systems
            where they create real leverage.
          </p>

          <h3>Experience</h3>
          <div className="timeline">
            <article>
              <span>2025 — present</span>
              <div><h4>Software Development Specialist · Seven Hills LLP</h4><p>Lead engineering for a self-hosted visual CMS/CRM, real-time geolocation dashboards, authorized OSINT workflows, LLM features, Docker operations and measurable retrieval systems.</p></div>
            </article>
            <article>
              <span>2022 — 2024</span>
              <div><h4>Software Developer · Ministry of Internal Affairs of Kazakhstan</h4><p>Custom CRM, role-based applications for sensitive data, legacy modernization and production support under government security requirements.</p></div>
            </article>
          </div>

          <h3>Education</h3>
          <div className="timeline">
            <article><span>2022</span><div><h4>BSc · Computer Engineering &amp; Software</h4><p>International Information Technology University, Almaty.</p></div></article>
            <article><span>2024</span><div><h4>Bachelor of Laws · Jurisprudence</h4><p>Taraz Regional University — useful context for regulated systems and high-accountability workflows.</p></div></article>
            <article><span>2015 — 2017</span><div><h4>Nuclear Physics coursework</h4><p>L.N. Gumilyov Eurasian National University, Astana.</p></div></article>
          </div>

          <h3>Contact</h3>
          <p>If you have a valuable workflow trapped in spreadsheets, manual handoffs or disconnected tools, I&apos;d like to hear about it.</p>
          <a className="button button-primary" href="mailto:honormorethangold@gmail.com?subject=Product%20inquiry">Start a conversation <ArrowUpRight size={17} /></a>
        </div>
      </main>
    </>
  );
}
