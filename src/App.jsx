import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Mail } from "lucide-react";
import { APPS, CYCLE_WORDS } from "./data/apps";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { GalaxyCanvas } from "./components/GalaxyCanvas";
import { AppCard } from "./components/AppCard";
import { PrivacyPage } from "./components/PrivacyPage";

export default function App() {
  const [view, setView] = useState("home");
  const [wordIndex, setWordIndex] = useState(0);
  const [heroIn, setHeroIn] = useState(false);
  const [visibleCards, setVisibleCards] = useState({});
  const cardRefs = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % CYCLE_WORDS.length);
    }, 2100);
    return () => clearInterval(id);
  }, [reducedMotion]);

  useEffect(() => {
    if (view !== "home") return;

    // Disconnect observer once all cards are visible for performance
    const observer = new IntersectionObserver(
      (entries) => {
        let anyVisible = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute("data-idx");
            setVisibleCards((v) => ({ ...v, [idx]: true }));
            anyVisible = true;
          }
        });

        // Optional: you could disconnect here if you confirm all indices are true,
        // but it's okay to just leave it as it triggers very little overhead.
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Use useCallback so we don't re-create these constantly
  const registerRef = useCallback((el, idx) => {
    cardRefs.current[idx] = el;
  }, []);

  const openPrivacy = useCallback((id) => setView(id), []);
  const goHome = useCallback(() => setView("home"), []);

  const activeApp = view !== "home" ? APPS.find((a) => a.id === view) : null;

  return (
    <div className="hshift-root">
      {view === "home" ? (
        <>
          <nav className="nav">
            <div className="nav-mark">HShift</div>
            <div className="nav-links">
              <a href="#apps">Apps</a>
              <a href="mailto:hshift.support@gmail.com">Contact</a>
            </div>
          </nav>

          <header className="hero">
            <GalaxyCanvas reducedMotion={reducedMotion} />
            <div className="hero-inner">
              <p className={"hero-eyebrow" + (heroIn ? " in" : "")}>Studio catalog — HShift</p>
              <h1 className={"hero-line" + (heroIn ? " in" : "")}>Small apps,</h1>
              <h1 className={"hero-line delay-1" + (heroIn ? " in" : "")}>
                quietly{" "}
                <span className="word-shift">
                  <span className="word-shift-inner" key={wordIndex}>
                    {CYCLE_WORDS[wordIndex]}
                  </span>
                </span>{" "}
                into place.
              </h1>
              <p className={"hero-sub" + (heroIn ? " in" : "")}>
                HShift charts small, unglamorous apps that shift one habit at a time — no bloated accounts, no dashboards you didn't ask for.
              </p>
              <p className={"hero-meta" + (heroIn ? " in" : "")}>
                <span>04</span> apps featured · est. 2026
              </p>
              <button
                className={"scroll-cue" + (heroIn ? " in" : "")}
                onClick={() => document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Apps
                <ChevronDown size={14} strokeWidth={2.25} />
              </button>
            </div>
          </header>

          <section className="apps-section" id="apps">
            <p className="apps-eyebrow">The catalog</p>
            <h2 className="apps-heading">Four entries charted so far. More in orbit.</h2>
            <div className="apps-grid">
              {APPS.map((app, i) => (
                <AppCard
                  key={app.id}
                  app={app}
                  index={i}
                  visible={!!visibleCards[i]}
                  onOpenPrivacy={openPrivacy}
                  registerRef={registerRef}
                />
              ))}
            </div>
          </section>

          <footer className="footer">
            <span className="footer-mark">HShift</span>
            <a className="footer-contact" href="mailto:hello@hshift.app">
              <Mail size={14} strokeWidth={2.25} />
              hshift.support@gmail.com
            </a>
            <span className="footer-copy">© 2026 HShift. All rights reserved.</span>
          </footer>
        </>
      ) : (
        <PrivacyPage app={activeApp} onBack={goHome} />
      )}
    </div>
  );
}
