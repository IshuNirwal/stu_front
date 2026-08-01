import React, { useState } from 'react'
import MobileNav from '../../components/MobileNav';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { initiateAccountAggregator, initiateEkyc } from '../../Utils/api';
import JourneyRightPanel from '../../components/JourneyRightPannel';

/*
  Account Aggregator (v2) — gradient glass theme
  ──────────────────────────────────────────────
  Matches the rest of the journey: navy→teal gradient + dot grid,
  heading outside the card (amber eyebrow), dark glass console.
  The MUI TextField is replaced with the same white +91 mobile row
  used on the login screen so every input in the app looks alike.
  All Account Aggregator init logic and redirect flow unchanged.
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

  .aav2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .aav2 {
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
  }
  .aav2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .aav2-main {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    align-items: center;
    gap: clamp(2rem, 5vw, 4.5rem);
    padding: clamp(4.5rem, 9vh, 6rem) clamp(1.25rem, 4vw, 3rem) 3rem;
    min-height: 100vh;
  }

  /* ── Heading ── */
  .aav2-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 13px;
  }
  .aav2-eyebrow-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: var(--accent);
    color: #241a00;
  }
  .aav2-eyebrow-icon svg {
    width: 12px;
    height: 12px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .aav2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .aav2-lede {
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    max-width: 50ch;
    margin-bottom: 1.75rem;
  }

  /* ── Glass console ── */
  .aav2-card {
    width: 100%;
    max-width: 540px;
    border-radius: 24px;
    padding: 1.85rem 1.85rem 1.5rem;
    background: rgba(10, 34, 44, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow:
      0 24px 60px rgba(8, 26, 34, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .aav2-field-label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    margin-bottom: 9px;
  }
  .aav2-counter {
    font-size: 12px;
    color: rgba(255,255,255,0.45);
    font-variant-numeric: tabular-nums;
  }

  /* ── Mobile input (matches login screen) ── */
  .aav2-input-row {
    display: flex;
    align-items: center;
    height: 56px;
    border-radius: 15px;
    background: #ffffff;
    border: 2px solid transparent;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .aav2-input-row.focused {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
  }
  .aav2-prefix {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 14px;
    height: 100%;
    border-right: 1px solid rgba(31, 74, 92, 0.14);
    background: #f1f6f8;
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 700;
    color: #1f4a5c;
  }
  .aav2-input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #1f4a5c;
    font-family: inherit;
    font-variant-numeric: tabular-nums;
  }
  .aav2-input::placeholder {
    color: #9db3bc;
    font-weight: 400;
    letter-spacing: 0.3px;
  }

  /* ── AA info note ── */
  .aav2-note {
    display: flex;
    gap: 11px;
    align-items: flex-start;
    margin: 1.25rem 0 1.5rem;
    padding: 12px 14px;
    border-radius: 14px;
    background: rgba(63, 212, 196, 0.09);
    border: 1px solid rgba(63, 212, 196, 0.24);
  }
  .aav2-note svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-top: 1px;
    color: #3fd4c4;
  }
  .aav2-note p {
    font-size: 12px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
  }
  .aav2-note strong { color: #ffffff; font-weight: 700; }

  /* ── Steps ── */
  .aav2-section-title {
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
  .aav2-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.13);
  }
  .aav2-steps {
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-bottom: 1.6rem;
  }
  .aav2-step {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 12px 15px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 13px;
    transition: background 0.15s, border-color 0.15s;
  }
  .aav2-step:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.24);
  }
  .aav2-step-num {
    width: 27px;
    height: 27px;
    border-radius: 8px;
    background: var(--accent);
    color: #241a00;
    font-size: 12px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
  }
  .aav2-step-text {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    line-height: 1.45;
  }
  .aav2-step-icon {
    margin-left: auto;
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 8px;
    background: rgba(63,212,196,0.14);
    border: 1px solid rgba(63,212,196,0.26);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .aav2-step-icon svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: #3fd4c4;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ── CTA ── */
  .aav2-cta {
    width: 100%;
    height: 54px;
    border: none;
    border-radius: 15px;
    background: linear-gradient(180deg, #ffc233 0%, var(--accent) 60%);
    color: #241a00;
    font-family: 'Sora', sans-serif;
    font-size: 15.5px;
    font-weight: 800;
    letter-spacing: 0.3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    transition: filter 0.18s, transform 0.1s;
    box-shadow: 0 8px 24px rgba(255, 179, 0, 0.35);
  }
  .aav2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  .aav2-cta:active:not(:disabled) { transform: translateY(0); }
  .aav2-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
  .aav2-cta:disabled {
    background: rgba(255, 179, 0, 0.35);
    color: rgba(36, 26, 0, 0.55);
    cursor: not-allowed;
    box-shadow: none;
  }
  .aav2-cta svg { width: 17px; height: 17px; }

  /* ── Trust chips ── */
  .aav2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 1.15rem;
    padding-top: 1.05rem;
    border-top: 1px solid rgba(255,255,255,0.13);
  }
  .aav2-chip {
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
  .aav2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .aav2-main {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-top: 4.5rem;
      padding-bottom: 6.5rem; /* room for MobileNav */
      min-height: auto;
    }
    .aav2-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .aav2-left .aav2-card { text-align: left; }
    .aav2-lede { margin-left: auto; margin-right: auto; }
    .jrp2 { display: none; }
  }
  @media (max-width: 480px) {
    .aav2-card { padding: 1.4rem 1rem 1.2rem; border-radius: 20px; }
    .aav2-input-row { height: 52px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .aav2 *, .jrp2 * { animation: none !important; transition: none !important; }
  }
`;

const IconCheck = () => (
  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconBank = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 10l8-6 8 6" />
    <line x1="5" y1="10" x2="5" y2="18" />
    <line x1="9.5" y1="10" x2="9.5" y2="18" />
    <line x1="14.5" y1="10" x2="14.5" y2="18" />
    <line x1="19" y1="10" x2="19" y2="18" />
    <line x1="3" y1="21" x2="21" y2="21" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const STEPS = [
  'Enter your Mobile number',
  'Verify using OTP or secure authentication',
  'Details are verified instantly',
  'Loan application moves forward for approval',
];

export default function Ekyc() {
  const [loader, setLoader] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
  const [mobile, setMobile] = useState(customerDetails?.mobile || '');

  const submit = async () => {

    setLoader(true);

    const param = {
      profileId: customerDetails?.profileId,
      mobile_number: mobile,
      skipped_flag: ''
    };

    try {
      const response = await initiateAccountAggregator(param);
      if (response?.data?.apiStatus == 1) {
        setLoader(false);
        toast.success('Verification process started');
        window.location.href = response?.data?.data?.aggregator_url;

      } else {
        toast.error('Failed to start verification process');
      }
    } catch (error) {
      setLoader(false);
      toast.error('Failed to start verification process');
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="aav2">
        <main className="aav2-main">

          {/* ── Left: heading + glass console ── */}
          <div className="aav2-left">
            <span className="aav2-eyebrow">
              <span className="aav2-eyebrow-icon"><IconBank /></span>
              Bank verification · Account Aggregator
            </span>
            

            <div className="aav2-card">
              {/* Mobile input */}
              <label className="aav2-field-label">
                <span>Mobile number linked to your bank</span>
                <span className="aav2-counter">{mobile.length}/10</span>
              </label>
              <div className={`aav2-input-row${isFocused ? ' focused' : ''}`}>
                <span className="aav2-prefix">+91</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={mobile}
                  className="aav2-input"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                />
              </div>

              {/* AA info note */}
              <div className="aav2-note">
                <IconShield />
                <p>
                  <strong>What is Account Aggregator?</strong> An RBI-regulated
                  framework that shares your bank data securely with your
                  consent — <strong>we never see your bank password</strong>.
                </p>
              </div>

              {/* Steps */}
              <div className="aav2-section-title">How it works</div>
              <div className="aav2-steps">
                {STEPS.map((step, i) => (
                  <div className="aav2-step" key={i}>
                    <div className="aav2-step-num">{i + 1}</div>
                    <span className="aav2-step-text">{step}</span>
                    <div className="aav2-step-icon"><IconCheck /></div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="aav2-cta" onClick={submit} disabled={loader}>
                {loader ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    Starting verification
                  </>
                ) : (
                  <>Start Account Aggregator <IconSend /></>
                )}
              </button>

              {/* Trust chips */}
              <div className="aav2-trust">
                <span className="aav2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  256-bit SSL
                </span>
                <span className="aav2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Data stays private
                </span>
                <span className="aav2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  RBI compliant
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: reusable finance visual ── */}
          <JourneyRightPanel />

        </main>
      </div>
      <MobileNav />
    </>
  );
}