"use client";

import { useEffect, useState } from "react";

export default function SystemLayer() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setBooting(false), reduced ? 80 : 1150);

    const onScroll = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maximum > 0 ? window.scrollY / maximum : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress * 100}%`);
      document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 32);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
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
      <div className="screen-frame" aria-hidden="true">
        <i /><i /><i /><i />
        <span>KY_OS / SIGNAL STABLE</span>
        <b>2026.08 / ASTANA NODE</b>
      </div>
    </>
  );
}
