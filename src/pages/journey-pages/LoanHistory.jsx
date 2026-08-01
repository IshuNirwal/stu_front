import React from 'react';
import LoanHistoryList from '../../components/LoanHistoryList';
import MobileNav from '../../components/MobileNav';
import { useSelector } from 'react-redux';
import { dashboardStyles } from './dashboardTheme';

/*
  LoanHistory (v2) — gradient glass theme
  ───────────────────────────────────────
  Sits on the shared db-* system (gradient page, glass cards, amber
  section titles). Bootstrap layout classes kept as-is. The MUI
  VerifiedIcon is replaced with an inline SVG (drops the @mui
  dependency from this file). Structure and data unchanged.
*/

const lhStyles = `
  .lh-page { padding-top: 5.5rem; }
  .lh-container {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 clamp(1rem, 4vw, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ── HERO ── */
  .lh-hero {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    padding: 1.5rem 1.75rem;
    background: rgba(6, 23, 30, 0.6);
    border: 1px solid rgba(255,255,255,0.16);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 18px 48px rgba(8, 26, 34, 0.4), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .lh-hero-blob1 { position: absolute; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(255,179,0,0.16) 0%, transparent 70%); top: -60px; right: -40px; pointer-events: none; }
  .lh-hero-blob2 { position: absolute; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(63,212,196,0.14) 0%, transparent 70%); bottom: -30px; left: -30px; pointer-events: none; }
  .lh-hero-inner { position: relative; z-index: 1; }

  .lh-avatar {
    width: 55px; height: 55px; border-radius: 15px;
    background: linear-gradient(180deg, #ffc233, #ffb300);
    color: #241a00;
    overflow: hidden; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 20px; font-weight: 800;
    box-shadow: 0 6px 18px rgba(255,179,0,0.35);
  }
  .lh-avatar img { width: 100%; height: 100%; object-fit: cover; }

  .lh-name {
    font-family: 'Sora', sans-serif;
    font-size: 18px; font-weight: 700; color: #ffffff;
    letter-spacing: -0.3px; margin: 0;
  }
  .lh-name b { font-weight: 800; }
  .lh-verified {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(63, 212, 196, 0.14);
    border: 1px solid rgba(63, 212, 196, 0.32);
    color: #3fd4c4;
    padding: 4px 12px; border-radius: 999px;
    font-size: 11.5px; font-weight: 700; letter-spacing: 0.3px;
  }
  .lh-verified svg { width: 13px; height: 13px; }

  .lh-right-label {
    font-size: 10px; color: rgba(255,255,255,0.5);
    text-transform: uppercase; letter-spacing: 0.6px;
    font-weight: 700; margin-bottom: 5px;
  }
  .lh-right-title {
    font-family: 'Sora', sans-serif;
    font-size: 15px; font-weight: 800;
    color: var(--accent, #ffb300);
    letter-spacing: -0.2px;
  }

  /* ── SECTION HEAD ── */
  .lh-activity-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.4px;
    color: #3fd4c4;
    background: rgba(63, 212, 196, 0.12);
    border: 1px solid rgba(63, 212, 196, 0.28);
    border-radius: 999px;
    padding: 3px 11px;
    white-space: nowrap;
  }
  .lh-activity-tag::before {
    content: '●';
    font-size: 6px;
  }

  @media (max-width: 1024px) {
    .lh-page { padding-top: 4.5rem; }
  }
  @media (max-width: 480px) {
    .lh-hero { padding: 1.25rem; border-radius: 16px; }
  }
`;

const IconVerified = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function LoanHistory() {
    const customerDetails = useSelector(
        (state) => state?.customerJourneyDetails?.customerDetails
    );

    const initials = customerDetails?.full_name
        ? customerDetails.full_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
        : null;

    return (
        <>
            <style>{dashboardStyles}{lhStyles}</style>
            <div className="db-page lh-page">
                <div className="lh-container">

                    {/* HERO */}
                    <div className="lh-hero">
                        <div className="lh-hero-blob1" />
                        <div className="lh-hero-blob2" />
                        <div className="lh-hero-inner">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">

                                {/* LEFT */}
                                <div className="d-flex align-items-center gap-3">
                                    <div className="lh-avatar">
                                        {customerDetails?.profile_pic ? (
                                            <img
                                                src={customerDetails.profile_pic}
                                                alt="profile"
                                            />
                                        ) : (
                                            initials || <IconUser />
                                        )}
                                    </div>

                                    <div>
                                        <h5 className="lh-name">
                                            Welcome <b>{customerDetails?.full_name}</b>
                                        </h5>

                                        <div className="mt-2">
                                            <span className="lh-verified">
                                                <IconVerified /> Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className="text-md-end">
                                    <div className="lh-right-label">Loan History</div>
                                    <div className="lh-right-title">
                                        Your Loan Timeline
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* LOAN HISTORY SECTION */}
                    <div className="db-card">
                        <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '0.5rem' }}>
                            <div className="db-section-title" style={{ marginBottom: 0, flex: 1 }}>
                                Loan history
                            </div>
                            <span className="lh-activity-tag" style={{ marginLeft: 12 }}>
                                Recent activity
                            </span>
                        </div>

                        <div style={{ marginTop: '0.75rem' }}>
                            <LoanHistoryList />
                        </div>
                    </div>

                </div>
            </div>

            <MobileNav />
        </>
    );
}