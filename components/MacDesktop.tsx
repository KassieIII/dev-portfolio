"use client";

import Image from "next/image";
import {
  BatteryFull,
  Bomb,
  BookOpen,
  BriefcaseBusiness,
  CloudSun,
  Code2,
  Command,
  ContactRound,
  Crown,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Folder,
  Globe2,
  HardDrive,
  Images,
  Mail,
  MapPin,
  Maximize2,
  Minimize2,
  Minus,
  Moon,
  Music,
  Paintbrush,
  SlidersHorizontal,
  Sparkles,
  StickyNote,
  Sun,
  TerminalSquare,
  UserRound,
  Volume2,
  Wifi,
  X,
} from "lucide-react";
import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import ChessApp from "@/components/apps/ChessApp";
import MusicApp, { MusicWidget } from "@/components/apps/MusicApp";
import { MusicProvider, useMusic } from "@/components/apps/MusicSystem";
import PaintApp from "@/components/apps/PaintApp";
import PhotosApp from "@/components/apps/PhotosApp";
import MinesweeperApp from "@/components/apps/MinesweeperApp";
import NotebookApp from "@/components/apps/NotebookApp";
import StickyNotesApp from "@/components/apps/StickyNotesApp";
import FilesApp from "@/components/apps/FilesApp";

type AppId = "files" | "work" | "about" | "resume" | "terminal" | "stack" | "contact" | "paint" | "photos" | "chess" | "music" | "notebook" | "stickies" | "mines";
type ThemeId = "sky" | "midnight" | "sand";

type DesktopWindow = {
  id: AppId;
  title: string;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  minimizing: boolean;
  z: number;
  x: number;
  y: number;
};

const appMeta: Record<AppId, { title: string; label: string; icon: typeof Folder; tone: string }> = {
  files: { title: "KY Drive", label: "Files", icon: HardDrive, tone: "files" },
  work: { title: "Selected Work", label: "Projects", icon: Folder, tone: "blue" },
  about: { title: "About Kassym", label: "About Me", icon: UserRound, tone: "violet" },
  resume: { title: "Kassym — Résumé", label: "Résumé", icon: FileText, tone: "paper" },
  terminal: { title: "kassym@portfolio — zsh", label: "Terminal", icon: TerminalSquare, tone: "dark" },
  stack: { title: "System Profiler", label: "Tech Stack", icon: Cpu, tone: "orange" },
  contact: { title: "Contact Kassym", label: "Contacts", icon: ContactRound, tone: "green" },
  paint: { title: "KY Paint", label: "Paint", icon: Paintbrush, tone: "pink" },
  photos: { title: "Photos", label: "Photos", icon: Images, tone: "violet" },
  chess: { title: "Chess", label: "Chess", icon: Crown, tone: "chess" },
  music: { title: "Music — KY Mix", label: "Music", icon: Music, tone: "music" },
  notebook: { title: "Notebook", label: "Notebook", icon: BookOpen, tone: "notebook" },
  stickies: { title: "Sticky Notes", label: "Stickies", icon: StickyNote, tone: "sticky" },
  mines: { title: "KY Mines", label: "Mines", icon: Bomb, tone: "mines" },
};

const initialWindows: DesktopWindow[] = [
  { id: "files", title: appMeta.files.title, open: false, minimized: false, maximized: false, minimizing: false, z: 2, x: 70, y: 52 },
  { id: "work", title: appMeta.work.title, open: false, minimized: false, maximized: false, minimizing: false, z: 3, x: 70, y: 52 },
  { id: "about", title: appMeta.about.title, open: false, minimized: false, maximized: false, minimizing: false, z: 4, x: 90, y: 58 },
  { id: "resume", title: appMeta.resume.title, open: false, minimized: false, maximized: false, minimizing: false, z: 5, x: 120, y: 48 },
  { id: "terminal", title: appMeta.terminal.title, open: false, minimized: false, maximized: false, minimizing: false, z: 6, x: 130, y: 90 },
  { id: "stack", title: appMeta.stack.title, open: false, minimized: false, maximized: false, minimizing: false, z: 7, x: 110, y: 62 },
  { id: "contact", title: appMeta.contact.title, open: false, minimized: false, maximized: false, minimizing: false, z: 8, x: 150, y: 72 },
  { id: "paint", title: appMeta.paint.title, open: false, minimized: false, maximized: false, minimizing: false, z: 9, x: 70, y: 48 },
  { id: "photos", title: appMeta.photos.title, open: false, minimized: false, maximized: false, minimizing: false, z: 10, x: 80, y: 50 },
  { id: "chess", title: appMeta.chess.title, open: false, minimized: false, maximized: false, minimizing: false, z: 11, x: 90, y: 48 },
  { id: "music", title: appMeta.music.title, open: false, minimized: false, maximized: false, minimizing: false, z: 12, x: 110, y: 54 },
  { id: "notebook", title: appMeta.notebook.title, open: false, minimized: false, maximized: false, minimizing: false, z: 13, x: 120, y: 58 },
  { id: "stickies", title: appMeta.stickies.title, open: false, minimized: false, maximized: false, minimizing: false, z: 14, x: 130, y: 58 },
  { id: "mines", title: appMeta.mines.title, open: false, minimized: false, maximized: false, minimizing: false, z: 15, x: 150, y: 48 },
];

const initialIconPositions = Object.fromEntries((Object.keys(appMeta) as AppId[]).map((id, index) => [id, { x: 62 + Math.floor(index / 5) * 88, y: 62 + (index % 5) * 78 }])) as Record<AppId, { x: number; y: number }>;

const stackGroups = [
  ["Interface", "TypeScript", "React", "Next.js", "Vue.js"],
  ["Backend", "Python", "FastAPI", "Go", "Node.js"],
  ["Data", "PostgreSQL", "pgvector", "Redis", "DynamoDB"],
  ["AI systems", "RAG", "Ollama", "LLM gateways", "Evaluation"],
  ["Delivery", "Docker", "AWS", "Terraform", "GitHub Actions"],
];

const commands: Record<string, string[]> = {
  help: ["KY/OS commands:", "about · skills · projects · contact · socials · neofetch", "date · uptime · pwd · ls · cat resume.txt · fortune", "open <app> · theme <sky|midnight|sand> · echo <text> · clear"],
  about: ["Kassym Yermakhanbet", "Full-stack & AI product engineer · Astana, Kazakhstan", "Building clear products from complex operational workflows."],
  skills: ["TypeScript / React / Next.js", "Python / FastAPI / Go", "PostgreSQL / Redis / AWS", "RAG / LLM infrastructure / product engineering"],
  projects: ["01 Seven Hills Visual CMS", "02 ProposalFlow", "03 Olzhas Stroy", "04 Citation-grounded RAG", "Run the Projects app for the complete archive."],
  contact: ["honormorethangold@gmail.com", "github.com/KassieIII", "LinkedIn: kassym-yermakhanbet-635163235"],
  socials: ["GitHub     github.com/KassieIII", "HuggingFace huggingface.co/KassieIII", "LinkedIn   kassym-yermakhanbet-635163235", "Upwork     ~01f07d973e8bc9cf88"],
  pwd: ["/Users/kassym/portfolio"],
  ls: ["Applications/  Projects/  resume.txt  skills.json  contact.vcf"],
  "cat resume.txt": ["Kassym Yermakhanbet — Full-Stack & AI Product Engineer", "4+ years · SaaS · applied AI · production systems", "Open the Résumé app for the complete profile."],
  neofetch: ["  KY/OS  1.2.0", "  Host   Astana Workstation", "  Stack  Next.js · Python · Go · AWS · RAG", "  Uptime Shipping useful systems since 2022", "  Theme  Violet Glass"],
  fortune: ["The best interface is the one that makes a hard system feel obvious."],
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

export default function MacDesktop() { return <MusicProvider><DesktopCore /></MusicProvider>; }

function DesktopCore() {
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
  const [iconPositions, setIconPositions] = useState(initialIconPositions);
  const [weather, setWeather] = useState<Record<string, { temperature: number; wind: number }>>({});
  const [brightness, setBrightness] = useState(78);
  const { volume, setVolume } = useMusic();
  const [wifiOn, setWifiOn] = useState(true);
  const [focusOn, setFocusOn] = useState(true);
  const draggedIcon = useRef<AppId | null>(null);
  const minimizeTimers = useRef<Partial<Record<AppId, number>>>({});

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
    const cities = [{ name: "Astana", lat: 51.1694, lon: 71.4491 }, { name: "Berlin", lat: 52.52, lon: 13.405 }, { name: "Tokyo", lat: 35.6762, lon: 139.6503 }, { name: "New York", lat: 40.7128, lon: -74.006 }];
    Promise.all(cities.map(async (city) => { const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,wind_speed_10m&timezone=auto`); const data = await response.json(); return [city.name, { temperature: Math.round(data.current.temperature_2m), wind: Math.round(data.current.wind_speed_10m) }] as const; }))
      .then((items) => setWeather(Object.fromEntries(items))).catch(() => setWeather({}));
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
    if (minimizeTimers.current[id]) window.clearTimeout(minimizeTimers.current[id]);
    setWindows((items) => items.map((item) => item.id === id
      ? { ...item, open: true, minimized: false, minimizing: false, maximized: item.open ? item.maximized : false, z: topZ + 1 }
      : item));
  }

  function closeWindow(id: AppId) {
    if (minimizeTimers.current[id]) window.clearTimeout(minimizeTimers.current[id]);
    setWindows((items) => items.map((item) => item.id === id ? { ...item, open: false, minimized: false, minimizing: false } : item));
  }

  function finishMinimize(id: AppId) {
    if (minimizeTimers.current[id]) window.clearTimeout(minimizeTimers.current[id]);
    delete minimizeTimers.current[id];
    setWindows((items) => items.map((item) => item.id === id && item.minimizing ? { ...item, minimizing: false, minimized: true } : item));
  }

  function minimizeWindow(id: AppId) {
    setWindows((items) => items.map((item) => item.id === id ? { ...item, minimizing: true } : item));
    minimizeTimers.current[id] = window.setTimeout(() => finishMinimize(id), 720);
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

  function startIconDrag(event: ReactPointerEvent<HTMLButtonElement>, id: AppId) {
    if (window.innerWidth < 760) return;
    draggedIcon.current = null;
    const start = iconPositions[id];
    const origin = { x: event.clientX, y: event.clientY };
    let moved = false;
    const node = event.currentTarget;
    node.setPointerCapture(event.pointerId);
    const onMove = (moveEvent: PointerEvent) => {
      if (Math.abs(moveEvent.clientX - origin.x) + Math.abs(moveEvent.clientY - origin.y) > 5) { moved = true; draggedIcon.current = id; }
      setIconPositions((positions) => ({ ...positions, [id]: { x: Math.max(50, Math.min(window.innerWidth - 120, start.x + moveEvent.clientX - origin.x)), y: Math.max(52, Math.min(window.innerHeight - 150, start.y + moveEvent.clientY - origin.y)) } }));
    };
    const onUp = () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerup", onUp);
      if (moved) window.setTimeout(() => { if (draggedIcon.current === id) draggedIcon.current = null; }, 0);
    };
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerup", onUp);
  }

  function runCommand(event: FormEvent) {
    event.preventDefault();
    const raw = terminalInput.trim();
    const command = raw.toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setTerminalLines([]);
    } else if (command === "date") {
      setTerminalLines((lines) => [...lines, `kassym@portfolio ~ % ${raw}`, new Date().toString()]);
    } else if (command === "uptime") {
      setTerminalLines((lines) => [...lines, `kassym@portfolio ~ % ${raw}`, `up ${Math.max(1, Math.floor(performance.now() / 60000))} minutes · load average 0.42 0.31 0.26`]);
    } else if (command.startsWith("echo ")) {
      setTerminalLines((lines) => [...lines, `kassym@portfolio ~ % ${raw}`, raw.slice(5)]);
    } else if (command.startsWith("open ")) {
      const target = command.slice(5) as AppId;
      if (target in appMeta) { openWindow(target); setTerminalLines((lines) => [...lines, `kassym@portfolio ~ % ${raw}`, `Opening ${appMeta[target].title}…`]); }
      else setTerminalLines((lines) => [...lines, `kassym@portfolio ~ % ${raw}`, `open: application not found: ${target}`]);
    } else if (command.startsWith("theme ")) {
      const next = command.slice(6) as ThemeId;
      if (["sky", "midnight", "sand"].includes(next)) { setTheme(next); setTerminalLines((lines) => [...lines, `kassym@portfolio ~ % ${raw}`, `Theme changed to ${next}.`]); }
      else setTerminalLines((lines) => [...lines, `kassym@portfolio ~ % ${raw}`, "Available themes: sky, midnight, sand"]);
    } else {
      setTerminalLines((lines) => [...lines, `kassym@portfolio ~ % ${raw}`, ...(commands[command] ?? [`zsh: command not found: ${command}`])]);
    }
    setTerminalInput("");
  }

  function unlock() {
    setLocked(false);
  }

  return (
    <main className={`mac-shell theme-${theme}`}>
      <section className={`lock-screen ${locked ? "is-visible" : ""}`} aria-hidden={!locked}>
        <button className="lock-hitarea" onClick={unlock} aria-label="Unlock Kassym's portfolio">
          <div className="lock-date">{now?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) ?? "Loading"}</div>
          <div className="lock-time">{formatClock(now)}</div>
          <div className="lock-profile">
            <div className="lock-avatar"><Image src="/profile-kassym.png" alt="Kassym Yermakhanbet" fill sizes="70px" loading="eager" /></div>
            <strong>Kassym Yermakhanbet</strong>
            <span>Full-stack &amp; AI product engineer</span>
            <small><span aria-hidden="true">↵</span> click to enter</small>
          </div>
        </button>
      </section>

      <section className="desktop" aria-label="Kassym portfolio desktop">
        <div className="brightness-shade" style={{ opacity: Math.max(0, (100 - brightness) / 125) }} aria-hidden="true" />
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
              <button className={wifiOn ? "is-on" : ""} onClick={() => setWifiOn((value) => !value)}><Wifi size={17} /><span><strong>Wi-Fi</strong><small>{wifiOn ? "KY Network" : "Off"}</small></span></button>
              <button className={focusOn ? "is-on" : ""} onClick={() => setFocusOn((value) => !value)}><Sparkles size={17} /><span><strong>Focus</strong><small>{focusOn ? "Building" : "Off"}</small></span></button>
            </div>
            <label className="control-slider"><Sun size={15} /><input aria-label="Brightness" type="range" min="20" max="100" value={brightness} onChange={(event) => setBrightness(Number(event.target.value))} style={{ backgroundSize: `${brightness}% 100%` }} /></label>
            <label className="control-slider"><Volume2 size={15} /><input aria-label="Volume" type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} style={{ backgroundSize: `${volume}% 100%` }} /></label>
            <button className="control-theme" onClick={() => setTheme(theme === "midnight" ? "sky" : "midnight")}><Moon size={15} /> Toggle appearance</button>
          </aside>
        )}

        <button className="desktop-profile-card" onClick={() => openWindow("about")} aria-label="Open Kassym profile">
          <span className="desktop-profile-photo"><Image src="/profile-kassym.png" alt="" fill sizes="52px" loading="eager" /></span>
          <span><strong>Kassym Yermakhanbet</strong><small>Full-stack &amp; AI product engineer</small></span>
        </button>

        <div className="desktop-icons" aria-label="Draggable desktop applications">
          {(Object.keys(appMeta) as AppId[]).map((id) => {
            const app = appMeta[id];
            const Icon = app.icon;
            return (
              <button key={id} className="desktop-icon" style={{ transform: `translate3d(${iconPositions[id].x}px, ${iconPositions[id].y}px, 0)` }} onPointerDown={(event) => startIconDrag(event, id)} onClick={() => { if (draggedIcon.current !== id) openWindow(id); }} aria-label={`Open or drag ${app.label}`}>
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

        <MusicWidget onOpen={() => openWindow("music")} />

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
          <div className="world-weather widget">
            <header><span>WORLD WEATHER</span><CloudSun size={16} /></header>
            <div>{["Astana", "Berlin", "Tokyo", "New York"].map((city) => <article key={city}><span>{city}</span><strong>{weather[city] ? `${weather[city].temperature}°` : "--°"}</strong><small>{weather[city] ? `${weather[city].wind} km/h` : "Updating"}</small></article>)}</div>
          </div>
          <div className="shipping-widget widget">
            <span>NOW SHIPPING</span>
            <strong>AI-assisted products<br />that survive production.</strong>
            <div className="shipping-track"><i /></div>
            <small>PRODUCT · ENGINEERING · DELIVERY</small>
          </div>
        </aside>

        {windows.map((item) => item.open && (!item.minimized || item.minimizing) && (
          <section
            className={`mac-window window-${item.id} ${item.maximized ? "is-maximized" : ""} ${item.minimizing ? "is-minimizing" : ""}`}
            key={item.id}
            style={item.maximized ? { zIndex: item.z } : { zIndex: item.z, transform: `translate3d(${item.x}px, ${item.y}px, 0)` }}
            onPointerDown={() => focusWindow(item.id)}
            onAnimationEnd={() => { if (item.minimizing) finishMinimize(item.id); }}
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
                    <Image src="/profile-kassym.png" alt="Portrait of Kassym Yermakhanbet" fill sizes="340px" loading="eager" />
                    <div className="portrait-shade" />
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
                    <span>Full professional profile · updated 2026</span>
                    <a href="/Kassym_Yermakhanbet_CV.pdf" target="_blank"><Download size={14} /> Download PDF</a>
                  </div>
                  <article className="resume-paper">
                    <header><div><span>KASSYM</span><strong>YERMAKHANBET</strong></div><p>Full-Stack &amp; AI Product Engineer<br />Astana · Remote worldwide<br />honormorethangold@gmail.com</p></header>
                    <section><h3>Profile</h3><p>Backend / full-stack engineer with 4+ years shipping typed APIs, internal platforms and AI-integrated products. Hands-on with production-shaped RAG, LLM-serving infrastructure, AWS serverless pipelines, async FastAPI services, Go concurrency tooling and Next.js / Vue front-ends. Strong on observability, Docker, CI and measurable delivery.</p></section>
                    <section><h3>Featured engineering</h3>
                      <div className="resume-row"><strong>rag-docs — Citation-grounded RAG</strong><span>2025</span><p>pgvector HNSW retrieval, local LLMs, cross-encoder reranking and a 25-question evaluation harness with recall@5 = 1.00.</p></div>
                      <div className="resume-row"><strong>llm-gateway — OpenAI-compatible gateway</strong><span>2026</span><p>Per-key auth, atomic Redis rate limiting, caching, provider fallback, SSE streaming, usage accounting and Prometheus metrics.</p></div>
                      <div className="resume-row"><strong>aws-serverless-ingest</strong><span>2026</span><p>Terraform-defined S3 → SQS → Lambda → DynamoDB pipeline with partial-batch retries, DLQ and least-privilege IAM.</p></div>
                    </section>
                    <section><h3>Experience</h3><div className="resume-row"><strong>Software Development Specialist · Seven Hills LLP</strong><span>2025 — now</span><p>Built real-time geolocation, OSINT intelligence workflows, AI integrations and a self-hosted visual CMS/CRM platform. Standardised typed Python, async SQLAlchemy, Docker and GitHub Actions delivery.</p></div><div className="resume-row"><strong>Software Developer · Ministry of Internal Affairs</strong><span>2022 — 2024</span><p>Designed CRM and role-based internal systems, modernised legacy components and delivered software under government security requirements.</p></div></section>
                    <section><h3>Technical stack</h3><p><strong>Frontend:</strong> TypeScript, React, Next.js, Vue.js · <strong>Backend:</strong> Python, FastAPI, Django, SQLAlchemy, Go, Node.js · <strong>Data:</strong> PostgreSQL, pgvector, Redis, MongoDB · <strong>AI:</strong> RAG, embeddings, reranking, Ollama, eval harnesses · <strong>Cloud:</strong> AWS, Terraform, Docker, GitHub Actions, Prometheus.</p></section>
                    <section><h3>Education &amp; languages</h3><p>BSc Computer Engineering &amp; Software — IITU, 2022 · Bachelor of Laws — Taraz Regional University, 2024.<br />English C1 · Russian native · Kazakh native · German conversational.</p></section>
                  </article>
                </div>
              )}

              {item.id === "terminal" && (
                <div className="terminal-window" onClick={(event) => (event.currentTarget.querySelector("input") as HTMLInputElement | null)?.focus()}>
                  <div className="terminal-output">
                    {terminalLines.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
                  </div>
                  <form onSubmit={runCommand}><label htmlFor="terminal-command">kassym@portfolio ~ %</label><input id="terminal-command" autoComplete="off" value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} /><button type="submit">Run</button></form>
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
                  <aside><div className="contact-avatar"><Image src="/profile-kassym.png" alt="Kassym" fill sizes="84px" /></div><strong>Kassym Yermakhanbet</strong><span>Available for select product work</span></aside>
                  <div className="contact-card">
                    <span className="window-kicker">LET&apos;S BUILD SOMETHING USEFUL</span>
                    <h2>Have a complex workflow?</h2>
                    <p>Tell me what is slow, risky or unnecessarily manual. I&apos;ll help turn it into a clear product.</p>
                    <a className="primary-contact" href="mailto:honormorethangold@gmail.com?subject=Product%20inquiry"><Mail size={17} /> honormorethangold@gmail.com</a>
                    <div className="contact-links">
                      <a href="https://github.com/KassieIII" target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a>
                      <a href="https://www.linkedin.com/in/kassym-yermakhanbet-635163235/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /> LinkedIn</a>
                      <a href="https://www.upwork.com/freelancers/~01f07d973e8bc9cf88" target="_blank" rel="noreferrer"><Globe2 size={17} /> Upwork</a>
                      <a href="https://huggingface.co/KassieIII" target="_blank" rel="noreferrer"><Sparkles size={17} /> Hugging Face</a>
                    </div>
                  </div>
                </div>
              )}

              {item.id === "paint" && <PaintApp />}
              {item.id === "files" && <FilesApp />}
              {item.id === "photos" && <PhotosApp />}
              {item.id === "chess" && <ChessApp />}
              {item.id === "music" && <MusicApp />}
              {item.id === "notebook" && <NotebookApp />}
              {item.id === "stickies" && <StickyNotesApp />}
              {item.id === "mines" && <MinesweeperApp />}
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
