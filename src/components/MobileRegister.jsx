import React, { useEffect, useState } from 'react';
import icon from '../assets/indian-flag.png';
import { login } from '../Utils/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPScreen from './OTPScreen';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerDetails, updateClickId } from '../CustomerJourneyDetails/CustomerJourneyDetails';
import { Link } from 'react-router-dom';



export default function MobileRegister() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAgreed1, setIsAgreed1] = useState(true);
  const [isAgreed2, setIsAgreed2] = useState(true);
  const [agreeError1, setAgreeError1] = useState('');
  const [agreeError2, setAgreeError2] = useState('');
  const [otpScreen, setOtpScreen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();
  useSelector((state) => state.customerJourneyDetails.customerDetails);

  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
      click_id: params.get('click_id') || '',
    };
  };

  useEffect(() => {
    const { click_id } = getUtmParams();
    if (click_id) dispatch(updateClickId(click_id));
  }, [dispatch]);

  const validateMobile = (number) => {
    if (!number) return 'Please enter your mobile number';
    if (!/^[6-9]\d{9}$/.test(number)) return 'Please enter a valid 10-digit Indian mobile number';
    return '';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); sendOTP(); }
  };

  const sendOTP = async (mobile = mobileNumber) => {
    if (isVerifying) return;

    let hasError = false;
    if (!isAgreed1) { setAgreeError1('Please accept the Terms & Conditions.'); hasError = true; }
    else setAgreeError1('');
    if (!isAgreed2) { setAgreeError2('Please consent to receive notifications.'); hasError = true; }
    else setAgreeError2('');
    if (hasError) return;

    const validationError = validateMobile(mobile);
    if (validationError) { setErrorMessage(validationError); return; }

    setErrorMessage('');
    setIsVerifying(true);

    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content, click_id } = getUtmParams();
    const param = {
      utmSource: utm_source,
      utmMedium: utm_medium,
      utmCampaign: utm_campaign,
      utmTerm: utm_term,
      utmClickId: click_id,
      utm_content,
      mobile,
      sourceId: 1,
    };

    try {
      const response = await login(param);
      if (response?.data?.apiStatus === 1) {
        toast.success(response?.data?.message || 'OTP sent successfully');
        dispatch(updateCustomerDetails({ profileId: response?.data?.data?.profileId, mobile, utm_source }));
        setOtpScreen(true);
      } else {
        setErrorMessage(response?.data?.message || 'Login failed. Please check your number and try again.');
      }
    } catch (error) {
      console.error('Login Failed:', error);
      setErrorMessage('Login failed. Please check your number and try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (otpScreen) return <OTPScreen />;

  return (
    <>
      <style>{`
        .mrv2 {
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
        }

        .mrv2-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.4rem;
        }
        .mrv2-title {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0.2px;
        }
        .mrv2-secure {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.72);
        }
        .mrv2-secure svg { color: var(--accent, #ffb300); }

        .mrv2-label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .mrv2-label {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
        }
        .mrv2-counter {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.45);
          font-variant-numeric: tabular-nums;
        }

        /* Input — solid white field on the glass */
        .mrv2-input-row {
          display: flex;
          align-items: center;
          height: 58px;
          border-radius: 15px;
          background: #ffffff;
          border: 2px solid transparent;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .mrv2-input-row.focused {
          border-color: var(--accent, #ffb300);
          box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.22);
        }
        .mrv2-flag {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 14px;
          height: 100%;
          border-right: 1px solid rgba(31, 74, 92, 0.14);
          background: #f1f6f8;
          flex-shrink: 0;
        }
        .mrv2-flag img {
          width: 22px;
          height: 16px;
          border-radius: 2px;
          object-fit: cover;
          display: block;
        }
        .mrv2-flag span {
          font-size: 14px;
          font-weight: 700;
          color: #1f4a5c;
        }
        .mrv2-input {
          flex: 1;
          min-width: 0;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          padding: 0 16px;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #1f4a5c;
          font-family: inherit;
          font-variant-numeric: tabular-nums;
        }
        .mrv2-input::placeholder {
          color: #9db3bc;
          font-weight: 400;
          letter-spacing: 0.3px;
        }

        /* Full-width amber CTA */
        .mrv2-cta {
          width: 100%;
          height: 54px;
          margin-top: 14px;
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
        .mrv2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
        .mrv2-cta:active:not(:disabled) { transform: translateY(0); }
        .mrv2-cta:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
        .mrv2-cta:disabled {
          background: rgba(255, 179, 0, 0.35);
          color: rgba(36, 26, 0, 0.55);
          cursor: not-allowed;
          box-shadow: none;
        }

        .mrv2-error {
          font-size: 13px;
          color: #ffb4a8;
          margin: 9px 0 0;
        }

        .mrv2-consents {
          margin-top: 1.35rem;
          padding-top: 1.15rem;
          border-top: 1px solid rgba(255, 255, 255, 0.13);
        }
        .mrv2-check-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 9px;
        }
        .mrv2-checkbox {
          width: 15px;
          height: 15px;
          margin-top: 2px;
          flex-shrink: 0;
          accent-color: var(--accent, #ffb300);
          cursor: pointer;
        }
        .mrv2-check-text {
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.66);
        }
        .mrv2-check-link {
          color: var(--accent, #ffb300);
          font-weight: 600;
          text-decoration: none;
        }
        .mrv2-check-link:hover { text-decoration: underline; }
        .mrv2-check-error {
          font-size: 12px;
          color: #ffb4a8;
          margin: 2px 0 7px 25px;
        }

        @media (max-width: 480px) {
          .mrv2 {
            padding: 1.5rem 1.15rem 1.25rem;
            border-radius: 20px;
          }
          .mrv2-input-row { height: 54px; }
          .mrv2-cta { height: 52px; }
        }
      `}</style>

      <div className="mrv2">
        <div className="mrv2-top">
          <p className="mrv2-title">Login with mobile</p>
          <span className="mrv2-secure">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            256-bit secure
          </span>
        </div>

        <div className="mrv2-label-row">
          <span className="mrv2-label">Mobile number</span>
          <span className="mrv2-counter">{mobileNumber.length}/10</span>
        </div>

        <div className={`mrv2-input-row${isFocused ? ' focused' : ''}`}>
          <div className="mrv2-flag">
            <img src={icon} alt="India" />
            <span>+91</span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            maxLength="10"
            placeholder="10-digit mobile number"
            value={mobileNumber}
            className="mrv2-input"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setMobileNumber(value);
              setErrorMessage('');
            }}
          />
        </div>

        {errorMessage && <p className="mrv2-error">{errorMessage}</p>}

        <button
          className="mrv2-cta"
          onClick={() => sendOTP(mobileNumber)}
          disabled={isVerifying}
        >
          {isVerifying ? 'Sending OTP…' : 'Get OTP'}
          {!isVerifying && (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>

        <div className="mrv2-consents">
          {/* Checkbox 1 */}
          <div className="mrv2-check-row">
            <input
              type="checkbox"
              checked={isAgreed1}
              className="mrv2-checkbox"
              onChange={(e) => { setIsAgreed1(e.target.checked); setAgreeError1(''); }}
            />
            <span className="mrv2-check-text">
              I agree to the{' '}
              <Link to="/terms-and-conditions" target="_blank" className="mrv2-check-link">Terms &amp; Conditions</Link>
              {' '}and{' '}
              <Link to="/privacy-policy" target="_blank" className="mrv2-check-link">Privacy Policy</Link>.
            </span>
          </div>
          {agreeError1 && <p className="mrv2-check-error">{agreeError1}</p>}

          {/* Checkbox 2 */}
          <div className="mrv2-check-row">
            <input
              type="checkbox"
              checked={isAgreed2}
              className="mrv2-checkbox"
              onChange={(e) => { setIsAgreed2(e.target.checked); setAgreeError2(''); }}
            />
            <span className="mrv2-check-text">
              I agree to receive Messages, Emails, RCS, SMS, Calls, and WhatsApp
              communications, along with updates to my mobile number or email.
            </span>
          </div>
          {agreeError2 && <p className="mrv2-check-error">{agreeError2}</p>}
        </div>
      </div>
    </>
  );
}