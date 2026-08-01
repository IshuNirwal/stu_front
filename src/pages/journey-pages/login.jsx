import React from 'react';
import MobileRegister from '../../components/MobileRegister';
import PayDayPanel from '../../components/PayDayPanel';



function FinanceVisual() {
  return (
    <div className="stuv2-visual" aria-hidden="true">
      <svg viewBox="0 0 460 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fvPhone" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0e2a37" />
            <stop offset="100%" stopColor="#123b47" />
          </linearGradient>
          <linearGradient id="fvAmber" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffc233" />
            <stop offset="100%" stopColor="#ffb300" />
          </linearGradient>
          <linearGradient id="fvBar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#1a9b9b" />
            <stop offset="100%" stopColor="#3fd4c4" />
          </linearGradient>
          <filter id="fvSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="14" stdDeviation="22" floodColor="#06171e" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* dashed orbit */}
        <circle cx="230" cy="250" r="205" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeDasharray="3 9" />
        <circle cx="230" cy="250" r="150" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 9" />

        {/* glow */}
        <ellipse cx="230" cy="265" rx="150" ry="140" fill="rgba(255,179,0,0.10)" />

        {/* ── phone ── */}
        <g filter="url(#fvSoft)" className="fv-float-slow">
          <rect x="140" y="90" width="185" height="330" rx="28" fill="url(#fvPhone)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          <rect x="196" y="103" width="72" height="8" rx="4" fill="rgba(255,255,255,0.16)" />

          {/* check badge */}
          <circle cx="232" cy="172" r="30" fill="url(#fvAmber)" />
          <path d="M219 172l9 9 16-17" stroke="#241a00" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* approved text lines */}
          <rect x="187" y="216" width="90" height="9" rx="4.5" fill="rgba(255,255,255,0.85)" />
          <rect x="200" y="233" width="64" height="7" rx="3.5" fill="rgba(255,255,255,0.35)" />

          {/* amount plate */}
          <rect x="164" y="258" width="137" height="46" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.16)" />
          <text x="232" y="288" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="21" fontWeight="800" fill="#ffb300">₹1,00,000</text>

          {/* progress */}
          <rect x="164" y="320" width="137" height="8" rx="4" fill="rgba(255,255,255,0.12)" />
          <rect x="164" y="320" width="103" height="8" rx="4" fill="url(#fvBar)" />
          <rect x="164" y="338" width="70" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />

          {/* CTA */}
          <rect x="164" y="365" width="137" height="34" rx="10" fill="url(#fvAmber)" />
          <rect x="204" y="378" width="57" height="8" rx="4" fill="#241a00" opacity="0.85" />
        </g>

        {/* ── growth card (left) ── */}
        <g filter="url(#fvSoft)" className="fv-float">
          <rect x="38" y="180" width="118" height="96" rx="16" fill="rgba(16,42,54,0.9)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
          <rect x="54" y="196" width="52" height="7" rx="3.5" fill="rgba(255,255,255,0.4)" />
          <rect x="54" y="240" width="14" height="22" rx="3" fill="url(#fvBar)" />
          <rect x="74" y="230" width="14" height="32" rx="3" fill="url(#fvBar)" />
          <rect x="94" y="220" width="14" height="42" rx="3" fill="url(#fvBar)" />
          <rect x="114" y="208" width="14" height="54" rx="3" fill="url(#fvAmber)" />
          <path d="M56 232L78 220L98 210L124 196" stroke="#ffc233" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="124" cy="196" r="4" fill="#ffc233" />
        </g>

        {/* ── RBI shield card (right) ── */}
        <g filter="url(#fvSoft)" className="fv-float-rev">
          <rect x="316" y="140" width="112" height="70" rx="16" fill="rgba(16,42,54,0.9)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
          <path d="M344 156l14 6v10c0 9-6 14-14 17-8-3-14-8-14-17v-10l14-6z" fill="rgba(26,155,155,0.25)" stroke="#3fd4c4" strokeWidth="2" strokeLinejoin="round" />
          <path d="M338 171l4.5 4.5 8-9" stroke="#3fd4c4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="368" y="158" width="44" height="7" rx="3.5" fill="rgba(255,255,255,0.75)" />
          <rect x="368" y="172" width="32" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
        </g>

        {/* ── rupee coins ── */}
        <g filter="url(#fvSoft)" className="fv-float">
          <circle cx="352" cy="330" r="30" fill="url(#fvAmber)" stroke="#e8a300" strokeWidth="2" />
          <circle cx="352" cy="330" r="22" stroke="rgba(36,26,0,0.28)" strokeWidth="1.6" strokeDasharray="2.5 4" fill="none" />
          <text x="352" y="340" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="26" fontWeight="800" fill="#241a00">₹</text>
        </g>
        <g className="fv-float-rev">
          <circle cx="98" cy="330" r="19" fill="url(#fvAmber)" stroke="#e8a300" strokeWidth="1.6" opacity="0.95" />
          <text x="98" y="337" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="17" fontWeight="800" fill="#241a00">₹</text>
        </g>
        <g className="fv-float-slow">
          <circle cx="392" cy="256" r="10" fill="rgba(255,179,0,0.5)" />
          <circle cx="72" cy="128" r="7" fill="rgba(63,212,196,0.55)" />
        </g>

        {/* base shadow */}
        <ellipse cx="230" cy="452" rx="132" ry="15" fill="rgba(6,20,26,0.4)" />
      </svg>
    </div>
  );
}

export default function Login() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .stuv2 {
          --navy-dark: #1f4a5c;
          --navy: #2e6279;
          --teal: #1a9b9b;
          --accent: #ffb300;
          --accent-dark: #e8a300;

          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background:
            radial-gradient(1000px 480px at 85% -10%, rgba(255, 255, 255, 0.14), transparent 60%),
            linear-gradient(120deg, var(--navy-dark) 0%, var(--navy) 46%, var(--teal) 100%);
          background-attachment: fixed;
          position: relative;
          overflow-x: hidden;
        }

        /* fine dot-grid texture over the gradient */
        .stuv2::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.10) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
          pointer-events: none;
        }

        .stuv2 *,
        .stuv2 *::before,
        .stuv2 *::after { box-sizing: border-box; }

        /* ── Header ─────────────────────────── */
        .stuv2-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.1rem clamp(1.25rem, 4vw, 3rem);
          border-bottom: 1px solid rgba(255, 255, 255, 0.10);
        }
        .stuv2-wordmark {
          font-family: 'Sora', sans-serif;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #ffffff;
          text-decoration: none;
        }
        .stuv2-wordmark em {
          font-style: normal;
          color: var(--accent);
        }
        .stuv2-rbi-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.4px;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.07);
          transition: background 0.18s, border-color 0.18s;
          white-space: nowrap;
        }
        .stuv2-rbi-pill:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.4);
        }
        .stuv2-rbi-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #35d07f;
          box-shadow: 0 0 0 3px rgba(53, 208, 127, 0.22);
        }

        /* ── Main ───────────────────────────── */
        .stuv2-main {
          position: relative;
          z-index: 2;
          flex: 1;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(2rem, 5vh, 3.25rem) clamp(1.25rem, 4vw, 3rem) 2.5rem;
        }

        /* two-column stage: hero+login left, visual right */
        .stuv2-stage {
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 4.5rem);
        }
        .stuv2-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .stuv2-hero {
          text-align: left;
          margin-bottom: clamp(1.5rem, 3.5vh, 2.1rem);
        }
        .stuv2-kicker {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2.2px;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 14px;
        }
        .stuv2-h1 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(30px, 3.7vw, 46px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.6px;
          margin: 0 0 14px;
        }
        .stuv2-h1 .amt {
          color: var(--accent);
          white-space: nowrap;
        }
        .stuv2-hero-sub {
          font-size: 15.5px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.75);
          margin: 0;
          max-width: 48ch;
        }

        /* ── Right visual ───────────────────── */
        .stuv2-visual {
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          user-select: none;
        }
        .stuv2-visual svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .fv-float      { animation: fvFloat 5.5s ease-in-out infinite; }
        .fv-float-rev  { animation: fvFloat 6.5s ease-in-out infinite reverse; }
        .fv-float-slow { animation: fvFloat 8s ease-in-out infinite; }
        @keyframes fvFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-9px); }
        }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 1024px) {
          .stuv2-stage {
            grid-template-columns: 1fr;
            justify-items: center;
          }
          .stuv2-left { align-items: center; }
          .stuv2-hero { text-align: center; }
          .stuv2-hero-sub { margin: 0 auto; }
          .stuv2-visual {
            order: 2;
            max-width: 400px;
            margin-top: 0.5rem;
          }
        }
        @media (max-width: 480px) {
          .stuv2-header { padding: 0.9rem 1rem; }
          .stuv2-rbi-pill span.long { display: none; }
          .stuv2-main { padding: 1.5rem 1rem 2rem; }
          .stuv2-visual { max-width: 320px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .stuv2 * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="stuv2">
        
        
        {/* Main */}
        <main className="stuv2-main">
          <div className="stuv2-stage">
            {/* Left — hero + login console */}
            <div className="stuv2-left">
              <div className="stuv2-hero">
                <span className="stuv2-kicker">Salary aane tak, hum hain</span>
                <h1 className="stuv2-h1">
                  Instant payday loans
                  <br />
                  up to <span className="amt">₹1,00,000</span>
                </h1>
                <p className="stuv2-hero-sub">
                  Minimal paperwork. Approved in minutes, disbursed in hours —
                  straight to your bank account.
                </p>
              </div>

              <MobileRegister />
            </div>

            {/* Right — NBFC / finance illustration */}
            <FinanceVisual />
          </div>

          {/* Feature strip + stats + trust */}
          <PayDayPanel />
        </main>
      </div>
    </>
  );
}