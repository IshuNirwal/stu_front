import React from 'react';
import MobileNav from '../../components/MobileNav';
import cibilMeter from '../../assets/civil-meter.svg';
import { useSelector } from 'react-redux';
import { dashboardStyles } from './dashboardTheme';



const upStyles = `
  .up-page { padding-top: 5.5rem; }
  .up-container {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: 0 clamp(1rem, 4vw, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ── HERO ── */
  .up-hero {
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
  .up-hero-blob1 { position: absolute; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(255,179,0,0.16) 0%, transparent 70%); top: -60px; right: -40px; pointer-events: none; }
  .up-hero-blob2 { position: absolute; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(63,212,196,0.14) 0%, transparent 70%); bottom: -30px; left: -30px; pointer-events: none; }
  .up-hero-inner { position: relative; z-index: 1; }

  .up-avatar {
    width: 60px; height: 60px; border-radius: 16px;
    background: linear-gradient(180deg, #ffc233, #ffb300);
    color: #241a00;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; flex-shrink: 0;
    font-family: 'Sora', sans-serif;
    font-size: 22px; font-weight: 800;
    box-shadow: 0 6px 18px rgba(255,179,0,0.35);
  }
  .up-avatar img { width: 100%; height: 100%; object-fit: cover; }

  .up-name {
    font-family: 'Sora', sans-serif;
    font-size: 19px; font-weight: 700; color: #ffffff;
    letter-spacing: -0.3px; margin: 0;
  }
  .up-name b { font-weight: 800; }
  .up-verified {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(63, 212, 196, 0.14);
    border: 1px solid rgba(63, 212, 196, 0.32);
    color: #3fd4c4;
    padding: 4px 12px; border-radius: 999px;
    font-size: 11.5px; font-weight: 700; letter-spacing: 0.3px;
  }
  .up-verified svg { width: 13px; height: 13px; }

  .up-status-label {
    font-size: 10px; color: rgba(255,255,255,0.5);
    text-transform: uppercase; letter-spacing: 0.6px;
    font-weight: 700; margin-bottom: 5px;
  }
  .up-status-badge {
    display: inline-block;
    background: rgba(255, 179, 0, 0.16);
    border: 1px solid rgba(255, 179, 0, 0.32);
    color: var(--accent, #ffb300);
    padding: 5px 12px; border-radius: 999px;
    font-size: 12px; font-weight: 700;
  }
  .up-refno {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px; font-weight: 700;
    color: var(--accent, #ffb300);
    letter-spacing: 0.5px;
  }

  /* ── CIBIL CARD ── */
  .up-cibil-meter-wrap {
    width: 110px; height: 110px;
    margin: 0 auto 12px;
    border-radius: 50%;
    background: rgba(255,255,255,0.92);
    border: 1px solid rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 24px rgba(8, 26, 34, 0.3);
  }
  .up-cibil-meter-wrap img { width: 78px; display: block; }
  .up-cibil-score {
    font-family: 'Sora', sans-serif;
    font-size: 32px; font-weight: 800;
    color: var(--accent, #ffb300);
    letter-spacing: -0.5px;
    margin: 0 0 4px;
  }
  .up-cibil-sub {
    font-size: 12.5px;
    color: rgba(255,255,255,0.6);
    margin: 0;
  }

  /* ── DETAILS GRID ── */
  .up-detail-item {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 13px;
    padding: 12px 14px;
    height: 100%;
  }
  .up-detail-label {
    font-size: 10.5px; font-weight: 700;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase; letter-spacing: 0.5px;
    margin-bottom: 4px;
  }
  .up-detail-val {
    font-size: 13.5px; font-weight: 600;
    color: #ffffff;
    word-break: break-word;
  }

  @media (max-width: 1024px) {
    .up-page { padding-top: 4.5rem; }
  }
  @media (max-width: 480px) {
    .up-hero { padding: 1.25rem; border-radius: 16px; }
  }
`;

const IconVerified = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function UserProfile() {
    const customerDetails = useSelector(
        (state) => state?.customerJourneyDetails?.customerDetails
    );

    const formattedDOB = customerDetails?.dob
        ? new Date(customerDetails.dob).toLocaleDateString('en-GB')
        : '-';

    const getMaritalStatus = (id) => {
        switch (Number(id)) {
            case 1:
                return 'Single';
            case 2:
                return 'Married';
            default:
                return '-';
        }
    };

    const initials = customerDetails?.full_name
        ? customerDetails.full_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
        : null;

    const detailItems = [
        { label: 'PAN Number', val: customerDetails?.pancard || '-' },
        { label: 'Date of Birth', val: formattedDOB },
        { label: 'Marital Status', val: getMaritalStatus(customerDetails?.marital_status_id) },
        { label: 'Pincode', val: customerDetails?.residence_pincode || '-' },
        { label: 'Contact', val: customerDetails?.mobile || '-' },
        { label: 'Monthly Income', val: customerDetails?.monthly_income || '-' },
        { label: 'Personal Email', val: customerDetails?.personal_email?.toLowerCase?.() || '-' },
        { label: 'Official Email', val: customerDetails?.office_email || '-' },
    ];

    return (
        <>
            <style>{dashboardStyles}{upStyles}</style>
            <div className="db-page up-page">
                <div className="up-container">

                    {/* HERO */}
                    <div className="up-hero">
                        <div className="up-hero-blob1" />
                        <div className="up-hero-blob2" />
                        <div className="up-hero-inner">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">

                                <div className="d-flex align-items-center gap-3">
                                    <div className="up-avatar">
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
                                        <h4 className="up-name">
                                            Welcome <b>{customerDetails?.full_name}</b>
                                        </h4>

                                        <div className="d-flex align-items-center gap-2 mt-2">
                                            <span className="up-verified">
                                                <IconVerified /> Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-md-end">
                                    <div className="up-status-label">Application Status</div>
                                    <div className="up-status-badge">
                                        {customerDetails?.applicationStatus || 'Pending'}
                                    </div>

                                    <div className="up-status-label" style={{ marginTop: 12 }}>Application No.</div>
                                    <div className="up-refno">
                                        {customerDetails?.leadReferenceNo || '—'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CIBIL SCORE */}
                    <div className="db-card text-center">
                        <div className="db-section-title" style={{ justifyContent: 'flex-start' }}>Credit score</div>
                        <div className="up-cibil-meter-wrap">
                            <img src={cibilMeter} alt="cibil" />
                        </div>
                        <h3 className="up-cibil-score">
                            {customerDetails?.cp_bureau_score || '-'}
                        </h3>
                        <p className="up-cibil-sub">
                            Credit score based on your loan activity
                        </p>
                    </div>

                    {/* DETAILS GRID */}
                    <div className="db-card">
                        <div className="db-section-title">Profile details</div>
                        <div className="row g-3">
                            {detailItems.map((item, i) => (
                                <div className="col-12 col-md-6" key={i}>
                                    <div className="up-detail-item">
                                        <div className="up-detail-label">{item.label}</div>
                                        <div className="up-detail-val">{item.val}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <MobileNav />
        </>
    );
}