import React from 'react';

/*
  HelpCenter (v2) — amber-tinted glass help card
  ──────────────────────────────────────────────
  Matches the drawer's contact card: amber glass panel, amber
  gradient call button, muted email line. Content unchanged.
*/

const hcStyles = `
  .hc-card {
    background: rgba(255, 179, 0, 0.09);
    border: 1px solid rgba(255, 179, 0, 0.28);
    border-radius: 20px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    text-align: center;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }
  .hc-blob {
    position: absolute; width: 190px; height: 190px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 179, 0, 0.22) 0%, transparent 70%);
    bottom: -50px; right: -50px; pointer-events: none;
  }
  .hc-inner { position: relative; z-index: 1; }
  .hc-title {
    font-family: 'Sora', sans-serif;
    font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 4px;
  }
  .hc-sub {
    font-size: 12px; color: rgba(255,255,255,0.62);
    margin-bottom: 1.25rem; line-height: 1.5;
  }
  .hc-phone-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: linear-gradient(180deg, #ffc233 0%, var(--accent, #ffb300) 60%);
    color: #241a00;
    border: none; border-radius: 13px;
    padding: 12px 16px; width: 100%; margin-bottom: 10px;
    font-family: 'Sora', sans-serif;
    font-size: 14px; font-weight: 800; letter-spacing: 0.2px;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 6px 18px rgba(255, 179, 0, 0.32);
    transition: filter 0.15s, transform 0.1s;
  }
  .hc-phone-btn:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    color: #241a00; text-decoration: none;
  }
  .hc-phone-btn svg { width: 16px; height: 16px; }
  .hc-divider {
    font-size: 11px; color: rgba(255,255,255,0.35); margin: 8px 0;
  }
  .hc-email {
    font-size: 12.5px; font-weight: 600;
    color: rgba(255,255,255,0.8); margin-top: 6px;
  }
`;

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13.5 19.79 19.79 0 0 1 1 4.82 2 2 0 0 1 2.98 2.63h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18"/>
  </svg>
);

export default function HelpCenter() {
  return (
    <div className="hc-card">
      <style>{hcStyles}</style>
      <div className="hc-blob" />
      <div className="hc-inner">
        <div className="hc-title">Need assistance?</div>
        <div className="hc-sub">Our support team is ready to help you anytime.</div>
        <a href="tel:+919355753537" className="hc-phone-btn">
          <IconPhone /> +91 9355753537
        </a>
        <div className="hc-divider">or reach us at</div>
        <div className="hc-email">customercare@salarytopup.com</div>
      </div>
    </div>
  );
}