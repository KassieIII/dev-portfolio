"use client";

import { useEffect, useState } from "react";

export default function SystemLayer() {
  const [booting, setBooting] = useState(true);
  const [cursor, setCursor] = useState({ x: -80, y: -80, label: "", active: false, visible: false });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setBooting(false), reduced ? 80 : 1150);

    const onScroll = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maximum > 0 ? window.scrollY / maximum : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);
      document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 32);
    };

    const onPointerMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>("[data-cursor], a, button");
      const label = interactive?.dataset.cursor || (interactive?.tagName === "BUTTON" ? "SELECT" : interactive ? "OPEN" : "");
      setCursor({ x: event.clientX, y: event.clientY, label, active: Boolean(interactive), visible: true });
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <>
      <div className={`boot-screen ${booting ? "is-active" : "is-complete"}`} aria-hidden="true">
        <div className="boot-terminal">
          <div className="boot-wordmark">K/Y<span>®</span></div>
          <div className="boot-copy">
            <span>INITIALIZING PRODUCT SYSTEM</span>
            <span>LOADING SELECTED WORK / 08</span>
            <span>ASTANA NODE / ONLINE</span>
          </div>
          <div className="boot-progress"><i /></div>
          <small>PORTFOLIO OS — 2026.08</small>
        </div>
      </div>

      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <div className="pointer-aura" aria-hidden="true" />
      <div
        className={`system-cursor ${cursor.active ? "is-active" : ""} ${cursor.visible ? "is-visible" : ""}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        aria-hidden="true"
      ><span>{cursor.label}</span></div>
      <nav className="side-dock" aria-label="Quick section navigation">
        <span>SYS.NAV</span>
        <a href="/#top" data-cursor="TOP">01</a>
        <a href="/#work" data-cursor="WORK">02</a>
        <a href="/#capabilities" data-cursor="SKILLS">03</a>
        <a href="/#process" data-cursor="FLOW">04</a>
      </nav>
      <div className="screen-frame" aria-hidden="true">
        <i /><i /><i /><i />
        <span>KY_OS / SIGNAL STABLE</span>
        <b>2026.08 / ASTANA NODE</b>
      </div>
    </>
  );
}
