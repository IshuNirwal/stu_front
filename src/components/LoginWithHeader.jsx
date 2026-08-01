import React, { useEffect, useState, useRef } from 'react'
import RegisterUser from './RegisterUser'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.webp'
// import scanner from '../assets/sot-andorid-scanner.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import LogoutModal from './LogoutModal'
import SocialIcon from './SocialIcon'

/*
  LoginWithHeader (v2.1) — white nav, theme accents
  ─────────────────────────────────────────────────
  White frosted nav bar over the gradient pages, with the brand
  palette on accents: amber avatar, teal hovers, navy text. The
  "Talk to expert" drawer stays dark (navy gradient panel) with
  the amber contact card and teal trust pill.
  All dropdown / drawer / logout / journey logic is unchanged.
*/

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

  .lwh2-nav *, .lwh2-drawer *, .lwh2-dropdown * {
    box-sizing: border-box; margin: 0; padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  /* ── NAV BAR ── */
  .lwh2-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    height: 64px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(31, 74, 92, 0.12);
    box-shadow: 0 1px 14px rgba(31, 74, 92, 0.08);
    display: flex; align-items: center;
    padding: 0 2rem;
    gap: 1rem;
  }

  /* LOGO */
  .lwh2-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
  .lwh2-logo img {
    height: 34px; width: auto; object-fit: contain;
  }

  .lwh2-spacer { flex: 1; }

  /* ── DESKTOP ACTIONS ── */
  .lwh2-actions { display: flex; align-items: center; gap: 10px; }

  /* TALK TO EXPERT BUTTON */
  .lwh2-expert-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 16px; border-radius: 11px;
    border: 1.5px solid rgba(31, 74, 92, 0.18);
    background: #f2f8f9;
    color: #1f4a5c; font-size: 13px; font-weight: 600;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    white-space: nowrap;
  }
  .lwh2-expert-btn:hover {
    border-color: rgba(26, 155, 155, 0.5);
    background: #ffffff;
  }
  .lwh2-expert-btn svg { width: 15px; height: 15px; color: var(--accent, #ffb300); flex-shrink: 0; }

  /* PROFILE BUTTON */
  .lwh2-profile-wrap { position: relative; }
  .lwh2-profile-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 12px 6px 6px; border-radius: 12px;
    border: 1.5px solid rgba(31, 74, 92, 0.18);
    background: #ffffff;
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .lwh2-profile-btn:hover {
    border-color: rgba(26, 155, 155, 0.5);
    box-shadow: 0 2px 10px rgba(31, 74, 92, 0.1);
  }
  .lwh2-avatar {
    width: 30px; height: 30px; border-radius: 9px;
    background: linear-gradient(180deg, #ffc233, #ffb300);
    color: #241a00;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; flex-shrink: 0;
    overflow: hidden;
  }
  .lwh2-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .lwh2-profile-name {
    font-size: 13px; font-weight: 600; color: #1f4a5c;
    max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .lwh2-chevron { width: 15px; height: 15px; color: #6f8b98; transition: transform 0.2s; flex-shrink: 0; }
  .lwh2-profile-btn.open .lwh2-chevron { transform: rotate(180deg); }

  /* DROPDOWN */
  .lwh2-dropdown {
    position: absolute; top: calc(100% + 10px); right: 0;
    width: 230px;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid rgba(31, 74, 92, 0.14);
    box-shadow: 0 12px 40px rgba(31, 74, 92, 0.18);
    overflow: hidden;
    animation: lwh2-drop-in 0.18s ease both;
    z-index: 100;
  }
  @keyframes lwh2-drop-in {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .lwh2-drop-header {
    padding: 14px 16px 12px;
    background: #f2f8f9;
    border-bottom: 1px solid rgba(31, 74, 92, 0.1);
  }
  .lwh2-drop-initials {
    width: 38px; height: 38px; border-radius: 11px;
    background: linear-gradient(180deg, #ffc233, #ffb300);
    color: #241a00;
    font-size: 16px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 8px;
  }
  .lwh2-drop-name { font-size: 13px; font-weight: 700; color: #1f4a5c; }
  .lwh2-drop-sub {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; color: #1a9b9b; font-weight: 600; margin-top: 3px;
  }
  .lwh2-drop-sub::before { content: '●'; font-size: 6px; }
  .lwh2-drop-item {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 16px; font-size: 13px; font-weight: 500;
    color: #2e6279;
    text-decoration: none; transition: background 0.12s, color 0.12s;
    cursor: pointer; border: none; background: transparent; width: 100%;
    text-align: left;
  }
  .lwh2-drop-item:hover {
    background: #f2f8f9;
    color: #1f4a5c; text-decoration: none;
  }
  .lwh2-drop-item svg { width: 16px; height: 16px; flex-shrink: 0; }
  .lwh2-drop-item.danger { color: #d92d20; }
  .lwh2-drop-item.danger:hover { background: rgba(217, 45, 32, 0.06); color: #b42318; }
  .lwh2-drop-divider { height: 1px; background: rgba(31, 74, 92, 0.1); margin: 0; }

  /* ── DRAWER ── */
  .lwh2-drawer-overlay {
    position: fixed; inset: 0;
    background: rgba(4, 16, 22, 0.55);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: 1000; opacity: 0;
    animation: lwh2-fade-in 0.2s ease forwards;
  }
  @keyframes lwh2-fade-in { to { opacity: 1; } }
  .lwh2-drawer {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 340px; max-width: 100vw;
    background: linear-gradient(180deg, #0e2a37 0%, #123b47 100%);
    border-left: 1px solid rgba(255,255,255,0.14);
    z-index: 1001;
    display: flex; flex-direction: column;
    box-shadow: -12px 0 48px rgba(4, 16, 22, 0.6);
    animation: lwh2-slide-in 0.25s cubic-bezier(0.4,0,0.2,1) both;
    color: #ffffff;
  }
  @keyframes lwh2-slide-in {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  .lwh2-drawer-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    flex-shrink: 0;
  }
  .lwh2-drawer-title {
    font-family: 'Sora', sans-serif;
    font-size: 16px; font-weight: 700; color: #ffffff;
  }
  .lwh2-drawer-close {
    width: 32px; height: 32px; border-radius: 9px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.07);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.7);
    transition: background 0.12s;
  }
  .lwh2-drawer-close:hover { background: rgba(255,255,255,0.14); color: #ffffff; }
  .lwh2-drawer-close svg { width: 16px; height: 16px; }
  .lwh2-drawer-body {
    flex: 1; overflow-y: auto; padding: 1.5rem;
    display: flex; flex-direction: column; gap: 1.25rem;
  }

  /* Contact card — amber tinted */
  .lwh2-contact-card {
    background: rgba(255, 179, 0, 0.09);
    border: 1px solid rgba(255, 179, 0, 0.28);
    border-radius: 16px;
    padding: 1.25rem 1.4rem;
    position: relative; overflow: hidden;
  }
  .lwh2-contact-blob {
    position: absolute; width: 150px; height: 150px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,179,0,0.22) 0%, transparent 70%);
    bottom: -40px; right: -30px; pointer-events: none;
  }
  .lwh2-contact-inner { position: relative; z-index: 1; }
  .lwh2-contact-title {
    font-family: 'Sora', sans-serif;
    font-size: 14.5px; font-weight: 700; color: #ffffff; margin-bottom: 4px;
  }
  .lwh2-contact-sub {
    font-size: 12px; color: rgba(255,255,255,0.62);
    margin-bottom: 1rem; line-height: 1.55;
  }
  .lwh2-contact-row {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 14px; border-radius: 11px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.14);
    color: #ffffff; font-size: 13px; font-weight: 600;
    text-decoration: none; margin-bottom: 8px;
    transition: background 0.12s, border-color 0.12s;
  }
  .lwh2-contact-row:hover {
    background: rgba(255,255,255,0.14);
    border-color: rgba(255,255,255,0.28);
    color: #ffffff; text-decoration: none;
  }
  .lwh2-contact-row:last-child { margin-bottom: 0; }
  .lwh2-contact-row svg { width: 15px; height: 15px; color: var(--accent, #ffb300); flex-shrink: 0; }

  /* Scanner card */
  .lwh2-scanner-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 14px;
    padding: 1.25rem;
    text-align: center;
  }
  .lwh2-scanner-title {
    font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85);
    margin-bottom: 10px;
  }
  .lwh2-scanner-img {
    width: 90px; height: 90px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    background: #ffffff;
    object-fit: cover; margin: 0 auto; display: block;
  }

  /* Trust pill */
  .lwh2-trust-pill {
    display: flex; align-items: center; gap: 8px;
    background: rgba(63, 212, 196, 0.1);
    border: 1px solid rgba(63, 212, 196, 0.28);
    border-radius: 11px;
    padding: 10px 14px;
    font-size: 12px; color: rgba(255,255,255,0.8);
    font-weight: 500; line-height: 1.55;
  }
  .lwh2-trust-pill svg { width: 16px; height: 16px; flex-shrink: 0; }
  .lwh2-trust-pill strong { color: #3fd4c4; }

  /* ── MOBILE MENU BUTTON ── */
  .lwh2-mobile-menu {
    display: none;
    align-items: center; gap: 8px;
    padding: 6px 12px 6px 6px;
    border: 1.5px solid rgba(31, 74, 92, 0.18);
    border-radius: 12px;
    background: #ffffff;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px; font-weight: 600; color: #1f4a5c;
  }
  .lwh2-mobile-avatar {
    width: 28px; height: 28px; border-radius: 8px;
    background: linear-gradient(180deg, #ffc233, #ffb300);
    color: #241a00;
    font-size: 12px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
  }
  .lwh2-mobile-menu svg { width: 14px; height: 14px; color: #6f8b98; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .lwh2-nav { padding: 0 1rem; }
    .lwh2-actions { display: none; }
    .lwh2-mobile-menu { display: flex; }
  }
  @media (min-width: 769px) {
    .lwh2-mobile-menu { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .lwh2-nav *, .lwh2-drawer, .lwh2-drawer-overlay, .lwh2-dropdown {
      animation: none !important; transition: none !important;
    }
  }
`;

// ── Icons ──
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13.5 19.79 19.79 0 0 1 1 4.82 2 2 0 0 1 2.98 2.63h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18"/>
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lwh2-chevron">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconVerified = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#3fd4c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export default function LoginWithHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dropOpen, setDropOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [journeyComplete, setJourneyComplete] = useState();
  const dropRef = useRef(null);
  const mobileDropRef = useRef(null);

  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const { loan_quote, personal_details, upload_documents } = useSelector(
    (state) => state?.customerJourneyDetails?.journeySteps
  );

  useEffect(() => {
    if (loan_quote === 1 && personal_details === 1 && upload_documents === 1) {
      setJourneyComplete(1);
    }
    if (customerDetails) setName(customerDetails.full_name);
  }, [customerDetails]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
      if (mobileDropRef.current && !mobileDropRef.current.contains(e.target)) setMobileDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    window.clevertap?.event.push("lje_logout", { "message": "User logged out" });
    dispatch({ type: "LOGOUT" });
    navigate('/apply-now');
  };
  const handleLogoutClick = () => { setShowLogoutModal(true); setDropOpen(false); setMobileDropOpen(false); };
  const confirmLogout = () => { setShowLogoutModal(false); handleLogout(); };

  const initials = name
    ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  const displayName = (name && name.toUpperCase() !== 'NULL') ? name : 'User';
  const firstName = displayName.split(' ')[0];

  return (
    <>
      <style>{navStyles}</style>

      <nav className="lwh2-nav">
        {/* LOGO */}
        <Link to="/" className="lwh2-logo">
          <img src={logo} alt="Logo" />
        </Link>

        <div className="lwh2-spacer" />

        {/* ── DESKTOP ── */}
        <div className="lwh2-actions">
          <RegisterUser />

          {/* Talk to expert */}
          <button className="lwh2-expert-btn" onClick={() => setDrawerOpen(true)}>
            <IconPhone /> Talk to expert
          </button>

          {/* Profile dropdown */}
          <div className="lwh2-profile-wrap" ref={dropRef}>
            <button
              className={`lwh2-profile-btn ${dropOpen ? 'open' : ''}`}
              onClick={() => setDropOpen(v => !v)}
            >
              <div className="lwh2-avatar">
                {customerDetails?.profile_pic
                  ? <img src={customerDetails.profile_pic} alt="profile" onError={e => e.target.style.display = 'none'} />
                  : initials
                }
              </div>
              <span className="lwh2-profile-name">Hi, {firstName}</span>
              <IconChevron />
            </button>

            {dropOpen && (
              <div className="lwh2-dropdown">
                <div className="lwh2-drop-header">
                  <div className="lwh2-drop-initials">{initials}</div>
                  <div className="lwh2-drop-name">{displayName}</div>
                  <div className="lwh2-drop-sub">Verified account</div>
                </div>

                {/* {journeyComplete == 1 && ( */}
                  <Link to="/journey/dashboard" className="lwh2-drop-item" onClick={() => setDropOpen(false)}>
                    <IconDashboard /> Dashboard
                  </Link>
                {/* )} */}

                <div className="lwh2-drop-divider" />

                <button className="lwh2-drop-item danger" onClick={handleLogoutClick}>
                  <IconLogout /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div className="lwh2-profile-wrap" ref={mobileDropRef} style={{ position: 'relative' }}>
          <button className="lwh2-mobile-menu" onClick={() => setMobileDropOpen(v => !v)}>
            <div className="lwh2-mobile-avatar">{initials}</div>
            {firstName}
            <IconChevron />
          </button>

          {mobileDropOpen && (
            <div className="lwh2-dropdown">
              <div className="lwh2-drop-header">
                <div className="lwh2-drop-initials">{initials}</div>
                <div className="lwh2-drop-name">{displayName}</div>
              </div>
              {journeyComplete == 1 && (
                <Link to="/journey/dashboard" className="lwh2-drop-item" onClick={() => setMobileDropOpen(false)}>
                  <IconDashboard /> Dashboard
                </Link>
              )}
              <button className="lwh2-drop-item" onClick={() => { setMobileDropOpen(false); setDrawerOpen(true); }}>
                <IconPhone /> Talk to expert
              </button>
              <div className="lwh2-drop-divider" />
              <button className="lwh2-drop-item danger" onClick={handleLogoutClick}>
                <IconLogout /> Sign out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── TALK TO EXPERT DRAWER ── */}
      {drawerOpen && (
        <>
          <div className="lwh2-drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="lwh2-drawer">
            <div className="lwh2-drawer-header">
              <span className="lwh2-drawer-title">Talk to an expert</span>
              <button className="lwh2-drawer-close" onClick={() => setDrawerOpen(false)}>
                <IconX />
              </button>
            </div>

            <div className="lwh2-drawer-body">
              {/* Contact card */}
              <div className="lwh2-contact-card">
                <div className="lwh2-contact-blob" />
                <div className="lwh2-contact-inner">
                  <div className="lwh2-contact-title">We're here to help</div>
                  <div className="lwh2-contact-sub">
                    Our advisors are available 7 days a week, 9:30 am – 11:30 pm to assist you with the best offers or resolve any queries.
                  </div>
                  <a href="tel:+919355753537" className="lwh2-contact-row">
                    <IconPhone /> +91 9355753537
                  </a>
                  <a href="mailto:customercare@salarytopup.com" className="lwh2-contact-row">
                    <IconMail /> customercare@salarytopup.com
                  </a>
                </div>
              </div>

              {/* Social icons */}
              <SocialIcon />

              {/* QR scanner */}
              <div className="lwh2-scanner-card">
                <div className="lwh2-scanner-title">Scan to install the salarytopup app</div>
                {/* <img src={scanner} alt="App QR Code" className="lwh2-scanner-img" /> */}
              </div>

              {/* Trust pill */}
              <div className="lwh2-trust-pill">
                <IconVerified />
                <span>Your details are <strong>100% secure</strong> with us. We are an RBI-registered NBFC.</span>
              </div>
            </div>
          </div>
        </>
      )}

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
}