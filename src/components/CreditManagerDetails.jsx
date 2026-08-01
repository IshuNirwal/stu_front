// ─────────────────────────────────────────────
// CreditManagerDetails.jsx
// ─────────────────────────────────────────────
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13.5 19.79 19.79 0 0 1 1 4.82 2 2 0 0 1 2.98 2.63h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export function CreditManagerDetails() {
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const cm = customerDetails?.credit_manager_details;

  return (
    <div className="db-card">
      <div className="db-section-title">Your credit manager</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {[
          { icon: <IconUser />, label: 'Manager name', val: cm?.managerName },
          { icon: <IconPhone />, label: 'Contact no.', val: cm?.managerMobile },
          { icon: <IconMail />, label: 'Mail ID', val: cm?.managerEmail?.toLowerCase() },
        ].map((item, i) => (
          <div key={i} style={{ padding: '12px 14px', background: '#f7f9fc', borderRadius: 12, border: '1px solid #e8eef7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              {item.icon}
              <span className="db-field-label" style={{ margin: 0 }}>{item.label}</span>
            </div>
            <div className="db-field-val">{item.val || '—'}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6b7a90' }}>
        Application status:
        <span className="db-badge blue">{customerDetails?.applicationStatus || '—'}</span>
      </div>
    </div>
  );
}

export default CreditManagerDetails;


// ─────────────────────────────────────────────
// DisplayOnCondition.jsx  (same file for brevity, export as named)
// ─────────────────────────────────────────────
// export separately in your project


const IconExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export function DisplayOnCondition() {
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);

  const buttons = [
    { flag: customerDetails?.show_ekyc_btn_flag === 1, url: customerDetails?.ekyc_url, text: customerDetails?.show_ekyc_btn_text, style: 'orange' },
    { flag: customerDetails?.show_esign_btn_flag === 1, url: customerDetails?.esign_url, text: customerDetails?.show_esign_btn_text, style: 'dark' },
    { flag: customerDetails?.show_sanction_letter_btn_flag === 1, url: customerDetails?.sanction_letter_url, text: customerDetails?.show_sanction_letter_btn_text, style: 'outline' },
  ].filter(b => b.flag);

  if (!buttons.length) return null;

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {buttons.map((btn, i) => (
        <Link key={i} to={btn.url} target="_blank" className={`db-btn db-btn-${btn.style}`}>
          {btn.text} <IconExternalLink />
        </Link>
      ))}
    </div>
  );
}
