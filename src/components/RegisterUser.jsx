import React from 'react'
import regUserIcon from '../assets/register-user-icon.png'

/*
  RegisterUser (v2) — trust badge, new design
  ───────────────────────────────────────────
  Old: stacked avatar circles + text on a light pill.
  New: a segmented "stat pill" that matches the white nav —
    [ ★ 4.8 rating | 2M+ clients ● ]
  Left segment: amber star + rating on a soft amber tint.
  Divider. Right segment: client count with a pulsing teal
  live dot. No avatars — sits cleanly on the white nav bar.
*/

const styles = `
  .ru2-pill {
    display: flex;
    align-items: stretch;
    border: 1.5px solid rgba(31, 74, 92, 0.18);
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    cursor: default;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    transition: border-color 0.15s, box-shadow 0.15s;
    user-select: none;
  }
  .ru2-pill:hover {
    border-color: rgba(26, 155, 155, 0.5);
    box-shadow: 0 2px 10px rgba(31, 74, 92, 0.1);
  }

  .ru2-seg {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 13px;
    white-space: nowrap;
  }

  /* left segment — rating */
  .ru2-seg.rating {
    background: rgba(255, 179, 0, 0.14);
    border-right: none;
  }
  .ru2-star {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
  .ru2-star path {
    fill: var(--accent, #ffb300);
    stroke: var(--accent, #ffb300);
  }
  .ru2-rating-num {
    font-size: 13px;
    font-weight: 800;
    color: #b57e00;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.2px;
  }

  /* divider */
  .ru2-divider {
    width: 1px;
    background: rgba(31, 74, 92, 0.14);
  }

  /* right segment — clients */
  .ru2-count {
    font-size: 13px;
    font-weight: 700;
    color: #1f4a5c;
    letter-spacing: -0.2px;
  }
  .ru2-count-label {
    font-size: 11px;
    font-weight: 500;
    color: #6f8b98;
  }
  .ru2-live {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #1a9b9b;
    flex-shrink: 0;
    animation: ru2-pulse 1.8s ease infinite;
  }
  @keyframes ru2-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(26, 155, 155, 0.45); }
    50%      { box-shadow: 0 0 0 4px rgba(26, 155, 155, 0); }
  }

  /* tighten on smaller widths */
  @media (max-width: 900px) {
    .ru2-seg { padding: 6px 10px; }
    .ru2-count-label { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ru2-live { animation: none !important; }
  }
`;

const IconStar = () => (
  <svg className="ru2-star" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function RegisterUser() {
  return (
    <>
      <style>{styles}</style>
      <div className="ru2-pill" title="Rated 4.8 — trusted by 2M+ clients nationwide">

        {/* Rating segment */}
        <div className="ru2-seg rating">
          <IconStar />
          <span className="ru2-rating-num">4.8</span>
        </div>

        <div className="ru2-divider" />

        {/* Clients segment */}
        <div className="ru2-seg">
          <span className="ru2-count">2M+</span>
          <span className="ru2-count-label">clients nationwide</span>
          <span className="ru2-live" title="Active users" />
        </div>

      </div>
    </>
  )
}