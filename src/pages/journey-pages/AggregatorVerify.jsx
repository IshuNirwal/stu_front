import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAggregatorResponse, initiateAccountAggregator } from '../../Utils/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import JourneyRightPanel from '../../components/JourneyRightPannel';
import MobileNav from '../../components/MobileNav';

/*
  AggregatorVerify (v2) — gradient glass theme
  ────────────────────────────────────────────
  Matches the rest of the journey: navy→teal gradient + dot grid,
  heading outside the card (amber eyebrow with bank icon), dark
  glass console. Steps as glass rows, failure alert as amber-tinted
  glass, amber gradient primary CTA + glass outline skip button,
  trust chips.
  All verify / re-initiate / skip logic and flow are unchanged.
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

  .aavf2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .aavf2 {
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
  .aavf2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .aavf2-main {
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
  .aavf2-eyebrow {
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
  .aavf2-eyebrow-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: var(--accent);
    color: #241a00;
  }
  .aavf2-eyebrow-icon svg {
    width: 12px;
    height: 12px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .aavf2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .aavf2-lede {
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    max-width: 50ch;
    margin-bottom: 1.75rem;
  }
  .aavf2-lede strong { color: #ffffff; font-weight: 700; }

  /* ── Glass console ── */
  .aavf2-card {
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

  /* Link icon ring */
  .aavf2-icon-ring {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: rgba(255, 179, 0, 0.14);
    border: 1.5px solid rgba(255, 179, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.15rem;
  }
  .aavf2-icon-ring svg {
    width: 26px;
    height: 26px;
    fill: none;
    stroke: var(--accent);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .aavf2-card-title {
    font-family: 'Sora', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.2px;
    margin-bottom: 6px;
  }
  .aavf2-card-sub {
    font-size: 13.5px;
    color: rgba(255,255,255,0.66);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  .aavf2-card-sub strong { color: var(--accent); font-weight: 700; }

  /* ── Steps ── */
  .aavf2-section-title {
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
  .aavf2-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.13);
  }
  .aavf2-steps {
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-bottom: 1.6rem;
  }
  .aavf2-step {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 12px 15px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 13px;
    transition: background 0.15s, border-color 0.15s;
  }
  .aavf2-step:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.24);
  }
  .aavf2-step-num {
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
  .aavf2-step-text {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    line-height: 1.45;
    flex: 1;
  }
  .aavf2-step-check {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    background: rgba(63,212,196,0.14);
    border: 1px solid rgba(63,212,196,0.26);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-left: auto;
  }
  .aavf2-step-check svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: #3fd4c4;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ── Failure alert ── */
  .aavf2-skip-alert {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: rgba(255, 179, 0, 0.1);
    border: 1px solid rgba(255, 179, 0, 0.32);
    border-radius: 13px;
    padding: 12px 14px;
    margin-bottom: 1.25rem;
  }
  .aavf2-skip-alert-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-top: 1px;
    color: var(--accent);
  }
  .aavf2-skip-alert-text {
    font-size: 12.5px;
    color: #ffe1a3;
    line-height: 1.55;
  }
  .aavf2-skip-alert-text strong { color: #ffffff; }

  /* ── Buttons ── */
  .aavf2-btn {
    width: 100%;
    height: 52px;
    border: none;
    border-radius: 15px;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    transition: filter 0.18s, transform 0.1s, background 0.15s, border-color 0.15s;
    margin-bottom: 10px;
  }
  .aavf2-btn:last-of-type { margin-bottom: 0; }
  .aavf2-btn:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
  .aavf2-btn svg { width: 17px; height: 17px; flex-shrink: 0; }

  .aavf2-btn-primary {
    background: linear-gradient(180deg, #ffc233 0%, var(--accent) 60%);
    color: #241a00;
    box-shadow: 0 8px 24px rgba(255, 179, 0, 0.35);
  }
  .aavf2-btn-primary:hover:not(:disabled) {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }
  .aavf2-btn-primary:active:not(:disabled) { transform: translateY(0); }

  .aavf2-btn-outline {
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.82);
    border: 1.5px solid rgba(255,255,255,0.24);
    font-weight: 700;
  }
  .aavf2-btn-outline:hover:not(:disabled) {
    border-color: rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.12);
    color: #ffffff;
  }

  .aavf2-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  /* ── Trust chips ── */
  .aavf2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 1.15rem;
    padding-top: 1.05rem;
    border-top: 1px solid rgba(255,255,255,0.13);
  }
  .aavf2-chip {
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
  .aavf2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .aavf2-main {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-top: 4.5rem;
      padding-bottom: 6.5rem; /* room for MobileNav */
      min-height: auto;
    }
    .aavf2-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .aavf2-left .aavf2-card { text-align: left; }
    .aavf2-lede { margin-left: auto; margin-right: auto; }
    .jrp2 { display: none; }
  }
  @media (max-width: 480px) {
    .aavf2-card { padding: 1.4rem 1rem 1.2rem; border-radius: 20px; }
    .aavf2-h1 { font-size: 24px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .aavf2 *, .jrp2 * { animation: none !important; transition: none !important; }
  }
`;

// ── Icons ──
const IconLink = () => (
  <svg viewBox="0 0 24 24">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
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
const IconRetry = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconSkip = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>
  </svg>
);
const IconWarn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="aavf2-skip-alert-icon">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const Spinner = ({ color = 'currentColor' }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
    </path>
  </svg>
);

const STEPS = [
  'Click verify to connect your Account Aggregator',
  'Your financial data is fetched securely',
  'Verification is completed instantly',
];

export default function AggregatorVerify() {
  const [loader, setLoader] = useState(''); // '' | 'verify' | 'retry' | 'skip'
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get('refstr');

  const navigate = useNavigate();
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
  const dispatch = useDispatch();

  // Verify: check aggregator response
  const submit = async () => {
    setLoader('verify');
    try {
      const response = await getAggregatorResponse({ lead_id: leadId });
      if (response?.data?.Status == 1) {
        toast.success('Verification successful');
        dispatch(updateJourneyEvents({ aggregator_verify: 1, upload_documents: 2 }));
      } else {
        setVerifyFailed(true);
        toast.error('Verification failed. Please retry or skip.');
      }
    } catch {
      setVerifyFailed(true);
      toast.error('Verification failed. Please retry or skip.');
    } finally {
      setLoader('');
    }
  };

  // Reinitiate: fresh AA session, then user can verify again
  const reinitiate = async () => {
    setLoader('retry');
    try {
      const response = await initiateAccountAggregator({
        profileId: customerDetails?.profileId,
        mobile_number: customerDetails?.mobile,
      });
      if (response?.data?.apiStatus == 1) {
        toast.success('Verification re-initiated. Please complete the process and verify again.');
        setVerifyFailed(false); // back to verify button
        window.location.href = response?.data?.data?.aggregator_url;
      } else {
        toast.error('Failed to re-initiate verification');
      }
    } catch {
      toast.error('Failed to re-initiate verification');
    } finally {
      setLoader('');
    }
  };

  // Skip: continue with manual document upload
  const skipAggregator = async () => {
    setLoader('skip');
    try {
      const response = await initiateAccountAggregator({
        profileId: customerDetails?.profileId,
        mobile_number: customerDetails?.mobile,
        skipped_flag: 1,
      });
      if (response?.data?.apiStatus == 1) {
        toast.success('Continuing with manual document upload');
        dispatch(updateJourneyEvents({ aggregator_verify: 1, aggregator_skip: 1, upload_documents: 2 }));
      } else {
        toast.error('Failed to skip. Please try again.');
      }
    } catch {
      toast.error('Failed to skip. Please try again.');
    } finally {
      setLoader('');
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="aavf2">
        <main className="aavf2-main">

          {/* ── Left: heading + glass console ── */}
          <div className="aavf2-left">
            <span className="aavf2-eyebrow">
              <span className="aavf2-eyebrow-icon"><IconBank /></span>
              Bank verification · Confirm status
            </span>
            

            <div className="aavf2-card">
              <div className="aavf2-icon-ring"><IconLink /></div>

              <p className="aavf2-card-title">Account Aggregator</p>
              <p className="aavf2-card-sub">
                Click <strong>Verify with Account Aggregator</strong> below to
                validate your account securely.
              </p>

              <div className="aavf2-section-title">How it works</div>
              <div className="aavf2-steps">
                {STEPS.map((step, i) => (
                  <div className="aavf2-step" key={i}>
                    <div className="aavf2-step-num">{i + 1}</div>
                    <span className="aavf2-step-text">{step}</span>
                    <div className="aavf2-step-check"><IconCheck /></div>
                  </div>
                ))}
              </div>

              {verifyFailed && (
                <div className="aavf2-skip-alert">
                  <IconWarn />
                  <div className="aavf2-skip-alert-text">
                    <strong>Verification failed.</strong> You can re-initiate the
                    Account Aggregator process, or skip and continue with manual
                    document upload.
                  </div>
                </div>
              )}

              {verifyFailed ? (
                <>
                  <button className="aavf2-btn aavf2-btn-primary" onClick={reinitiate} disabled={loader !== ''}>
                    {loader === 'retry'
                      ? <><Spinner /> Re-initiating…</>
                      : <><IconRetry /> Re-initiate verification</>
                    }
                  </button>
                  <button className="aavf2-btn aavf2-btn-outline" onClick={skipAggregator} disabled={loader !== ''}>
                    {loader === 'skip'
                      ? <><Spinner /> Please wait…</>
                      : <><IconSkip /> Skip account aggregator</>
                    }
                  </button>
                </>
              ) : (
                <button className="aavf2-btn aavf2-btn-primary" onClick={submit} disabled={loader !== ''}>
                  {loader === 'verify'
                    ? <><Spinner /> Starting verification…</>
                    : <><IconSend /> Verify with account aggregator</>
                  }
                </button>
              )}

              {/* Trust chips */}
              <div className="aavf2-trust">
                <span className="aavf2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  256-bit SSL
                </span>
                <span className="aavf2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Data stays private
                </span>
                <span className="aavf2-chip">
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