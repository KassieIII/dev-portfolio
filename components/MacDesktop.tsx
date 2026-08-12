"use client";

import Image from "next/image";
import {
  BatteryFull,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Command,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Folder,
  Globe2,
  Mail,
  MapPin,
  Maximize2,
  Minimize2,
  Minus,
  Moon,
  SlidersHorizontal,
  Sparkles,
  Sun,
  TerminalSquare,
  UserRound,
  Volume2,
  Wifi,
  X,
} from "lucide-react";
import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useMemo, useState } from "react";
import { projects } from "@/lib/projects";

type AppId = "work" | "about" | "resume" | "terminal" | "stack" | "contact";
type ThemeId = "sky" | "midnight" | "sand";

type DesktopWindow = {
  id: AppId;
  title: string;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
  x: number;
  y: number;
};

const appMeta: Record<AppId, { title: string; label: string; icon: typeof Folder; tone: string }> = {
  work: { title: "Selected Work", label: "Projects", icon: Folder, tone: "blue" },
  about: { title: "About Kassym", label: "About Me", icon: UserRound, tone: "violet" },
  resume: { title: "Kassym — Résumé", label: "Résumé", icon: FileText, tone: "paper" },
  terminal: { title: "kassym@portfolio — zsh", label: "Terminal", icon: TerminalSquare, tone: "dark" },
  stack: { title: "System Profiler", label: "Tech Stack", icon: Cpu, tone: "orange" },
  contact: { title: "New Message", label: "Contact", icon: Mail, tone: "green" },
};

const initialWindows: DesktopWindow[] = [
  { id: "work", title: appMeta.work.title, open: false, minimized: false, maximized: false, z: 2, x: 122, y: 104 },
  { id: "about", title: appMeta.about.title, open: false, minimized: false, maximized: false, z: 3, x: 250, y: 126 },
  { id: "resume", title: appMeta.resume.title, open: false, minimized: false, maximized: false, z: 4, x: 310, y: 90 },
  { id: "terminal", title: appMeta.terminal.title, open: false, minimized: false, maximized: false, z: 5, x: 205, y: 205 },
  { id: "stack", title: appMeta.stack.title, open: false, minimized: false, maximized: false, z: 6, x: 375, y: 158 },
  { id: "contact", title: appMeta.contact.title, open: false, minimized: false, maximized: false, z: 7, x: 430, y: 118 },
];

const stackGroups = [
  ["Interface", "TypeScript", "React", "Next.js", "Vue.js"],
  ["Backend", "Python", "FastAPI", "Go", "Node.js"],
  ["Data", "PostgreSQL", "pgvector", "Redis", "DynamoDB"],
  ["AI systems", "RAG", "Ollama", "LLM gateways", "Evaluation"],
  ["Delivery", "Docker", "AWS", "Terraform", "GitHub Actions"],
];

const commands: Record<string, string[]> = {
  help: ["Available commands: about, skills, projects, contact, clear"],
  about: ["Kassym Yermakhanbet", "Full-stack & AI product engineer · Astana, Kazakhstan", "Building clear products from complex operational workflows."],
  skills: ["TypeScript / React / Next.js", "Python / FastAPI / Go", "PostgreSQL / Redis / AWS", "RAG / LLM infrastructure / product engineering"],
  projects: ["01 Seven Hills Visual CMS", "02 ProposalFlow", "03 Olzhas Stroy", "04 Citation-grounded RAG", "Run the Projects app for the complete archive."],
  contact: ["honormorethangold@gmail.com", "github.com/KassieIII", "LinkedIn: kassym-yermakhanbet-635163235"],
};

function formatClock(date: Date | null, withSeconds = false) {
  if (!date) return "--:--";
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined,
    hour12: false,
  }).format(date);
}

export default function MacDesktop() {
  const [locked, setLocked] = useState(true);
  const [theme, setTheme] = useState<ThemeId>("sky");
  const [controlCenter, setControlCenter] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [windows, setWindows] = useState(initialWindows);
  const [activeProject, setActiveProject] = useState(projects[0]?.slug ?? "");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "KY-OS 1.0.26 — portfolio environment",
    "Type `help` to inspect available commands.",
  ]);

  const visibleProjects = projects.slice(0, 6);
  const selectedProject = projects.find((project) => project.slug === activeProject) ?? projects[0];
  const topZ = useMemo(() => Math.max(...windows.map((window) => window.z), 10), [windows]);
  const activeApp = useMemo(() => [...windows].filter((item) => item.open && !item.minimized).sort((a, b) => b.z - a.z)[0], [windows]);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" && locked) setLocked(false);
      if (event.key === "Escape" && !locked) {
        const active = [...windows].filter((item) => item.open && !item.minimized).sort((a, b) => b.z - a.z)[0];
        if (active) closeWindow(active.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, windows]);

  function focusWindow(id: AppId) {
    setWindows((items) => items.map((item) => item.id === id ? { ...item, z: topZ + 1, minimized: false } : item));
  }

  function openWindow(id: AppId) {
    setWindows((items) => items.map((item) => item.id === id
      ? { ...item, open: true, minimized: false, z: topZ + 1 }
      : item));
  }

  function closeWindow(id: AppId) {
    setWindows((items) => items.map((item) => item.id === id ? { ...item, open: false, minimized: false } : item));
  }

  function minimizeWindow(id: AppId) {
    setWindows((items) => items.map((item) => item.id === id ? { ...item, minimized: true } : item));
  }

  function maximizeWindow(id: AppId) {
    setWindows((items) => items.map((item) => item.id === id ? { ...item, maximized: !item.maximized, z: topZ + 1 } : item));
  }

  function startDrag(event: ReactPointerEvent<HTMLDivElement>, id: AppId) {
    if ((event.target as HTMLElement).closest("button") || window.innerWidth < 760) return;
    const targetWindow = windows.find((item) => item.id === id);
    if (!targetWindow || targetWindow.maximized) return;
    focusWindow(id);
    const startX = event.clientX;
    const startY = event.clientY;
    const originX = targetWindow.x;
    const originY = targetWindow.y;
    const node = event.currentTarget;
    node.setPointerCapture(event.pointerId);

    const onMove = (moveEvent: PointerEvent) => {
      const x = Math.max(12, Math.min(window.innerWidth - 260, originX + moveEvent.clientX - startX));
      const y = Math.max(42, Math.min(window.innerHeight - 140, originY + moveEvent.clientY - startY));
      setWindows((items) => items.map((item) => item.id === id ? { ...item, x, y } : item));
    };
    const onUp = () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerup", onUp);
    };
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerup", onUp);
  }

  function runCommand(event: FormEvent) {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setTerminalLines([]);
    } else {
      setTerminalLines((lines) => [...lines, `kassym@portfolio ~ % ${command}`, ...(commands[command] ?? [`zsh: command not found: ${command}`])]);
    }
    setTerminalInput("");
  }

  function unlock() {
    setLocked(false);
    window.setTimeout(() => openWindow("about"), 420);
  }

  return (
    <main className={`mac-shell theme-${theme}`}>
      <section className={`lock-screen ${locked ? "is-visible" : ""}`} aria-hidden={!locked}>
        <button className="lock-hitarea" onClick={unlock} aria-label="Unlock Kassym's portfolio">
          <div className="lock-date">{now?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) ?? "Loading"}</div>
          <div className="lock-time">{formatClock(now)}</div>
          <div className="lock-profile">
            <div className="lock-avatar">KY</div>
            <strong>Kassym Yermakhanbet</strong>
            <span>Full-stack &amp; AI product engineer</span>
            <small><span aria-hidden="true">↵</span> click to enter</small>
          </div>
        </button>
      </section>

      <section className="desktop" aria-label="Kassym portfolio desktop">
        <header className="menu-bar">
          <div className="menu-left">
            <button className="menu-mark" onClick={() => setLocked(true)} aria-label="Lock portfolio"><Command size={15} /></button>
            <button onClick={() => openWindow("about")}><strong>{activeApp?.title ?? "Kassym Yermakhanbet"}</strong></button>
            <button onClick={() => openWindow("work")}>File</button>
            <button onClick={() => activeApp && maximizeWindow(activeApp.id)}>View</button>
            <button onClick={() => openWindow("resume")}>Résumé</button>
            <button onClick={() => openWindow("contact")}>Contact</button>
          </div>
          <div className="menu-right">
            <a href="https://github.com/KassieIII" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={14} /></a>
            <a href="https://www.linkedin.com/in/kassym-yermakhanbet-635163235/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={14} /></a>
            <Wifi size={14} aria-hidden="true" />
            <BatteryFull size={16} aria-hidden="true" />
            <span>{now?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            <span>{formatClock(now)}</span>
            <button className="control-center-trigger" onClick={() => setControlCenter((open) => !open)} aria-label="Toggle Control Center"><SlidersHorizontal size={14} /></button>
          </div>
        </header>

        <div className="wallpaper-orb orb-one" aria-hidden="true" />
        <div className="wallpaper-orb orb-two" aria-hidden="true" />
        <div className="glass-ribbon" aria-hidden="true" />

        {controlCenter && (
          <aside className="control-center" aria-label="Control Center">
            <div className="control-toggles">
              <button className="is-on"><Wifi size={17} /><span><strong>Wi-Fi</strong><small>KY Network</small></span></button>
              <button className="is-on"><Sparkles size={17} /><span><strong>Focus</strong><small>Building</small></span></button>
            </div>
            <div className="control-slider"><Sun size={15} /><span><i style={{ width: "78%" }} /></span></div>
            <div className="control-slider"><Volume2 size={15} /><span><i style={{ width: "48%" }} /></span></div>
            <button className="control-theme" onClick={() => setTheme(theme === "midnight" ? "sky" : "midnight")}><Moon size={15} /> Toggle appearance</button>
          </aside>
        )}

        <div className="desktop-intro">
          <div className="eyebrow"><span className="online-dot" /> ASTANA NODE · AVAILABLE WORLDWIDE</div>
          <h1>Complex systems.<br /><em>Clear products.</em></h1>
          <p>I design and build SaaS, operational platforms and applied AI systems — from first workflow to production.</p>
          <button onClick={() => openWindow("work")}>Open selected work <ChevronRight size={16} /></button>
        </div>

        <div className="desktop-icons" aria-label="Desktop applications">
          {(Object.keys(appMeta) as AppId[]).map((id) => {
            const app = appMeta[id];
            const Icon = app.icon;
            return (
              <button key={id} className="desktop-icon" onClick={() => openWindow(id)} aria-label={`Open ${app.label}`}>
                <span className={`app-icon app-${app.tone}`}><Icon size={32} strokeWidth={1.6} /></span>
                <span>{app.label}</span>
              </button>
            );
          })}
        </div>

        <nav className="utility-rail" aria-label="Quick tools">
          <strong>KY.</strong>
          <button onClick={() => openWindow("work")} aria-label="Open work"><Folder size={15} /></button>
          <button onClick={() => openWindow("terminal")} aria-label="Open terminal"><TerminalSquare size={15} /></button>
          <button onClick={() => openWindow("contact")} aria-label="Open contact"><Mail size={15} /></button>
        </nav>

        <aside className="widget-stack" aria-label="Desktop widgets">
          <div className="theme-widget widget">
            <span>WALLPAPER</span>
            <strong>Choose a signal</strong>
            <div>
              {(["sky", "midnight", "sand"] as ThemeId[]).map((item) => (
                <button key={item} className={`theme-dot theme-${item} ${theme === item ? "active" : ""}`} onClick={() => setTheme(item)} aria-label={`Use ${item} theme`} />
              ))}
            </div>
          </div>
          <div className="status-widget widget">
            <div><span>LOCAL TIME</span><strong>{formatClock(now, true)}</strong></div>
            <div className="status-location"><MapPin size={14} /> Astana, Kazakhstan</div>
            <div className="availability"><span className="online-dot" /> Open for select product work</div>
          </div>
          <div className="shipping-widget widget">
            <span>NOW SHIPPING</span>
            <strong>AI-assisted products<br />that survive production.</strong>
            <div className="shipping-track"><i /></div>
            <small>PRODUCT · ENGINEERING · DELIVERY</small>
          </div>
        </aside>

        {windows.map((item) => item.open && !item.minimized && (
          <section
            className={`mac-window window-${item.id} ${item.maximized ? "is-maximized" : ""}`}
            key={item.id}
            style={item.maximized ? { zIndex: item.z } : { zIndex: item.z, transform: `translate3d(${item.x}px, ${item.y}px, 0)` }}
            onPointerDown={() => focusWindow(item.id)}
            role="dialog"
            aria-label={item.title}
          >
            <div className="window-titlebar" onDoubleClick={() => maximizeWindow(item.id)} onPointerDown={(event) => startDrag(event, item.id)}>
              <div className="traffic-lights">
                <button className="close" onClick={() => closeWindow(item.id)} aria-label={`Close ${item.title}`}><X size={9} /></button>
                <button className="minimize" onClick={() => minimizeWindow(item.id)} aria-label={`Minimize ${item.title}`}><Minus size={9} /></button>
                <button className="maximize" onClick={() => maximizeWindow(item.id)} aria-label={`${item.maximized ? "Restore" : "Maximize"} ${item.title}`}>{item.maximized ? <Minimize2 size={8} /> : <Maximize2 size={8} />}</button>
              </div>
              <span>{item.title}</span>
              <div className="titlebar-spacer" />
            </div>

            <div className="window-content">
              {item.id === "work" && selectedProject && (
                <div className="finder-layout">
                  <aside className="finder-sidebar">
                    <span>FAVORITES</span>
                    {visibleProjects.map((project) => (
                      <button key={project.slug} className={project.slug === selectedProject.slug ? "active" : ""} onClick={() => setActiveProject(project.slug)}>
                        <Folder size={15} fill="currentColor" /> {project.title}
                      </button>
                    ))}
                  </aside>
                  <div className="project-detail">
                    <div className={`project-visual tone-${selectedProject.tone}`}>
                      {selectedProject.preview && <Image src={selectedProject.preview} alt={`${selectedProject.title} project preview`} fill sizes="(max-width: 800px) 100vw, 720px" />}
                    </div>
                    <div className="project-copy">
                      <span>{selectedProject.eyebrow}</span>
                      <h2>{selectedProject.title}</h2>
                      <p>{selectedProject.description}</p>
                      <div className="tag-row">{selectedProject.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
                      <div className="project-links">
                        {selectedProject.demo && <a href={selectedProject.demo} target="_blank" rel="noreferrer">Live project <ExternalLink size={14} /></a>}
                        {selectedProject.github && <a href={selectedProject.github} target="_blank" rel="noreferrer">Source <Code2 size={14} /></a>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.id === "about" && (
                <div className="about-window">
                  <div className="about-portrait">
                    <div className="portrait-monogram">K/Y</div>
                    <span>PRODUCT SYSTEMS<br />ENGINEER</span>
                  </div>
                  <div className="about-text">
                    <span className="window-kicker">HELLO, I&apos;M KASSYM.</span>
                    <h2>I turn operational friction into deployed systems.</h2>
                    <p>Full-stack engineer with 4+ years across government platforms, real-time operations, SaaS and applied AI. I connect product judgment, interaction design and production engineering so useful ideas make it all the way to users.</p>
                    <div className="about-facts">
                      <div><span>Base</span><strong>Astana, KZ</strong></div>
                      <div><span>Focus</span><strong>SaaS &amp; AI systems</strong></div>
                      <div><span>Languages</span><strong>EN · RU · KZ · DE</strong></div>
                      <div><span>Experience</span><strong>4+ years</strong></div>
                    </div>
                    <button onClick={() => openWindow("contact")}>Start a conversation <Mail size={15} /></button>
                  </div>
                </div>
              )}

              {item.id === "resume" && (
                <div className="resume-window">
                  <div className="resume-toolbar">
                    <span>1 page selected</span>
                    <a href="/Kassym_Yermakhanbet_CV.pdf" target="_blank"><Download size={14} /> Download PDF</a>
                  </div>
                  <article className="resume-paper">
                    <header><div><span>KASSYM</span><strong>YERMAKHANBET</strong></div><p>Full-Stack &amp; AI Product Engineer<br />Astana · Remote worldwide</p></header>
                    <section><h3>Profile</h3><p>Product-minded engineer shipping typed APIs, internal platforms, real-time products and production-shaped AI systems.</p></section>
                    <section><h3>Experience</h3><div className="resume-row"><strong>Seven Hills LLP</strong><span>2025 — now</span><p>Product systems, OSINT tooling, real-time geolocation and applied AI.</p></div><div className="resume-row"><strong>Ministry of Internal Affairs</strong><span>2022 — 2024</span><p>Internal workflow software and regulated role-based systems.</p></div></section>
                    <section><h3>Core stack</h3><p>TypeScript · React · Next.js · Python · FastAPI · Go · PostgreSQL · Redis · Docker · AWS · Terraform · RAG</p></section>
                  </article>
                </div>
              )}

              {item.id === "terminal" && (
                <div className="terminal-window" onClick={(event) => (event.currentTarget.querySelector("input") as HTMLInputElement | null)?.focus()}>
                  <div className="terminal-output">
                    {terminalLines.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
                  </div>
                  <form onSubmit={runCommand}><label htmlFor="terminal-command">kassym@portfolio ~ %</label><input id="terminal-command" autoComplete="off" value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} /></form>
                </div>
              )}

              {item.id === "stack" && (
                <div className="stack-window">
                  <header><div className="chip"><Cpu size={28} /></div><div><span>KY WORKSTATION</span><h2>Technical System Profile</h2><p>Product engineering · Backend systems · Applied AI</p></div></header>
                  <div className="stack-groups">{stackGroups.map(([group, ...skills]) => <section key={group}><h3>{group}</h3><div>{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>)}</div>
                </div>
              )}

              {item.id === "contact" && (
                <div className="contact-window">
                  <aside><div className="contact-avatar">KY</div><strong>Kassym Yermakhanbet</strong><span>Available for select product work</span></aside>
                  <div className="contact-card">
                    <span className="window-kicker">LET&apos;S BUILD SOMETHING USEFUL</span>
                    <h2>Have a complex workflow?</h2>
                    <p>Tell me what is slow, risky or unnecessarily manual. I&apos;ll help turn it into a clear product.</p>
                    <a className="primary-contact" href="mailto:honormorethangold@gmail.com?subject=Product%20inquiry"><Mail size={17} /> honormorethangold@gmail.com</a>
                    <div className="contact-links">
                      <a href="https://github.com/KassieIII" target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a>
                      <a href="https://www.linkedin.com/in/kassym-yermakhanbet-635163235/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /> LinkedIn</a>
                      <a href="https://www.upwork.com/freelancers/~01f07d973e8bc9cf88" target="_blank" rel="noreferrer"><Globe2 size={17} /> Upwork</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}

        <nav className="dock" aria-label="Application dock">
          {(Object.keys(appMeta) as AppId[]).map((id) => {
            const app = appMeta[id];
            const Icon = app.icon;
            const appWindow = windows.find((window) => window.id === id);
            return <button key={id} className={appWindow?.minimized ? "is-minimized" : ""} onClick={() => openWindow(id)} aria-label={`Open ${app.label}`} data-label={appWindow?.minimized ? `Restore ${app.label}` : app.label}><span className={`dock-icon app-${app.tone}`}><Icon size={24} /></span>{appWindow?.open && <i />}</button>;
          })}
          <span className="dock-divider" />
          <a href="mailto:honormorethangold@gmail.com" aria-label="Email Kassym" data-label="Email"><span className="dock-icon app-green"><Mail size={24} /></span></a>
        </nav>

        <div className="desktop-signature"><Sparkles size={12} /> KY/OS · BUILT END TO END</div>
      </section>
    </main>
  );
}
