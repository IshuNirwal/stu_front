import React from 'react';
import { useSelector } from 'react-redux';

const IconRupee = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <line x1="6" y1="4" x2="18" y2="4"/><line x1="6" y1="9" x2="18" y2="9"/>
    <path d="M6 14l8 6"/><path d="M6 9a6 6 0 0 1 6 6"/>
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const alStyles = `
  .al-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .al-item {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid transparent;
  }
  .al-item.blue { background: rgba(55,138,221,0.07); border-color: rgba(55,138,221,0.15); }
  .al-item.orange { background: rgba(249,115,22,0.07); border-color: rgba(249,115,22,0.15); }
  .al-item.green { background: rgba(52,211,153,0.07); border-color: rgba(52,211,153,0.15); }
  .al-item.purple { background: rgba(139,92,246,0.07); border-color: rgba(139,92,246,0.15); }

  .al-icon {
    width: 34px; height: 34px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .al-item.blue .al-icon { background: rgba(55,138,221,0.15); color: #378ADD; }
  .al-item.orange .al-icon { background: rgba(249,115,22,0.15); color: #F97316; }
  .al-item.green .al-icon { background: rgba(52,211,153,0.15); color: #34d399; }
  .al-item.purple .al-icon { background: rgba(139,92,246,0.15); color: #8b5cf6; }

  .al-label { font-size: 10.5px; color: #9aaabb; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 3px; }
  .al-val { font-size: 15px; font-weight: 700; letter-spacing: -0.3px; }

  @media (max-width: 480px) { .al-grid { grid-template-columns: 1fr; } }
`;

export default function ActiveLoanRequest() {
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  const items = [
    { icon: <IconRupee />, label: 'Applied amount', val: `₹${customerDetails?.loan_amount || '—'}`, color: 'blue' },
    { icon: <IconTarget />, label: 'Purpose', val: customerDetails?.purpose || '—', color: 'orange' },
    { icon: <IconClock />, label: 'Tenure period', val: customerDetails?.tenure ? `${customerDetails.tenure} Days` : '—', color: 'green' },
    { icon: <IconCalendar />, label: 'Applied date', val: formatDate(customerDetails?.lead_entry_date), color: 'purple' },
  ];

  return (
    <div className="db-card">
      <style>{alStyles}</style>
      <div className="db-section-title">Current loan request</div>
      <div className="al-grid">
        {items.map((item, i) => (
          <div key={i} className={`al-item ${item.color}`}>
            <div className="al-icon">{item.icon}</div>
            <div>
              <div className="al-label">{item.label}</div>
              <div className="al-val">{item.val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
