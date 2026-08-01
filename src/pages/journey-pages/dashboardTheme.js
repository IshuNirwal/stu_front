/*
  dashboardTheme.js (v2) — gradient glass theme
  ─────────────────────────────────────────────
  Shared design system for the dashboard and all its cards.
  Defines every db-* class used by Dashboard, LeadTrack,
  ActiveLoanRequest, LoanHistoryList, ReuploadDocument,
  UserCreditProfile, DisplayOnCondition, CreditManagerDetails etc.

  Palette: navy #1f4a5c / #2e6279 · teal #1a9b9b · amber #ffb300
*/

export const dashboardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

  .db-page * { box-sizing: border-box; margin: 0; padding: 0; }

  .db-page {
    --navy-dark: #1f4a5c;
    --navy: #2e6279;
    --teal: #1a9b9b;
    --accent: #ffb300;
    --accent-dark: #e8a300;

    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:
      radial-gradient(1000px 480px at 85% -10%, rgba(255, 255, 255, 0.14), transparent 60%),
      linear-gradient(120deg, var(--navy-dark) 0%, var(--navy) 46%, var(--teal) 100%);
    background-attachment: fixed;
    padding: 5rem 0 6.5rem; /* room for top nav + MobileNav */
  }
  .db-page::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  /* ── Layout ── */
  .db-layout {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    align-items: start;
    gap: 1.25rem;
    padding: 0 clamp(1.25rem, 4vw, 3rem);
  }
  .db-left, .db-right {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    min-width: 0;
  }
  .db-right { position: sticky; top: 5rem; }

  /* ── Glass card (default) ── */
  .db-card {
    border-radius: 20px;
    padding: 1.5rem;
    background: rgba(10, 34, 44, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow:
      0 18px 48px rgba(8, 26, 34, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  /* ── Dark hero card ── */
  .db-card-dark {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    padding: 1.5rem;
    background: rgba(6, 23, 30, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow:
      0 18px 48px rgba(8, 26, 34, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  .db-card-dark-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
  .db-card-dark-blob1 {
    position: absolute; width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 179, 0, 0.16) 0%, transparent 70%);
    top: -80px; right: -60px; pointer-events: none;
  }
  .db-card-dark-blob2 {
    position: absolute; width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(63, 212, 196, 0.14) 0%, transparent 70%);
    bottom: -60px; left: -40px; pointer-events: none;
  }
  .db-card-inner { position: relative; z-index: 1; }

  /* ── Section title ── */
  .db-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1rem;
  }
  .db-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.13);
  }

  /* ── Badges ── */
  .db-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 11px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }
  .db-badge.warn {
    background: rgba(255, 179, 0, 0.16);
    border: 1px solid rgba(255, 179, 0, 0.32);
    color: var(--accent);
  }
  .db-badge.blue, .db-badge.green {
    background: rgba(63, 212, 196, 0.14);
    border: 1px solid rgba(63, 212, 196, 0.3);
    color: #3fd4c4;
  }
  .db-badge.red {
    background: rgba(255, 107, 94, 0.14);
    border: 1px solid rgba(255, 107, 94, 0.3);
    color: #ffb4a8;
  }

  /* ── Buttons ── */
  .db-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 18px;
    border: none;
    border-radius: 12px;
    font-family: 'Sora', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: 0.2px;
    cursor: pointer;
    text-decoration: none;
    transition: filter 0.15s, background 0.15s, border-color 0.15s, transform 0.1s;
    white-space: nowrap;
  }
  .db-btn:hover { text-decoration: none; transform: translateY(-1px); }
  .db-btn:active { transform: translateY(0); }
  .db-btn svg { flex-shrink: 0; }

  .db-btn-orange {
    background: linear-gradient(180deg, #ffc233 0%, var(--accent) 60%);
    color: #241a00;
    box-shadow: 0 6px 18px rgba(255, 179, 0, 0.32);
  }
  .db-btn-orange:hover { filter: brightness(1.05); color: #241a00; }

  .db-btn-dark {
    background: rgba(63, 212, 196, 0.14);
    border: 1.5px solid rgba(63, 212, 196, 0.4);
    color: #3fd4c4;
  }
  .db-btn-dark:hover { background: rgba(63, 212, 196, 0.24); color: #3fd4c4; }

  .db-btn-outline {
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.24);
    color: rgba(255,255,255,0.85);
  }
  .db-btn-outline:hover {
    border-color: rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.12);
    color: #ffffff;
  }

  /* ── Inputs ── */
  .db-input {
    width: 100%;
    height: 46px;
    border: 2px solid transparent;
    border-radius: 12px;
    background: #ffffff;
    padding: 0 14px;
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 500;
    color: #1f4a5c;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .db-input::placeholder { color: #9db3bc; font-weight: 400; }
  .db-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
  }
  .db-select {
    appearance: none;
    cursor: pointer;
    padding-right: 38px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231f4a5c' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 13px center;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .db-layout { grid-template-columns: 1fr; }
    .db-right { position: static; }
    .db-page { padding-top: 4.5rem; }
  }
  @media (max-width: 480px) {
    .db-card, .db-card-dark { padding: 1.15rem; border-radius: 16px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .db-page * { animation: none !important; transition: none !important; }
  }
`;