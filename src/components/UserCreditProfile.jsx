import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import cibilMeter from '../assets/civil-meter.svg';

const ucpStyles = `
  .ucp-tabs { display: flex; gap: 4px; background: #f0f4fa; border-radius: 12px; padding: 4px; margin-bottom: 1.25rem; }
  .ucp-tab {
    flex: 1; padding: 7px; border: none; border-radius: 9px;
    font-family: 'Sora', sans-serif;
    font-size: 12px; font-weight: 500; cursor: pointer;
    color: #9aaabb; background: transparent;
    transition: background 0.15s, color 0.15s;
  }
  .ucp-tab.active { background: #fff; color: #0f1c2e; font-weight: 600; box-shadow: 0 1px 4px rgba(15,28,46,0.08); }

  /* PERSONAL DETAILS */
  .ucp-info-list { display: flex; flex-direction: column; gap: 0; }
  .ucp-info-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 9px 0; border-bottom: 1px solid #f0f4fa; gap: 8px;
  }
  .ucp-info-row:last-child { border-bottom: none; }
  .ucp-info-key { font-size: 11px; text-transform: uppercase; letter-spacing: 0.4px; white-space: nowrap; }
  .ucp-info-val { font-size: 12.5px; font-weight: 500; text-align: right; word-break: break-all; }

  /* CIBIL */
  .ucp-cibil-wrap { text-align: center; }
  .ucp-cibil-img { width: 100%; max-width: 200px; margin: 0 auto 8px; display: block; }
  .ucp-score-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  .ucp-score-edge { font-size: 12px; font-weight: 700; }
  .ucp-score-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 22px; font-weight: 700; color: #0f1c2e;
    background: #eaf1fd; padding: 6px 16px; border-radius: 10px;
  }
  .ucp-legend { display: flex; flex-direction: column; gap: 5px; }
  .ucp-legend-row { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; }
  .ucp-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .ucp-legend-label { font-weight: 500; flex: 1; margin-left: 8px; }
  .ucp-legend-range {  font-family: 'JetBrains Mono', monospace; font-size: 11px; }
`;

const LEGEND = [
  { label: 'Excellent', range: '801–900', color: '#01CE34' },
  { label: 'Very Good', range: '761–800', color: '#94C530' },
  { label: 'Good',      range: '701–760', color: '#FECA2A' },
  { label: 'Average',   range: '601–700', color: '#F56200' },
  { label: 'Poor',      range: '300–600', color: '#F50000' },
];

const getMaritalStatus = (id) => ({ 1: 'Single', 2: 'Married' }[Number(id)] || '—');

const formatDOB = (dob) => {
  if (!dob) return '—';
  const d = new Date(dob);
  return isNaN(d) ? '—' : `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
};

export default function UserCreditProfile() {
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const [tab, setTab] = useState(0);

  const personalRows = [
    { key: 'Full name', val: customerDetails?.full_name },
    { key: 'Personal email', val: customerDetails?.personal_email?.toLowerCase() },
    { key: 'Official email', val: customerDetails?.office_email?.toLowerCase() },
    { key: 'PAN', val: customerDetails?.pancard },
    { key: 'DOB', val: formatDOB(customerDetails?.dob) },
    { key: 'Marital status', val: getMaritalStatus(customerDetails?.marital_status_id) },
    { key: 'Mobile', val: customerDetails?.mobile },
    { key: 'Monthly salary', val: customerDetails?.monthly_income ? `₹${customerDetails.monthly_income}` : '—' },
  ];

  return (
    <div className="db-card">
      <style>{ucpStyles}</style>

      <div className="ucp-tabs">
        {['Personal', 'CIBIL score'].map((t, i) => (
          <button key={i} className={`ucp-tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      {tab === 0 && (
        <div className="ucp-info-list">
          {personalRows.map((row, i) => (
            <div key={i} className="ucp-info-row">
              <span className="ucp-info-key">{row.key}</span>
              <span className="ucp-info-val">{row.val || '—'}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 1 && (
        <div className="ucp-cibil-wrap">
          <img src={cibilMeter} alt="CIBIL meter" className="ucp-cibil-img" />
          <div className="ucp-score-row">
            <span className="ucp-score-edge">300</span>
            <span className="ucp-score-val">{customerDetails?.cp_bureau_score || '—'}</span>
            <span className="ucp-score-edge">900</span>
          </div>
          <div className="ucp-legend">
            {LEGEND.map((l, i) => (
              <div key={i} className="ucp-legend-row">
                <div className="ucp-legend-dot" style={{ background: l.color }} />
                <span className="ucp-legend-label">{l.label}</span>
                <span className="ucp-legend-range">{l.range}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
