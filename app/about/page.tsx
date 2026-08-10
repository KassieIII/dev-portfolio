import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Kassym Yermakhanbet — Full-Stack & AI Product Engineer",
  description: "Background, experience and working approach of product engineer Kassym Yermakhanbet in Astana, Kazakhstan.",
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
            <div><dt>Languages</dt><dd>English · German · Kazakh · Russian</dd></div>
            <div><dt>Core stack</dt><dd>TypeScript · Python · Go · PostgreSQL</dd></div>
            <div><dt>Current focus</dt><dd>SaaS · AI products · operational systems</dd></div>
          </dl>
        </aside>

        <div className="profile-copy">
          <h2>I like difficult workflows and simple interfaces.</h2>
          <p>
            I&apos;m a full-stack engineer with more than four years of commercial
            experience across government platforms, digital forensics products,
            real-time operations and independent SaaS. I work from the business
            constraint inward: understand the decision, prototype the interaction,
            engineer the system and verify it in production.
          </p>
          <p>
            Day to day, that means Next.js and React on the interface; Python,
            FastAPI and Go behind it; PostgreSQL, Redis and Docker underneath;
            and measured AI/RAG where it creates real leverage. I care about typed
            boundaries, useful observability, clear failure behavior and products
            another person can operate without me standing beside them.
          </p>

          <h3>Experience</h3>
          <div className="timeline">
            <article>
              <span>2025 — present</span>
              <div><h4>Software Development Specialist · Seven Hills LLP</h4><p>Product systems for digital forensics, real-time geolocation, OSINT workflows, applied AI and a self-hosted visual CMS/CRM platform.</p></div>
            </article>
            <article>
              <span>2022 — 2024</span>
              <div><h4>Software Developer · Ministry of Internal Affairs</h4><p>Internal workflow software, role-based systems and modernization of regulated operational platforms.</p></div>
            </article>
          </div>

          <h3>Education</h3>
          <div className="timeline">
            <article><span>2022</span><div><h4>BSc · Computer Engineering &amp; Software</h4><p>International Information Technology University, Almaty.</p></div></article>
            <article><span>2024</span><div><h4>Bachelor of Laws · Jurisprudence</h4><p>Taraz Regional University — useful context for regulated systems and high-accountability workflows.</p></div></article>
          </div>

          <h3>Contact</h3>
          <p>If you have a valuable workflow trapped in spreadsheets, manual handoffs or disconnected tools, I&apos;d like to hear about it.</p>
          <a className="button button-primary" href="mailto:honormorethangold@gmail.com?subject=Product%20inquiry">Start a conversation <ArrowUpRight size={17} /></a>
        </div>
      </main>
    </>
  );
}
