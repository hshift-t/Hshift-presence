import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { APPS, CYCLE_WORDS } from "./data/apps";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { AppCard } from "./components/AppCard";
import { PrivacyPage } from "./components/PrivacyPage";

function getViewFromPath(pathname = window.location.pathname) {
  const normalized = pathname.replace(/\/+$/, "");
  if (!normalized || normalized === "/") return "home";
  if (normalized === "/privacy-policy") return "privacy-policy";
  if (normalized === "/terms") return "terms";

  const parts = normalized.split("/");
  if (parts[1] === "privacy" && parts[2]) {
    const match = APPS.find((a) => a.id.toLowerCase() === parts[2].toLowerCase());
    return match ? match.id : "home";
  }

  return "home";
}

function getPrivacyPath(appId) {
  return `/privacy/${appId.toLowerCase()}`;
}

function PrivacyPolicyPage({ onBack }) {
  return (
    <div className="privacy-page">
      <nav className="nav">
        <div className="nav-mark">HShift</div>
        <div className="nav-links">
          <button onClick={onBack}>Home</button>
        </div>
      </nav>
      <div className="privacy-inner">
        <h1 className="compliance-title">Privacy Policy</h1>
        <div className="compliance-body">
          <h2>Overview</h2>
          <p>
            HShift builds small, focused Android applications. This privacy policy explains how we handle data across our suite of apps.
          </p>
          <h2>Data Collection</h2>
          <p>
            Most HShift apps operate entirely on-device and do not collect, store, or transmit personal data to external servers. Where data collection occurs (such as advertising identifiers via third-party SDKs), it is disclosed in the individual app privacy policy.
          </p>
          <h2>Third-Party Services</h2>
          <p>
            Certain apps may use Google AdMob for advertising. AdMob may collect device identifiers and usage data to serve ads. Refer to Google's Privacy &amp; Terms for details.
          </p>
          <h2>Children's Privacy</h2>
          <p>
            Our apps are not directed at children under 13. We do not knowingly collect data from children.
          </p>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>
          <h2>Contact</h2>
          <p>
            Questions? Reach us at{" "}
            <a href="mailto:hshift.support@gmail.com">hshift.support@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

function TermsPage({ onBack }) {
  return (
    <div className="compliance-page">
      <nav className="nav">
        <div className="nav-mark">HShift</div>
        <div className="nav-links">
          <button onClick={onBack}>Home</button>
        </div>
      </nav>
      <div className="compliance-inner">
        <h1 className="compliance-title">Terms of Service</h1>
        <div className="compliance-body">
          <h2>Acceptance</h2>
          <p>
            By downloading or using HShift applications, you agree to these terms. If you do not agree, do not use our apps.
          </p>
          <h2>Use of Apps</h2>
          <p>
            HShift apps are provided as-is for personal, non-commercial use. You may not reverse engineer, redistribute, or modify our applications.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            All content, trademarks, and design elements within HShift apps are the property of HShift and protected by applicable laws.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            HShift shall not be held liable for any damages arising from the use or inability to use our applications.
          </p>
          <h2>Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our apps after changes constitutes acceptance of the updated terms.
          </p>
          <h2>Contact</h2>
          <p>
            Questions? Reach us at{" "}
            <a href="mailto:hshift.support@gmail.com">hshift.support@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState(() => (typeof window !== "undefined" ? getViewFromPath(window.location.pathname) : "home"));
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute("data-idx");
            setVisibleCards((v) => ({ ...v, [idx]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [view]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const handlePopState = () => {
      setView(getViewFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const registerRef = useCallback((el, idx) => {
    cardRefs.current[idx] = el;
  }, []);

  const openPrivacy = useCallback((id) => {
    setView(id);
    window.history.pushState({}, "", getPrivacyPath(id));
  }, []);

  const goHome = useCallback(() => {
    setView("home");
    window.history.pushState({}, "", "/");
  }, []);

  const navigateTo = useCallback((path) => {
    setView(getViewFromPath(path));
    window.history.pushState({}, "", path);
  }, []);

  const activeApp = view !== "home" ? APPS.find((a) => a.id === view) : null;

  if (view === "privacy-policy") {
    return <PrivacyPolicyPage onBack={goHome} />;
  }

  if (view === "terms") {
    return <TermsPage onBack={goHome} />;
  }

  if (view !== "home" && activeApp) {
    return <PrivacyPage app={activeApp} onBack={goHome} />;
  }

  return (
    <div className="hshift-root">
      <nav className="nav">
        <div className="nav-mark">HShift</div>
        <div className="nav-links">
          <a href="#apps">Apps</a>
          <a href="mailto:hshift.support@gmail.com">Contact</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape" />
          <div className="hero-bg-shape" />
          <div className="hero-bg-shape" />
        </div>
        <div className="hero-inner">
          <p className={"hero-eyebrow" + (heroIn ? " in" : "")}>Studio Catalog</p>
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
            HShift builds small, focused Android apps that shift one habit at a time. No bloated accounts, no dashboards you didn&apos;t ask for.
          </p>
          <p className={"hero-meta" + (heroIn ? " in" : "")}>
            <span>04</span> apps featured · est. 2026
          </p>
          <div className={"hero-actions" + (heroIn ? " in" : "")}>
            <button
              className="scroll-cue"
              onClick={() => document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Apps
              <ChevronDown size={14} strokeWidth={2.5} />
            </button>
            <a
              className="btn-play-profile"
              href="https://play.google.com/store/apps/dev?id=9141698284631368361"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play Profile
              <ExternalLink size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </header>

      <section className="apps-section" id="apps">
        <p className="apps-eyebrow">The Catalog</p>
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
        <div className="footer-links">
          <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigateTo("/privacy-policy"); }}>
            Privacy
          </a>
          <a href="/terms" onClick={(e) => { e.preventDefault(); navigateTo("/terms"); }}>
            Terms
          </a>
          <a href="/app-ads.txt" target="_blank" rel="noopener noreferrer">
            App-Ads
          </a>
          <a href="mailto:hshift.support@gmail.com">
            Contact
          </a>
        </div>
        <span className="footer-copy">&copy; 2026 HShift</span>
      </footer>
    </div>
  );
}
