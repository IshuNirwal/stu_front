import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { getPanVerify } from '../../Utils/api';
import EmploymentDetail from './EmploymentDetail';
import MobileNav from '../../components/MobileNav';
import JourneyRightPanel from '../../components/JourneyRightPannel';

/*
  PanDetails (v2) — gradient glass theme
  ──────────────────────────────────────
  Completely new structure vs the old light split-screen:
    • full-viewport navy→teal gradient canvas + dot grid (same as Login v2)
    • left: step eyebrow + headline OUTSIDE the card, then a dark glass
      console holding PAN tiles, income field and amber CTA
    • right: <JourneyRightPanel/> — now a journey timeline, not a hero
  All verification logic, state and flow are unchanged.
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

  .panv2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .panv2 {
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
  .panv2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .panv2-main {
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

  /* ── Left column ── */
  .panv2-eyebrow {
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
  .panv2-eyebrow-num {
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
  .panv2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .panv2-lede {
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    max-width: 48ch;
    margin-bottom: 1.75rem;
  }

  /* ── Glass console ── */
  .panv2-card {
    width: 100%;
    max-width: 520px;
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

  .panv2-field-label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    margin-bottom: 9px;
  }
  .panv2-field-label .hint {
    font-size: 11.5px;
    font-weight: 500;
    color: rgba(255,255,255,0.42);
    letter-spacing: 0.3px;
  }
  .panv2-field-label .req { color: var(--accent); }

  /* PAN tiles */
  .panv2-boxes {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: nowrap;
  }
  .panv2-sep {
    width: 8px;
    height: 2px;
    border-radius: 2px;
    background: rgba(255,255,255,0.35);
    flex-shrink: 0;
  }
  .panv2-box {
    flex: 1;
    min-width: 0;
    max-width: 42px;
    height: 50px;
    border: 2px solid transparent;
    border-radius: 12px;
    background: #ffffff;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 17px;
    font-weight: 700;
    color: #1f4a5c;
    outline: none;
    caret-color: var(--accent);
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  }
  .panv2-box::placeholder { color: #b9c9d1; font-weight: 500; }
  .panv2-box:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
  }
  .panv2-box.has-val {
    border-color: var(--teal);
    background: #f0fbfa;
  }
  .panv2-box.err {
    border-color: #ff6b5e;
    background: #fff4f2;
  }

  /* Income field */
  .panv2-income-wrap { margin-top: 1.35rem; }
  .panv2-income-row {
    display: flex;
    align-items: center;
    height: 54px;
    border-radius: 14px;
    background: #ffffff;
    border: 2px solid transparent;
    overflow: hidden;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .panv2-income-row:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
  }
  .panv2-income-row.err {
    border-color: #ff6b5e;
    background: #fff4f2;
  }
  .panv2-rupee {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 14px;
    background: #f1f6f8;
    border-right: 1px solid rgba(31, 74, 92, 0.14);
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: #1f4a5c;
    flex-shrink: 0;
  }
  .panv2-income-input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    padding: 0 14px;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    color: #1f4a5c;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.4px;
  }
  .panv2-income-input::placeholder { color: #9db3bc; font-weight: 400; }

  .panv2-error {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 12.5px;
    color: #ffb4a8;
    margin-top: 7px;
  }
  .panv2-error svg { width: 13px; height: 13px; flex-shrink: 0; margin-top: 2px; }

  /* CTA */
  .panv2-cta {
    width: 100%;
    height: 54px;
    margin-top: 1.5rem;
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
  .panv2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  .panv2-cta:active:not(:disabled) { transform: translateY(0); }
  .panv2-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
  .panv2-cta:disabled {
    background: rgba(255, 179, 0, 0.35);
    color: rgba(36, 26, 0, 0.55);
    cursor: not-allowed;
    box-shadow: none;
  }
  .panv2-cta svg { width: 18px; height: 18px; }

  /* Trust chips */
  .panv2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 1.15rem;
    padding-top: 1.05rem;
    border-top: 1px solid rgba(255,255,255,0.13);
  }
  .panv2-chip {
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
  .panv2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .panv2-main {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-top: 4.5rem;
      padding-bottom: 6.5rem; /* room for MobileNav */
      min-height: auto;
    }
    .panv2-left { display: flex; flex-direction: column; align-items: center; text-align: center; }
    .panv2-lede { margin-left: auto; margin-right: auto; }
    .jrp2 { display: none; }
  }
  @media (max-width: 480px) {
    .panv2-card { padding: 1.4rem 1rem 1.2rem; border-radius: 20px; }
    .panv2-boxes { gap: 4px; }
    .panv2-box { max-width: 34px; height: 46px; font-size: 15px; border-radius: 10px; }
    .panv2-sep { width: 5px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .panv2 *, .jrp2 * { animation: none !important; transition: none !important; }
  }
`;

const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

export default function PanDetails() {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);

  const [salary, setSalary] = useState('');
  const [isInvalidSalary, setIsInvalidSalary] = useState(false);
  const [isInvalidPan, setIsInvalidPan] = useState(false);
  const [errorPanMsg, setErrorPanMsg] = useState('');
  const [errorSalaryMsg, setErrorSalaryMsg] = useState('');
  const inputLength = 10;
  const [userpan, setUserPan] = useState(Array(inputLength).fill(''));
  const inputRefs = useRef([]);
  const [loader, setLoader] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [verifyBtn, setVerifyBtn] = useState(true);

  useEffect(() => {
    if (customerDetails?.pancard) {
      setUserPan(customerDetails.pancard.split(''));
      setVerifyBtn(false);
    }
    if (customerDetails?.monthly_income) {
      setSalary(customerDetails?.monthly_income);
    }
  }, [customerDetails?.pancard]);

  useEffect(() => {
    if (customerDetails?.pancard_verified_status === 1) {
      setUserInfo(true);
    }
  }, [customerDetails?.pancard_verified_status]);

  const handleChange = (e, index) => {
    setErrorPanMsg('');
    setIsInvalidPan(false);
    const value = e.target.value.toUpperCase();
    let isValidChar = false;
    if (index >= 0 && index <= 4) isValidChar = /^[A-Z]{1}$/.test(value);
    else if (index >= 5 && index <= 8) isValidChar = /^[0-9]{1}$/.test(value);
    else if (index === 9) isValidChar = /^[A-Z]{1}$/.test(value);

    if (isValidChar || value === '') {
      const updatedPan = [...userpan];
      updatedPan[index] = value;
      setUserPan(updatedPan);
      if (value && index < inputLength - 1) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !userpan[index] && index > 0) {
      const updatedPan = [...userpan];
      updatedPan[index - 1] = '';
      setUserPan(updatedPan);
      inputRefs.current[index - 1].focus();
    }
  };

  const fullPan = userpan.join('');

  const handleVerifyPan = async () => {
    if (loader) return;
    const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(fullPan);
    const salaryValid = /^\d+$/.test(salary) && parseInt(salary) > 0;

    setIsInvalidPan(!panValid);
    setIsInvalidSalary(!salaryValid);

    if (!panValid) { setErrorPanMsg("Please enter a valid 10-character PAN Number."); return; }
    else setErrorPanMsg('');

    if (!salaryValid) { setErrorSalaryMsg("Please enter a valid Monthly Income (numbers only)."); return; }
    else setErrorSalaryMsg('');

    const param = {
      profileId: customerDetails?.profileId || '',
      pancard: fullPan,
      monthlyIncome: salary,
    };

    try {
      setLoader(true);
      const response = await getPanVerify(param);
      if (response?.data?.apiStatus === 1) {
        toast.success(response?.data?.message);
        const apiData = response?.data?.data || {};
        dispatch(updateCustomerDetails({
          full_name: apiData?.name,
          dob: apiData?.dob,
          pancard: apiData?.panNumber,
          monthly_income: salary,
          gender: apiData?.gender
        }));
        setUserInfo(true);
      } else {
        toast.error(response?.data?.message || "Verification failed. Please check details.");
      }
    } catch (error) {
      console.error("PAN verification error:", error);
      toast.error("Error verifying PAN. Please check your connection or try again later.");
    } finally {
      setLoader(false);
    }
  };

  if (userInfo) return <EmploymentDetail />;

  const maskedPan = fullPan.length === 10
    ? fullPan.slice(0, 2) + 'XXX' + fullPan.slice(5, 7) + 'XXX' + fullPan.slice(9)
    : '';

  return (
    <>
      <style>{styles}</style>
      <div className="panv2">
        <main className="panv2-main">

          {/* ── Left: heading + glass console ── */}
          <div className="panv2-left">
            <span className="panv2-eyebrow">
              <span className="panv2-eyebrow-num">1</span>
              KYC · PAN &amp; income
            </span>
            <h1 className="panv2-h1">Verify your PAN to unlock your offer</h1>
            <p className="panv2-lede">
              We use your PAN only to confirm your identity with the Income Tax
              database. It takes a few seconds and never affects your credit score.
            </p>

            <div className="panv2-card">
              {/* PAN tiles */}
              <div>
                <label className="panv2-field-label">
                  <span>PAN number <span className="req">*</span></span>
                  <span className="hint">ABCDE 1234 F</span>
                </label>
                <div className="panv2-boxes">
                  {userpan.map((char, i) => {
                    const isAlpha = (i >= 0 && i <= 4) || i === 9;
                    const showSep = i === 4 || i === 8;
                    return (
                      <React.Fragment key={i}>
                        <input
                          ref={(el) => (inputRefs.current[i] = el)}
                          value={char}
                          maxLength={1}
                          placeholder={isAlpha ? 'A' : '0'}
                          onChange={(e) => handleChange(e, i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                          inputMode={isAlpha ? 'text' : 'numeric'}
                          pattern={isAlpha ? '[A-Za-z]*' : '[0-9]*'}
                          autoCapitalize="characters"
                          aria-label={`PAN character ${i + 1}`}
                          className={`panv2-box${isInvalidPan ? ' err' : ''}${char ? ' has-val' : ''}`}
                        />
                        {showSep && <span className="panv2-sep" aria-hidden="true" />}
                      </React.Fragment>
                    );
                  })}
                </div>
                {errorPanMsg && (
                  <p className="panv2-error"><IconAlert /> {errorPanMsg}</p>
                )}
              </div>

              {/* Income */}
              <div className="panv2-income-wrap">
                <label className="panv2-field-label" htmlFor="incomeField">
                  <span>Monthly income <span className="req">*</span></span>
                  <span className="hint">in-hand salary</span>
                </label>
                <div className={`panv2-income-row${isInvalidSalary ? ' err' : ''}`}>
                  <span className="panv2-rupee" aria-hidden="true">₹</span>
                  <input
                    id="incomeField"
                    type="text"
                    value={salary}
                    inputMode="numeric"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,7}$/.test(value)) {
                        setSalary(value);
                        setIsInvalidSalary(false);
                        setErrorSalaryMsg('');
                      }
                    }}
                    className="panv2-income-input"
                    placeholder="e.g. 50000"
                  />
                </div>
                {errorSalaryMsg && (
                  <p className="panv2-error"><IconAlert /> {errorSalaryMsg}</p>
                )}
              </div>

              {/* CTA */}
              <button className="panv2-cta" onClick={handleVerifyPan} disabled={loader}>
                {loader ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    Verifying…
                  </>
                ) : (
                  <>
                    Verify &amp; continue
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              {/* Trust chips */}
              <div className="panv2-trust">
                <span className="panv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  256-bit SSL
                </span>
                <span className="panv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Data stays private
                </span>
                <span className="panv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  RBI compliant
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: journey timeline ── */}
          <JourneyRightPanel />
        </main>
      </div>
      <MobileNav />
    </>
  );
}