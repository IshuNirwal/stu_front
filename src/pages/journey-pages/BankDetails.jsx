import React, { useState } from 'react';
import MobileNav from '../../components/MobileNav';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBankVerify } from '../../Utils/api';
import { updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import JourneyRightPanel from '../../components/JourneyRightPannel';



const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

  .bdv2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .bdv2 {
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
  .bdv2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .bdv2-main {
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
  .bdv2-eyebrow {
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
  .bdv2-eyebrow-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: var(--accent);
    color: #241a00;
  }
  .bdv2-eyebrow-icon svg {
    width: 12px;
    height: 12px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .bdv2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .bdv2-lede {
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    max-width: 50ch;
    margin-bottom: 1.75rem;
  }

  /* ── Glass console ── */
  .bdv2-card {
    width: 100%;
    max-width: 560px;
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

  /* ── Verified strip ── */
  .bdv2-verified-strip {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(63, 212, 196, 0.1);
    border: 1px solid rgba(63, 212, 196, 0.3);
    border-radius: 14px;
    padding: 12px 15px;
    margin-bottom: 1.5rem;
  }
  .bdv2-verified-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: rgba(63, 212, 196, 0.16);
    border: 1px solid rgba(63, 212, 196, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .bdv2-verified-icon svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: #3fd4c4;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .bdv2-verified-text {
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
  }
  .bdv2-verified-text span {
    font-size: 11.5px;
    color: rgba(255,255,255,0.6);
    font-weight: 400;
    display: block;
    margin-top: 2px;
  }

  /* ── Sections ── */
  .bdv2-section { margin-bottom: 1.5rem; }
  .bdv2-section-title {
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
  .bdv2-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.13);
  }

  .bdv2-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.15rem;
    margin-bottom: 1.15rem;
  }
  .bdv2-row:last-child { margin-bottom: 0; }
  .bdv2-row.single { grid-template-columns: 1fr; }

  .bdv2-field-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    margin-bottom: 8px;
  }

  /* ── Read-only frosted rows ── */
  .bdv2-input-wrap { position: relative; }
  .bdv2-input-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255,255,255,0.45);
    pointer-events: none;
    display: flex;
    align-items: center;
  }
  .bdv2-input-icon svg { width: 16px; height: 16px; }
  .bdv2-input {
    width: 100%;
    height: 50px;
    border: 1.5px solid rgba(255,255,255,0.16);
    border-radius: 13px;
    background: rgba(255,255,255,0.08);
    padding: 0 62px 0 40px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    outline: none;
    cursor: not-allowed;
    text-overflow: ellipsis;
  }
  .bdv2-input.masked { letter-spacing: 2px; }
  .bdv2-auto-badge {
    position: absolute;
    right: 11px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(63, 212, 196, 0.16);
    border: 1px solid rgba(63, 212, 196, 0.3);
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: #3fd4c4;
    font-family: 'Inter', sans-serif;
  }

  /* ── CTA ── */
  .bdv2-cta {
    width: 100%;
    height: 54px;
    margin-top: 0.5rem;
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
  .bdv2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  .bdv2-cta:active:not(:disabled) { transform: translateY(0); }
  .bdv2-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
  .bdv2-cta:disabled {
    background: rgba(255, 179, 0, 0.35);
    color: rgba(36, 26, 0, 0.55);
    cursor: not-allowed;
    box-shadow: none;
  }
  .bdv2-cta svg { width: 17px; height: 17px; }

  /* ── Trust chips ── */
  .bdv2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 1.15rem;
    padding-top: 1.05rem;
    border-top: 1px solid rgba(255,255,255,0.13);
  }
  .bdv2-chip {
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
  .bdv2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Full-screen loader ── */
  .bdv2-loader-overlay {
    position: fixed;
    inset: 0;
    background: rgba(6, 23, 30, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  .bdv2-loader-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 1.75rem 2.25rem;
    background: rgba(12, 37, 48, 0.95);
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 20px;
    box-shadow: 0 24px 60px rgba(4, 16, 22, 0.6);
    text-align: center;
    color: #ffffff;
  }
  .bdv2-loader-spinner {
    width: 44px;
    height: 44px;
    border: 3px solid rgba(255,255,255,0.15);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: bdv2-spin 0.7s linear infinite;
  }
  @keyframes bdv2-spin { to { transform: rotate(360deg); } }
  .bdv2-loader-title {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
  }
  .bdv2-loader-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.62);
    max-width: 230px;
    line-height: 1.55;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .bdv2-main {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-top: 4.5rem;
      padding-bottom: 6.5rem; /* room for MobileNav */
      min-height: auto;
    }
    .bdv2-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .bdv2-left .bdv2-card { text-align: left; }
    .bdv2-lede { margin-left: auto; margin-right: auto; }
    .jrp2 { display: none; }
  }
  @media (max-width: 640px) {
    .bdv2-row { grid-template-columns: 1fr; gap: 1rem; }
  }
  @media (max-width: 480px) {
    .bdv2-card { padding: 1.4rem 1rem 1.2rem; border-radius: 20px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bdv2 *, .jrp2 * { animation: none !important; transition: none !important; }
  }
`;

// ── Icons ──
const IconBank = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22"/>
    <line x1="6" y1="18" x2="6" y2="11"/>
    <line x1="10" y1="18" x2="10" y2="11"/>
    <line x1="14" y1="18" x2="14" y2="11"/>
    <line x1="18" y1="18" x2="18" y2="11"/>
    <polygon points="12 2 20 7 4 7"/>
  </svg>
);
const IconBankSmall = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 10l8-6 8 6" />
    <line x1="5" y1="10" x2="5" y2="18" />
    <line x1="9.5" y1="10" x2="9.5" y2="18" />
    <line x1="14.5" y1="10" x2="14.5" y2="18" />
    <line x1="19" y1="10" x2="19" y2="18" />
    <line x1="3" y1="21" x2="21" y2="21" />
  </svg>
);
const IconHash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9"/>
    <line x1="4" y1="15" x2="20" y2="15"/>
    <line x1="10" y1="3" x2="8" y2="21"/>
    <line x1="16" y1="3" x2="14" y2="21"/>
  </svg>
);
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// Readonly field sub-component
const ReadonlyField = ({ label, value, icon, masked }) => (
  <div>
    <label className="bdv2-field-label">{label}</label>
    <div className="bdv2-input-wrap">
      <span className="bdv2-input-icon">{icon}</span>
      <input
        type="text"
        className={`bdv2-input ${masked ? 'masked' : ''}`}
        value={value || '—'}
        readOnly
        aria-label={label}
      />
      <span className="bdv2-auto-badge">auto</span>
    </div>
  </div>
);

// Mask account number — show only last 4 digits
const maskAccount = (acc) => {
  if (!acc) return '—';
  const str = String(acc);
  return '•'.repeat(Math.max(0, str.length - 4)) + str.slice(-4);
};

export default function BankDetails() {
  const [isVerifying, setIsVerifying] = useState(false);
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const utm_source = customerDetails?.utm_source;

  const submit = async () => {
    if (isVerifying) return;
    const param = {
      profileId: customerDetails?.profileId,
      bankAccountNo: customerDetails?.data?.bankAccountNo,
      confirmBankAccountNo: customerDetails?.data?.confirmBankAccountNo,
      ifscCode: customerDetails?.data?.ifscCode,
      accountTypeId: customerDetails?.data?.accountTypeId,
    };
    setIsVerifying(true);
    try {
      const response = await getBankVerify(param);
      if (response?.data?.apiStatus === 1) {

        if (response?.data?.data?.go_to_esign === 1) {
          window.location.replace(response?.data?.data?.url);
          return;
        } else {
          dispatch(updateJourneyEvents({ banking_details: 1 }));
          navigate('/journey/congratulations');
        }
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch {
      toast.error("Error while verifying bank details");
    } finally {
      setIsVerifying(false);
    }
  };

  const data = customerDetails?.data || {};

  return (
    <>
      <style>{styles}</style>
      <div className="bdv2">
        <main className="bdv2-main">

          {/* ── Left: heading + glass console ── */}
          <div className="bdv2-left">
            <span className="bdv2-eyebrow">
              <span className="bdv2-eyebrow-icon"><IconBankSmall /></span>
              Bank verification · Review details
            </span>
            

            <div className="bdv2-card">
              {/* VERIFIED STRIP */}
              <div className="bdv2-verified-strip">
                <div className="bdv2-verified-icon"><IconCheck /></div>
                <div className="bdv2-verified-text">
                  Bank account verified
                  <span>Details auto-fetched via secure banking API</span>
                </div>
              </div>

              {/* BANK INFO */}
              <div className="bdv2-section">
                <div className="bdv2-section-title">Bank information</div>

                <div className="bdv2-row single">
                  <ReadonlyField
                    label="Bank name"
                    value={data.bankName}
                    icon={<IconBank />}
                  />
                </div>

                <div className="bdv2-row">
                  <ReadonlyField
                    label="Branch name"
                    value={data.branch}
                    icon={<IconMapPin />}
                  />
                  <ReadonlyField
                    label="IFSC code"
                    value={data.ifscCode}
                    icon={<IconCode />}
                  />
                </div>
              </div>

              {/* ACCOUNT INFO */}
              <div className="bdv2-section">
                <div className="bdv2-section-title">Account details</div>
                <div className="bdv2-row">
                  <ReadonlyField
                    label="Account number"
                    value={maskAccount(data.bankAccountNo)}
                    icon={<IconHash />}
                    masked
                  />
                  <ReadonlyField
                    label="Confirm account"
                    value={maskAccount(data.confirmBankAccountNo)}
                    icon={<IconUser />}
                    masked
                  />
                </div>
              </div>

              {/* CTA */}
              <button className="bdv2-cta" onClick={submit} disabled={isVerifying}>
                {isVerifying ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>Confirm &amp; continue <IconArrow /></>
                )}
              </button>

              {/* Trust chips */}
              <div className="bdv2-trust">
                <span className="bdv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  256-bit SSL
                </span>
                <span className="bdv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Data stays private
                </span>
                <span className="bdv2-chip">
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

      {/* FULL SCREEN LOADER */}
      {isVerifying && (
        <div className="bdv2-loader-overlay">
          <div className="bdv2-loader-box">
            <div className="bdv2-loader-spinner" />
            <div className="bdv2-loader-title">Verifying your bank account</div>
            <div className="bdv2-loader-sub">Please wait a few seconds. Do not refresh or close the page.</div>
          </div>
        </div>
      )}
    </>
  );
}