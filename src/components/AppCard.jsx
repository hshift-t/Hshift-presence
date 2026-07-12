import React, { useRef, useState } from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export const AppCard = React.memo(function AppCard({ app, index, visible, onOpenPrivacy, registerRef }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    // Tilt effect
    const tiltX = (py - 0.5) * -10; // Slightly more pronounced tilt
    const tiltY = (px - 0.5) * 12;
    el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
    
    // Glow effect position
    setMousePos({ x: px * 100, y: py * 100 });
  };
  
  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        registerRef(el, index);
      }}
      data-idx={index}
      className={"app-card" + (visible ? " is-visible" : "")}
      style={{ 
        transitionDelay: visible ? `${index * 80}ms` : "0ms", 
        "--tone": app.tone,
        "--mouse-x": `${mousePos.x}%`,
        "--mouse-y": `${mousePos.y}%`
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="app-card-glow" />
      <div className="app-card-border" />
      <div className="app-card-content">
        <div className="app-card-top">
          <div className="orbit-wrap">
            <span className="orbit-ring" />
            <span className="orbit-glyph">{app.glyph}</span>
          </div>
          <span className="app-catalog">{app.catalog}</span>
        </div>

        <span className="app-category">{app.category}</span>
        <h3 className="app-name">{app.name}</h3>
        <p className="app-tagline">{app.tagline}</p>

        <div className="app-actions">
          <a
            className="app-link app-link-primary"
            href={app.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get it on Google Play
            <ArrowUpRight size={14} strokeWidth={2.25} />
          </a>
          <a
            className="app-link app-link-ghost"
            href={`/privacy/${app.id.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenPrivacy(app.id);
            }}
          >
            <ShieldCheck size={14} strokeWidth={2.25} />
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
});
