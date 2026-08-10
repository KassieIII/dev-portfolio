"use client";

import { useEffect, useState } from "react";

export default function SystemLayer() {
  const [booting, setBooting] = useState(true);
  const [cursor, setCursor] = useState({ x: -50, y: -50, active: false, visible: false });

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
      const active = Boolean(target?.closest("a, button, [data-cursor]"));
      setCursor({ x: event.clientX, y: event.clientY, active, visible: true });
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
      <div
        className={`system-cursor ${cursor.active ? "is-active" : ""} ${cursor.visible ? "is-visible" : ""}`}
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        aria-hidden="true"
      ><span /></div>
    </>
  );
}
