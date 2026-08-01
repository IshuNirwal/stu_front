import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCustomerDetails, updateJourneyEvents } from "../../CustomerJourneyDetails/CustomerJourneyDetails";
import { getPersonalDetail } from "../../Utils/api";
import { useNavigate } from "react-router-dom";
import MobileNav from "../../components/MobileNav";
import JourneyRightPanel from "../../components/JourneyRightPannel";

/*
  PersonalDetails (v2) — gradient glass theme
  ───────────────────────────────────────────
  Matches the rest of the journey: navy→teal gradient + dot grid,
  heading outside the card (amber numbered eyebrow), dark glass
  console. White input rows with icons + amber focus, frosted
  read-only rows with "auto" badge, glass radio pills, amber-tinted
  spouse sub-card, amber CTA, trust chips.
  All personal-details logic, clevertap event and flow are unchanged.
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

  .pdv2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .pdv2 {
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
  .pdv2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .pdv2-main {
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
  .pdv2-right-col {
    position: sticky;
    top: 5rem;
  }

  /* ── Heading ── */
  .pdv2-eyebrow {
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
  .pdv2-eyebrow-num {
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
  .pdv2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .pdv2-lede {
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    max-width: 52ch;
    margin-bottom: 1.75rem;
  }

  /* ── Glass console ── */
  .pdv2-card {
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

  .pdv2-section { margin-bottom: 1.6rem; }
  .pdv2-section-title {
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
  .pdv2-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.13);
  }

  .pdv2-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.15rem;
  }

  .pdv2-field-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    margin-bottom: 8px;
  }
  .pdv2-field-label .req { color: var(--accent); }

  /* ── Radio pills (glass) ── */
  .pdv2-radio-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .pdv2-radio-btn {
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
  .pdv2-radio-btn:hover {
    border-color: rgba(255,255,255,0.38);
    background: rgba(255,255,255,0.1);
  }
  .pdv2-radio-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .pdv2-radio-btn.active {
    border-color: var(--accent);
    background: rgba(255, 179, 0, 0.14);
    color: #ffffff;
  }
  .pdv2-radio-dot {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.4);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.15s;
  }
  .pdv2-radio-btn.active .pdv2-radio-dot { border-color: var(--accent); }
  .pdv2-radio-dot-inner {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.15s;
  }
  .pdv2-radio-btn.active .pdv2-radio-dot-inner { opacity: 1; }

  /* ── Inputs (white rows) ── */
  .pdv2-input-wrap { position: relative; }
  .pdv2-input-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: #6f8b98;
    pointer-events: none;
    display: flex;
    align-items: center;
  }
  .pdv2-input-icon svg { width: 16px; height: 16px; }
  .pdv2-input {
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
  }
  .pdv2-input.no-icon { padding-left: 14px; }
  .pdv2-input::placeholder { color: #9db3bc; font-weight: 400; }
  .pdv2-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
  }
  .pdv2-input.pdv2-err {
    border-color: #ff6b5e;
    background: #fff4f2;
  }

  /* readonly — frosted glass row (not white) */
  .pdv2-input.readonly {
    background: rgba(255,255,255,0.08);
    border: 1.5px solid rgba(255,255,255,0.16);
    color: rgba(255,255,255,0.75);
    cursor: not-allowed;
    padding-right: 56px;
  }
  .pdv2-input.readonly:focus {
    border-color: rgba(255,255,255,0.16);
    box-shadow: none;
  }
  .pdv2-input.readonly + .pdv2-readonly-badge,
  .pdv2-readonly-badge {
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
  }
  /* readonly icon tint for dark row */
  .pdv2-input-wrap.readonly-wrap .pdv2-input-icon { color: rgba(255,255,255,0.45); }

  /* ── Error ── */
  .pdv2-error-msg {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 12.5px;
    color: #ffb4a8;
    margin-top: 7px;
  }
  .pdv2-error-msg svg { width: 13px; height: 13px; flex-shrink: 0; margin-top: 2px; }

  /* ── Spouse sub-card ── */
  .pdv2-spouse-card {
    background: rgba(255, 179, 0, 0.08);
    border: 1px solid rgba(255, 179, 0, 0.26);
    border-radius: 16px;
    padding: 1.15rem 1.25rem;
    margin-bottom: 1.6rem;
  }
  .pdv2-spouse-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.9rem;
  }

  /* ── CTA ── */
  .pdv2-cta {
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
  .pdv2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  .pdv2-cta:active:not(:disabled) { transform: translateY(0); }
  .pdv2-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
  .pdv2-cta:disabled {
    background: rgba(255, 179, 0, 0.35);
    color: rgba(36, 26, 0, 0.55);
    cursor: not-allowed;
    box-shadow: none;
  }
  .pdv2-cta svg { width: 17px; height: 17px; }

  /* ── Trust chips ── */
  .pdv2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 1.15rem;
    padding-top: 1.05rem;
    border-top: 1px solid rgba(255,255,255,0.13);
  }
  .pdv2-chip {
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
  .pdv2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .pdv2-main {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-top: 4.5rem;
      padding-bottom: 6.5rem; /* room for MobileNav */
      min-height: auto;
    }
    .pdv2-left {
      width: 100%;
      max-width: 640px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .pdv2-left .pdv2-card { text-align: left; }
    .jrp2 { display: none; }
    .pdv2-right-col { display: none; }
  }
  @media (max-width: 640px) {
    .pdv2-row { grid-template-columns: 1fr; gap: 1rem; }
  }
  @media (max-width: 480px) {
    .pdv2-card { padding: 1.4rem 1rem 1.2rem; border-radius: 20px; }
    .pdv2-radio-btn { padding: 9px 12px; font-size: 12.5px; }
    .pdv2-spouse-card { padding: 1rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pdv2 *, .jrp2 * { animation: none !important; transition: none !important; }
  }
`;

// ── Icons ──
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13.5 19.79 19.79 0 0 1 1 4.82 2 2 0 0 1 2.98 2.63h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18"/>
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconCity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="18"/><path d="M16 8h4l3 5v6h-7V8z"/><line x1="5" y1="8" x2="5" y2="8"/><line x1="10" y1="8" x2="10" y2="8"/><line x1="5" y1="12" x2="5" y2="12"/><line x1="10" y1="12" x2="10" y2="12"/>
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconLandmark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// Sub-components
const RadioBtn = ({ label, value, selected, onChange }) => (
  <div
    className={`pdv2-radio-btn ${selected == value ? 'active' : ''}`}
    onClick={() => onChange(value)}
    role="radio" aria-checked={selected == value}
    tabIndex={0} onKeyDown={e => e.key === 'Enter' && onChange(value)}
  >
    <span className="pdv2-radio-dot"><span className="pdv2-radio-dot-inner" /></span>
    {label}
  </div>
);

const ErrMsg = ({ msg }) => msg ? (
  <p className="pdv2-error-msg"><IconAlert />{msg}</p>
) : null;

const InputField = ({ label, required, icon, value, onChange, placeholder, readOnly, type = "text", hasError }) => (
  <div>
    <label className="pdv2-field-label">
      {label} {required && <span className="req">*</span>}
    </label>
    <div className={`pdv2-input-wrap ${readOnly ? 'readonly-wrap' : ''}`}>
      {icon && <span className="pdv2-input-icon">{icon}</span>}
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`pdv2-input ${!icon ? 'no-icon' : ''} ${readOnly ? 'readonly' : ''} ${hasError ? 'pdv2-err' : ''}`}
      />
      {readOnly && <span className="pdv2-readonly-badge">auto</span>}
    </div>
  </div>
);

export default function PersonalDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const [loader, setLoader] = useState(false);

  const [maritalStatus, setMaritalStatus] = useState();
  const [workMode, setWorkMode] = useState();
  const [spousename, setSpousename] = useState('');
  const [spousecontact, setSpousecontact] = useState('');
  const [addressline1, setAddressline1] = useState('');
  const [addressline2, setAddressline2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [resType, setResType] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customerDetails) {
      setResType(String(customerDetails.residence_type_id));
      setMaritalStatus(customerDetails.marital_status_id ? String(customerDetails.marital_status_id) : '1');
      setAddressline1(customerDetails.residence_address_1);
      setAddressline2(customerDetails.residence_address_2);
      setLandmark(customerDetails.residence_landmark);
      setWorkMode(customerDetails?.income_type_id);
    }
  }, [customerDetails]);

  const validation = () => {
    const newErrors = {};
    if (!maritalStatus) newErrors.maritalStatus = 'Please select marital status.';
    if (maritalStatus == 2 && !spousename.trim()) newErrors.spousename = 'Spouse name is required.';
    if (maritalStatus == 2 && spousecontact && !/^[0-9]{10}$/.test(spousecontact))
      newErrors.spousecontact = 'Enter a valid 10-digit number.';
    if (!addressline1?.trim()) newErrors.addressline1 = 'Address line 1 is required.';
    if (!addressline2?.trim()) newErrors.addressline2 = 'Address line 2 is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validation()) return;
    const param = {
      profileId: customerDetails?.profileId,
      maritalStatus: parseInt(maritalStatus),
      residenceAddress1: addressline1,
      residenceAddress2: addressline2,
      residenceType: resType,
      spouseName: spousename || null,
      spouseMobile: spousecontact || null,
      residenceLandmark: landmark,
      workMode: workMode,
    };
    try {
      setLoader(true);
      const response = await getPersonalDetail(param);
      if (response?.data?.apiStatus === 1) {
        toast.success(response?.data?.message);
        window.clevertap?.event.push("lje_personal_details", { message: "Personal Details Updated", ...param });
        dispatch(updateCustomerDetails({
          residence_type_id: resType,
          marital_status_id: maritalStatus,
          residence_address_1: addressline1,
          residence_address_2: addressline2,
          residenceLandmark: landmark,
          spouse_name: spousename,
        }));
        dispatch(updateJourneyEvents({ personal_details: 1, upload_documents: 2 }));
      } else {
        toast.error(response?.data?.message);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pdv2">
        <main className="pdv2-main">

          {/* ── Left: heading + glass console ── */}
          <div className="pdv2-left">
            <span className="pdv2-eyebrow">
              <span className="pdv2-eyebrow-num">5</span>
              Personal details
            </span>
           

            <div className="pdv2-card">
              {/* ── PERSONAL INFO ── */}
              <div className="pdv2-section">
                <div className="pdv2-section-title">Personal info</div>
                <div className="pdv2-row">
                  <div>
                    <label className="pdv2-field-label">
                      Marital status <span className="req">*</span>
                    </label>
                    <div className="pdv2-radio-group">
                      <RadioBtn label="Single" value="1" selected={maritalStatus} onChange={v => { setMaritalStatus(v); setErrors(e => ({...e, maritalStatus: ''})); }} />
                      <RadioBtn label="Married" value="2" selected={maritalStatus} onChange={v => { setMaritalStatus(v); setErrors(e => ({...e, maritalStatus: ''})); }} />
                    </div>
                    <ErrMsg msg={errors.maritalStatus} />
                  </div>

                  <div>
                    <label className="pdv2-field-label">Work mode</label>
                    <div className="pdv2-radio-group">
                      <RadioBtn label="Work from office" value={1} selected={workMode} onChange={v => setWorkMode(v)} />
                      <RadioBtn label="Work from home" value={3} selected={workMode} onChange={v => setWorkMode(v)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── SPOUSE (conditional) ── */}
              {maritalStatus == 2 && (
                <div className="pdv2-spouse-card">
                  <div className="pdv2-spouse-title">Spouse details</div>
                  <div className="pdv2-row">
                    <div>
                      <InputField
                        label="Spouse name" required
                        icon={<IconUser />}
                        value={spousename}
                        onChange={e => { setSpousename(e.target.value); setErrors(err => ({...err, spousename: ''})); }}
                        placeholder="Full name"
                        hasError={!!errors.spousename}
                      />
                      <ErrMsg msg={errors.spousename} />
                    </div>
                    <div>
                      <InputField
                        label="Spouse contact"
                        icon={<IconPhone />}
                        value={spousecontact}
                        onChange={e => {
                          const val = e.target.value;
                          if (/^\d{0,10}$/.test(val)) {
                            setSpousecontact(val);
                            setErrors(err => ({...err, spousecontact: ''}));
                          }
                        }}
                        placeholder="10-digit number"
                        type="text"
                        hasError={!!errors.spousecontact}
                      />
                      <ErrMsg msg={errors.spousecontact} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── ADDRESS ── */}
              <div className="pdv2-section">
                <div className="pdv2-section-title">Current address</div>
                <div className="pdv2-row" style={{ marginBottom: '1.15rem' }}>
                  <div>
                    <InputField
                      label="Flat / House no." required
                      icon={<IconHome />}
                      value={addressline1}
                      onChange={e => { setAddressline1(e.target.value); setErrors(err => ({...err, addressline1: ''})); }}
                      placeholder="e.g. Flat 4B, Tower 2"
                      hasError={!!errors.addressline1}
                    />
                    <ErrMsg msg={errors.addressline1} />
                  </div>
                  <div>
                    <InputField
                      label="Full address" required
                      icon={<IconPin />}
                      value={addressline2}
                      onChange={e => { setAddressline2(e.target.value); setErrors(err => ({...err, addressline2: ''})); }}
                      placeholder="Street, locality, area"
                      hasError={!!errors.addressline2}
                    />
                    <ErrMsg msg={errors.addressline2} />
                  </div>
                </div>

                <div className="pdv2-row" style={{ marginBottom: '1.15rem' }}>
                  <InputField
                    label="Landmark"
                    icon={<IconLandmark />}
                    value={landmark}
                    onChange={e => setLandmark(e.target.value)}
                    placeholder="Nearby landmark"
                  />
                  <InputField
                    label="Pincode" required
                    icon={<IconPin />}
                    value={customerDetails?.residence_pincode}
                    readOnly
                  />
                </div>

                <div className="pdv2-row">
                  <InputField
                    label="City"
                    icon={<IconCity />}
                    value={customerDetails?.residence_city_name}
                    readOnly
                  />
                  <InputField
                    label="State" required
                    icon={<IconCity />}
                    value={customerDetails?.residence_state_name}
                    readOnly
                  />
                </div>
              </div>

              {/* CTA */}
              <button className="pdv2-cta" onClick={submit} disabled={loader}>
                {loader ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    Please wait…
                  </>
                ) : (
                  <>Continue <IconArrow /></>
                )}
              </button>

              {/* Trust chips */}
              <div className="pdv2-trust">
                <span className="pdv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  256-bit SSL
                </span>
                <span className="pdv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Data stays private
                </span>
                <span className="pdv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  RBI compliant
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: reusable finance visual ── */}
          <div className="pdv2-right-col">
            <JourneyRightPanel />
          </div>

        </main>
      </div>
      <MobileNav />
    </>
  );
}