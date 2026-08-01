import React from "react";

/*
  JourneyRightPanel (v4) — payday loan / NBFC finance visual
  ──────────────────────────────────────────────────────────
  Static, screen-agnostic panel. No PAN references, no journey steps.
  Scene: wallet with ₹ notes (salary/disbursal) + instant-transfer
  bank chip + tenure calendar chip + growth spark + ₹ coins on
  dashed orbits. Below it: an RBI/NBFC trust note and a stats strip.
  Hidden below 1024px by the parent page CSS (.jrp2 { display:none }).
*/

const rightPanelStyles = `
  .jrp2 {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    user-select: none;
  }

  .jrp2-visual { width: 100%; }
  .jrp2-visual svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .jrp2-float      { animation: jrp2Float 6s ease-in-out infinite; }
  .jrp2-float-rev  { animation: jrp2Float 7s ease-in-out infinite reverse; }
  .jrp2-float-slow { animation: jrp2Float 9s ease-in-out infinite; }
  @keyframes jrp2Float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-8px); }
  }

  /* ── NBFC trust note ── */
  .jrp2-note {
    display: flex;
    gap: 11px;
    align-items: flex-start;
    margin-top: 1.4rem;
    padding: 13px 15px;
    border-radius: 16px;
    background: rgba(10, 34, 44, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }
  .jrp2-note svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-top: 2px;
    color: #3fd4c4;
  }
  .jrp2-note p {
    font-size: 12.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    margin: 0;
  }
  .jrp2-note strong { color: #ffffff; font-weight: 700; }

  /* ── Stats strip ── */
  .jrp2-foot {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 1.1rem;
    font-size: 11.5px;
    color: rgba(255,255,255,0.55);
  }
  .jrp2-foot b { color: var(--accent, #ffb300); font-weight: 800; }
  .jrp2-foot-dot {
    width: 3px; height: 3px; border-radius: 50%;
    background: rgba(255,255,255,0.35);
  }
`;

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

export default function JourneyRightPanel({
  title = "Payday loans, made simple",
  subtitle = "Fast, secure & paperless.",
  showStats = true,
}) {
  return (
    <>
      <style>{rightPanelStyles}</style>

      <aside className="jrp2" aria-hidden="true">
        {/* ── Illustration: wallet + disbursal ── */}
        <div className="jrp2-visual">
          <svg viewBox="0 0 460 430" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="jrpDark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0e2a37" />
                <stop offset="100%" stopColor="#123b47" />
              </linearGradient>
              <linearGradient id="jrpAmber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffc233" />
                <stop offset="100%" stopColor="#ffb300" />
              </linearGradient>
              <linearGradient id="jrpTeal" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#1a9b9b" />
                <stop offset="100%" stopColor="#3fd4c4" />
              </linearGradient>
              <linearGradient id="jrpNote1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2f8f8f" />
                <stop offset="100%" stopColor="#1a9b9b" />
              </linearGradient>
              <filter id="jrpSoft" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="14" stdDeviation="22" floodColor="#06171e" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* dashed orbits */}
            <circle cx="230" cy="210" r="185" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeDasharray="3 9" />
            <circle cx="230" cy="210" r="130" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 9" />

            {/* glow */}
            <ellipse cx="230" cy="225" rx="145" ry="120" fill="rgba(255,179,0,0.10)" />

            {/* ── wallet with ₹ notes ── */}
            <g filter="url(#jrpSoft)" className="jrp2-float-slow">
              {/* notes peeking out */}
              <g>
                <rect x="142" y="130" width="176" height="52" rx="9" fill="url(#jrpNote1)" transform="rotate(-6 230 156)" />
                <circle cx="230" cy="150" r="15" fill="rgba(255,255,255,0.2)" transform="rotate(-6 230 156)" />
                <text x="228" y="158" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="16" fontWeight="800" fill="#ffffff" transform="rotate(-6 230 156)">₹</text>
              </g>
              <g>
                <rect x="150" y="146" width="160" height="48" rx="9" fill="#37b3ab" />
                <circle cx="230" cy="170" r="13" fill="rgba(255,255,255,0.22)" />
                <text x="228" y="176" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="14" fontWeight="800" fill="#ffffff">₹</text>
              </g>

              {/* wallet body */}
              <rect x="118" y="176" width="224" height="128" rx="20" fill="url(#jrpDark)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              {/* wallet flap / clasp */}
              <rect x="286" y="216" width="72" height="46" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
              <circle cx="314" cy="239" r="8" fill="url(#jrpAmber)" />
              {/* stitching */}
              <rect x="128" y="186" width="204" height="108" rx="15" stroke="rgba(255,255,255,0.14)" strokeWidth="1.4" strokeDasharray="4 6" fill="none" />
              {/* amount */}
              <text x="152" y="238" fontFamily="Sora, sans-serif" fontSize="24" fontWeight="800" fill="#ffb300">₹1,00,000</text>
              <rect x="152" y="252" width="86" height="7" rx="3.5" fill="rgba(255,255,255,0.32)" />
              <rect x="152" y="266" width="58" height="7" rx="3.5" fill="rgba(255,255,255,0.18)" />
            </g>

            {/* ── instant transfer chip (bank → account) ── */}
            <g filter="url(#jrpSoft)" className="jrp2-float">
              <rect x="300" y="76" width="128" height="64" rx="16" fill="rgba(16,42,54,0.92)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
              {/* bank icon */}
              <path d="M318 100l12-7 12 7" stroke="#3fd4c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="320" y1="102" x2="320" y2="114" stroke="#3fd4c4" strokeWidth="2" strokeLinecap="round" />
              <line x1="326" y1="102" x2="326" y2="114" stroke="#3fd4c4" strokeWidth="2" strokeLinecap="round" />
              <line x1="334" y1="102" x2="334" y2="114" stroke="#3fd4c4" strokeWidth="2" strokeLinecap="round" />
              <line x1="340" y1="102" x2="340" y2="114" stroke="#3fd4c4" strokeWidth="2" strokeLinecap="round" />
              <line x1="316" y1="117" x2="344" y2="117" stroke="#3fd4c4" strokeWidth="2" strokeLinecap="round" />
              {/* zap = instant */}
              <path d="M368 92l-8 13h7l-5 13 13-16h-8l6-10h-5z" fill="url(#jrpAmber)" />
              <rect x="356" y="122" width="58" height="7" rx="3.5" fill="rgba(255,255,255,0.5)" />
            </g>

            {/* ── tenure calendar chip (7–40 days) ── */}
            <g filter="url(#jrpSoft)" className="jrp2-float-rev">
              <rect x="42" y="96" width="104" height="76" rx="16" fill="rgba(16,42,54,0.9)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
              <rect x="56" y="112" width="76" height="46" rx="9" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.16)" />
              <line x1="56" y1="126" x2="132" y2="126" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" />
              <rect x="66" y="104" width="4" height="12" rx="2" fill="#3fd4c4" />
              <rect x="118" y="104" width="4" height="12" rx="2" fill="#3fd4c4" />
              <text x="94" y="149" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="15" fontWeight="800" fill="#ffb300">7–40</text>
              <rect x="76" y="153" width="36" height="1.5" fill="rgba(255,255,255,0.0)" />
            </g>

            {/* ── growth spark chip ── */}
            <g filter="url(#jrpSoft)" className="jrp2-float">
              <rect x="56" y="272" width="118" height="86" rx="16" fill="rgba(16,42,54,0.9)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
              <rect x="72" y="322" width="13" height="20" rx="3" fill="url(#jrpTeal)" />
              <rect x="91" y="312" width="13" height="30" rx="3" fill="url(#jrpTeal)" />
              <rect x="110" y="302" width="13" height="40" rx="3" fill="url(#jrpTeal)" />
              <rect x="129" y="290" width="13" height="52" rx="3" fill="url(#jrpAmber)" />
              <path d="M74 314l22-12 20-9 26-14" stroke="#ffc233" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="142" cy="279" r="4" fill="#ffc233" />
            </g>

            {/* ── ₹ coins ── */}
            <g filter="url(#jrpSoft)" className="jrp2-float-rev">
              <circle cx="370" cy="316" r="30" fill="url(#jrpAmber)" stroke="#e8a300" strokeWidth="2" />
              <circle cx="370" cy="316" r="22" stroke="rgba(36,26,0,0.28)" strokeWidth="1.6" strokeDasharray="2.5 4" fill="none" />
              <text x="370" y="326" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="26" fontWeight="800" fill="#241a00">₹</text>
            </g>
            <g className="jrp2-float-slow">
              <circle cx="404" cy="212" r="16" fill="url(#jrpAmber)" stroke="#e8a300" strokeWidth="1.5" opacity="0.95" />
              <text x="404" y="218" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="14" fontWeight="800" fill="#241a00">₹</text>
            </g>

            {/* accent dots */}
            <g className="jrp2-float">
              <circle cx="46" cy="222" r="6" fill="rgba(63,212,196,0.55)" />
              <circle cx="238" cy="66" r="8" fill="rgba(255,179,0,0.5)" />
            </g>

            {/* base shadow */}
            <ellipse cx="230" cy="392" rx="130" ry="14" fill="rgba(6,20,26,0.4)" />
          </svg>
        </div>

        {/* ── NBFC trust note (static) ── */}
        <div className="jrp2-note">
          <IconShield />
          <p>
            <strong>SALARYTOPUP</strong> is owned by Baid Stock Broking Services Private Limited., an <strong>RBI-registered NBFC</strong>. Every loan is
            issued under RBI's digital lending guidelines.
          </p>
        </div>

        {/* ── Stats strip (static) ── */}
        <div className="jrp2-foot">
          Loans <b>₹7,000 – ₹1,00,000</b>
          <span className="jrp2-foot-dot" />
          Tenure <b>7–40 days</b>
          <span className="jrp2-foot-dot" />
          Rated <b>4.8★</b>
        </div>
      </aside>
    </>
  );
}