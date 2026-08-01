import React from 'react'

const styles = `
  .cu-wrap {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  .cu-item {
    display: flex; align-items: center; gap: 9px;
    padding: 10px 16px;
    background: #f7f9fc;
    border: 1.5px solid #e8eef7;
    border-radius: 12px;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
    font-family: 'Sora', sans-serif;
    flex: 1; min-width: 180px;
  }
  .cu-item:hover {
    border-color: #b8cce8;
    background: #fff;
    box-shadow: 0 2px 10px rgba(15,28,46,0.07);
    text-decoration: none;
  }
  .cu-icon {
    width: 32px; height: 32px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .cu-icon svg { width: 15px; height: 15px; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .cu-icon.phone { background: rgba(249,115,22,0.12); }
  .cu-icon.phone svg { stroke: #F97316; }
  .cu-icon.mail  { background: rgba(55,138,221,0.12); }
  .cu-icon.mail svg  { stroke: #378ADD; }
  .cu-label { font-size: 10px; color: #9aaabb; font-weight: 500; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 1px; }
  .cu-val   { font-size: 13px; font-weight: 600; color: #0f1c2e; white-space: nowrap; }

  @media (max-width: 400px) {
    .cu-item { min-width: 100%; }
  }
`;

const IconPhone = () => (
  <svg viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13.5 19.79 19.79 0 0 1 1 4.82 2 2 0 0 1 2.98 2.63h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function ConnectUs() {
  return (
    <>
      <style>{styles}</style>
      <div className="cu-wrap">
        <a href="tel:+919355753537" className="cu-item">
          <div className="cu-icon phone"><IconPhone /></div>
          <div>
            <div className="cu-label">Call us</div>
            <div className="cu-val">+91 9355753537</div>
          </div>
        </a>
        <a href="mailto:customercare@salarytopup.com" className="cu-item">
          <div className="cu-icon mail"><IconMail /></div>
          <div>
            <div className="cu-label">Email us</div>
            <div className="cu-val">customercare@salarytopup.com</div>
          </div>
        </a>
      </div>
    </>
  );
}