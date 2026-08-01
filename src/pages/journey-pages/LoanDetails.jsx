import React, { useEffect, useState } from 'react'
import UserCreditProfile from '../../components/UserCreditProfile'
import HelpCenter from '../../components/HelpCenter'
import MobileNav from '../../components/MobileNav'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getLeadHistory } from '../../Utils/api'
import { useSelector } from 'react-redux'
import PaymentHistory from '../../components/PaymentHistory'
import { dashboardStyles } from '../journey-pages/dashboardTheme'



const ldStyles = `
  /* page background comes from .db-page (dashboardTheme) —
     ld-page only adjusts spacing on top of it */
  .ld-page { padding-top: 5rem; }

  /* ── LAYOUT ── */
  .ld-layout {
    position: relative;
    z-index: 1;
    display: grid; grid-template-columns: 1fr 300px;
    gap: 1.5rem; max-width: 1200px;
    margin: 0 auto; padding: 0 1.5rem;
  }
  .ld-left { display: flex; flex-direction: column; gap: 1.25rem; min-width: 0; }
  .ld-right { display: flex; flex-direction: column; gap: 1.25rem; }

  /* BACK BUTTON — glass outline */
  .ld-back {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 16px; border-radius: 11px;
    border: 1.5px solid rgba(255,255,255,0.24);
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.85);
    font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: 'Sora', sans-serif;
    transition: border-color 0.15s, background 0.15s;
    width: fit-content;
  }
  .ld-back:hover {
    border-color: rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.12);
    color: #ffffff;
  }
  .ld-back svg { width: 15px; height: 15px; }

  /* ── HERO CARD ── */
  .ld-hero-card {
    background: rgba(6, 23, 30, 0.6);
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 20px;
    padding: 1.5rem 1.75rem;
    position: relative; overflow: hidden;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 18px 48px rgba(8, 26, 34, 0.4), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .ld-hero-blob1 { position: absolute; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(255,179,0,0.16) 0%, transparent 70%); top: -60px; right: -40px; pointer-events: none; }
  .ld-hero-blob2 { position: absolute; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(63,212,196,0.14) 0%, transparent 70%); bottom: -30px; left: -30px; pointer-events: none; }
  .ld-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 36px 36px; pointer-events: none; }
  .ld-hero-inner { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
  .ld-avatar {
    width: 48px; height: 48px; border-radius: 13px;
    background: linear-gradient(180deg, #ffc233, #ffb300);
    color: #241a00; font-size: 18px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; overflow: hidden;
    box-shadow: 0 6px 16px rgba(255,179,0,0.35);
    font-family: 'Sora', sans-serif;
  }
  .ld-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .ld-hero-name { font-family: 'Sora', sans-serif; font-size: 17px; font-weight: 700; color: #fff; letter-spacing: -0.3px; }
  .ld-hero-verified { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #3fd4c4; font-weight: 600; margin-top: 3px; }
  .ld-hero-verified svg { width: 13px; height: 13px; }
  .ld-hero-stats { display: flex; gap: 1.25rem; flex-wrap: wrap; }
  .ld-hero-stat { text-align: center; }
  .ld-hero-stat-label { font-size: 10px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 5px; font-weight: 700; }

  /* ── SUMMARY STATS — frosted tiles ── */
  .ld-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .ld-stat-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 14px; padding: 14px;
    transition: background 0.15s, border-color 0.15s;
    min-width: 0;
  }
  .ld-stat-card:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.24);
  }
  .ld-stat-icon { width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; }
  .ld-stat-icon svg { width: 14px; height: 14px; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .ld-stat-icon.blue   { background: rgba(63,212,196,0.14); border: 1px solid rgba(63,212,196,0.26); } .ld-stat-icon.blue svg   { stroke: #3fd4c4; }
  .ld-stat-icon.orange { background: rgba(255,179,0,0.16);  border: 1px solid rgba(255,179,0,0.28);  } .ld-stat-icon.orange svg { stroke: #ffb300; }
  .ld-stat-icon.green  { background: rgba(63,212,196,0.14); border: 1px solid rgba(63,212,196,0.26); } .ld-stat-icon.green svg  { stroke: #3fd4c4; }
  .ld-stat-icon.purple { background: rgba(255,194,51,0.14); border: 1px solid rgba(255,194,51,0.26); } .ld-stat-icon.purple svg { stroke: #ffc233; }
  .ld-stat-icon.red    { background: rgba(255,138,128,0.12); border: 1px solid rgba(255,138,128,0.24); } .ld-stat-icon.red svg   { stroke: #ff8a80; }
  .ld-stat-label { font-size: 10px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 3px; font-weight: 600; }
  .ld-stat-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px; font-weight: 700; color: #ffffff; letter-spacing: -0.2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* ── DOC BUTTONS — teal glass ── */
  .ld-doc-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .ld-doc-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 16px; border-radius: 11px;
    background: rgba(63,212,196,0.14);
    border: 1.5px solid rgba(63,212,196,0.4);
    color: #3fd4c4;
    font-family: 'Sora', sans-serif;
    font-size: 13px; font-weight: 700;
    text-decoration: none; transition: background 0.15s;
  }
  .ld-doc-btn:hover { background: rgba(63,212,196,0.24); color: #3fd4c4; text-decoration: none; }
  .ld-doc-btn svg { width: 14px; height: 14px; fill: none; stroke: #3fd4c4; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  /* ── INFO ROWS ── */
  .ld-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1.5rem; }
  .ld-info-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); gap: 8px; }
  .ld-info-row:last-child { border-bottom: none; }
  .ld-info-key { font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.4px; font-weight: 600; }
  .ld-info-val { font-size: 13px; font-weight: 600; color: #ffffff; text-align: right; word-break: break-word; }

  /* ── KYC CARDS — tinted glass ── */
  .ld-kyc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .ld-kyc-card { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 14px; border: 1px solid transparent; min-width: 0; }
  .ld-kyc-card.blue   { background: rgba(63,212,196,0.08); border-color: rgba(63,212,196,0.22); }
  .ld-kyc-card.orange { background: rgba(255,179,0,0.08);  border-color: rgba(255,179,0,0.24); }
  .ld-kyc-card.green  { background: rgba(63,212,196,0.08); border-color: rgba(63,212,196,0.22); }
  .ld-kyc-card.purple { background: rgba(255,194,51,0.08); border-color: rgba(255,194,51,0.22); }
  .ld-kyc-icon { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ld-kyc-icon svg { width: 16px; height: 16px; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .ld-kyc-card.blue .ld-kyc-icon   { background: rgba(63,212,196,0.16); } .ld-kyc-card.blue .ld-kyc-icon svg   { stroke: #3fd4c4; }
  .ld-kyc-card.orange .ld-kyc-icon { background: rgba(255,179,0,0.18);  } .ld-kyc-card.orange .ld-kyc-icon svg { stroke: #ffb300; }
  .ld-kyc-card.green .ld-kyc-icon  { background: rgba(63,212,196,0.16); } .ld-kyc-card.green .ld-kyc-icon svg  { stroke: #3fd4c4; }
  .ld-kyc-card.purple .ld-kyc-icon { background: rgba(255,194,51,0.16); } .ld-kyc-card.purple .ld-kyc-icon svg { stroke: #ffc233; }
  .ld-kyc-label { font-size: 10.5px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 3px; font-weight: 600; }
  .ld-kyc-val { font-size: 13.5px; font-weight: 700; color: #ffffff; word-break: break-word; }

  /* ── ADDRESS CARD ── */
  .ld-address-card {
    padding: 14px 16px;
    background: rgba(255,255,255,0.06);
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.13);
  }
  .ld-address-text { font-size: 13.5px; color: rgba(255,255,255,0.85); line-height: 1.6; }
  .ld-address-pin {
    width: 30px; height: 30px; border-radius: 9px;
    background: rgba(63,212,196,0.14);
    border: 1px solid rgba(63,212,196,0.26);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .ld-address-pin svg { width: 14px; height: 14px; fill: none; stroke: #3fd4c4; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .ld-layout { grid-template-columns: 1fr; }
    .ld-right { order: 2; }
    .ld-page { padding-top: 4.5rem; }
  }
  @media (max-width: 768px) { .ld-stats-grid { grid-template-columns: repeat(2, 1fr); } .ld-kyc-grid { grid-template-columns: 1fr; } }
  @media (max-width: 480px) {
    .ld-layout { padding: 0 1rem; gap: 1rem; }
    .ld-info-grid { grid-template-columns: 1fr; }
  }
`;

// ── Icons ──
const IconBack = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const IconVerified = () => <svg viewBox="0 0 24 24" fill="none" stroke="#3fd4c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IconDownload = () => <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconRupee = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="4" x2="18" y2="4"/><line x1="6" y1="9" x2="18" y2="9"/><path d="M6 14l8 6"/><path d="M6 9a6 6 0 0 1 6 6"/></svg>;
const IconCalendar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconPercent = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>;
const IconClock = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconHash = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>;
const IconUser = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconCreditCard = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const IconPin = () => <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconTarget = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;

export default function LoanDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { leadId } = location.state || {};
  const [leadData, setLeadData] = useState({});
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeadHistory({ leadId });
        if (response?.data?.status === 1) {
          setLeadData(response?.data?.data?.[0] || {});
        }
      } catch (error) { console.error('Error generating lead detail:', error); }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    return `${String(date.getDate()).padStart(2,'0')}-${String(date.getMonth()+1).padStart(2,'0')}-${date.getFullYear()}`;
  };
  const getMaritalStatus = (id) => ({ 1:'Single', 2:'Married', 3:'Divorced' }[Number(id)] || '—');
  const getGender = (id) => ({ 1:'Male', 2:'Female' }[Number(id)] || '—');

  const initials = customerDetails?.full_name
    ? customerDetails.full_name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
    : '?';

  const docLinks = [
    { url: leadData?.sanction_letter, label: 'Sanction Letter' },
    { url: leadData?.disbursal_letter, label: 'Disbursal Letter' },
    { url: leadData?.noc_closing_letter, label: 'NOC Letter' },
    { url: leadData?.noc_settlement_letter, label: 'Settlement Letter' },
  ].filter(d => d.url);

  const stats = [
    { icon: <IconRupee />, label: 'Loan amount', val: leadData?.loan_recommended || '—', color: 'blue' },
    { icon: <IconHash />, label: 'Loan no.', val: leadData?.loan_no || '—', color: 'orange' },
    { icon: <IconCalendar />, label: 'Disbursal date', val: formatDate(leadData?.disbursal_date), color: 'green' },
    { icon: <IconPercent />, label: 'Interest rate', val: '1%', color: 'purple' },
    { icon: <IconClock />, label: 'Tenure', val: leadData?.tenure ? `${leadData.tenure} days` : '—', color: 'red' },
    { icon: <IconRupee />, label: 'Repay Amount', val: leadData?.loan_total_outstanding_amount || '—', color: 'blue' },
  ];

  const kycCards = [
    { icon: <IconRupee />, label: 'Monthly salary', val: leadData?.monthly_salary_amount || '—', color: 'blue' },
    { icon: <IconCreditCard />, label: 'PAN card', val: leadData?.pancard || '—', color: 'orange' },
    { icon: <IconUser />, label: 'Aadhaar number', val: customerDetails?.aadhar_no ? `••••••••${customerDetails.aadhar_no}` : '—', color: 'green' },
    { icon: <IconTarget />, label: 'Loan purpose', val: leadData?.purpose || '—', color: 'purple' },
  ];

  const personalRows = [
    { key: 'Customer name', val: customerDetails?.full_name },
    { key: 'Father name', val: customerDetails?.father_name },
    { key: 'Marital status', val: getMaritalStatus(customerDetails?.marital_status_id) },
    { key: 'Date of birth', val: formatDate(customerDetails?.dob) },
    { key: 'Gender', val: getGender(customerDetails?.gender) },
    { key: 'Mobile', val: leadData?.mobile },
    { key: 'Email', val: leadData?.email?.toLowerCase() },
  ];

  return (
    <>
      <style>{dashboardStyles}{ldStyles}</style>
      <div className="db-page ld-page">

        <div className="ld-layout">
          <div className="ld-left">

            {/* BACK */}
            <button className="ld-back" onClick={() => navigate(-1)}>
              <IconBack /> Back to dashboard
            </button>

            {/* HERO CARD */}
            <div className="ld-hero-card">
              <div className="ld-hero-grid"/><div className="ld-hero-blob1"/><div className="ld-hero-blob2"/>
              <div className="ld-hero-inner">
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <div className="ld-avatar">
                    {customerDetails?.profile_pic
                      ? <img src={customerDetails.profile_pic} alt="profile" onError={e=>e.target.style.display='none'}/>
                      : initials
                    }
                  </div>
                  <div>
                    <div className="ld-hero-name">{customerDetails?.full_name || '—'}</div>
                    <div className="ld-hero-verified"><IconVerified /> Verified account</div>
                  </div>
                </div>
                <div className="ld-hero-stats">
                  <div className="ld-hero-stat">
                    <div className="ld-hero-stat-label">App status</div>
                    <span className="db-badge warn">{leadData?.app_status || 'Pending'}</span>
                  </div>
                  <div className="ld-hero-stat">
                    <div className="ld-hero-stat-label">Loan no.</div>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:700, color:'#ffb300', letterSpacing:'0.5px' }}>
                      {leadData?.loan_no || '—'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* LOAN STATS */}
            <div className="db-card">
              <div className="db-section-title">Loan overview</div>
              <div className="ld-stats-grid">
                {stats.map((s,i) => (
                  <div key={i} className="ld-stat-card">
                    <div className={`ld-stat-icon ${s.color}`}>{s.icon}</div>
                    <div className="ld-stat-label">{s.label}</div>
                    <div className="ld-stat-val">{s.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* DOCUMENT BUTTONS */}
            {docLinks.length > 0 && (
              <div className="db-card">
                <div className="db-section-title">Documents</div>
                <div className="ld-doc-row">
                  {docLinks.map((doc, i) => (
                    <Link key={i} to={doc.url} target="_blank" className="ld-doc-btn">
                      <IconDownload /> {doc.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* PERSONAL DETAILS */}
            <div className="db-card">
              <div className="db-section-title">Personal details</div>
              <div className="ld-info-grid">
                {personalRows.map((row, i) => (
                  <div key={i} className="ld-info-row">
                    <span className="ld-info-key">{row.key}</span>
                    <span className="ld-info-val">{row.val || '—'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KYC / FINANCIAL CARDS */}
            <div className="db-card">
              <div className="db-section-title">Financial &amp; KYC info</div>
              <div className="ld-kyc-grid">
                {kycCards.map((card, i) => (
                  <div key={i} className={`ld-kyc-card ${card.color}`}>
                    <div className="ld-kyc-icon">{card.icon}</div>
                    <div>
                      <div className="ld-kyc-label">{card.label}</div>
                      <div className="ld-kyc-val">{card.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ADDRESS */}
            <div className="db-card">
              <div className="db-section-title">Current address</div>
              <div className="ld-address-card">
                <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <div className="ld-address-pin">
                    <IconPin />
                  </div>
                  <p className="ld-address-text">
                    {[
                      customerDetails?.residence_address_1,
                      customerDetails?.residence_address_2,
                      customerDetails?.residence_city_name,
                      customerDetails?.residence_state_name,
                      customerDetails?.residence_pincode,
                    ].filter(Boolean).join(', ') || '—'}
                  </p>
                </div>
              </div>
            </div>

            {/* PAYMENT HISTORY */}
            <div className="db-card">
              <div className="db-section-title">Payment history</div>
              <PaymentHistory state={{ leadId }} />
            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="ld-right">
            <UserCreditProfile />
            <HelpCenter />
          </div>
        </div>
      </div>
      <MobileNav />
    </>
  );
}