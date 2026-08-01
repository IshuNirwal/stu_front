import React from 'react';
import { Link, useLocation } from 'react-router-dom';



const styles = `
  .mn-nav {
    display: none;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 999;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid rgba(31, 74, 92, 0.12);
    box-shadow: 0 -4px 20px rgba(31, 74, 92, 0.12);
    padding: 8px 0 max(8px, env(safe-area-inset-bottom));
    font-family: 'Sora', sans-serif;
  }

  .mn-inner {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .mn-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 6px 16px;
    border-radius: 12px;
    text-decoration: none;
    transition: background 0.15s;
    flex: 1;
    min-width: 0;
    position: relative;
  }
  .mn-tab:hover { text-decoration: none; }
  .mn-tab:active .mn-icon-wrap {
    background: rgba(26, 155, 155, 0.12);
  }

  .mn-icon-wrap {
    width: 36px; height: 36px;
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.15s;
  }
  .mn-icon-wrap svg {
    width: 20px; height: 20px;
    fill: none; stroke: #6f8b98;
    stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
    transition: stroke 0.15s;
  }

  .mn-tab.active .mn-icon-wrap {
    background: rgba(255, 179, 0, 0.16);
    transform: translateY(-2px);
  }
  .mn-tab.active .mn-icon-wrap svg { stroke: #b57e00; }

  .mn-label {
    font-size: 10px; font-weight: 500;
    color: #6f8b98; letter-spacing: 0.2px;
    transition: color 0.15s;
    white-space: nowrap;
  }
  .mn-tab.active .mn-label { color: #1f4a5c; font-weight: 700; }

  /* active dot indicator */
  .mn-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #ffb300;
    position: absolute; bottom: 2px;
    opacity: 0; transition: opacity 0.15s;
  }
  .mn-tab.active .mn-dot { opacity: 1; }

  /* ONLY show on mobile */
  @media (max-width: 768px) {
    .mn-nav { display: block; }
  }

  @media (prefers-reduced-motion: reduce) {
    .mn-nav * { transition: none !important; }
  }
`;

const IconDashboard = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const IconProfile = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconHistory = () => (
  <svg viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
    <polyline points="12 7 12 12 15 14"/>
  </svg>
);
const IconSupport = () => (
  <svg viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const TABS = [
  { id: 'dashboard', label: 'Dashboard', Icon: IconDashboard, path: '/journey/dashboard' },
  { id: 'profile',   label: 'Profile',   Icon: IconProfile,   path: '/journey/user-profile' },
  { id: 'history',   label: 'History',   Icon: IconHistory,   path: '/journey/loan-history' },
  { id: 'contact',   label: 'Support',   Icon: IconSupport,   path: '/journey/support-detail' },
];

export default function MobileNav() {
  const { pathname } = useLocation();

  return (
    <>
      <style>{styles}</style>
      <nav className="mn-nav" aria-label="Mobile navigation">
        <div className="mn-inner">
          {TABS.map(({ id, label, Icon, path }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={id}
                to={path}
                className={`mn-tab ${isActive ? 'active' : ''}`}
                aria-label={label}
              >
                <div className="mn-icon-wrap">
                  <Icon />
                </div>
                <span className="mn-label">{label}</span>
                <div className="mn-dot" />
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}