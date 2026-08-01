/* global fbq */
/* global gtag */

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { customerDetailsApiCall, updateCustomerDetails, updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import MobileNav from '../../components/MobileNav';
import { Link } from 'react-router-dom';
import ConnectUs from '../../components/ConnectUs';


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

  .tyv2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .tyv2 {
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
    padding-bottom: 90px; /* room for MobileNav */
  }
  .tyv2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .tyv2-main {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 780px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: clamp(3.5rem, 8vh, 5rem) 1.25rem 2rem;
    text-align: center;
  }

  /* ── Success burst ── */
  .tyv2-burst {
    position: relative;
    width: 118px;
    height: 118px;
    margin-bottom: 1.5rem;
  }
  .tyv2-burst-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1.5px dashed rgba(255, 255, 255, 0.3);
    animation: tyv2Spin 14s linear infinite;
  }
  .tyv2-burst-ring.r2 {
    inset: 13px;
    border: 1.5px solid rgba(255, 179, 0, 0.35);
    animation: tyv2Spin 20s linear infinite reverse;
  }
  .tyv2-burst-core {
    position: absolute;
    inset: 26px;
    border-radius: 50%;
    background: linear-gradient(180deg, #ffc233 0%, var(--accent) 70%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 36px rgba(255, 179, 0, 0.45);
    animation: tyv2Pop 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .tyv2-burst-core svg {
    width: 32px;
    height: 32px;
    fill: none;
    stroke: #241a00;
    stroke-width: 3.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .tyv2-burst-spark {
    position: absolute;
    border-radius: 50%;
  }
  .tyv2-burst-spark.s1 { width: 10px; height: 10px; background: #3fd4c4; top: 2px; right: 10px; }
  .tyv2-burst-spark.s2 { width: 7px; height: 7px; background: var(--accent); bottom: 8px; left: 0; }
  .tyv2-burst-spark.s3 { width: 6px; height: 6px; background: rgba(255,255,255,0.8); bottom: -2px; right: 22px; }
  @keyframes tyv2Spin { to { transform: rotate(360deg); } }
  @keyframes tyv2Pop {
    from { transform: scale(0.4); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }

  /* ── Pill + headline ── */
  .tyv2-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(63, 212, 196, 0.14);
    border: 1px solid rgba(63, 212, 196, 0.35);
    border-radius: 999px;
    padding: 6px 15px;
    color: #3fd4c4;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .tyv2-pill::before {
    content: '●';
    font-size: 7px;
    animation: tyv2Blink 1.4s ease infinite;
  }
  @keyframes tyv2Blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

  .tyv2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(30px, 5vw, 44px);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.6px;
    margin-bottom: 12px;
  }
  .tyv2-h1 span { color: var(--accent); }
  .tyv2-sub {
    font-size: 15px;
    line-height: 1.65;
    color: rgba(255,255,255,0.75);
    max-width: 46ch;
    margin: 0 auto 1.75rem;
  }

  /* ── Reference ticket ── */
  .tyv2-ticket {
    position: relative;
    display: flex;
    align-items: stretch;
    width: 100%;
    max-width: 420px;
    margin: 0 auto 1.5rem;
    border-radius: 18px;
    background: rgba(10, 34, 44, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 18px 48px rgba(8, 26, 34, 0.4);
    overflow: hidden;
  }
  /* side notches */
  .tyv2-ticket::before,
  .tyv2-ticket::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--navy);
    border: 1px solid rgba(255,255,255,0.18);
    transform: translateY(-50%);
    z-index: 1;
  }
  .tyv2-ticket::before { left: -11px; }
  .tyv2-ticket::after { right: -11px; }

  .tyv2-ticket-left {
    flex: 1;
    padding: 16px 18px 16px 26px;
    text-align: left;
    min-width: 0;
  }
  .tyv2-ticket-label {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 5px;
  }
  .tyv2-ticket-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 19px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 1.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tyv2-ticket-divider {
    width: 0;
    border-left: 1.5px dashed rgba(255,255,255,0.25);
    margin: 12px 0;
  }
  .tyv2-ticket-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 22px;
    flex-shrink: 0;
  }
  .tyv2-ticket-right svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: #3fd4c4;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ── e-KYC button ── */
  .tyv2-ekyc-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    width: 100%;
    max-width: 420px;
    margin: 0 auto 2.25rem;
    height: 54px;
    background: linear-gradient(180deg, #ffc233 0%, var(--accent) 60%);
    color: #241a00;
    border-radius: 15px;
    font-family: 'Sora', sans-serif;
    font-size: 15.5px;
    font-weight: 800;
    letter-spacing: 0.3px;
    text-decoration: none;
    box-shadow: 0 8px 24px rgba(255, 179, 0, 0.35);
    transition: filter 0.18s, transform 0.1s;
  }
  .tyv2-ekyc-btn:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    color: #241a00;
    text-decoration: none;
  }
  .tyv2-ekyc-btn svg {
    width: 17px;
    height: 17px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ── Horizontal timeline ── */
  .tyv2-next-title {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.25rem;
  }
  .tyv2-next-title::before,
  .tyv2-next-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.15);
  }

  .tyv2-timeline {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 100%;
    position: relative;
    margin-bottom: 2.25rem;
  }
  /* connecting line behind the numbers */
  .tyv2-timeline::before {
    content: '';
    position: absolute;
    top: 18px;
    left: 16.6%;
    right: 16.6%;
    height: 1.5px;
    background: repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.3) 0 6px,
      transparent 6px 13px
    );
  }
  .tyv2-tl-step {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .tyv2-tl-num {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(10, 34, 44, 0.85);
    border: 2px solid var(--accent);
    color: var(--accent);
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .tyv2-tl-body {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    padding: 13px 12px;
    width: 100%;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .tyv2-tl-head {
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 3px;
  }
  .tyv2-tl-sub {
    font-size: 11.5px;
    line-height: 1.5;
    color: rgba(255,255,255,0.6);
  }

  /* ── Help strip ── */
  .tyv2-help {
    width: 100%;
    border-radius: 18px;
    padding: 1.35rem 1.5rem;
    background: rgba(10, 34, 44, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    text-align: left;
    margin-bottom: 1.25rem;
  }
  .tyv2-help-title {
    font-family: 'Sora', sans-serif;
    font-size: 14.5px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 4px;
  }
  .tyv2-help-sub {
    font-size: 12.5px;
    color: rgba(255,255,255,0.62);
    margin-bottom: 0.9rem;
  }

  /* ── Trust chips ── */
  .tyv2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
  }
  .tyv2-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 999px;
    padding: 4px 11px;
    white-space: nowrap;
  }
  .tyv2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Confetti ── */
  .tyv2-confetti {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
  }
  .tyv2-dot {
    position: absolute;
    border-radius: 50%;
    animation: tyv2Fall linear infinite;
    opacity: 0;
  }
  @keyframes tyv2Fall {
    0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .tyv2-timeline {
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .tyv2-timeline::before { display: none; }
    .tyv2-tl-step {
      flex-direction: row;
      align-items: flex-start;
      text-align: left;
    }
    .tyv2-tl-num { flex-shrink: 0; }
    .tyv2-ticket-right { padding: 0 16px; }
    .tyv2-ticket-value { font-size: 16px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .tyv2 *, .tyv2-confetti * { animation: none !important; transition: none !important; }
    .tyv2-dot { display: none; }
  }
`;

// Icons
const IconCheck = () => <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;
const IconHash = () => <svg viewBox="0 0 24 24"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>;
const IconArrow = () => <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

// Confetti blobs — theme palette
const DOTS = [
  { color: '#ffb300', size: 8,  left: '10%', delay: '0s',   dur: '3.2s' },
  { color: '#3fd4c4', size: 6,  left: '25%', delay: '0.4s', dur: '2.8s' },
  { color: '#ffffff', size: 5,  left: '40%', delay: '0.8s', dur: '3.5s' },
  { color: '#ffb300', size: 7,  left: '55%', delay: '0.2s', dur: '3.0s' },
  { color: '#3fd4c4', size: 9,  left: '70%', delay: '1.0s', dur: '2.6s' },
  { color: '#ffc233', size: 6,  left: '85%', delay: '0.6s', dur: '3.8s' },
  { color: '#ffffff', size: 5,  left: '92%', delay: '1.2s', dur: '2.9s' },
];

export default function Thankyou() {
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
  const dispatch = useDispatch();
  const [showConfetti, setShowConfetti] = useState(true);

  const params = { profileId: customerDetails?.profileId };

  async function fetchCustomerDetails() {
    if (params.profileId) {
      let { payload } = await dispatch(customerDetailsApiCall(params));
      if (payload?.data?.apiStatus == 1) {
        dispatch(updateCustomerDetails(payload?.data?.data?.customer_details));
        dispatch(updateJourneyEvents(payload?.data?.data?.screen_details));
      }
    }
  }

  useEffect(() => {
    fetchCustomerDetails();
    const t = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* Confetti */}
      {showConfetti && (
        <div className="tyv2-confetti" aria-hidden="true">
          {DOTS.map((d, i) => (
            <div
              key={i}
              className="tyv2-dot"
              style={{
                width: d.size, height: d.size,
                background: d.color,
                left: d.left, top: '-20px',
                animationDelay: d.delay,
                animationDuration: d.dur,
              }}
            />
          ))}
        </div>
      )}

      <div className="tyv2">
        <main className="tyv2-main">

          {/* ── Success burst ── */}
          <div className="tyv2-burst" aria-hidden="true">
            <div className="tyv2-burst-ring" />
            <div className="tyv2-burst-ring r2" />
            <div className="tyv2-burst-core"><IconCheck /></div>
            <span className="tyv2-burst-spark s1" />
            <span className="tyv2-burst-spark s2" />
            <span className="tyv2-burst-spark s3" />
          </div>

          <div className="tyv2-pill">Application submitted</div>

          <h1 className="tyv2-h1">
            You're all <span>done!</span>
          </h1>
          <p className="tyv2-sub">
            Great! We've received your loan application. Our team will review it
            and get in touch with you shortly.
          </p>

          {/* ── Reference ticket ── */}
          {customerDetails?.leadReferenceNo && (
            <div className="tyv2-ticket">
              <div className="tyv2-ticket-left">
                <div className="tyv2-ticket-label">Reference number</div>
                <div className="tyv2-ticket-value">{customerDetails.leadReferenceNo}</div>
              </div>
              <div className="tyv2-ticket-divider" />
              <div className="tyv2-ticket-right"><IconHash /></div>
            </div>
          )}

          {/* ── e-KYC button (conditional) ── */}
          {customerDetails?.show_ekyc_btn_flag === 1 && (
            <Link
              to={customerDetails?.ekyc_url}
              target="_blank"
              className="tyv2-ekyc-btn"
            >
              <IconArrow />
              {customerDetails?.show_ekyc_btn_text || 'Complete e-KYC'}
            </Link>
          )}

          {/* ── What happens next — horizontal timeline ── */}
          <div className="tyv2-next-title">What happens next</div>
          <div className="tyv2-timeline">
            <div className="tyv2-tl-step">
              <div className="tyv2-tl-num">1</div>
              <div className="tyv2-tl-body">
                <div className="tyv2-tl-head">Application review</div>
                <div className="tyv2-tl-sub">Our team carefully reviews your application</div>
              </div>
            </div>
            <div className="tyv2-tl-step">
              <div className="tyv2-tl-num">2</div>
              <div className="tyv2-tl-body">
                <div className="tyv2-tl-head">Quick processing</div>
                <div className="tyv2-tl-sub">Decisions are usually made within 24 hours</div>
              </div>
            </div>
            <div className="tyv2-tl-step">
              <div className="tyv2-tl-num">3</div>
              <div className="tyv2-tl-body">
                <div className="tyv2-tl-head">You'll be notified</div>
                <div className="tyv2-tl-sub">We'll update you via SMS, call, or email</div>
              </div>
            </div>
          </div>

          {/* ── Help strip ── */}
          <div className="tyv2-help">
            <div className="tyv2-help-title">Need help?</div>
            <p className="tyv2-help-sub">Reach out to us anytime — we're happy to help.</p>
            <ConnectUs />
          </div>

          {/* ── Trust chips ── */}
          <div className="tyv2-trust">
            <span className="tyv2-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              256-bit SSL
            </span>
            <span className="tyv2-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Data stays private
            </span>
            <span className="tyv2-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              RBI compliant
            </span>
          </div>

        </main>
      </div>

      <MobileNav />
    </>
  );
}