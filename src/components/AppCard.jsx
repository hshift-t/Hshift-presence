import React, { useRef } from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export const AppCard = React.memo(function AppCard({ app, index, visible, onOpenPrivacy, registerRef }) {
  const cardRef = useRef(null);

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
      }}
    >
      <div className="app-card-content">
        <div className="app-card-top">
          <div className="app-icon-wrap">
            <span className="app-icon-glyph">{app.glyph}</span>
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
            Get on Google Play
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </a>
          <a
            className="app-link app-link-ghost"
            href={`/privacy/${app.id.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenPrivacy(app.id);
            }}
          >
            <ShieldCheck size={13} strokeWidth={2.5} />
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
});
