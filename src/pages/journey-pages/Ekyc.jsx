import React, { useEffect, useState } from 'react'
import MobileNav from '../../components/MobileNav';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getEkycResponse, initiateEkyc } from '../../Utils/api';
import JourneyRightPanel from '../../components/JourneyRightPannel';
import { updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';

/*
  Ekyc (v2) — gradient glass theme
  ────────────────────────────────
  Matches the rest of the journey: navy→teal gradient + dot grid,
  heading outside the card (amber numbered eyebrow), dark glass
  console. Aadhaar tiles: first 8 locked (frosted), last 4 editable
  white tiles with amber focus. Steps as glass rows, amber CTA,
  trust chips. All e-KYC logic and redirect flow are unchanged.
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

  .ekycv2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .ekycv2-error {
  margin: 8px 0 0;
  color: #dc2626;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

  .ekycv2 {
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
  .ekycv2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .ekycv2-main {
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
  .ekycv2-eyebrow {
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
  .ekycv2-eyebrow-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: var(--accent);
    color: #241a00;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0;
  }
  .ekycv2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .ekycv2-lede {
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    max-width: 48ch;
    margin-bottom: 1.75rem;
  }

  /* ── Glass console ── */
  .ekycv2-card {
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

  .ekycv2-field-label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    margin-bottom: 9px;
  }
  .ekycv2-field-label .hint {
    font-size: 11.5px;
    font-weight: 500;
    color: rgba(255,255,255,0.42);
    letter-spacing: 0.3px;
  }

  /* ── Aadhaar tiles ── */
  .ekycv2-boxes {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: nowrap;
    margin-bottom: 8px;
  }
  .ekycv2-box {
    flex: 1;
    min-width: 0;
    max-width: 38px;
    height: 48px;
    border-radius: 11px;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 700;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  }
  /* locked first 8 — frosted */
  .ekycv2-box.locked {
    border: 1.5px dashed rgba(255,255,255,0.24);
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.4);
    cursor: not-allowed;
  }
  /* editable last 4 — white */
  .ekycv2-box.editable {
    border: 2px solid transparent;
    background: #ffffff;
    color: #1f4a5c;
    caret-color: var(--accent);
    cursor: text;
  }
  .ekycv2-box.editable::placeholder { color: #b9c9d1; font-weight: 500; }
  .ekycv2-box.editable:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
  }
  .ekycv2-box.editable.has-val {
    border-color: var(--teal);
    background: #f0fbfa;
  }
  .ekycv2-sep {
    width: 7px;
    height: 2px;
    border-radius: 2px;
    background: rgba(255,255,255,0.35);
    flex-shrink: 0;
  }
  .ekycv2-mask-note {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 1.5rem;
  }
  .ekycv2-mask-note svg { width: 12px; height: 12px; color: #3fd4c4; flex-shrink: 0; }

  /* ── Steps ── */
  .ekycv2-section-title {
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
  .ekycv2-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.13);
  }
  .ekycv2-steps {
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-bottom: 1.6rem;
  }
  .ekycv2-step {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 12px 15px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 13px;
    transition: background 0.15s, border-color 0.15s;
  }
  .ekycv2-step:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.24);
  }
  .ekycv2-step-num {
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
  .ekycv2-step-text {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    line-height: 1.45;
  }
  .ekycv2-step-icon {
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
  .ekycv2-step-icon svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: #3fd4c4;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ── CTA ── */
  .ekycv2-cta {
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
  .ekycv2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  .ekycv2-cta:active:not(:disabled) { transform: translateY(0); }
  .ekycv2-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
  .ekycv2-cta:disabled {
    background: rgba(255, 179, 0, 0.35);
    color: rgba(36, 26, 0, 0.55);
    cursor: not-allowed;
    box-shadow: none;
  }
  .ekycv2-cta svg { width: 17px; height: 17px; }

  /* ── Trust chips ── */
  .ekycv2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 1.15rem;
    padding-top: 1.05rem;
    border-top: 1px solid rgba(255,255,255,0.13);
  }
  .ekycv2-chip {
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
  .ekycv2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .ekycv2-main {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-top: 4.5rem;
      padding-bottom: 6.5rem; /* room for MobileNav */
      min-height: auto;
    }
    .ekycv2-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .ekycv2-left .ekycv2-card { text-align: left; }
    .ekycv2-lede { margin-left: auto; margin-right: auto; }
    .jrp2 { display: none; }
  }
  @media (max-width: 480px) {
    .ekycv2-card { padding: 1.4rem 1rem 1.2rem; border-radius: 20px; }
    .ekycv2-boxes { gap: 3px; }
    .ekycv2-box { max-width: 30px; height: 42px; font-size: 14px; border-radius: 9px; }
    .ekycv2-sep { width: 4px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ekycv2 *, .jrp2 * { animation: none !important; transition: none !important; }
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
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const STEPS = [
  'Enter your Aadhaar / PAN details',
  'Verify using OTP sent to your mobile',
  'Details are verified instantly',
  'Loan application moves forward for approval',
];

export default function Ekyc() {
  const [loader, setLoader] = useState(false);
  const [aadhaar, setAadhaar] = useState(Array(12).fill(''));
  const [aadhaarError, setAadhaarError] = useState('');
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    const last4 = customerDetails?.aadhar_no;

    if (last4 && last4.length === 4) {
      const arr = Array(12).fill('');

      // fill only last 4 digits
      for (let i = 0; i < 4; i++) {
        arr[8 + i] = last4[i];
      }

      setAadhaar(arr);
    }
  }, [customerDetails]);

  const handleKeyDown = (e, index) => {
    // Lock first 8 digits completely
    if (index < 8) {
      e.preventDefault();
      return;
    }

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();

      const updated = [...aadhaar];

      // If current box has value -> clear it
      if (updated[index]) {
        updated[index] = '';
        setAadhaar(updated);
        return;
      }

      // Move only within last 4 digits
      if (index > 8) {
        updated[index - 1] = '';
        setAadhaar(updated);

        document.getElementById(`aadhaar-${index - 1}`)?.focus();
      }

      return;
    }

    // Allow tab and arrow navigation
    if (['Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      return;
    }

    // Allow only numeric digits
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (value, index) => {
  // Prevent editing first 8 digits
  if (index < 8) return;

  // Allow only single digit
  if (!/^\d?$/.test(value)) return;

  const updated = [...aadhaar];
  updated[index] = value;
  setAadhaar(updated);

  // Clear error when user starts correcting
  if (aadhaarError) {
    setAadhaarError('');
  }

  // Move to next input automatically
  if (value && index < 11) {
    document.getElementById(`aadhaar-${index + 1}`)?.focus();
  }
};
  const leadId =  customerDetails?.lead_id;

  useEffect(() => {
  const handleEkyc = async () => {
    const param={lead_id:leadId}

      if (leadId) {
        try {
          const ekycResponse = await getEkycResponse(param);

          if (ekycResponse?.data?.Status === 1) {
            dispatch(updateJourneyEvents({
              personal_details: 2,
              ekyc_detail: 1
            }));

          }
        } catch (error) {
          console.error("Error fetching eKYC response:", error);
        }
      }
    
  };

  handleEkyc();
}, [ leadId,dispatch]);

  const submit = async () => {
    const aadhaarNumber = aadhaar.join('');

    // validate last 4 digits
    const last4 = aadhaar.slice(8).join('');

    if (!/^\d{4}$/.test(last4)) {
      setAadhaarError('Please enter all 4 digits of your Aadhaar number.');
      return;
    }

    setAadhaarError('');

    setLoader(true);

    const param = {
      profileId: customerDetails?.profileId,
      aadhaar_no: aadhaarNumber
    };

    try {
      const response = await initiateEkyc(param);

      if (response?.data?.apiStatus == 1) {
        toast.success('Verification process started');
        window.location.href = response?.data?.data?.ekyc_url;
      } else {
        toast.error('Failed to start verification process');
      }
    } catch {
      toast.error('Failed to start verification process');
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ekycv2">
        <main className="ekycv2-main">

          {/* ── Left: heading + glass console ── */}
          <div className="ekycv2-left">
            <span className="ekycv2-eyebrow">
              <span className="ekycv2-eyebrow-num">4</span>
              Aadhaar e-KYC
            </span>
           

            <div className="ekycv2-card">
              {/* Aadhaar tiles */}
              <label className="ekycv2-field-label">
                <span>Aadhaar number</span>
                <span className="hint">last 4 digits only</span>
              </label>
              <div className="ekycv2-boxes">
              {aadhaar.map((digit, index) => {
                const isEditable = index >= 8;
                const showSep = index === 3 || index === 7;

                return (
                  <React.Fragment key={index}>
                    <input
                      id={`aadhaar-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={isEditable ? digit : ''}
                      placeholder={isEditable ? '0' : '•'}
                      readOnly={!isEditable}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      aria-label={`Aadhaar digit ${index + 1}`}
                      className={`ekycv2-box ${isEditable ? 'editable' : 'locked'}${
                        isEditable && digit ? ' has-val' : ''
                      }`}
                    />

                    {showSep && (
                      <span className="ekycv2-sep" aria-hidden="true" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {aadhaarError && (
              <p className="ekycv2-error">
                {aadhaarError}
              </p>
            )}
              <p className="ekycv2-mask-note">
                <IconShield />
                First 8 digits stay masked for your privacy — we never see your full Aadhaar.
              </p>

              {/* Steps */}
              <div className="ekycv2-section-title">How it works</div>
              <div className="ekycv2-steps">
                {STEPS.map((step, i) => (
                  <div className="ekycv2-step" key={i}>
                    <div className="ekycv2-step-num">{i + 1}</div>
                    <span className="ekycv2-step-text">{step}</span>
                    <div className="ekycv2-step-icon"><IconCheck /></div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="ekycv2-cta" onClick={submit} disabled={loader}>
                {loader ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    Starting e-KYC…
                  </>
                ) : (
                  <>Start e-KYC verification <IconSend /></>
                )}
              </button>

              {/* Trust chips */}
              <div className="ekycv2-trust">
                <span className="ekycv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  256-bit SSL
                </span>
                <span className="ekycv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Data stays private
                </span>
                <span className="ekycv2-chip">
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