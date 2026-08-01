import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails, updateJourneyEvents } from '../../../CustomerJourneyDetails/CustomerJourneyDetails';
import { getCustomerDetails, getGenerateLoan, getLoanQuote } from '../../../Utils/api';
import MobileNav from '../../../components/MobileNav';
import JourneyRightPanel from '../../../components/JourneyRightPannel';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  .loan-page * { box-sizing: border-box; margin: 0; padding: 0; }
  

  .loan-page {
    min-height: 100vh;
    background: #eaf1fd;
    display: flex;
    flex-direction: column;
    font-family: 'Sora', sans-serif;
  }

  .loan-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex: 1;
    min-height: calc(100vh - 60px);
    margin-top: 50px;
  }

  /* ── LEFT PANEL ── */
  .loan-left {
  display: flex;
  flex-direction: column;
  padding: 5.5rem 2rem;
  background: #eaf1fd;
  overflow: hidden; /* remove scroll */
}

  .loan-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 2.5rem; flex-shrink: 0;
  }
  .loan-logo-dot {
    width: 34px; height: 34px; background: #F97316;
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
  }
  .loan-logo-dot svg { width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; }
  .loan-logo-name { font-size: 16px; font-weight: 600; color: #0f1c2e; letter-spacing: -0.2px; }

  
  .loan-card {
    background: #ffffff;
    border-radius: 24px;
      padding: 1.5rem 1.75rem;
    box-shadow: 0 4px 40px rgba(15,28,46,0.08), 0 1px 4px rgba(15,28,46,0.04);
    border: 1px solid rgba(255,255,255,0.8);
  }

  .loan-card-title {
    font-size: 22px; font-weight: 700;
    color: #0f1c2e; letter-spacing: -0.5px; margin-bottom: 4px;
  }
  .loan-card-sub { font-size: 13px; color: #6b7a90; margin-bottom: 1rem; }

  /* SECTION */
  .loan-section { margin-bottom: 1.2rem; }
  .loan-section-title {
    font-size: 11px; font-weight: 600; letter-spacing: 0.7px;
    text-transform: uppercase; color: #9aaabb;
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 8px;
  }
  .loan-section-title::after {
    content: ''; flex: 1; height: 1px; background: #e8eef7;
  }

  /* FIELD LABEL */
  .loan-field-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase; color: #6b7a90;
    margin-bottom: 8px; display: block;
  }
  .loan-field-label .req { color: #F97316; }

  /* SELECT */
  .loan-select {
    width: 100%; height: 46px;
    border: 1.5px solid #dce4f0; border-radius: 12px;
    background: #f7f9fc;
    padding: 0 14px;
    font-family: 'Sora', sans-serif;
    font-size: 14px; font-weight: 400; color: #0f1c2e;
    outline: none; cursor: pointer;
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7a90' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
  }
  .loan-select:focus {
    border-color: #378ADD; background-color: #fff;
    box-shadow: 0 0 0 3px rgba(55,138,221,0.14);
  }

  /* SLIDER SECTION */
  .loan-slider-wrap { margin-bottom: 0.5rem; }
  .loan-slider-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 5px;
  }
  .loan-slider-label { font-size: 12px; color: #6b7a90; font-weight: 500; }
  .loan-slider-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; font-weight: 600; color: #0f1c2e;
    letter-spacing: -0.5px;
  }
  .loan-slider-value span { font-size: 13px; color: #6b7a90; font-weight: 400; margin-left: 2px; }
  .loan-slider-track { position: relative; padding: 4px 0; }
  .loan-slider {
    width: 100%; height: 5px;
    -webkit-appearance: none; appearance: none;
    background: #e0e9f5; border-radius: 99px; outline: none; cursor: pointer;
  }
  .loan-slider::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 20px; height: 20px; border-radius: 50%;
    background: #F97316; border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(249,115,22,0.4);
    cursor: pointer; transition: box-shadow 0.15s;
  }
  .loan-slider::-webkit-slider-thumb:hover { box-shadow: 0 2px 14px rgba(249,115,22,0.55); }
  .loan-slider::-moz-range-thumb {
    width: 20px; height: 20px; border-radius: 50%;
    background: #F97316; border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(249,115,22,0.4); cursor: pointer;
  }
  .loan-slider-minmax {
    display: flex; justify-content: space-between; margin-top: 6px;
  }
  .loan-slider-min, .loan-slider-max {
    font-size: 11px; color: #9aaabb; font-family: 'JetBrains Mono', monospace;
  }

  /* SUMMARY CARDS */
  .loan-summary-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;
    margin-bottom: 1rem;
  }
  .loan-summary-card {
    background: #f7f9fc; border: 1px solid #e8eef7;
    border-radius: 14px; padding: 8px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .loan-summary-icon {
    width: 32px; height: 32px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .loan-summary-icon.blue { background: rgba(55,138,221,0.12); }
  .loan-summary-icon.orange { background: rgba(249,115,22,0.12); }
  .loan-summary-icon.green { background: rgba(52,211,153,0.12); }
  .loan-summary-icon svg { width: 16px; height: 16px; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .loan-summary-icon.blue svg { stroke: #378ADD; }
  .loan-summary-icon.orange svg { stroke: #F97316; }
  .loan-summary-icon.green svg { stroke: #34d399; }
  .loan-summary-label { font-size: 10.5px; color: #9aaabb; font-weight: 500; letter-spacing: 0.3px; }
  .loan-summary-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px; font-weight: 600; color: #0f1c2e;
  }

  /* TOTAL PAYABLE STRIP */
  .loan-total-strip {
    display: flex; align-items: center; justify-content: space-between;
    background: linear-gradient(135deg, #0f1c2e 0%, #1a3050 100%);
    border-radius: 16px; padding: 18px 22px;
    padding: 12px 16px;
    margin-bottom: 1rem;
  }
  .loan-total-label {
    font-size: 13px; color: rgba(255,255,255,0.6); font-weight: 400;
    line-height: 1.4;
  }
  .loan-total-label strong { display: block; color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 2px; }
  .loan-total-amount {
    font-family: 'JetBrains Mono', monospace;
    font-size: 22px; font-weight: 700; color: #F97316;
    letter-spacing: -0.5px;
  }

  /* REPAYMENT INFO (no tenure slider) */
  .loan-info-row {
    display: flex; gap: 10px; margin-bottom: 1.25rem; flex-wrap: wrap;
  }
  .loan-info-pill {
    display: flex; align-items: center; gap: 7px;
    padding: 10px 14px; background: #f7f9fc;
    border: 1px solid #e8eef7; border-radius: 12px;
    font-size: 13px; color: #4a5568;
  }
  .loan-info-pill svg { width: 15px; height: 15px; }
  .loan-info-pill strong { color: #0f1c2e; font-weight: 600; }

  /* CTA */
  .loan-cta {
    width: 100%;
    border: none; border-radius: 14px;
    background: #F97316; color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 10px; font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
    box-shadow: 0 4px 18px rgba(249,115,22,0.32);
     height: 44px;
  
  }
  .loan-cta:hover:not(:disabled) {
    background: #ea6a0a;
    box-shadow: 0 6px 24px rgba(249,115,22,0.42);
    transform: translateY(-1px);
  }
  .loan-cta:active:not(:disabled) { transform: scale(0.98); }
  .loan-cta:disabled { background: #c8d3e2; box-shadow: none; cursor: not-allowed; }

  /* TRUST BAR */
  .loan-trust {
    display: flex; align-items: center; justify-content: center;
    gap: 6px; margin-top: 1.25rem;
    font-size: 11.5px; color: #9aaabb;
  }
  .loan-trust svg { width: 13px; height: 13px; }
  .loan-trust-sep { width: 3px; height: 3px; background: #c8d3e2; border-radius: 50%; margin: 0 2px; }

  /* ERROR */
  .loan-err { font-size: 12px; color: #E24B4A; margin-top: 6px; display: flex; align-items: center; gap: 5px; }
  .loan-err svg { width: 13px; height: 13px; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .loan-split { grid-template-columns: 1fr; }
   
    .loan-left { padding: 2rem 1.25rem 6rem; }
    .loan-logo { margin-bottom: 1.5rem; }
    .loan-card { padding: 1.75rem 1.5rem; }
    .loan-summary-grid { grid-template-columns: repeat(2, 1fr); }
    .loan-total-strip { flex-direction: column; gap: 8px; text-align: center; }
  }
  @media (max-width: 400px) {
    .loan-card { padding: 1.5rem 1.25rem; }
    .loan-summary-grid { grid-template-columns: 1fr 1fr; }
    .loan-total-amount { font-size: 18px; }
  }
`;

// ── Icons ──
const IconBolt = () => <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IconRupee = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="4" x2="18" y2="4"/><line x1="6" y1="9" x2="18" y2="9"/><path d="M6 14l8 6"/><path d="M6 9a6 6 0 0 1 6 6"/></svg>;
const IconClock = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconPercent = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
const IconArrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconShield = () => <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconAlert = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconCalendar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconStar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

export default function AutoLoanOffer() {
  
  const [loader, setLoader] = useState(false);
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const dispatch = useDispatch();
  const [credeoApprovedAmount, setcredeoApprovedAmount] = useState(0);
  const [credeoRepaymentDate, setcredeoRepaymentDate] = useState(null);
  const [credeoTenure, setcredeoTenure] = useState(null);

  async function fetchCustomerDetails() {
      if (customerDetails?.profileId) {
        const response = await getCustomerDetails({ profileId: customerDetails?.profileId });
        if (response?.data?.apiStatus == 1) {
          dispatch(updateCustomerDetails(response?.data?.data?.customer_details));
          dispatch(updateJourneyEvents(response?.data?.data?.screen_details));
        }
      }
    }


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await getGenerateLoan({
          profileId: customerDetails?.profileId,
        });
        

        if (response?.data?.apiStatus === 1) {
         
          setcredeoApprovedAmount(response?.data?.data?.autoJourney?.data?.credeau_approved_amount);
          const formattedDate = new Date(response?.data?.data?.autoJourney?.data?.credeau_repayment_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Kolkata"
          });
          setcredeoRepaymentDate(formattedDate);
          setcredeoTenure(response?.data?.data?.autoJourney?.data?.tenure);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [customerDetails]);


  const submit = async () => {
      setLoader(true);
      const param = {
          profileId: customerDetails?.profileId,
          loanAmount: credeoApprovedAmount,
          tenure: credeoTenure,
          loanQuoteDecision: 1,
          repaymentDate: credeoRepaymentDate,
          loanPurpose: 1
       
      };
      try {
        const response = await getLoanQuote(param);
        if (response?.data?.apiStatus === 1) {
         
          toast.success(response?.data?.message);
  
          fetchCustomerDetails();
          
        } else {
          toast.error(response?.data?.message || 'Something went wrong');
        }
      } catch { toast.error('Error while getting loan quote'); }
      finally { setLoader(false); }
    };
  

  return (
    <>
      <style>{styles}</style>
      <div className="loan-page">
        <div className="loan-split">

          {/* ── LEFT: FORM ── */}
          <div className="loan-left">
            

            <div className="loan-card">
              <h1 className="loan-card-title">Congratulations</h1>
              <p className="loan-card-sub">Your loan has been successfully approved</p>

              <div className='row m-0 p-0'>
              <div className='offer-inner'>
                <div className=''>

                  <div className='info d-flex justify-content-between align-items-center border p-3 rounded mt-4 bg-light'>

                    <p className='fw-medium mb-0'>
                      Your Approved Loan Amount </p>
                    <p className='mb-0' style={{ fontSize: '30px', fontWeight: '700' }}> <CurrencyRupeeIcon style={{ fontSize: '40px', color: '#f97315' }} />  {credeoApprovedAmount}</p>

                  </div>
                </div>
                <div className='p-2'>
                  <p className='mb-0 small ' style={{ color: '#f97315', fontWeight: '500' }}> <CampaignIcon /> Your approved loan offer is available for a limited time.</p>
                </div>
                <div className='d-flex justify-content-between mt-4 mb-4'>
                  <div className='info'>
                    <p className='fw-semibold opacity-75'>Upcoming repayment date </p>
                  </div>
                  <div> <p className='fw-bold'> <CalendarMonthIcon style={{ color: '#f97315', fontWeight: '500' }} /> {credeoRepaymentDate}</p></div>
                </div>
                <div className='d-flex justify-content-between mt-4 mb-4'>
                  <div className='info'>
                    <p className='fw-semibold opacity-75'>Tenure</p>
                  </div>
                  <div> <p className='fw-bold'>{credeoTenure} Days</p></div>
                </div>
              </div>

             

              <button className="loan-cta" disabled={loader} onClick={submit}>
                {loader ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>Accept offer </>
                )}
              </button>

            </div>

              

             

              <div className="loan-trust">
                <IconShield />
                256-bit SSL encrypted
                <span className="loan-trust-sep" />
                Your data is private
                <span className="loan-trust-sep" />
                RBI compliant
              </div>
            </div>
          </div>

          {/* ── RIGHT: HERO ── */}
          <JourneyRightPanel/>

        </div>
      </div>
      <MobileNav />
    </>
  );
}