import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Code2, Contact, Mail } from "lucide-react";
import ProjectConsole from "@/components/ProjectConsole";
import { projects } from "@/lib/projects";

const capabilities = [
  {
    index: "01",
    title: "Product engineering",
    text: "I shape the workflow, interface, data model and delivery path — then ship the usable product, not a disconnected set of screens.",
    stack: "Next.js / React / TypeScript / UX",
  },
  {
    index: "02",
    title: "Backend systems",
    text: "Typed APIs, real-time services, permissions, payments, integrations and infrastructure designed to remain understandable in production.",
    stack: "Python / FastAPI / Go / PostgreSQL",
  },
  {
    index: "03",
    title: "Applied AI",
    text: "RAG, model gateways and AI-assisted workflows with citations, evaluation, cost controls and fallback behavior built in from day one.",
    stack: "LLMs / pgvector / Redis / Observability",
  },
];

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kassym Yermakhanbet",
    jobTitle: "Full-Stack and AI Product Engineer",
    url: "https://dev-portfolio-sigma-sepia.vercel.app/",
    email: "mailto:honormorethangold@gmail.com",
    address: { "@type": "PostalAddress", addressLocality: "Astana", addressCountry: "KZ" },
    sameAs: [
      "https://github.com/KassieIII",
      "https://www.linkedin.com/in/kassym-yermakhanbet-635163235/",
      "https://www.upwork.com/freelancers/~01f07d973e8bc9cf88",
    ],
    knowsAbout: ["Full-stack development", "Artificial intelligence", "SaaS", "RAG", "Next.js", "FastAPI"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-side-label">PORTFOLIO / 2026</div>

        <div className="hero-status">
          <span className="status-dot" />
          AVAILABLE FOR SELECT PRODUCT WORK
        </div>

        <div className="hero-title">
          <span className="hero-kicker">Full-stack &amp; AI product engineer</span>
          <h1>
            <span>I turn <b>operational</b></span>
            <em>friction</em>
            <span>into deployed systems.</span>
          </h1>
        </div>

        <div className="hero-bottom">
          <p>
            Strategy, UX, engineering and deployment in one loop. I build SaaS,
            internal platforms and AI products that teams can actually operate.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <ArrowDown size={17} /></a>
            <a className="button button-ghost" href="mailto:honormorethangold@gmail.com?subject=Product%20inquiry">Discuss a product <ArrowUpRight size={17} /></a>
          </div>
        </div>

        <div className="hero-rail">
          <div><span>Location</span><strong>Astana, KZ</strong></div>
          <div><span>Focus</span><strong>Product systems</strong></div>
          <div><span>Mode</span><strong>Remote worldwide</strong></div>
          <div className="hero-socials">
            <a href="https://github.com/KassieIII" aria-label="GitHub"><Code2 size={18} /></a>
            <a href="https://www.linkedin.com/in/kassym-yermakhanbet-635163235/" aria-label="LinkedIn"><Contact size={18} /></a>
            <a href="mailto:honormorethangold@gmail.com" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
      </section>

      <main>
        <section className="section work-section" id="work">
          <div className="section-intro">
            <div className="section-label"><span>[01]</span> Selected systems</div>
            <div>
              <h2>Built for the point where ideas meet reality.</h2>
              <p>Commercial products and engineering systems — selected for product depth, not visual novelty.</p>
            </div>
          </div>

          <ProjectConsole projects={featured} />

          <div className="section-link-row">
            <Link href="/projects">View the complete project index <ArrowUpRight size={17} /></Link>
          </div>
        </section>

        <section className="section capabilities-section" id="capabilities">
          <div className="section-intro inverse">
            <div className="section-label"><span>[02]</span> Capabilities</div>
            <div>
              <h2>One accountable builder across the product.</h2>
              <p>I work where business logic, interaction design and production engineering overlap.</p>
            </div>
          </div>

          <div className="capability-list">
            {capabilities.map((item) => (
              <article key={item.index}>
                <span>[{item.index}]</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small>{item.stack}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="section-intro">
            <div className="section-label"><span>[03]</span> Delivery protocol</div>
            <div>
              <h2>Fast enough to move. Structured enough to trust.</h2>
            </div>
          </div>

          <div className="process-grid">
            {[
              ["01", "Frame", "Clarify the costly workflow, decision and success signal."],
              ["02", "Prototype", "Make the core interaction tangible before complexity grows."],
              ["03", "Engineer", "Build the product slice with typed boundaries and observability."],
              ["04", "Ship", "Deploy, verify real behavior and leave a clear operating path."],
            ].map(([number, title, text]) => (
              <article key={number}><span>{number}</span><Check size={18} /><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="section about-teaser">
          <div className="about-code" aria-hidden="true">
            <span>KY/PROFILE</span>
            <strong>KASSYM<br />YERMAKHANBET</strong>
            <i>ASTANA — WORLDWIDE</i>
          </div>
          <div className="about-copy">
            <div className="section-label"><span>[04]</span> About</div>
            <h2>Engineering judgment with a product owner&apos;s perspective.</h2>
            <p>
              I&apos;m a full-stack engineer with 4+ years across government systems,
              operational software and product development. My default question is
              not “which framework?” — it is “what must become easier, safer or faster?”
            </p>
            <Link href="/about">Read the full profile <ArrowUpRight size={17} /></Link>
          </div>
        </section>
      </main>
    </>
  );
}
