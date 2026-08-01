import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const IconExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

export default function DisplayOnCondition() {
  const customerDetails = useSelector((state) => state?.customerJourneyDetails?.customerDetails);

  const buttons = [
    {
      flag: customerDetails?.show_ekyc_btn_flag === 1,
      url: customerDetails?.ekyc_url,
      text: customerDetails?.show_ekyc_btn_text,
      style: 'db-btn-orange',
    },
    {
      flag: customerDetails?.show_esign_btn_flag === 1,
      url: customerDetails?.esign_url,
      text: customerDetails?.show_esign_btn_text,
      style: 'db-btn-dark',
    },
    {
      flag: customerDetails?.show_sanction_letter_btn_flag === 1,
      url: customerDetails?.sanction_letter_url,
      text: customerDetails?.show_sanction_letter_btn_text,
      style: 'db-btn-outline',
    },
  ].filter((b) => b.flag);

  if (!buttons.length) return null;

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {buttons.map((btn, i) => (
        <Link key={i} to={btn.url} target="_blank" className={`db-btn ${btn.style}`}>
          {btn.text} <IconExternalLink />
        </Link>
      ))}
    </div>
  );
}
