import React from 'react'
import ConnectUs from '../../components/ConnectUs';
import MobileNav from '../../components/MobileNav';
import { Link } from 'react-router-dom';

/*
  NotEligible (v2) — gradient glass theme
  ───────────────────────────────────────
  Matches the rest of the journey: navy→teal gradient + dot grid,
  centered dark glass card, soft-red not-eligible ring/tag, frosted
  info tiles (teal/amber), amber section title, amber gradient CTA
  and trust chips. Structure and content unchanged.
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

  .ne-page * { box-sizing: border-box; margin: 0; padding: 0; }

  .ne-page {
    --navy-dark: #1f4a5c;
    --navy: #2e6279;
    --teal: #1a9b9b;
    --accent: #ffb300;
    --accent-dark: #e8a300;

    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 1.25rem 6.5rem;
    background:
      radial-gradient(1000px 480px at 85% -10%, rgba(255, 255, 255, 0.14), transparent 60%),
      linear-gradient(120deg, var(--navy-dark) 0%, var(--navy) 46%, var(--teal) 100%);
    background-attachment: fixed;
  }
  .ne-page::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  /* CARD — glass console */
  .ne-card {
    position: relative;
    z-index: 1;
    width: 100%; max-width: 520px;
    background: rgba(10, 34, 44, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 24px;
    padding: 2.5rem 2.25rem 2rem;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow:
      0 24px 60px rgba(8, 26, 34, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
  }

  /* ICON RING — soft red */
  .ne-icon-ring {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(255, 107, 94, 0.12);
    border: 2px solid rgba(255, 107, 94, 0.35);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
    animation: ne-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes ne-pop {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  .ne-icon-ring svg { width: 34px; height: 34px; fill: none; stroke: #ff8a80; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  /* STATUS TAG */
  .ne-tag {
    display: inline-flex; align-items: center; gap: 5px;
    background: rgba(255, 107, 94, 0.12);
    border: 1px solid rgba(255, 107, 94, 0.32);
    border-radius: 20px; padding: 4px 13px;
    color: #ffb4a8; font-size: 11.5px; font-weight: 700;
    letter-spacing: 0.4px; text-transform: uppercase;
    margin-bottom: 1.25rem;
  }

  .ne-title {
    font-family: 'Sora', sans-serif;
    font-size: 22px; font-weight: 800; color: #ffffff;
    letter-spacing: -0.5px; line-height: 1.3; margin-bottom: 10px;
  }
  .ne-title span { color: var(--accent); }
  .ne-sub {
    font-size: 13.5px; color: rgba(255,255,255,0.7); line-height: 1.7;
    margin-bottom: 2rem; max-width: 380px;
  }
  .ne-sub strong { color: #ffb4a8; font-weight: 700; }

  /* INFO CARDS — frosted tiles */
  .ne-info-row {
    display: flex; gap: 10px; width: 100%; margin-bottom: 2rem;
  }
  .ne-info-card {
    flex: 1; padding: 14px 12px; border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.06);
    display: flex; flex-direction: column; align-items: center; gap: 7px;
    text-align: center;
  }
  .ne-info-icon {
    width: 32px; height: 32px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
  }
  .ne-info-icon svg { width: 16px; height: 16px; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .ne-info-icon.blue {
    background: rgba(63, 212, 196, 0.14);
    border: 1px solid rgba(63, 212, 196, 0.26);
  }
  .ne-info-icon.blue svg { stroke: #3fd4c4; }
  .ne-info-icon.orange {
    background: rgba(255, 179, 0, 0.16);
    border: 1px solid rgba(255, 179, 0, 0.28);
  }
  .ne-info-icon.orange svg { stroke: var(--accent); }
  .ne-info-label { font-size: 11px; color: rgba(255,255,255,0.55); font-weight: 500; }
  .ne-info-val { font-size: 13px; font-weight: 700; color: #ffffff; }

  /* SECTION DIVIDER — amber */
  .ne-section-title {
    font-size: 11px; font-weight: 700; letter-spacing: 1.6px;
    text-transform: uppercase; color: var(--accent);
    margin-bottom: 1rem; width: 100%;
    display: flex; align-items: center; gap: 10px;
  }
  .ne-section-title::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.13); }

  /* CONNECT BOX */
  .ne-connect { width: 100%; margin-bottom: 1.75rem; }

  /* BUTTONS — amber gradient */
  .ne-btn-primary {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; height: 52px;
    background: linear-gradient(180deg, #ffc233 0%, var(--accent) 60%);
    color: #241a00;
    border: none; border-radius: 15px;
    font-family: 'Sora', sans-serif;
    font-size: 15px; font-weight: 800; letter-spacing: 0.3px;
    text-decoration: none; cursor: pointer;
    box-shadow: 0 8px 24px rgba(255, 179, 0, 0.35);
    transition: filter 0.18s, transform 0.1s;
    margin-bottom: 10px;
  }
  .ne-btn-primary:hover {
    filter: brightness(1.05);
    color: #241a00; text-decoration: none;
    transform: translateY(-1px);
  }
  .ne-btn-primary:active { transform: translateY(0); }
  .ne-btn-primary svg { width: 17px; height: 17px; }

  /* TRUST */
  .ne-trust {
    display: flex; align-items: center; justify-content: center;
    flex-wrap: wrap;
    gap: 6px; margin-top: 1.25rem;
    font-size: 11.5px; color: rgba(255,255,255,0.6);
  }
  .ne-trust svg { width: 13px; height: 13px; }
  .ne-trust-sep { width: 3px; height: 3px; background: rgba(255,255,255,0.35); border-radius: 50%; margin: 0 2px; }

  @media (max-width: 520px) {
    .ne-page { padding-top: 5rem; }
    .ne-card { padding: 2rem 1.5rem 1.75rem; border-radius: 20px; }
    .ne-title { font-size: 20px; }
    .ne-info-row { flex-direction: column; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ne-page * { animation: none !important; transition: none !important; }
  }
`;

const IconXCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#3fd4c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export default function NotEligible() {
  return (
    <>
      <style>{styles}</style>
      <div className="ne-page">

        {/* CARD */}
        <div className="ne-card">

          <div className="ne-icon-ring"><IconXCircle /></div>

          <div className="ne-tag">Not eligible at this time</div>

          <h1 className="ne-title">
            Thanks for showing interest in<br />
            <span>salarytopup</span>
          </h1>

          <p className="ne-sub">
            Unfortunately, you are <strong>not eligible</strong> at the moment due to our internal credit policy. Don't worry — this is temporary.
          </p>

          {/* INFO CARDS */}
          <div className="ne-info-row">
            <div className="ne-info-card">
              <div className="ne-info-icon blue"><IconClock /></div>
              <div className="ne-info-label">Try again in</div>
              <div className="ne-info-val">24 hours</div>
            </div>
            <div className="ne-info-card">
              <div className="ne-info-icon orange"><IconRefresh /></div>
              <div className="ne-info-label">Application</div>
              <div className="ne-info-val">Can be resubmitted</div>
            </div>
          </div>

          {/* CONNECT */}
          <div className="ne-section-title">Need help?</div>
          <div className="ne-connect">
            <ConnectUs />
          </div>

          {/* CTA */}
          <Link to="/journey/dashboard" className="ne-btn-primary">
            <IconDashboard /> Go to dashboard
          </Link>

          {/* TRUST */}
          <div className="ne-trust">
            <IconLock />
            256-bit SSL encrypted
            <span className="ne-trust-sep" />
            Your data is private
            <span className="ne-trust-sep" />
            RBI compliant
          </div>

        </div>
      </div>
      <MobileNav />
    </>
  );
}