import React, { useEffect } from 'react'
import LeadTrack from '../../components/LeadTrack'
import CreditManagerDetails from '../../components/CreditManagerDetails';
import LoanHistoryList from '../../components/LoanHistoryList';
import DisplayOnCondition from '../../components/DisplayOnCondition';
import ActiveLoanRequest from '../../components/ActiveLoanRequest';
import UserCreditProfile from '../../components/UserCreditProfile';
import HelpCenter from '../../components/HelpCenter';
import { useDispatch, useSelector } from 'react-redux';
import MobileNav from '../../components/MobileNav';
import { updateCustomerDetails, updateJourneyEvents } from '../../CustomerJourneyDetails/CustomerJourneyDetails';
import { getCustomerDetails } from '../../Utils/api';
import ReuploadDocument from '../../components/ReuploadDocument';
import { Link } from 'react-router-dom';
// import Repayment from '../../components/Repayment';
// import Userbirthday from '../components/Userbirthday';
import { dashboardStyles } from './dashboardTheme';

/*
  Dashboard (v2) — gradient glass theme
  ─────────────────────────────────────
  Uses the shared db-* design system from dashboardTheme.js
  (navy→teal gradient page, glass cards, amber/teal accents).
  Structure, data-fetch and all conditional logic unchanged —
  only the inline accent colors updated to the new palette.
*/

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function Dashboard() {
  const dispatch = useDispatch();
  const customerStep = useSelector((state) => state?.customerJourneyDetails?.journeySteps);
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);
  const journeyComplete = useSelector((state) => state?.customerJourneyDetails?.customerDetails?.journeyCompletedFlag);
  const { loan_quote, personal_details, upload_documents } = useSelector((state) => state?.customerJourneyDetails?.journeySteps);
  const allStepsCompleted = loan_quote === 1 && personal_details === 1 && upload_documents === 1;

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
    fetchCustomerDetails();
  }, [customerStep?.check_eligibility]);

  const initials = customerDetails?.full_name
    ? customerDetails.full_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <>
      <style>{dashboardStyles}</style>
      <div className="db-page">

        {/* ── LAYOUT ── */}
        <div className="db-layout">

          {/* ── LEFT ── */}
          <div className="db-left">

            {/* PROFILE HEADER CARD */}
            <div className="db-card-dark">
              <div className="db-card-dark-grid" />
              <div className="db-card-dark-blob1" />
              <div className="db-card-dark-blob2" />
              <div className="db-card-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: 54, height: 54, borderRadius: '15px',
                    background: 'linear-gradient(180deg, #ffc233, #ffb300)',
                    color: '#241a00',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 800, flexShrink: 0,
                    overflow: 'hidden',
                    boxShadow: '0 6px 18px rgba(255,179,0,0.35)'
                  }}>
                    {customerDetails?.profile_pic
                      ? <img src={customerDetails.profile_pic} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : initials
                    }
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
                      Welcome, {customerDetails?.full_name || '—'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3fd4c4', display: 'inline-block' }} />
                      <span style={{ fontSize: 12, color: '#3fd4c4', fontWeight: 600 }}>Verified account</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 5, fontWeight: 700 }}>Status</div>
                    <span className="db-badge warn">{customerDetails?.applicationStatus || 'Pending'}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 5, fontWeight: 700 }}>Ref. No.</div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: '#ffb300', letterSpacing: '0.5px' }}>
                      {customerDetails?.leadReferenceNo || '—'}
                    </span>
                  </div>
                </div>
              </div>

              {(!allStepsCompleted || journeyComplete == 0) && (
                <div className="db-card-inner" style={{ marginTop: '1.15rem' }}>
                  <Link to="/journey" className="db-btn db-btn-orange" style={{ width: 'fit-content' }}>
                    Complete your journey <IconArrow />
                  </Link>
                </div>
              )}
            </div>

            {/* CONDITIONAL BUTTONS */}
            <DisplayOnCondition />

            {/* TRACKER */}
            <LeadTrack />

            {/* BIRTHDAY */}
            {/* <Userbirthday /> */}

            {/* ACTIVE LOAN */}
            <ActiveLoanRequest />

            {/* CREDIT MANAGER */}
            {customerDetails?.credit_manager_details?.managerName && <CreditManagerDetails />}

            {/* LOAN HISTORY */}
            <LoanHistoryList />

            {/* REPAYMENT */}
            {/* {customerDetails?.loan_repayment_detail &&
              Object.keys(customerDetails.loan_repayment_detail).length > 0 && <Repayment />} */}

            {/* RE-UPLOAD */}
            <ReuploadDocument />

          </div>

          {/* ── RIGHT ── */}
          <div className="db-right">
            <UserCreditProfile />
            <HelpCenter />
          </div>

        </div>
      </div>
      <MobileNav />
    </>
  );
}