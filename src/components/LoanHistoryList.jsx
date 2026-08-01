import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLeadList } from '../Utils/api';
import { Link, useNavigate } from 'react-router-dom';

const lhStyles = `
  .lh-table-wrap { overflow-x: auto; margin-top: 4px; }
  .lh-table { width: 100%; border-collapse: collapse; min-width: 680px; }
  .lh-thead th {
    font-size: 10.5px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.5px; color: #9aaabb;
    padding: 10px 14px; text-align: left;
    background: #f7f9fc; border-bottom: 1px solid #e8eef7;
  }
  .lh-thead th:first-child { border-radius: 10px 0 0 10px; }
  .lh-thead th:last-child { border-radius: 0 10px 10px 0; }
  .lh-row { border-bottom: 1px solid #f0f4fa; transition: background 0.12s; }
  .lh-row:last-child { border-bottom: none; }
  .lh-row:hover { background: #fafcff; }
  .lh-td { padding: 12px 14px; font-size: 13px; color: #2d3748; vertical-align: middle; }
  .lh-lead-id { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 500; color: #6b7a90; }
  .lh-amount { font-weight: 700; color: #0f1c2e; font-size: 14px; }
  .lh-dl-btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(55,138,221,0.1); color: #378ADD;
    border: none; cursor: pointer; transition: background 0.12s;
    margin-right: 4px; text-decoration: none;
  }
  .lh-dl-btn:hover { background: rgba(55,138,221,0.2); }
  .lh-dl-btn svg { width: 14px; height: 14px; }
  .lh-view-btn {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 5px 12px; border-radius: 8px;
    background: rgba(15,28,46,0.07); color: #0f1c2e;
    border: none; cursor: pointer; font-family: 'Sora', sans-serif;
    font-size: 12px; font-weight: 600; transition: background 0.12s;
  }
  .lh-view-btn:hover { background: rgba(15,28,46,0.12); }
  .lh-view-btn svg { width: 13px; height: 13px; }
  .lh-empty {
    text-align: center; padding: 2.5rem 1rem;
    color: #9aaabb; font-size: 14px;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .lh-empty svg { width: 40px; height: 40px; opacity: 0.4; }
`;

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconHistory = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
  </svg>
);

export default function LoanHistoryList() {
  const [leadData, setLeadData] = useState([]);
  const [showLoanHistory, setLoanHistory] = useState(false);
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLeadList({ profileId: customerDetails?.profileId, pancard: customerDetails?.pancard });
        if (response?.data?.status === 1) {
          const d = response?.data?.data || [];
          setLeadData(d);
          setLoanHistory(d.length > 0);
        }
      } catch (error) { console.error('Error generating lead:', error); }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  const handleCardClick = (leadId) => navigate("/journey/loan-detail", { state: { leadId } });

  const dlLinks = (item) => [
    { url: item?.sanction_letter, title: 'Sanction Letter' },
    { url: item?.disbursal_letter, title: 'Disbursal Letter' },
    { url: item?.noc_closing_letter, title: 'NOC Closing' },
    { url: item?.noc_settlement_letter, title: 'Settlement' },
  ].filter(l => l.url);

  return (
    <div className="db-card">
      <style>{lhStyles}</style>
      <div className="db-section-title">Loan history</div>

      {!showLoanHistory ? (
        <div className="lh-empty">
          <IconHistory />
          No loan history found
        </div>
      ) : (
        <div className="lh-table-wrap">
          <table className="lh-table">
            <thead className="lh-thead">
              <tr>
                <th>Loan ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Applied date</th>
                <th>Documents</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leadData.map((item) => (
                <tr key={item.id} className="lh-row">
                  <td className="lh-td"><span className="lh-lead-id">#{item.lead_id || '—'}</span></td>
                  <td className="lh-td"><span className="lh-amount">₹{item.loan_recommended || '—'}</span></td>
                  <td className="lh-td">
                    <span className="db-badge blue">{item.app_status || '—'}</span>
                  </td>
                  <td className="lh-td" style={{ color: '#6b7a90', fontSize: 12 }}>{formatDate(item.lead_entry_date)}</td>
                  <td className="lh-td">
                    {dlLinks(item).length > 0
                      ? dlLinks(item).map((l, i) => (
                        <Link key={i} target="_blank" to={l.url} className="lh-dl-btn" title={l.title}>
                          <IconDownload />
                        </Link>
                      ))
                      : <span style={{ fontSize: 12, color: '#c8d3e2' }}>None</span>
                    }
                  </td>
                  <td className="lh-td">
                    <button className="lh-view-btn" onClick={() => handleCardClick(item.lead_id)}>
                      <IconEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
