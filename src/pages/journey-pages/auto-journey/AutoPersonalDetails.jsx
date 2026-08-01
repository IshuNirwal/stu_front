import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateCustomerDetails, updateJourneyEvents } from "../../../CustomerJourneyDetails/CustomerJourneyDetails";
import { getPersonalDetail } from "../../../Utils/api";
import { useNavigate } from "react-router-dom";
import MobileNav from "../../../components/MobileNav";
import JourneyRightPanel from "../../../components/JourneyRightPannel";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

  .pd-page * { box-sizing: border-box; margin: 0; padding: 0; }

  .pd-page {
    min-height: 100vh;
    background: #eaf1fd;
    display: flex;
    flex-direction: column;
    font-family: 'Sora', sans-serif;
  }

    /* SELFIE SECTION */
    .pd-selfie-wrap {
      display: flex;
      gap: 1.25rem;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .pd-selfie-preview {
      width: 130px;
      height: 160px;
      flex-shrink: 0;
      border-radius: 16px;
      border: 1.5px solid #dce4f0;
      background: #f7f9fc;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .pd-selfie-preview img,
    .pd-selfie-preview video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .pd-selfie-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: #9aaabb;
    }

    .pd-selfie-placeholder svg {
      width: 32px;
      height: 32px;
    }

    .pd-selfie-placeholder span {
      font-size: 11px;
      text-align: center;
    }

    .pd-selfie-controls {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      min-width: 160px;
    }

    .pd-selfie-tip {
      font-size: 12px;
      color: #6b7a90;
      line-height: 1.5;
      background: #f7f9fc;
      border: 1px solid #e8eef7;
      border-radius: 10px;
      padding: 10px 12px;
    }

    .pd-selfie-tip strong {
      color: #0f1c2e;
      display: block;
      margin-bottom: 4px;
      font-size: 12px;
    }

    /* BUTTONS */
    .pd-btn {
      height: 40px;
      border: none;
      border-radius: 10px;
      font-family: 'Sora', sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      transition: background 0.15s, transform 0.1s;
    }

    .pd-btn-primary {
      background: #0f1c2e;
      color: #fff;
    }

    .pd-btn-primary:hover {
      background: #1a2f4a;
    }

    .pd-btn-orange {
      background: #F97316;
      color: #fff;
      box-shadow: 0 3px 12px rgba(249,115,22,0.28);
    }

    .pd-btn-orange:hover {
      background: #ea6a0a;
    }

    .pd-btn-outline {
      background: transparent;
      border: 1.5px solid #dce4f0;
      color: #4a5568;
    }

    .pd-btn-outline:hover {
      border-color: #b8cce8;
      background: #f7f9fc;
    }

    /* CAMERA LIVE */
    .pd-camera-live {
      width: 130px;
      height: 160px;
      flex-shrink: 0;
      border-radius: 16px;
      overflow: hidden;
      border: 2px solid #F97316;
      position: relative;
    }

    .pd-camera-live video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .pd-camera-pulse {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #F97316;
      animation: pdPulse 1.2s ease infinite;
    }

    @keyframes pdPulse {
      0%,100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: .5;
        transform: scale(1.3);
      }
    }

    /* MOBILE */
    @media (max-width: 480px) {
      .pd-selfie-wrap {
        flex-direction: column;
        align-items: center;
      }

      .pd-selfie-controls {
        width: 100%;
      }
    }

  .pd-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex: 1;
    min-height: calc(100vh - 60px);
    margin-top: 50px;
  }

  /* ── LEFT ── */
  .pd-left {
    display: flex;
    flex-direction: column;
    padding: 2rem 2.5rem;
    background: #eaf1fd;
    overflow-y: auto;
  }

  .pd-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 1.5rem; flex-shrink: 0;
  }
  .pd-logo-dot {
    width: 34px; height: 34px; background: #F97316;
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
  }
  .pd-logo-dot svg { width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; }
  .pd-logo-name { font-size: 16px; font-weight: 600; color: #0f1c2e; letter-spacing: -0.2px; }

  .pd-card {
    background: #fff;
    border-radius: 24px;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 4px 40px rgba(15,28,46,0.08), 0 1px 4px rgba(15,28,46,0.04);
    border: 1px solid rgba(255,255,255,0.8);
  }

  .pd-card-title {
    font-size: 22px; font-weight: 700;
    color: #0f1c2e; letter-spacing: -0.5px; margin-bottom: 3px;
  }
  .pd-card-sub { font-size: 13px; color: #6b7a90; margin-bottom: 2rem; }

  /* SECTION */
  .pd-section { margin-bottom: 1.75rem; }
  .pd-section-title {
    font-size: 11px; font-weight: 600; letter-spacing: 0.7px;
    text-transform: uppercase; color: #9aaabb;
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 8px;
  }
  .pd-section-title::after { content: ''; flex: 1; height: 1px; background: #e8eef7; }

  /* GRID ROW */
  .pd-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }
  .pd-row.three { grid-template-columns: 1fr 1fr 1fr; }

  /* FIELD LABEL */
  .pd-field-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase; color: #6b7a90;
    margin-bottom: 5px; display: block;
  }
  .pd-field-label .req { color: #F97316; }

  /* RADIO BUTTONS */
  .pd-radio-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .pd-radio-btn {
    display: flex; align-items: center; gap: 7px;
    padding: 9px 14px;
    border: 1.5px solid #dce4f0;
    border-radius: 10px;
    background: #f7f9fc;
    cursor: pointer;
    font-family: 'Sora', sans-serif;
    font-size: 13px; font-weight: 500; color: #4a5568;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
    user-select: none;
  }
  .pd-radio-btn:hover { border-color: #b8cce8; background: #fff; }
  .pd-radio-btn.active {
    border-color: #F97316;
    background: rgba(249,115,22,0.06);
    color: #F97316;
  }
  .pd-radio-dot {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid #c8d3e2;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: border-color 0.15s;
  }
  .pd-radio-btn.active .pd-radio-dot { border-color: #F97316; }
  .pd-radio-dot-inner {
    width: 6px; height: 6px; border-radius: 50%;
    background: #F97316; opacity: 0; transition: opacity 0.15s;
  }
  .pd-radio-btn.active .pd-radio-dot-inner { opacity: 1; }

  /* INPUTS */
  .pd-input-wrap { position: relative; }
  .pd-input-icon {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    color: #9aaabb; pointer-events: none;
    display: flex; align-items: center;
  }
  .pd-input-icon svg { width: 16px; height: 16px; }
  .pd-input {
    width: 100%; height: 46px;
    border: 1.5px solid #dce4f0; border-radius: 12px;
    background: #f7f9fc;
    padding: 0 14px 0 38px;
    font-family: 'Sora', sans-serif;
    font-size: 14px; font-weight: 400; color: #0f1c2e;
    outline: none;
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
  }
  .pd-input.no-icon { padding-left: 14px; }
  .pd-input::placeholder { color: #adb8ca; }
  .pd-input:focus {
    border-color: #378ADD; background: #fff;
    box-shadow: 0 0 0 3px rgba(55,138,221,0.14);
  }
  .pd-input.pd-err { border-color: #E24B4A; background: #fff9f9; box-shadow: 0 0 0 3px rgba(226,75,74,0.1); }
  .pd-input.readonly {
    background: #f0f4fa; color: #6b7a90; cursor: not-allowed;
  }
  .pd-input.readonly:focus { border-color: #dce4f0; box-shadow: none; }

  /* READONLY BADGE */
  .pd-readonly-badge {
    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    background: #e8eef7; border-radius: 5px;
    padding: 2px 7px; font-size: 10px; color: #9aaabb; font-weight: 500;
  }

  /* ERROR */
  .pd-error-msg {
    display: flex; align-items: center; gap: 5px;
    font-size: 12px; color: #E24B4A; margin-top: 6px;
  }
  .pd-error-msg svg { width: 13px; height: 13px; flex-shrink: 0; }

  /* CTA */
  .pd-cta {
    width: 100%; height: 50px;
    border: none; border-radius: 14px;
    background: #F97316; color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 15px; font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.18s, transform 0.1s, box-shadow 0.18s;
    box-shadow: 0 4px 18px rgba(249,115,22,0.32);
    margin-top: 1.25rem;
  }
  .pd-cta:hover:not(:disabled) {
    background: #ea6a0a;
    box-shadow: 0 6px 24px rgba(249,115,22,0.42);
    transform: translateY(-1px);
  }
  .pd-cta:active:not(:disabled) { transform: scale(0.98); }
  .pd-cta:disabled { background: #c8d3e2; box-shadow: none; cursor: not-allowed; }

  /* TRUST */
  .pd-trust {
    display: flex; align-items: center; justify-content: center;
    gap: 6px; margin-top: 1.25rem;
    font-size: 11.5px; color: #9aaabb;
  }
  .pd-trust svg { width: 13px; height: 13px; }
  .pd-trust-sep { width: 3px; height: 3px; background: #c8d3e2; border-radius: 50%; margin: 0 2px; }

  /* SPOUSE CARD */
  .pd-spouse-card {
    background: rgba(249,115,22,0.04);
    border: 1px solid rgba(249,115,22,0.18);
    border-radius: 16px; padding: 1.25rem 1.5rem;
    margin-top: -0.5rem; margin-bottom: 1.75rem;
  }
  .pd-spouse-title {
    font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase; color: #F97316;
    margin-bottom: 1rem;
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .pd-split { grid-template-columns: 1fr; }
    .pd-left { padding: 2rem 1.25rem 6rem; }
    .pd-logo { margin-bottom: 1.5rem; }
    .pd-card { padding: 1.75rem 1.5rem; }
    .pd-row { grid-template-columns: 1fr; }
    .pd-row.three { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 480px) {
    .pd-card { padding: 1.5rem 1.25rem; }
    .pd-row.three { grid-template-columns: 1fr; }
    .pd-radio-group { gap: 6px; }
  }
`;

// ── Icons ──
const IconBolt = () => (
  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13.5 19.79 19.79 0 0 1 1 4.82 2 2 0 0 1 2.98 2.63h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18"/>
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconCity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="18"/><path d="M16 8h4l3 5v6h-7V8z"/><line x1="5" y1="8" x2="5" y2="8"/><line x1="10" y1="8" x2="10" y2="8"/><line x1="5" y1="12" x2="5" y2="12"/><line x1="10" y1="12" x2="10" y2="12"/>
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconLandmark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

// Sub-components
const RadioBtn = ({ label, value, selected, onChange }) => (
  <div
    className={`pd-radio-btn ${selected == value ? 'active' : ''}`}
    onClick={() => onChange(value)}
    role="radio" aria-checked={selected == value}
    tabIndex={0} onKeyDown={e => e.key === 'Enter' && onChange(value)}
  >
    <span className="pd-radio-dot"><span className="pd-radio-dot-inner" /></span>
    {label}
  </div>
);

const ErrMsg = ({ msg }) => msg ? (
  <p className="pd-error-msg"><IconAlert />{msg}</p>
) : null;

const InputField = ({ label, required, icon, value, onChange, placeholder, readOnly, type = "text", hasError }) => (
  <div>
    <label className="pd-field-label">
      {label} {required && <span className="req">*</span>}
    </label>
    <div className="pd-input-wrap">
      {icon && <span className="pd-input-icon">{icon}</span>}
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`pd-input ${!icon ? 'no-icon' : ''} ${readOnly ? 'readonly' : ''} ${hasError ? 'pd-err' : ''}`}
      />
      {readOnly && <span className="pd-readonly-badge">auto</span>}
    </div>
  </div>
);

export default function AutoPersonalDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const [loader, setLoader] = useState(false);

  const [maritalStatus, setMaritalStatus] = useState();
  const [workMode, setWorkMode] = useState();
  const [spousename, setSpousename] = useState('');
  const [spousecontact, setSpousecontact] = useState('');
  const [addressline1, setAddressline1] = useState('');
  const [addressline2, setAddressline2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [resType, setResType] = useState();
  const [errors, setErrors] = useState({});
  const [referenceName, setReferenceName] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [referenceRelation, setReferenceRelation] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selfieFile, setSelfieFile] = useState(null);

  const openCamera = async () => {
    try {
      setIsCameraOpen(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 720 },
          height: { ideal: 1280 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        videoRef.current.setAttribute("webkit-playsinline", true);
      }
    } catch {
      toast.error("Unable to access camera.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    setIsCameraOpen(false);
  };

  const captureSelfie = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        const file = new File([blob], "selfie.jpg", {
          type: "image/jpeg",
        });

        setSelfieFile(file);
        stopCamera();
      },
      "image/jpeg",
      0.9
    );
  };

  useEffect(() => {
  return () => {
    getCurrentLocation();
    const stream = videoRef.current?.srcObject;

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };
}, []);



  useEffect(() => {
  if (customerDetails) {
    setResType(String(customerDetails.residence_type_id));
    setMaritalStatus(customerDetails.marital_status_id);
    setAddressline1(customerDetails.residence_address_1);
    setAddressline2(customerDetails.residence_address_2);
    setLandmark(customerDetails.residence_landmark);
    setWorkMode(customerDetails?.income_type_id);

    setReferenceName(customerDetails?.reference_name || '');
    setReferenceNumber(customerDetails?.reference_number || '');
    setReferenceRelation(customerDetails?.reference_relation || '');
  }
}, [customerDetails]);

const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("LAT LONG:", latitude, longitude);
      },
      (error) => {
        console.error(error);

        if (error.code === 3) {
          toast.error("Unable to fetch location. Please check GPS / Wi-Fi");
        } else if (error.code === 1) {
          toast.error("Location permission denied");
        } else {
          toast.error("Location unavailable");
        }
      },
      {
        enableHighAccuracy: false,   // 🔥 KEY FIX
        timeout: 20000,              // increase timeout
        maximumAge: 30000,           // allow cached location
      }
    );

  };

  const validation = () => {
  const newErrors = {};

  if (!maritalStatus)
    newErrors.maritalStatus = 'Please select marital status.';

  if (maritalStatus == 2 && !spousename.trim())
    newErrors.spousename = 'Spouse name is required.';

  if (
    maritalStatus == 2 &&
    spousecontact &&
    !/^[0-9]{10}$/.test(spousecontact)
  ) {
    newErrors.spousecontact = 'Enter a valid 10-digit number.';
  }

  if (!addressline1?.trim())
    newErrors.addressline1 = 'Address line 1 is required.';

  if (!addressline2?.trim())
    newErrors.addressline2 = 'Address line 2 is required.';

  if (!referenceName.trim())
    newErrors.referenceName = 'Reference name is required.';

  if (!referenceNumber.trim())
    newErrors.referenceNumber = 'Reference number is required.';
  else if (!/^[0-9]{10}$/.test(referenceNumber))
    newErrors.referenceNumber = 'Enter a valid 10-digit number.';

  if (!referenceRelation.trim())
    newErrors.referenceRelation = 'Reference relation is required.';

  if (!selfieFile) {
    newErrors.selfie = "Please capture a selfie.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const submit = async () => {
    if (!validation()) return;
     if (!location.latitude || !location.longitude) {
        toast.error("Please allow location access");
        setLoader(false);
        return;
      }
    const param = {
      profileId: customerDetails?.profileId,
      maritalStatus: parseInt(maritalStatus),
      residenceAddress1: addressline1,
      residenceAddress2: addressline2,
      residenceType: resType,
      spouseName: spousename || null,
      spouseMobile: spousecontact || null,
      residenceLandmark: landmark,
      workMode: workMode, 
       // Location
      latitude: location?.latitude,
      longitude: location?.longitude,
      referenceName: referenceName,
      referenceNumber: referenceNumber,
      referenceRelation: referenceRelation,
    };
    try {
      setLoader(true);
      const response = await getPersonalDetail(param);
      if (response?.data?.apiStatus === 1) {
        toast.success(response?.data?.message);
       
        dispatch(
          updateCustomerDetails({
            residence_type_id: resType,
            marital_status_id: maritalStatus,
            residence_address_1: addressline1,
            residence_address_2: addressline2,
            residenceLandmark: landmark,
            spouse_name: spousename,

            reference_name: referenceName,
            reference_number: referenceNumber,
            reference_relation: referenceRelation,
          })
        );
        dispatch(updateJourneyEvents({ personal_details: 1, upload_documents: 2 }));
      } else {
        toast.error(response?.data?.message);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pd-page">
        <div className="pd-split">

          {/* ── LEFT: FORM ── */}
          <div className="pd-left">
            

            <div className="pd-card">
              <h1 className="pd-card-title">Personal details</h1>
              <p className="pd-card-sub">Enter your details to move ahead with your application.</p>

              {/* ── PERSONAL INFO ── */}
              <div className="pd-section">
                <div className="pd-section-title">Personal info</div>
                <div className="pd-row">
                  <div>
                    <label className="pd-field-label">
                      Marital status <span className="req">*</span>
                    </label>
                    <div className="pd-radio-group">
                      <RadioBtn label="Single" value="1" selected={maritalStatus} onChange={v => { setMaritalStatus(v); setErrors(e => ({...e, maritalStatus: ''})); }} />
                      <RadioBtn label="Married" value="2" selected={maritalStatus} onChange={v => { setMaritalStatus(v); setErrors(e => ({...e, maritalStatus: ''})); }} />
                    </div>
                    <ErrMsg msg={errors.maritalStatus} />
                  </div>

                  <div>
                    <label className="pd-field-label">Work mode</label>
                    <div className="pd-radio-group">
                      <RadioBtn label="Work from office" value={1} selected={workMode} onChange={v => setWorkMode(v)} />
                      <RadioBtn label="Work from home" value={3} selected={workMode} onChange={v => setWorkMode(v)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── SPOUSE (conditional) ── */}
              {maritalStatus == 2 && (
                <div className="pd-spouse-card">
                  <div className="pd-spouse-title">Spouse details</div>
                  <div className="pd-row">
                    <div>
                      <InputField
                        label="Spouse name" required
                        icon={<IconUser />}
                        value={spousename}
                        onChange={e => { setSpousename(e.target.value); setErrors(err => ({...err, spousename: ''})); }}
                        placeholder="Full name"
                        hasError={!!errors.spousename}
                      />
                      <ErrMsg msg={errors.spousename} />
                    </div>
                    <div>
                      <InputField
                        label="Spouse contact"
                        icon={<IconPhone />}
                        value={spousecontact}
                        onChange={e => {
                          const val = e.target.value;
                          if (/^\d{0,10}$/.test(val)) {
                            setSpousecontact(val);
                            setErrors(err => ({...err, spousecontact: ''}));
                          }
                        }}
                        placeholder="10-digit number"
                        type="text"
                        hasError={!!errors.spousecontact}
                      />
                      <ErrMsg msg={errors.spousecontact} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── REFERENCE DETAILS ── */}
              <div className="pd-section">
                <div className="pd-section-title">Reference details</div>

                <div
                  className="pd-row"
                  style={{ marginBottom: "1.25rem" }}
                >
                  <div>
                    <InputField
                      label="Reference Name"
                      required
                      icon={<IconUser />}
                      value={referenceName}
                      onChange={(e) => {
                        setReferenceName(e.target.value);
                        setErrors((err) => ({
                          ...err,
                          referenceName: "",
                        }));
                      }}
                      placeholder="Enter reference name"
                      hasError={!!errors.referenceName}
                    />
                    <ErrMsg msg={errors.referenceName} />
                  </div>

                  <div>
                    <InputField
                      label="Reference Number"
                      required
                      icon={<IconPhone />}
                      value={referenceNumber}
                      onChange={(e) => {
                        const val = e.target.value;

                        if (/^\d{0,10}$/.test(val)) {
                          setReferenceNumber(val);
                          setErrors((err) => ({
                            ...err,
                            referenceNumber: "",
                          }));
                        }
                      }}
                      placeholder="10-digit mobile number"
                      hasError={!!errors.referenceNumber}
                    />
                    <ErrMsg msg={errors.referenceNumber} />
                  </div>
                </div>

                <div className="pd-row">
                  <div>
                    <select
                      className="pd-input no-icon"
                      value={referenceRelation}
                      onChange={(e) => setReferenceRelation(e.target.value)}
                    >
                      <option value="1">Parents</option>
                      <option value="2">Relative</option>
                      <option value="3">Friends</option>
                      <option value="4">Colleague</option>
                      <option value="6">Sibling</option>
                      <option value="5">Other</option>
                    </select>
                    <ErrMsg msg={errors.referenceRelation} />
                  </div>
                </div>
              </div>

              {/* ── ADDRESS ── */}
              <div className="pd-section">
                <div className="pd-section-title">Current address</div>
                <div className="pd-row" style={{ marginBottom: '1.25rem' }}>
                  <div>
                    <InputField
                      label="Flat / House no." required
                      icon={<IconHome />}
                      value={addressline1}
                      onChange={e => { setAddressline1(e.target.value); setErrors(err => ({...err, addressline1: ''})); }}
                      placeholder="e.g. Flat 4B, Tower 2"
                      hasError={!!errors.addressline1}
                    />
                    <ErrMsg msg={errors.addressline1} />
                  </div>
                  <div>
                    <InputField
                      label="Full address" required
                      icon={<IconPin />}
                      value={addressline2}
                      onChange={e => { setAddressline2(e.target.value); setErrors(err => ({...err, addressline2: ''})); }}
                      placeholder="Street, locality, area"
                      hasError={!!errors.addressline2}
                    />
                    <ErrMsg msg={errors.addressline2} />
                  </div>
                </div>

                <div className="pd-row" style={{ marginBottom: '1.25rem' }}>
                  <InputField
                    label="Landmark"
                    icon={<IconLandmark />}
                    value={landmark}
                    onChange={e => setLandmark(e.target.value)}
                    placeholder="Nearby landmark"
                  />
                  <InputField
                    label="Pincode" required
                    icon={<IconPin />}
                    value={customerDetails?.residence_pincode}
                    readOnly
                  />
                </div>

                <div className="pd-row">
                  <InputField
                    label="City"
                    icon={<IconCity />}
                    value={customerDetails?.residence_city_name}
                    readOnly
                  />
                  <InputField
                    label="State" required
                    icon={<IconCity />}
                    value={customerDetails?.residence_state_name}
                    readOnly
                  />
                </div>
              </div>
              <div className="pd-section">
                <div className="pd-section-title">Live selfie</div>

                <div className="pd-selfie-wrap">

                  {isCameraOpen ? (
                    <div className="pd-camera-live">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                      />
                      <div className="pd-camera-pulse" />
                    </div>
                  ) : (
                    <div className="pd-selfie-preview">
                      {selfieFile ? (
                        <img
                          src={URL.createObjectURL(selfieFile)}
                          alt="Selfie"
                        />
                      ) : (
                        <div className="pd-selfie-placeholder">
                          <IconUser />
                          <span>No selfie yet</span>
                        </div>
                      )}
                    </div>
                  )}

                  <canvas
                    ref={canvasRef}
                    style={{ display: "none" }}
                  />

                  <div className="pd-selfie-controls">

                    <div className="pd-selfie-tip">
                      <strong>📸 Selfie tips</strong>
                      Face the camera directly, ensure good lighting and remove
                      glasses if possible.
                    </div>

                    {!isCameraOpen ? (
                      <button
                        type="button"
                        className="pd-btn pd-btn-primary"
                        onClick={openCamera}
                      >
                        {selfieFile ? "Retake Selfie" : "Open Camera"}
                      </button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <button
                          type="button"
                          className="pd-btn pd-btn-orange"
                          onClick={captureSelfie}
                        >
                          Capture Selfie
                        </button>

                        <button
                          type="button"
                          className="pd-btn pd-btn-outline"
                          onClick={stopCamera}
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
              <ErrMsg msg={errors.selfie} />

              {/* CTA */}
              <button className="pd-cta" onClick={submit} disabled={loader}>
                {loader ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    Please wait…
                  </>
                ) : (
                  <>Continue </>
                )}
              </button>

              <div className="pd-trust">
                <IconLock />
                256-bit SSL encrypted
                <span className="pd-trust-sep" />
                Your data is private
                <span className="pd-trust-sep" />
                RBI compliant
              </div>
            </div>
          </div>

          {/* ── RIGHT: reusable component ── */}
          <JourneyRightPanel />

        </div>
      </div>
      <MobileNav />
    </>
  );
}