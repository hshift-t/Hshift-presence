import React from "react";

export function PrivacyPage({ app, onBack }) {
  if (!app) return null;

  return (
    <div className="privacy-page">
      <nav className="nav">
        <div className="nav-mark">HShift</div>
        <div className="nav-links">
          <button onClick={onBack}>Home</button>
        </div>
      </nav>
      <div className="privacy-inner">
        <button className="back-link" onClick={onBack}>
          &larr; Back
        </button>

        <div className="privacy-head">
          <div className="privacy-icon">{app.glyph}</div>
          <div>
            <p className="privacy-eyebrow">{app.catalog} &middot; Privacy Policy</p>
            <h1 className="privacy-title">{app.name}</h1>
          </div>
        </div>

        <p className="privacy-note">
          Thank you for choosing {app.name} by HShift.
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
          <p>
            Questions? Reach us at{" "}
            <a href="mailto:hshift.support@gmail.com">hshift.support@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
