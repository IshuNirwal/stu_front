/* global fbq */
/* global gtag */

import { useState, useRef, useEffect } from "react";
import { getDocsUpload, getRequiredDocs } from "../../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateJourneyEvents } from "../../CustomerJourneyDetails/CustomerJourneyDetails";
import { useNavigate } from "react-router-dom";
import MobileNav from "../../components/MobileNav";
import pdfFile from '../../assets/pdf-file.png';
import JourneyRightPanel from "../../components/JourneyRightPannel";

/*
  UploadDocument (v2) — gradient glass theme
  ──────────────────────────────────────────
  Matches the rest of the journey: navy→teal gradient + dot grid,
  heading outside the card (amber numbered eyebrow), dark glass
  console. Doc rows as glass tiles (teal when uploaded), amber
  progress bar, frosted selfie preview with amber live-camera ring,
  amber CTA, trust chips.
  All upload / camera / doc-fetch logic and flow are unchanged.
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

  .udv2 * { box-sizing: border-box; margin: 0; padding: 0; }

  .udv2 {
    --navy-dark: #1f4a5c;
    --navy: #2e6279;
    --teal: #1a9b9b;
    --accent: #ffb300;
    --accent-dark: #e8a300;

    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:
      radial-gradient(1000px 480px at 85% -10%, rgba(255, 255, 255, 0.14), transparent 60%),
      linear-gradient(120deg, var(--navy-dark) 0%, var(--navy) 46%, var(--teal) 100%);
    background-attachment: fixed;
  }
  .udv2::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 55%);
    pointer-events: none;
  }

  .udv2-main {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    align-items: start;
    gap: clamp(2rem, 4.5vw, 4rem);
    padding: clamp(4.5rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 3rem) 3rem;
    min-height: 100vh;
  }
  .udv2-right-col {
    position: sticky;
    top: 5rem;
  }

  /* ── Heading ── */
  .udv2-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 13px;
  }
  .udv2-eyebrow-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: var(--accent);
    color: #241a00;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0;
  }
  .udv2-h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .udv2-lede {
    font-size: 14.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.72);
    max-width: 52ch;
    margin-bottom: 1.75rem;
  }

  /* ── Glass console ── */
  .udv2-card {
    width: 100%;
    border-radius: 24px;
    padding: 1.85rem 1.85rem 1.5rem;
    background: rgba(10, 34, 44, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow:
      0 24px 60px rgba(8, 26, 34, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  .udv2-section { margin-bottom: 1.6rem; }
  .udv2-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1rem;
  }
  .udv2-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.13);
  }

  /* ── Progress ── */
  .udv2-progress-wrap { margin-bottom: 1.5rem; }
  .udv2-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 7px;
  }
  .udv2-progress-label {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
  }
  .udv2-progress-count {
    font-size: 13px;
    font-weight: 700;
    color: var(--accent);
    font-variant-numeric: tabular-nums;
  }
  .udv2-progress-track {
    height: 6px;
    background: rgba(255,255,255,0.14);
    border-radius: 99px;
    overflow: hidden;
  }
  .udv2-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #ffc233, var(--accent));
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  /* ── Doc rows ── */
  .udv2-doc-list { display: flex; flex-direction: column; gap: 9px; }
  .udv2-doc-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: rgba(255,255,255,0.06);
    border: 1.5px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    position: relative;
    overflow: hidden;
  }
  .udv2-doc-item:hover {
    border-color: rgba(255,255,255,0.32);
    background: rgba(255,255,255,0.1);
  }
  .udv2-doc-item.uploaded {
    border-color: rgba(63, 212, 196, 0.55);
    background: rgba(63, 212, 196, 0.09);
    cursor: default;
  }

  .udv2-doc-thumb {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.16);
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .udv2-doc-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .udv2-doc-thumb svg { width: 20px; height: 20px; stroke: rgba(255,255,255,0.5); }

  .udv2-doc-info { flex: 1; min-width: 0; }
  .udv2-doc-name {
    font-size: 13.5px;
    font-weight: 600;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 2px;
  }
  .udv2-doc-hint {
    font-size: 11.5px;
    color: rgba(255,255,255,0.5);
  }
  .udv2-doc-filename {
    font-size: 11.5px;
    color: #3fd4c4;
    font-weight: 600;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  .udv2-doc-action {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .udv2-doc-item:not(.uploaded) .udv2-doc-action {
    background: rgba(255, 179, 0, 0.16);
    border: 1px solid rgba(255, 179, 0, 0.28);
  }
  .udv2-doc-item.uploaded .udv2-doc-action {
    background: rgba(63, 212, 196, 0.14);
    border: 1px solid rgba(63, 212, 196, 0.3);
  }
  .udv2-doc-action svg { width: 15px; height: 15px; }
  .udv2-doc-item:not(.uploaded) .udv2-doc-action svg { stroke: var(--accent); }
  .udv2-doc-item.uploaded .udv2-doc-action svg { stroke: #3fd4c4; }

  /* ── Selfie ── */
  .udv2-selfie-wrap {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .udv2-selfie-preview {
    width: 130px;
    height: 160px;
    flex-shrink: 0;
    border-radius: 16px;
    border: 1.5px dashed rgba(255,255,255,0.28);
    background: rgba(255,255,255,0.06);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .udv2-selfie-preview.filled {
    border: 1.5px solid rgba(63, 212, 196, 0.55);
  }
  .udv2-selfie-preview img, .udv2-selfie-preview video {
    width: 100%; height: 100%; object-fit: cover;
  }
  .udv2-selfie-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.45);
  }
  .udv2-selfie-placeholder svg { width: 30px; height: 30px; stroke: rgba(255,255,255,0.4); }
  .udv2-selfie-placeholder span { font-size: 11px; text-align: center; }

  .udv2-selfie-controls {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    min-width: 160px;
  }
  .udv2-selfie-tip {
    font-size: 12.5px;
    color: rgba(255,255,255,0.66);
    line-height: 1.55;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 12px;
    padding: 11px 13px;
  }
  .udv2-selfie-tip strong {
    color: #ffffff;
    display: block;
    margin-bottom: 4px;
    font-size: 12.5px;
    font-weight: 700;
  }

  /* ── Buttons ── */
  .udv2-btn {
    height: 42px;
    border: none;
    border-radius: 11px;
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    transition: background 0.15s, filter 0.15s, transform 0.1s, border-color 0.15s;
  }
  .udv2-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .udv2-btn svg { width: 15px; height: 15px; }

  /* open camera — teal */
  .udv2-btn-teal {
    background: rgba(63, 212, 196, 0.16);
    border: 1.5px solid rgba(63, 212, 196, 0.45);
    color: #3fd4c4;
  }
  .udv2-btn-teal:hover { background: rgba(63, 212, 196, 0.26); }

  /* capture — amber */
  .udv2-btn-amber {
    background: linear-gradient(180deg, #ffc233 0%, var(--accent) 60%);
    color: #241a00;
    box-shadow: 0 4px 14px rgba(255, 179, 0, 0.3);
  }
  .udv2-btn-amber:hover { filter: brightness(1.05); }

  /* cancel — outline */
  .udv2-btn-outline {
    background: transparent;
    border: 1.5px solid rgba(255,255,255,0.24);
    color: rgba(255,255,255,0.75);
  }
  .udv2-btn-outline:hover {
    border-color: rgba(255,255,255,0.45);
    background: rgba(255,255,255,0.06);
  }

  /* ── Camera live ── */
  .udv2-camera-live {
    width: 130px;
    height: 160px;
    flex-shrink: 0;
    border-radius: 16px;
    overflow: hidden;
    border: 2px solid var(--accent);
    box-shadow: 0 0 0 4px rgba(255, 179, 0, 0.2);
    position: relative;
  }
  .udv2-camera-live video { width: 100%; height: 100%; object-fit: cover; }
  .udv2-camera-pulse {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--accent);
    animation: udv2Pulse 1.2s ease infinite;
  }
  @keyframes udv2Pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }

  /* ── Loading ── */
  .udv2-loading {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 1.25rem;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 14px;
    color: rgba(255,255,255,0.66);
    font-size: 13px;
  }
  .udv2-loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.2);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: udv2Spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes udv2Spin { to { transform: rotate(360deg); } }

  /* ── CTA ── */
  .udv2-cta {
    width: 100%;
    height: 54px;
    margin-top: 0.5rem;
    border: none;
    border-radius: 15px;
    background: linear-gradient(180deg, #ffc233 0%, var(--accent) 60%);
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
    transition: filter 0.18s, transform 0.1s;
    box-shadow: 0 8px 24px rgba(255, 179, 0, 0.35);
  }
  .udv2-cta:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  .udv2-cta:active:not(:disabled) { transform: translateY(0); }
  .udv2-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
  .udv2-cta:disabled {
    background: rgba(255, 179, 0, 0.35);
    color: rgba(36, 26, 0, 0.55);
    cursor: not-allowed;
    box-shadow: none;
  }
  .udv2-cta svg { width: 17px; height: 17px; }

  /* ── Trust chips ── */
  .udv2-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 1.15rem;
    padding-top: 1.05rem;
    border-top: 1px solid rgba(255,255,255,0.13);
  }
  .udv2-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 999px;
    padding: 4px 11px;
    white-space: nowrap;
  }
  .udv2-chip svg { width: 11px; height: 11px; color: #3fd4c4; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .udv2-main {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-top: 4.5rem;
      padding-bottom: 6.5rem; /* room for MobileNav */
      min-height: auto;
    }
    .udv2-left {
      width: 100%;
      max-width: 640px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .udv2-left .udv2-card { text-align: left; }
    .jrp2 { display: none; }
    .udv2-right-col { display: none; }
  }
  @media (max-width: 480px) {
    .udv2-card { padding: 1.4rem 1rem 1.2rem; border-radius: 20px; }
    .udv2-selfie-wrap { flex-direction: column; align-items: center; }
    .udv2-selfie-controls { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .udv2 *, .jrp2 * { animation: none !important; transition: none !important; }
  }
`;

// ── Icons ──
const IconUpload = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconCamera = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconUser = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconFile = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const IconCapture = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>;

const docTypeIdMap = {
  aadhaar_front: 1, aadhaar_rear: 2, pan: 4,
  utility_bill: 8, last_salary_slip: 16, selfie: 18, bank_statement: 6,
};

const isPdfDoc = (name) =>
  ["bank_statement", "last_salary_slip"].includes(
    name.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_")
  );

const getShortFileName = (fileName) => {
  if (!fileName) return "";
  const parts = fileName.split(".");
  const extension = parts.length > 1 ? "." + parts.pop() : "";
  const baseName = parts.join(".");
  return baseName.split(/[\s_-]+/)[0] + extension;
};

export default function UploadDocument() {
  const fileInputRefs = useRef({});
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [documentsRequired, setDocumentsRequired] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const utm_source = customerDetails?.utm_source;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setAttribute("playsinline", true);
      videoRef.current.setAttribute("webkit-playsinline", true);
    }
  }, []);

  const handleClick = (id) => {
    if (fileInputRefs.current[id]) fileInputRefs.current[id].click();
  };

  const profusePixelScript = utm_source === "PROFUSESERVICES" && (
    <script type="text/javascript">
      {`gtag('event', 'conversion', {'send_to': 'AW-16725590798/7pynCKSj3NkZEI6Gsac-'});`}
    </script>
  );

  const handleChange = async (event, id) => {
    const file = event.target.files[0];
    if (!file) return;
    const lowerId = id.toLowerCase();
    if (lowerId.includes("salary_slip") && file.type !== "application/pdf") {
      toast.error(`${id} must be a PDF file.`);
      event.target.value = "";
      return;
    }
    const normalizedName = id.toLowerCase().replace(/\s*-\s*/g, "_").replace(/\s+/g, "_");
    const docTypeId = docTypeIdMap[normalizedName] || "";
    const formData = new FormData();
    formData.append("paySlip", file);
    formData.append("profileId", customerDetails?.profileId || "");
    formData.append("docTypeId", docTypeId);
    try {
      const resp = await getDocsUpload(formData);
      if (resp?.apiStatus === 1) {
        toast.success(`${id} uploaded successfully.`);
        setUploadedFiles((prev) => ({ ...prev, [id]: file }));
      } else {
        toast.error(`Failed to upload ${id}: ${resp?.message || "Unknown error"}`);
      }
    } catch {
      toast.error(`Size is too large for ${id}.`);
    }
  };

  const openCamera = async () => {
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 1280 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        videoRef.current.setAttribute("webkit-playsinline", true);
      }
    } catch {
      toast.error("Unable to access camera. Please allow camera permissions.");
    }
  };

  const captureSelfie = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        const selfieFile = new File([blob], "selfie.jpg", { type: "image/jpeg" });
        setUploadedFiles((prev) => ({ ...prev, selfie: selfieFile }));
        const formData = new FormData();
        formData.append("paySlip", selfieFile);
        formData.append("profileId", customerDetails?.profileId || "");
        formData.append("docTypeId", docTypeIdMap["selfie"]);
        try {
          const resp = await getDocsUpload(formData);
          if (resp?.apiStatus === 1) toast.success("Selfie uploaded successfully.");
          else toast.error(`Failed to upload selfie: ${resp?.message || "Unknown error"}`);
        } catch { toast.error("An error occurred while uploading selfie."); }
      }, "image/jpeg");
      stopCamera();
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setIsCameraOpen(false);
  };

  const fetchDocuments = async () => {
    setIsLoadingDocs(true);
    try {
      const resp = await getRequiredDocs({ leadId: customerDetails?.lead_id || 0 });
      if (resp?.data?.status === 1) setDocumentsRequired(resp.data.data || []);
      else toast.error(resp?.data?.message || "Failed to fetch required documents.");
    } catch { toast.error("Failed to fetch required documents."); }
    finally { setIsLoadingDocs(false); }
  };

  useEffect(() => { fetchDocuments(); }, []);

  const getUploadedDocumentCount = () =>
    Object.entries(uploadedFiles).filter(([key, file]) => key !== "selfie" && file).length;

  const handleContinue = () => {
    if (getUploadedDocumentCount() < 2) {
      toast.error("Please upload at least 2 documents to continue.");
      return;
    }

    if (customerDetails?.user_type === "REPEAT") {
      dispatch(updateJourneyEvents({ upload_documents: 1, banking_details: 2 }));
    } else {
      dispatch(updateJourneyEvents({ upload_documents: 1, banking_details: 1 }));
      navigate("/journey/congratulations");
    }
  };

  const uploadedCount = getUploadedDocumentCount();
  const totalDocs = documentsRequired.length;
  const progressPct = totalDocs > 0 ? Math.round((uploadedCount / totalDocs) * 100) : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="udv2">
        <main className="udv2-main">

          {/* ── Left: heading + glass console ── */}
          <div className="udv2-left">
            <span className="udv2-eyebrow">
              <span className="udv2-eyebrow-num">6</span>
              Documents &amp; selfie
            </span>
            

            <div className="udv2-card">
              {/* PROGRESS */}
              {!isLoadingDocs && totalDocs > 0 && (
                <div className="udv2-progress-wrap">
                  <div className="udv2-progress-header">
                    <span className="udv2-progress-label">Documents uploaded</span>
                    <span className="udv2-progress-count">{uploadedCount} / {totalDocs}</span>
                  </div>
                  <div className="udv2-progress-track">
                    <div className="udv2-progress-fill" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              )}

              {/* DOCUMENTS LIST */}
              <div className="udv2-section">
                <div className="udv2-section-title">Required documents</div>

                {isLoadingDocs ? (
                  <div className="udv2-loading">
                    <div className="udv2-loading-spinner" />
                    Loading required documents…
                  </div>
                ) : (
                  <div className="udv2-doc-list">
                    {documentsRequired.map((doc) => {
                      const isUploaded = !!uploadedFiles[doc.name];
                      const isPdf = isPdfDoc(doc.name);
                      const thumbSrc = isUploaded
                        ? isPdf ? pdfFile : URL.createObjectURL(uploadedFiles[doc.name])
                        : null;

                      return (
                        <div
                          key={doc.id}
                          className={`udv2-doc-item ${isUploaded ? 'uploaded' : ''}`}
                          onClick={() => !isUploaded && handleClick(doc.name)}
                        >
                          {/* Thumbnail */}
                          <div className="udv2-doc-thumb">
                            {thumbSrc
                              ? <img src={thumbSrc} alt={doc.name} />
                              : <IconFile />
                            }
                          </div>

                          {/* Info */}
                          <div className="udv2-doc-info">
                            <div className="udv2-doc-name">
                              {doc.name.replace(/_/g, ' ')}
                            </div>
                            {!isUploaded && (
                              <div className="udv2-doc-hint">
                                {isPdf ? 'PDF only' : 'JPG, PNG accepted'} · Max 5MB
                              </div>
                            )}
                            {isUploaded && (
                              <div className="udv2-doc-filename">
                                ✓ {getShortFileName(uploadedFiles[doc.name].name)}
                              </div>
                            )}
                          </div>

                          {/* Action icon */}
                          <div className="udv2-doc-action">
                            {isUploaded ? <IconCheck /> : <IconUpload />}
                          </div>

                          {/* Hidden file input */}
                          <input
                            type="file"
                            ref={(el) => (fileInputRefs.current[doc.name] = el)}
                            accept={isPdf ? "application/pdf" : "image/*"}
                            onChange={(e) => handleChange(e, doc.name)}
                            style={{ display: "none" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SELFIE SECTION */}
              <div className="udv2-section">
                <div className="udv2-section-title">Live selfie</div>
                <div className="udv2-selfie-wrap">

                  {/* Preview / Camera */}
                  {isCameraOpen ? (
                    <div className="udv2-camera-live">
                      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div className="udv2-camera-pulse" />
                    </div>
                  ) : (
                    <div className={`udv2-selfie-preview ${uploadedFiles.selfie ? 'filled' : ''}`}>
                      {uploadedFiles.selfie ? (
                        <img src={URL.createObjectURL(uploadedFiles.selfie)} alt="selfie" />
                      ) : (
                        <div className="udv2-selfie-placeholder">
                          <IconUser />
                          <span>No selfie yet</span>
                        </div>
                      )}
                    </div>
                  )}

                  <canvas ref={canvasRef} style={{ display: "none" }} />

                  {/* Controls */}
                  <div className="udv2-selfie-controls">
                    <div className="udv2-selfie-tip">
                      <strong>Selfie tips</strong>
                      Face the camera directly, ensure good lighting and remove glasses if possible.
                    </div>

                    {!isCameraOpen ? (
                      <button className="udv2-btn udv2-btn-teal" onClick={openCamera}>
                        <IconCamera />
                        {uploadedFiles.selfie ? 'Retake selfie' : 'Open camera'}
                      </button>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button className="udv2-btn udv2-btn-amber" onClick={captureSelfie}>
                          <IconCapture /> Capture selfie
                        </button>
                        <button className="udv2-btn udv2-btn-outline" onClick={stopCamera}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="udv2-cta" onClick={handleContinue} disabled={isVerifying}>
                {isVerifying ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                      </path>
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>
                    Continue
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              {/* Trust chips */}
              <div className="udv2-trust">
                <span className="udv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  256-bit SSL
                </span>
                <span className="udv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Data stays private
                </span>
                <span className="udv2-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  RBI compliant
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: reusable finance visual ── */}
          <div className="udv2-right-col">
            <JourneyRightPanel />
          </div>

        </main>
      </div>
      <MobileNav />
    </>
  );
}