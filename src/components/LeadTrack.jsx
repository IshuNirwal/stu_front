import React from 'react';
import { useSelector } from 'react-redux';

/*
  LeadTrack (v2) — application tracker on the glass theme
  ───────────────────────────────────────────────────────
  Amber done-nodes + connectors, teal-glow current node,
  frosted upcoming nodes. Sits inside a db-card (glass).
  Status logic (findLastIndex over flags) unchanged.
*/

const steps = [
  { key: 'application_submitted_flag', label: 'Submitted', short: 'Submitted' },
  { key: 'application_in_review_flag', label: 'In Review', short: 'In Review' },
  { key: 'sanction_flag', label: 'Sanctioned', short: 'Sanction' },
  { key: 'e_sign_flag', label: 'E-Sign', short: 'E-Sign' },
  { key: 'disbursed_flag', label: 'Disbursed', short: 'Disbursed' },
];

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconDot = () => (
  <svg viewBox="0 0 24 24" style={{ width: 8, height: 8 }}>
    <circle cx="12" cy="12" r="8" fill="currentColor"/>
  </svg>
);

const trackStyles = `
  .lt-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    margin-bottom: 1.25rem;
  }

  .lt-steps {
    display: flex; align-items: flex-start; gap: 0;
    position: relative; overflow-x: auto; padding-bottom: 4px;
  }
  .lt-step {
    display: flex; flex-direction: column; align-items: center;
    flex: 1; min-width: 60px; position: relative;
  }
  /* connector line */
  .lt-step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 14px; left: 50%;
    width: 100%; height: 2px;
    background: rgba(255,255,255,0.16);
    z-index: 0;
    transition: background 0.3s;
  }
  .lt-step.done:not(:last-child)::after {
    background: var(--accent, #ffb300);
  }

  .lt-node {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid rgba(255,255,255,0.24);
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.35);
    position: relative; z-index: 1;
    transition: all 0.25s;
    flex-shrink: 0;
  }
  .lt-step.done .lt-node {
    background: var(--accent, #ffb300);
    border-color: var(--accent, #ffb300);
    color: #241a00;
  }
  .lt-step.current .lt-node {
    background: rgba(10, 34, 44, 0.9);
    border-color: var(--accent, #ffb300);
    color: var(--accent, #ffb300);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.2);
  }
  .lt-label {
    font-size: 10.5px; font-weight: 500;
    color: rgba(255,255,255,0.45);
    margin-top: 7px; text-align: center; line-height: 1.3;
    white-space: nowrap;
  }
  .lt-step.done .lt-label { color: #ffffff; font-weight: 600; }
  .lt-step.current .lt-label { color: var(--accent, #ffb300); font-weight: 700; }
`;

export default function LeadTrack() {
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);

  const completedIndex = steps.findLastIndex(step => customerDetails?.[step.key] === 1);

  return (
    <div className="db-card">
      <style>{trackStyles}</style>
      <div className="db-section-title">Application tracker</div>
      <div className="lt-sub">Track your current application status in real time.</div>

      <div className="lt-steps">
        {steps.map((step, i) => {
          const isDone = i <= completedIndex;
          const isCurrent = i === completedIndex + 1;
          return (
            <div key={step.key} className={`lt-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="lt-node">
                {isDone ? <IconCheck /> : <IconDot />}
              </div>
              <div className="lt-label">{step.short}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}