import React from 'react';



const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Approval in 2 minutes',
    desc: 'Instant decisions, zero branch visits.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: '7–40 day tenure',
    desc: 'Repay early with zero penalty.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'RBI compliant & secure',
    desc: 'Bank-grade encryption, always private.',
  },
];

const stats = [
  { num: '12L+', label: 'happy borrowers' },
  { num: '4.8★', label: 'average rating' },
  { num: '2 min', label: 'average approval' },
];

export default function PayDayPanel() {
  return (
    <>
      <style>{`
        .pdv2 {
          width: 100%;
          max-width: 880px;
          margin-top: clamp(2rem, 5vh, 3rem);
        }

        /* ── Feature strip ──────────────────── */
        .pdv2-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .pdv2-feat {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 18px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.13);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: background 0.2s, transform 0.2s;
        }
        .pdv2-feat:hover {
          background: rgba(255, 255, 255, 0.11);
          transform: translateY(-2px);
        }
        .pdv2-feat-icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1f2a00;
          background: var(--accent, #ffb300);
        }
        .pdv2-feat-title {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 3px;
        }
        .pdv2-feat-desc {
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.68);
          margin: 0;
        }

        /* ── Stats ticker ───────────────────── */
        .pdv2-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px 0;
          margin-top: 1.75rem;
        }
        .pdv2-stat {
          display: flex;
          align-items: baseline;
          gap: 7px;
          padding: 0 22px;
        }
        .pdv2-stat + .pdv2-stat {
          border-left: 1px solid rgba(255, 255, 255, 0.18);
        }
        .pdv2-stat-num {
          font-family: 'Sora', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--accent, #ffb300);
          white-space: nowrap;
        }
        .pdv2-stat-label {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.66);
          white-space: nowrap;
        }

        /* ── Trust bar ──────────────────────── */
        .pdv2-trust {
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          text-align: center;
        }
        .pdv2-trust-text {
          font-size: 12.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.62);
          margin: 0;
        }
        .pdv2-trust-text a {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(255, 179, 0, 0.6);
        }
        .pdv2-trust-text a:hover {
          color: var(--accent, #ffb300);
        }

        /* ── Responsive ─────────────────────── */
        @media (max-width: 768px) {
          .pdv2-features {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .pdv2-stat { padding: 0 14px; }
          .pdv2-stat-num { font-size: 19px; }
        }
      `}</style>

      <section className="pdv2">
        {/* Feature strip */}
        <div className="pdv2-features">
          {features.map((f, i) => (
            <div key={i} className="pdv2-feat">
              <div className="pdv2-feat-icon">{f.icon}</div>
              <div>
                <p className="pdv2-feat-title">{f.title}</p>
                <p className="pdv2-feat-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats ticker */}
        <div className="pdv2-stats">
          {stats.map((st, i) => (
            <div key={i} className="pdv2-stat">
              <span className="pdv2-stat-num">{st.num}</span>
              <span className="pdv2-stat-label">{st.label}</span>
            </div>
          ))}
        </div>

        
      </section>
    </>
  );
}