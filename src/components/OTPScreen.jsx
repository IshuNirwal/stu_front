import React, { useRef, useState, useEffect } from 'react';
import ConnectUs from './ConnectUs';
import { otpVerify, resendOtp } from '../Utils/api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails } from '../CustomerJourneyDetails/CustomerJourneyDetails';
import { useNavigate } from 'react-router-dom';



export default function OTPScreen() {
  const cname = process.env.REACT_APP_COMPANY_N;
  const [digits, setDigits] = useState(new Array(4).fill(''));
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const click_Id = useSelector((state) => state.customerJourneyDetails.click_id);
  const utm_source = customerDetails?.utm_source;

  const hideNo = customerDetails?.mobile
    ? '*'.repeat(customerDetails.mobile.length - 4) + customerDetails.mobile.slice(-4)
    : '';

  /* ── Timer ── */
  useEffect(() => {
    if (timeLeft === 0) { setCanResend(true); return; }
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const startTimer = () => { setTimeLeft(30); setCanResend(false); };

  /* ── OTP input handling ── */
  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length > 1) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setError('');

    if (value && index < 3) inputsRef.current[index + 1].focus();
    if (newDigits.every((d) => d !== '')) handleOtp(newDigits.join(''));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Enter' && !isVerifying) { e.preventDefault(); handleOtp(); }
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /* ── Verify OTP ── */
  const handleOtp = async (otpValueParam = null) => {
    if (isVerifying) return;
    const otpValue = otpValueParam || digits.join('');
    if (otpValue.length < 4) { setError('Please enter all 4 digits of the OTP.'); return; }

    setIsVerifying(true);
    const param = {
      profileId: customerDetails?.profileId,
      mobile: customerDetails?.mobile,
      otp: otpValue,
    };

    try {
      const response = await otpVerify(param);
      if (response?.data?.apiStatus === 1) {

        if (utm_source == 'Valueleaf') {
          const url = `https://pixel.whistleloop.com/pixel?click_id=${click_Id}&revenue='revenue'&goal_name=OTP_Verified`;
          fetch(url).catch(() => {});
        }
        const formatPhone = (m) => m?.startsWith('+') ? m : `+91${m}`;

        toast.success('OTP verified successfully');
        setError('');
        dispatch(updateCustomerDetails({ token: response?.data?.data?.token }));

        if (response?.data?.data?.journeyCompletedFlag === 1) {
          dispatch(updateCustomerDetails({ journeyCompletedFlag: 1 }));
          window.location.href = '/journey/dashboard';
        } else {
          navigate('/journey');
        }
      } else {
        setError('The OTP you entered is incorrect. Please try again.');
      }
    } catch (err) {
      console.error('OTP Verification Failed', err);
      setError('Something went wrong during verification. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  /* ── Resend OTP ── */
  const handleResendOtp = async () => {
    try {
      const response = await resendOtp({ mobile: customerDetails?.mobile });
      if (response?.data?.apiStatus === 1) toast.success(response?.data?.message);
      else toast.error(response?.data?.message || 'Failed to resend OTP');
    } catch (err) {
      console.error(err);
      toast.error('Error resending OTP');
    } finally {
      startTimer();
    }
  };

  return (
    <>
      <style>{`
        .otpv2 {
          width: 100%;
          max-width: 480px;
          border-radius: 24px;
          padding: 2rem 2rem 1.6rem;
          background: rgba(10, 34, 44, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            0 24px 60px rgba(8, 26, 34, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .otpv2 *, .otpv2 *::before, .otpv2 *::after { box-sizing: border-box; }

        .otpv2-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.3rem;
        }
        .otpv2-title {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.2px;
        }
        .otpv2-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.72);
        }
        .otpv2-badge svg { color: var(--accent, #ffb300); }

        .otpv2-sub {
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.66);
          margin: 0 0 1.25rem;
        }

        /* Mobile number row */
        .otpv2-mob-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 12px;
          padding: 11px 14px;
          margin-bottom: 1.4rem;
        }
        .otpv2-mob-num {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #ffffff;
          font-variant-numeric: tabular-nums;
        }
        .otpv2-edit-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--accent, #ffb300);
          font-size: 13px;
          font-weight: 700;
          font-family: inherit;
          padding: 0;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .otpv2-edit-btn:hover { text-decoration: underline; }

        /* OTP digits */
        .otpv2-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 9px;
        }
        .otpv2-digits {
          display: flex;
          gap: 12px;
          margin-bottom: 8px;
        }
        .otpv2-digit {
          flex: 1;
          min-width: 0;
          max-width: 72px;
          height: 64px;
          border-radius: 15px;
          border: 2px solid transparent;
          background: #ffffff;
          text-align: center;
          font-size: 26px;
          font-weight: 800;
          color: #1f4a5c;
          outline: none;
          font-family: 'Sora', sans-serif;
          font-variant-numeric: tabular-nums;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
          caret-color: var(--accent, #ffb300);
        }
        .otpv2-digit:focus {
          border-color: var(--accent, #ffb300);
          box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
        }
        .otpv2-digit.filled {
          border-color: var(--logo-teal, #1a9b9b);
          background: #f0fbfa;
        }
        .otpv2-digit.err {
          border-color: #ff6b5e;
          background: #fff4f2;
        }

        .otpv2-error {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 13px;
          color: #ffb4a8;
          margin: 4px 0 0;
        }

        /* Verify CTA — same amber gradient as login */
        .otpv2-cta {
          width: 100%;
          height: 54px;
          margin-top: 16px;
          border: none;
          border-radius: 15px;
          background: linear-gradient(180deg, #ffc233 0%, var(--accent, #ffb300) 60%);
          color: #241a00;
          font-family: 'Sora', sans-serif;
          font-size: 15.5px;
          font-weight: 800;
          letter-spacing: 0.3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          transition: filter 0.18s, transform 0.1s, box-shadow 0.18s;
          box-shadow: 0 8px 24px rgba(255, 179, 0, 0.35);
        }
        .otpv2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
        .otpv2-cta:active:not(:disabled) { transform: translateY(0); }
        .otpv2-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
        .otpv2-cta:disabled {
          background: rgba(255, 179, 0, 0.35);
          color: rgba(36, 26, 0, 0.55);
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Timer / resend */
        .otpv2-resend-block {
          margin-top: 1.35rem;
          padding-top: 1.15rem;
          border-top: 1px solid rgba(255, 255, 255, 0.13);
        }
        .otpv2-timer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }
        .otpv2-timer-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.66);
        }
        .otpv2-timer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          font-variant-numeric: tabular-nums;
        }
        .otpv2-timer-count {
          color: var(--accent, #ffb300);
          font-weight: 800;
        }
        .otpv2-resend-btn {
          background: transparent;
          border: 1.5px solid var(--accent, #ffb300);
          color: var(--accent, #ffb300);
          border-radius: 10px;
          padding: 9px 20px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.15s, color 0.15s;
        }
        .otpv2-resend-btn:hover {
          background: var(--accent, #ffb300);
          color: #241a00;
        }
        .otpv2-resend-btn:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }

        /* Warning */
        .otpv2-warn {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 12.5px;
          line-height: 1.55;
          color: #ffe1a3;
          background: rgba(255, 179, 0, 0.1);
          border: 1px solid rgba(255, 179, 0, 0.28);
          border-radius: 12px;
          padding: 10px 13px;
          margin-top: 1.1rem;
        }
        .otpv2-warn svg {
          flex-shrink: 0;
          margin-top: 1px;
          color: var(--accent, #ffb300);
        }

        @media (max-width: 480px) {
          .otpv2 {
            padding: 1.5rem 1.15rem 1.25rem;
            border-radius: 20px;
          }
          .otpv2-digits { gap: 9px; }
          .otpv2-digit { height: 58px; font-size: 23px; border-radius: 13px; }
          .otpv2-cta { height: 52px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .otpv2 * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="otpv2">
        {/* Header row */}
        <div className="otpv2-top">
          <p className="otpv2-title">Verify your number</p>
          <span className="otpv2-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            OTP sent
          </span>
        </div>

        <p className="otpv2-sub">We've sent a 4-digit OTP to your registered mobile number.</p>

        {/* Mobile number row */}
        <div className="otpv2-mob-row">
          <span className="otpv2-mob-num">+91 {hideNo}</span>
          <button className="otpv2-edit-btn" onClick={() => window.location.reload()}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            Change
          </button>
        </div>

        {/* OTP inputs */}
        <p className="otpv2-label">Enter 4-digit OTP</p>
        <div className="otpv2-digits">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`otpv2-digit${error ? ' err' : digit ? ' filled' : ''}`}
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        {error && (
          <p className="otpv2-error">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {error}
          </p>
        )}

        {/* Verify button */}
        <button
          className="otpv2-cta"
          onClick={() => handleOtp(digits.join(''))}
          disabled={isVerifying}
        >
          {isVerifying ? 'Verifying…' : 'Verify OTP'}
          {!isVerifying && (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        {/* Timer / Resend */}
        <div className="otpv2-resend-block">
          {!canResend ? (
            <div className="otpv2-timer-row">
              <span className="otpv2-timer-text">Didn't receive the OTP?</span>
              <span className="otpv2-timer-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Resend in <span className="otpv2-timer-count">{timeLeft}s</span>
              </span>
            </div>
          ) : (
            <button className="otpv2-resend-btn" onClick={handleResendOtp}>
              Resend OTP
            </button>
          )}
        </div>

        {/* Warning */}
        <div className="otpv2-warn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Never share your OTP with anyone. We will never ask for it.</span>
        </div>
      </div>
    </>
  );
}