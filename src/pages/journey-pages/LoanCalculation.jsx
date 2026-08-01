import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails, updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { getCustomerDetails, getGenerateLoan, getLoanQuote } from '../../Utils/api';
import MobileNav from '../../components/MobileNav';
import JourneyRightPanel from '../../components/JourneyRightPannel';

/*
  LoanCalculation (v2) — gradient glass theme
  ───────────────────────────────────────────
  Matches PanDetails / EmploymentDetail v2: navy→teal gradient + dot
  grid, heading outside the card (amber numbered eyebrow), dark glass
  console. Sliders and select restyled for the dark card; summary as
  glass tiles; total payable as a deep strip with amber amount.
  All quote/eligibility logic, API calls and flow are unchanged.
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

  .loanv2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .loanv2 {
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
  .loanv2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .loanv2-main {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    align-items: start;
    gap: clamp(2rem, 4.5vw, 4rem);
    padding: clamp(4.5rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 3rem) 3rem;
    min-height: 100vh;
  }
  .loanv2-right-col {
    position: sticky;
    top: 5rem;
  }

  /* ── Heading ── */
  .loanv2-eyebrow {
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
  .loanv2-eyebrow-num {
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
  .loanv2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .loanv2-lede {
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    max-width: 52ch;
    margin-bottom: 1.75rem;
  }

  /* ── Glass console ── */
  .loanv2-card {
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

  .loanv2-section { margin-bottom: 1.5rem; }
  .loanv2-section-title {
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
  .loanv2-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.13);
  }

  .loanv2-field-label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    margin-bottom: 9px;
  }
  .loanv2-field-label .req { color: var(--accent); }

  /* ── Select (white row) ── */
  .loanv2-select {
    width: 100%;
    height: 50px;
    border: 2px solid transparent;
    border-radius: 13px;
    background-color: #ffffff;
    padding: 0 40px 0 14px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: #1f4a5c;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231f4a5c' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
  }
  .loanv2-select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
  }

  /* ── Sliders ── */
  .loanv2-slider-wrap { margin-bottom: 1.35rem; }
  .loanv2-slider-wrap:last-child { margin-bottom: 0; }
  .loanv2-slider-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 8px;
  }
  .loanv2-slider-label {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
  }
  .loanv2-slider-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: -0.3px;
    font-variant-numeric: tabular-nums;
  }
  .loanv2-slider-value span {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    font-weight: 500;
    margin-left: 3px;
    font-family: 'Inter', sans-serif;
  }
  .loanv2-slider-track { position: relative; padding: 6px 0; }
  .loanv2-slider {
    width: 100%;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 99px;
    outline: none;
    cursor: pointer;
  }
  .loanv2-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--accent);
    border: 3px solid #ffffff;
    box-shadow: 0 2px 10px rgba(255, 179, 0, 0.5);
    cursor: pointer;
    transition: box-shadow 0.15s;
  }
  .loanv2-slider::-webkit-slider-thumb:hover {
    box-shadow: 0 0 0 6px rgba(255, 179, 0, 0.2), 0 2px 12px rgba(255, 179, 0, 0.55);
  }
  .loanv2-slider:focus-visible::-webkit-slider-thumb {
    box-shadow: 0 0 0 6px rgba(255, 179, 0, 0.28);
  }
  .loanv2-slider::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--accent);
    border: 3px solid #ffffff;
    box-shadow: 0 2px 10px rgba(255, 179, 0, 0.5);
    cursor: pointer;
  }
  .loanv2-slider-minmax {
    display: flex;
    justify-content: space-between;
    margin-top: 7px;
  }
  .loanv2-slider-min, .loanv2-slider-max {
    font-size: 11.5px;
    color: rgba(255,255,255,0.5);
    font-family: 'JetBrains Mono', monospace;
  }

  /* ── Info pills (fixed tenure mode) ── */
  .loanv2-info-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .loanv2-info-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 15px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 12px;
    font-size: 13px;
    color: rgba(255,255,255,0.7);
  }
  .loanv2-info-pill svg { width: 15px; height: 15px; color: #3fd4c4; }
  .loanv2-info-pill strong { color: #ffffff; font-weight: 700; }

  /* ── Summary tiles ── */
  .loanv2-summary-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 1rem;
  }
  .loanv2-summary-card {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 15px;
    padding: 13px 14px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-width: 0;
  }
  .loanv2-summary-icon {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loanv2-summary-icon svg { width: 16px; height: 16px; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .loanv2-summary-icon.amber { background: rgba(255,179,0,0.16); border: 1px solid rgba(255,179,0,0.28); }
  .loanv2-summary-icon.amber svg { stroke: var(--accent); }
  .loanv2-summary-icon.teal { background: rgba(63,212,196,0.14); border: 1px solid rgba(63,212,196,0.26); }
  .loanv2-summary-icon.teal svg { stroke: #3fd4c4; }
  .loanv2-summary-label {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }
  .loanv2-summary-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Total payable strip ── */
  .loanv2-total-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: rgba(6, 23, 30, 0.6);
    border: 1px solid rgba(255, 179, 0, 0.3);
    border-radius: 16px;
    padding: 15px 20px;
  }
  .loanv2-total-label {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    line-height: 1.45;
  }
  .loanv2-total-label strong {
    display: block;
    color: #ffffff;
    font-size: 14.5px;
    font-weight: 700;
    margin-bottom: 2px;
  }
  .loanv2-total-amount {
    font-family: 'JetBrains Mono', monospace;
    font-size: 24px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: -0.5px;
    white-space: nowrap;
  }

  /* ── Error ── */
  .loanv2-err {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 12.5px;
    color: #ffb4a8;
    margin-top: 7px;
  }
  .loanv2-err svg { width: 13px; height: 13px; flex-shrink: 0; margin-top: 2px; }

  /* ── CTA ── */
  .loanv2-cta {
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
  .loanv2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  .loanv2-cta:active:not(:disabled) { transform: translateY(0); }
  .loanv2-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
  .loanv2-cta:disabled {
    background: rgba(255, 179, 0, 0.35);
    color: rgba(36, 26, 0, 0.55);
    cursor: not-allowed;
    box-shadow: none;
  }
  .loanv2-cta svg { width: 17px; height: 17px; }

  /* ── Trust chips ── */
  .loanv2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 1.15rem;
    padding-top: 1.05rem;
    border-top: 1px solid rgba(255,255,255,0.13);
  }
  .loanv2-chip {
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
  .loanv2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .loanv2-main {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-top: 4.5rem;
      padding-bottom: 6.5rem; /* room for MobileNav */
      min-height: auto;
    }
    .loanv2-left {
      width: 100%;
      max-width: 640px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .loanv2-left .loanv2-card { text-align: left; }
    .jrp2 { display: none; }
    .loanv2-right-col { display: none; }
  }
  @media (max-width: 640px) {
    .loanv2-summary-grid { grid-template-columns: repeat(2, 1fr); }
    .loanv2-total-strip { flex-direction: column; text-align: center; }
  }
  @media (max-width: 480px) {
    .loanv2-card { padding: 1.4rem 1rem 1.2rem; border-radius: 20px; }
    .loanv2-total-amount { font-size: 20px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .loanv2 *, .jrp2 * { animation: none !important; transition: none !important; }
  }
`;

// ── Icons ──
const IconRupee = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="4" x2="18" y2="4"/><line x1="6" y1="9" x2="18" y2="9"/><path d="M6 14l8 6"/><path d="M6 9a6 6 0 0 1 6 6"/></svg>;
const IconClock = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconPercent = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
const IconAlert = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconCalendar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;

export default function LoanCalculation() {
  const [emi, setEmi] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [rate] = useState(1);
  const [loanData, setLoanData] = useState({});
  const [time, setTime] = useState(0);
  const [error, setError] = useState('');
  const [selecteLoanPurpose, setSelecteloanpurpose] = useState('11');
  const [netDisbursal, setNetDisbursal] = useState(0);
  const [loader, setLoader] = useState(false);

  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const dispatch = useDispatch();

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const interest = (principal * rate * time) / 100;
  const totalRepayAmount = parseInt(principal || 0) + parseInt(interest || 0);

  // Slider fill style
  const sliderPercent = (val, min, max) => {
    if (!min || !max || max === min) return 0;
    return ((val - min) / (max - min)) * 100;
  };
  const sliderStyle = (val, min, max) => ({
    background: `linear-gradient(to right, #ffb300 0%, #ffb300 ${sliderPercent(val, min, max)}%, rgba(255,255,255,0.18) ${sliderPercent(val, min, max)}%, rgba(255,255,255,0.18) 100%)`
  });

  const params = { profileId: customerDetails?.profileId };

  async function fetchCustomerDetails() {
    if (params.profileId) {
      const response = await getCustomerDetails(params);
      if (response?.data?.apiStatus == 1) {
        dispatch(updateCustomerDetails(response?.data?.data?.customer_details));
        dispatch(updateJourneyEvents(response?.data?.data?.screen_details));
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGenerateLoan({ profileId: customerDetails?.profileId });
        if (response?.data?.apiStatus === 1) {
          const d = response?.data?.data;
          setLoanData(d);
          setPrincipal(d.maxLoanAmount || 0);
          setTime(d?.minLoanTenure || 15);
        }
      } catch (e) { console.error('Error generating loan:', e); }
    };
    if (customerDetails?.profileId) fetchData();
  }, [customerDetails?.profileId]);

  useEffect(() => {
    if (!principal || !loanData) return;
    const effectiveTenure = loanData?.showLoanTenure === 1 ? Number(time) : Number(loanData?.tenure);
    const si = (principal * effectiveTenure * rate) / 100;
    setEmi(si);
    const pf = 0.10 * principal;
    const gst = 0.18 * pf;
    setNetDisbursal(Math.round(principal - (pf + gst)));
  }, [principal, time, rate, loanData]);

  const submit = async () => {
    if (!selecteLoanPurpose) { setError('Please select a loan purpose'); return; }
    setLoader(true);
    const param = {
      profileId: customerDetails?.profileId,
      loanAmount: principal, tenure: time,
      loanPurpose: selecteLoanPurpose, loanQuoteDecision: 1,
    };
    try {
      const response = await getLoanQuote(param);
      if (response?.data?.apiStatus === 1) {
        toast.success(response?.data?.message);
        // if (customerDetails?.user_type === 'REPEAT') {
        //   dispatch(updateJourneyEvents({ loan_quote: 1, personal_details: 1, upload_documents: 2 }));
        // } else {
        //   dispatch(updateJourneyEvents({ loan_quote: 1, personal_details: 2 }));
        // }

        fetchCustomerDetails();

      } else {
        toast.error(response?.data?.message || 'Something went wrong');
      }
    } catch { toast.error('Error while getting loan quote'); }
    finally { setLoader(false); }
  };

  const totalPayable = loanData?.showLoanTenure === 1
    ? totalRepayAmount
    : Number(principal) + Number(emi);

  return (
    <>
      <style>{styles}</style>
      <div className="loanv2">
        <main className="loanv2-main">

          {/* ── Left: heading + glass console ── */}
          <div className="loanv2-left">
            <span className="loanv2-eyebrow">
              <span className="loanv2-eyebrow-num">3</span>
              Your loan offer
            </span>
           

            <div className="loanv2-card">
              {/* ── LOAN PURPOSE ── */}
              <div className="loanv2-section">
                <div className="loanv2-section-title">Loan purpose</div>
                <label className="loanv2-field-label" htmlFor="loanPurpose">
                  Purpose of loan <span className="req">*</span>
                </label>
                <select
                  id="loanPurpose"
                  className="loanv2-select"
                  value={selecteLoanPurpose}
                  onChange={(e) => { setSelecteloanpurpose(e.target.value); setError(''); }}
                >
                  <option value="11">Emergency</option>
                  <option value="4">Travel</option>
                  <option value="5">Medical</option>
                  <option value="6">Academics</option>
                  <option value="7">Obligation</option>
                  <option value="8">Festival</option>
                  <option value="9">Purchase</option>
                  <option value="10">Other</option>
                </select>
                {error && (
                  <p className="loanv2-err"><IconAlert />{error}</p>
                )}
              </div>

              {/* ── SLIDERS ── */}
              <div className="loanv2-section">
                <div className="loanv2-section-title">Loan amount &amp; tenure</div>

                {/* Amount Slider */}
                <div className="loanv2-slider-wrap">
                  <div className="loanv2-slider-header">
                    <span className="loanv2-slider-label">Loan amount</span>
                    <span className="loanv2-slider-value">{formatCurrency(principal)}</span>
                  </div>
                  <div className="loanv2-slider-track">
                    <input
                      type="range"
                      className="loanv2-slider"
                      min={loanData.minLoanAmount || 0}
                      max={loanData.maxLoanAmount || 100000}
                      step="100"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      style={sliderStyle(principal, loanData.minLoanAmount, loanData.maxLoanAmount)}
                      aria-label="Loan amount"
                    />
                  </div>
                  <div className="loanv2-slider-minmax">
                    <span className="loanv2-slider-min">{formatCurrency(loanData.minLoanAmount)}</span>
                    <span className="loanv2-slider-max">{formatCurrency(loanData.maxLoanAmount)}</span>
                  </div>
                </div>

                {/* Tenure Slider */}
                {loanData?.showLoanTenure === 1 ? (
                  <div className="loanv2-slider-wrap">
                    <div className="loanv2-slider-header">
                      <span className="loanv2-slider-label">Repayment tenure</span>
                      <span className="loanv2-slider-value">{time}<span>days</span></span>
                    </div>
                    <div className="loanv2-slider-track">
                      <input
                        type="range"
                        className="loanv2-slider"
                        min={loanData.minLoanTenure}
                        max={loanData.maxLoanTenure}
                        value={time}
                        onChange={(e) => setTime(Number(e.target.value))}
                        style={sliderStyle(time, loanData.minLoanTenure, loanData.maxLoanTenure)}
                        aria-label="Repayment tenure"
                      />
                    </div>
                    <div className="loanv2-slider-minmax">
                      <span className="loanv2-slider-min">{loanData.minLoanTenure} days</span>
                      <span className="loanv2-slider-max">{loanData.maxLoanTenure} days</span>
                    </div>
                  </div>
                ) : (
                  <div className="loanv2-info-row">
                    <div className="loanv2-info-pill">
                      <IconCalendar />
                      Repayment date: <strong>{loanData?.repaymentDate || '—'}</strong>
                    </div>
                    <div className="loanv2-info-pill">
                      <IconClock />
                      Tenure: <strong>{loanData?.tenureText || '—'}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* ── SUMMARY ── */}
              <div className="loanv2-section">
                <div className="loanv2-section-title">Offer summary</div>
                <div className="loanv2-summary-grid">
                  <div className="loanv2-summary-card">
                    <div className="loanv2-summary-icon amber"><IconRupee /></div>
                    <div className="loanv2-summary-label">Eligible amount</div>
                    <div className="loanv2-summary-val">{formatCurrency(principal)}</div>
                  </div>

                  <div className="loanv2-summary-card">
                    <div className="loanv2-summary-icon teal">
                      {loanData?.showLoanTenure === 1 ? <IconClock /> : <IconRupee />}
                    </div>
                    <div className="loanv2-summary-label">
                      {loanData?.showLoanTenure === 1 ? 'Period' : 'Net disbursal'}
                    </div>
                    <div className="loanv2-summary-val">
                      {loanData?.showLoanTenure === 1 ? `${time} days` : formatCurrency(netDisbursal)}
                    </div>
                  </div>

                  <div className="loanv2-summary-card">
                    <div className="loanv2-summary-icon teal"><IconPercent /></div>
                    <div className="loanv2-summary-label">Processing fee</div>
                    <div className="loanv2-summary-val">
                      {loanData?.processingFee ? Math.floor(loanData.processingFee) : 10}%
                    </div>
                  </div>
                </div>

                {/* Total Strip */}
                <div className="loanv2-total-strip">
                  <div className="loanv2-total-label">
                    <strong>Total payable amount</strong>
                    Principal + interest + fees
                  </div>
                  <div className="loanv2-total-amount">{formatCurrency(totalPayable)}</div>
                </div>
              </div>

              {/* CTA */}
              <button className="loanv2-cta" onClick={submit} disabled={loader}>
                {loader ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>
                    Accept offer
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              {/* Trust chips */}
              <div className="loanv2-trust">
                <span className="loanv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  256-bit SSL
                </span>
                <span className="loanv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Data stays private
                </span>
                <span className="loanv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  RBI compliant
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: reusable finance visual ── */}
          <div className="loanv2-right-col">
            <JourneyRightPanel />
          </div>

        </main>
      </div>
      <MobileNav />
    </>
  );
}