/* global gtag */
/* global fbq */

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { format, parse } from 'date-fns';
import { getEligibility } from '../../Utils/api';
import { updateCustomerDetails, updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import MobileNav from '../../components/MobileNav';
import { formatDobArray } from '../../helpers/global.helpers';
import JourneyRightPanel from '../../components/JourneyRightPannel';

/*
  EmploymentDetail (v2) — gradient glass theme
  ────────────────────────────────────────────
  Matches PanDetails v2 exactly: full-viewport navy→teal gradient +
  dot grid, heading OUTSIDE the card (amber numbered eyebrow), dark
  glass console with white fields, glass radio pills with amber
  active state, amber gradient CTA, trust chips.
  All eligibility logic, state, pixels and flow are unchanged.
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

  .empv2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .empv2 {
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
  .empv2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .empv2-main {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    align-items: start;
    gap: clamp(2rem, 4.5vw, 4rem);
    padding: clamp(4.5rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 3rem) 3rem;
    min-height: 100vh;
  }
  .empv2-right-col {
    position: sticky;
    top: 5rem;
  }

  /* ── Left column heading ── */
  .empv2-eyebrow {
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
  .empv2-eyebrow-num {
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
  .empv2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .empv2-lede {
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    max-width: 52ch;
    margin-bottom: 1.75rem;
  }

  /* ── Glass console ── */
  .empv2-card {
    width: 100%;
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

  /* Sections */
  .empv2-section { margin-bottom: 1.6rem; }
  .empv2-section-title {
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
  .empv2-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.13);
  }

  .empv2-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.15rem;
    margin-bottom: 1.15rem;
  }
  .empv2-row:last-child { margin-bottom: 0; }

  .empv2-field-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    margin-bottom: 9px;
  }
  .empv2-field-label .req { color: var(--accent); }

  /* ── Radio pills (glass) ── */
  .empv2-radio-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .empv2-radio-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    border: 1.5px solid rgba(255,255,255,0.18);
    border-radius: 11px;
    background: rgba(255,255,255,0.06);
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.78);
    transition: border-color 0.15s, background 0.15s, color 0.15s;
    user-select: none;
  }
  .empv2-radio-btn:hover {
    border-color: rgba(255,255,255,0.38);
    background: rgba(255,255,255,0.1);
  }
  .empv2-radio-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .empv2-radio-btn.active {
    border-color: var(--accent);
    background: rgba(255, 179, 0, 0.14);
    color: #ffffff;
  }
  .empv2-radio-dot {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.4);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.15s;
  }
  .empv2-radio-btn.active .empv2-radio-dot { border-color: var(--accent); }
  .empv2-radio-dot-inner {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.15s;
  }
  .empv2-radio-btn.active .empv2-radio-dot-inner { opacity: 1; }

  /* ── Box inputs (pincode / DOB) — white tiles ── */
  .empv2-boxes-wrap {
    display: flex;
    gap: 5px;
    align-items: center;
    flex-wrap: nowrap;
  }
  .empv2-box {
    width: 38px;
    height: 46px;
    border: 2px solid transparent;
    border-radius: 11px;
    background: #ffffff;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 700;
    color: #1f4a5c;
    outline: none;
    caret-color: var(--accent);
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    flex-shrink: 1;
    min-width: 0;
  }
  .empv2-box::placeholder { color: #b9c9d1; font-weight: 500; }
  .empv2-box:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
  }
  .empv2-box.has-val {
    border-color: var(--teal);
    background: #f0fbfa;
  }
  .empv2-box.empv2-err {
    border-color: #ff6b5e;
    background: #fff4f2;
  }
  .empv2-dob-sep {
    font-size: 16px;
    color: rgba(255,255,255,0.4);
    font-weight: 400;
    margin: 0 2px;
    flex-shrink: 0;
  }

  /* ── Text / email / date inputs — white rows ── */
  .empv2-input-wrap { position: relative; }
  .empv2-input-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: #6f8b98;
    pointer-events: none;
    display: flex;
    align-items: center;
  }
  .empv2-input-icon svg { width: 16px; height: 16px; }
  .empv2-input {
    width: 100%;
    height: 50px;
    border: 2px solid transparent;
    border-radius: 13px;
    background: #ffffff;
    padding: 0 14px 0 40px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: #1f4a5c;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
    color-scheme: light;
  }
  .empv2-input.no-icon { padding-left: 14px; }
  .empv2-input::placeholder { color: #9db3bc; font-weight: 400; }
  .empv2-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
  }
  .empv2-input.empv2-err {
    border-color: #ff6b5e;
    background: #fff4f2;
  }

  /* ── Error message ── */
  .empv2-error-msg {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 12.5px;
    color: #ffb4a8;
    margin-top: 7px;
  }
  .empv2-error-msg svg { width: 13px; height: 13px; flex-shrink: 0; margin-top: 2px; }

  /* ── CTA ── */
  .empv2-cta {
    width: 100%;
    height: 54px;
    margin-top: 1.6rem;
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
  .empv2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  .empv2-cta:active:not(:disabled) { transform: translateY(0); }
  .empv2-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
  .empv2-cta:disabled {
    background: rgba(255, 179, 0, 0.35);
    color: rgba(36, 26, 0, 0.55);
    cursor: not-allowed;
    box-shadow: none;
  }
  .empv2-cta svg { width: 17px; height: 17px; }

  /* ── Trust chips ── */
  .empv2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 1.15rem;
    padding-top: 1.05rem;
    border-top: 1px solid rgba(255,255,255,0.13);
  }
  .empv2-chip {
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
  .empv2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .empv2-main {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-top: 4.5rem;
      padding-bottom: 6.5rem; /* room for MobileNav */
      min-height: auto;
    }
    .empv2-left {
      width: 100%;
      max-width: 640px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .empv2-left .empv2-card { text-align: left; }
    .jrp2 { display: none; }
    .empv2-right-col { display: none; }
  }
  @media (max-width: 640px) {
    .empv2-row { grid-template-columns: 1fr; gap: 1rem; }
  }
  @media (max-width: 480px) {
    .empv2-card { padding: 1.4rem 1rem 1.2rem; border-radius: 20px; }
    .empv2-boxes-wrap { gap: 4px; }
    .empv2-box { width: 34px; height: 42px; font-size: 14px; border-radius: 9px; }
    .empv2-radio-btn { padding: 9px 12px; font-size: 12.5px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .empv2 *, .jrp2 * { animation: none !important; transition: none !important; }
  }
`;

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// Reusable Radio Button
const RadioBtn = ({ label, value, selected, onChange }) => (
  <div
    className={`empv2-radio-btn ${selected === value ? 'active' : ''}`}
    onClick={() => onChange(value)}
    role="radio"
    aria-checked={selected === value}
    tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && onChange(value)}
  >
    <span className="empv2-radio-dot">
      <span className="empv2-radio-dot-inner" />
    </span>
    {label}
  </div>
);

// Error message
const ErrMsg = ({ msg }) => msg ? (
  <p className="empv2-error-msg"><IconAlert /> {msg}</p>
) : null;

export default function EmploymentDetail() {
  const [empType, setempType] = useState('');
  const [salMode, setsalMode] = useState('');
  const [resType, setresType] = useState('');
  const [mailid, setmailId] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [pincode, setPincode] = useState([]);
  const [dob, setDob] = useState([]);
  const [errors, setErrors] = useState({});
  const [genderType, setGenderType] = useState('');
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const navigate = useNavigate();
  const pinRefs = useRef([]);
  const dobRefs = useRef([]);
  const click_Id = useSelector((state) => state.customerJourneyDetails.click_id);
  const utm_source = customerDetails?.utm_source;
  const [nextSalaryDate, setNextSalaryDate] = useState('');

  useEffect(() => {
    if (customerDetails?.gender === 'Male') setGenderType('1');
    else if (customerDetails?.gender === 'Female') setGenderType('2');

    if (customerDetails) {
      setPincode(
        customerDetails?.residence_pincode
          ? String(customerDetails.residence_pincode).split('')
          : []
      );
      setmailId(customerDetails?.personal_email || '');
      setOfficialEmail(customerDetails?.office_email || '');
      setresType(customerDetails?.residence_type_id || '');
      setsalMode(Number(customerDetails?.salary_mode_id) || '');
      setempType(customerDetails?.income_type_id || '');
    }

    if (customerDetails?.dob) {
      const formatted = format(new Date(customerDetails.dob), 'ddMMyyyy');
      setDob(formatted.split(''));
    }
  }, [customerDetails]);

  // Pincode handlers
  const handlePincodeChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const newPin = [...pincode];
    newPin[index] = value;
    setPincode(newPin);
    if (value && index < 5) pinRefs.current[index + 1]?.focus();
  };
  const handlePincodeKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (pincode[index]) {
        const newPin = [...pincode]; newPin[index] = ''; setPincode(newPin);
      } else if (index > 0) pinRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) pinRefs.current[index - 1]?.focus();
    else if (e.key === 'ArrowRight' && index < 5) pinRefs.current[index + 1]?.focus();
  };

  // DOB handlers
  const handleDobChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const newDob = [...dob]; newDob[index] = value; setDob(newDob);
    if (value && index < 7) dobRefs.current[index + 1]?.focus();
  };
  const handleDobKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (dob[index]) {
        const newDob = [...dob]; newDob[index] = ''; setDob(newDob);
      } else if (index > 0) dobRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) dobRefs.current[index - 1]?.focus();
    else if (e.key === 'ArrowRight' && index < 7) dobRefs.current[index + 1]?.focus();
  };

  const validateFields = () => {
    const newErrors = {};
    if (!empType) newErrors.empType = 'Employment type is required';
    if (!salMode) newErrors.salMode = 'Salary mode is required';
    if (!resType) newErrors.resType = 'Residence type is required';
    if (!nextSalaryDate)
      newErrors.nextSalaryDate = 'Next salary date is required';
    const pincodeA = Array.isArray(pincode) ? pincode : [];
    if (!pincodeA.join('') || pincodeA.join('').length < 6)
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    if (!mailid) newErrors.mailid = 'Personal email is required';
    else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(mailid))
      newErrors.mailid = 'Enter a valid email address';
    const dobA = Array.isArray(dob) ? dob : [];
    if (!customerDetails?.dob && !dobA.join(''))
      newErrors.dob = 'Date of birth is required';
    if (!customerDetails?.gender && !genderType)
      newErrors.gender = 'Please select your gender';
    if (officialEmail && !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(officialEmail))
      newErrors.officialEmail = 'Enter a valid official email address';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (loader) return;
    if (!validateFields()) {
      toast.error('Please fill in all mandatory details before checking eligibility.');
      return;
    }
    const param = {
      profileId: customerDetails?.profileId,
      pancard: customerDetails?.pancard,
      monthlyIncome: Number(customerDetails?.monthly_income),
      pincode: Number(pincode.join('')),
      dob: formatDobArray(dob.join('')) || customerDetails?.dob,
      sourceId: 4,
      employmentType: empType,
      salaryMode: salMode,
      residence_type: resType,
      personal_email: mailid,
      official_email: officialEmail,
      gender: genderType || customerDetails?.gender,
      nextSalaryDate: format(
        new Date(nextSalaryDate),
        'yyyy-MM-dd'
      ),
    };
    try {
      setLoader(true);
      const response = await getEligibility(param);
      if (response?.data?.apiStatus == 1) {
        toast.success(response?.data?.message);
        if (utm_source == 'Valueleaf') {
          const url = `https://pixel.whistleloop.com/pixel?click_id=${click_Id}&revenue='revenue'&goal_name=Doable`;

          fetch(url).catch(() => { });

        }
        if (utm_source == 'ORGANIC') {
          gtag('event', 'conversion', {
            send_to: 'AW-17928723161/TwM1CMmZ6rQcENm1iuVC'
          });

        }
        dispatch(updateCustomerDetails({
          dob, residence_pincode: pincode,
          income_type_id: empType, salary_mode_id: salMode,
          personal_email: mailid, office_email: officialEmail,
          isAuto: response?.data?.isAuto
        }));
        dispatch(updateJourneyEvents({ check_eligibility: 1, loan_quote: 2 }));
      } else {
        navigate('/journey/not-eligible');
        toast.error(response?.data?.message);
      }
    } catch {
      toast.error('Error in CheckEligibility');
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="empv2">
        <main className="empv2-main">

          {/* ── Left: heading + glass console ── */}
          <div className="empv2-left">
            <span className="empv2-eyebrow">
              <span className="empv2-eyebrow-num">2</span>
              Employment &amp; basics
            </span>
            

            <div className="empv2-card">
              {/* ── EMPLOYMENT INFO ── */}
              <div className="empv2-section">
                <div className="empv2-section-title">Employment info</div>
                <div className="empv2-row">
                  <div>
                    <label className="empv2-field-label">
                      Employment type <span className="req">*</span>
                    </label>
                    <div className="empv2-radio-group">
                      <RadioBtn label="Salaried" value={1} selected={empType} onChange={v => { setempType(v); setErrors(e => ({ ...e, empType: '' })); }} />
                      <RadioBtn label="Self-Employed" value={2} selected={empType} onChange={v => { setempType(v); setErrors(e => ({ ...e, empType: '' })); }} />
                    </div>
                    <ErrMsg msg={errors.empType} />
                  </div>

                  <div>
                    <label className="empv2-field-label">
                      Salary received via <span className="req">*</span>
                    </label>
                    <div className="empv2-radio-group">
                      <RadioBtn label="Bank" value={1} selected={salMode} onChange={v => { setsalMode(v); setErrors(e => ({ ...e, salMode: '' })); }} />
                      <RadioBtn label="Cash" value={3} selected={salMode} onChange={v => { setsalMode(v); setErrors(e => ({ ...e, salMode: '' })); }} />
                    </div>
                    <ErrMsg msg={errors.salMode} />
                  </div>
                </div>
              </div>

              {/* ── RESIDENCE ── */}
              <div className="empv2-section">
                <div className="empv2-section-title">Residence</div>
                <div className="empv2-row">
                  <div>
                    <label className="empv2-field-label">
                      Residence type <span className="req">*</span>
                    </label>
                    <div className="empv2-radio-group">
                      <RadioBtn label="Owned" value={1} selected={resType} onChange={v => { setresType(v); setErrors(e => ({ ...e, resType: '' })); }} />
                      <RadioBtn label="Rented" value={2} selected={resType} onChange={v => { setresType(v); setErrors(e => ({ ...e, resType: '' })); }} />
                    </div>
                    <ErrMsg msg={errors.resType} />
                  </div>

                  <div>
                    <label className="empv2-field-label">
                      City pincode <span className="req">*</span>
                    </label>
                    <div className="empv2-boxes-wrap">
                      {[...Array(6)].map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength="1"
                          inputMode="numeric"
                          value={pincode[i] || ''}
                          onChange={e => handlePincodeChange(e, i)}
                          onKeyDown={e => handlePincodeKeyDown(e, i)}
                          ref={el => pinRefs.current[i] = el}
                          placeholder="0"
                          aria-label={`Pincode digit ${i + 1}`}
                          className={`empv2-box ${errors.pincode ? 'empv2-err' : ''} ${pincode[i] ? 'has-val' : ''}`}
                        />
                      ))}
                    </div>
                    <ErrMsg msg={errors.pincode} />
                  </div>
                </div>
              </div>

              {/* ── PERSONAL INFO (DOB + GENDER) ── */}
              {(!customerDetails?.dob || !customerDetails?.gender) && (
                <div className="empv2-section">
                  <div className="empv2-section-title">Personal info</div>
                  <div className="empv2-row">
                    {!customerDetails?.dob && (
                      <div>
                        <label className="empv2-field-label">
                          Date of birth (DD/MM/YYYY) <span className="req">*</span>
                        </label>
                        <div className="empv2-boxes-wrap">
                          {[...Array(8)].map((_, i) => (
                            <React.Fragment key={i}>
                              <input
                                type="text"
                                maxLength="1"
                                inputMode="numeric"
                                value={dob[i] || ''}
                                onChange={e => handleDobChange(e, i)}
                                onKeyDown={e => handleDobKeyDown(e, i)}
                                ref={el => dobRefs.current[i] = el}
                                placeholder="0"
                                aria-label={`DOB digit ${i + 1}`}
                                className={`empv2-box ${errors.dob ? 'empv2-err' : ''} ${dob[i] ? 'has-val' : ''}`}
                              />
                              {(i === 1 || i === 3) && <span className="empv2-dob-sep">/</span>}
                            </React.Fragment>
                          ))}
                        </div>
                        <ErrMsg msg={errors.dob} />
                      </div>
                    )}

                    {!customerDetails?.gender && (
                      <div>
                        <label className="empv2-field-label">
                          Gender <span className="req">*</span>
                        </label>
                        <div className="empv2-radio-group">
                          <RadioBtn label="Male" value="1" selected={genderType} onChange={v => { setGenderType(v); setErrors(e => ({ ...e, gender: '' })); }} />
                          <RadioBtn label="Female" value="2" selected={genderType} onChange={v => { setGenderType(v); setErrors(e => ({ ...e, gender: '' })); }} />
                        </div>
                        <ErrMsg msg={errors.gender} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── EMAIL ── */}
              <div className="empv2-section">
                <div className="empv2-section-title">Contact</div>
                <div className="empv2-row">
                  <div>
                    <label className="empv2-field-label" htmlFor="personalEmail">
                      Personal email <span className="req">*</span>
                    </label>
                    <div className="empv2-input-wrap">
                      <span className="empv2-input-icon"><IconMail /></span>
                      <input
                        id="personalEmail"
                        type="email"
                        value={mailid}
                        onChange={e => { setmailId(e.target.value); setErrors(err => ({ ...err, mailid: '' })); }}
                        className={`empv2-input ${errors.mailid ? 'empv2-err' : ''}`}
                        placeholder="you@example.com"
                      />
                    </div>
                    <ErrMsg msg={errors.mailid} />
                  </div>

                  <div>
                    <label className="empv2-field-label" htmlFor="officialEmail">
                      Official email
                    </label>
                    <div className="empv2-input-wrap">
                      <span className="empv2-input-icon"><IconMail /></span>
                      <input
                        id="officialEmail"
                        type="email"
                        value={officialEmail}
                        onChange={e => { setOfficialEmail(e.target.value); setErrors(err => ({ ...err, officialEmail: '' })); }}
                        className={`empv2-input ${errors.officialEmail ? 'empv2-err' : ''}`}
                        placeholder="work@company.com"
                      />
                    </div>
                    <ErrMsg msg={errors.officialEmail} />
                  </div>
                </div>
              </div>

              {/* ── SALARY INFO ── */}
              <div className="empv2-section">
                <div className="empv2-section-title">Salary information</div>
                <div>
                  <label className="empv2-field-label">
                    Next salary date <span className="req">*</span>
                  </label>
                  <input
                    type="date"
                    min={format(new Date(), 'yyyy-MM-dd')}
                    value={nextSalaryDate}
                    onChange={(e) => {
                      setNextSalaryDate(e.target.value);
                      setErrors(err => ({
                        ...err,
                        nextSalaryDate: ''
                      }));
                    }}
                    className={`empv2-input no-icon ${errors.nextSalaryDate ? 'empv2-err' : ''}`}
                  />
                  <ErrMsg msg={errors.nextSalaryDate} />
                </div>
              </div>

              {/* CTA */}
              <button className="empv2-cta" onClick={submit} disabled={loader}>
                {loader ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
                      </path>
                    </svg>
                    Checking eligibility…
                  </>
                ) : (
                  <>
                    Check eligibility
                    <IconArrow />
                  </>
                )}
              </button>

              {/* Trust chips */}
              <div className="empv2-trust">
                <span className="empv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  256-bit SSL
                </span>
                <span className="empv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Data stays private
                </span>
                <span className="empv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  RBI compliant
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: reusable finance visual ── */}
          <div className="empv2-right-col">
            <JourneyRightPanel />
          </div>

        </main>
      </div>
      <MobileNav />
    </>
  );
}