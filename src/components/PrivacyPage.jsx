import React from "react";
import { ArrowLeft } from "lucide-react";

export function PrivacyPage({ app, onBack }) {
  if (!app) return null;
  
  return (
    <div className="privacy-page">
      <div className="privacy-inner">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={16} strokeWidth={2.25} />
          Back to HShift
        </button>

        <div className="privacy-head">
          <div className="orbit-wrap orbit-wrap-lg" style={{ "--tone": app.tone }}>
            <span className="orbit-ring" />
            <span className="orbit-glyph">{app.glyph}</span>
          </div>
          <div>
            <p className="privacy-eyebrow">{app.catalog} · Privacy policy</p>
            <h1 className="privacy-title">{app.name}</h1>
          </div>
        </div>

        <p className="privacy-note">
          Thank you for choosing HShift's Application. 
        </p>

        <div className="privacy-sections">
          {app.privacy.sections.map((s, i) => (
            <div className="privacy-section" key={i}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </div>
          ))}
        </div>

        <div className="privacy-footer">
          <p>Questions about this policy? Reach us at <a href="mailto:hshift.support@gmail.com">hshift.support@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
