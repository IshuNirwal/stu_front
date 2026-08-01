import React, { useEffect, useState } from 'react';
import { getDocsUpload, getMasterData } from '../Utils/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ruStyles = `
  .ru-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .ru-file-trigger {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 14px; height: 44px;
    border: 1.5px dashed #dce4f0; border-radius: 11px;
    background: #f7f9fc; cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    font-size: 13px; color: #6b7a90;
  }
  .ru-file-trigger:hover { border-color: #b8cce8; background: #fff; }
  .ru-file-trigger.has-file { border-color: #34d399; border-style: solid; color: #059669; }
  .ru-file-trigger svg { width: 16px; height: 16px; flex-shrink: 0; }
  .ru-upload-btn {
    width: 100%; height: 46px; margin-top: 1rem;
    border: none; border-radius: 11px;
    background: #0f1c2e; color: #fff;
    font-family: 'Sora', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.15s;
  }
  .ru-upload-btn:hover { background: #1a2f4a; }
  .ru-upload-btn svg { width: 16px; height: 16px; }
  @media (max-width: 600px) { .ru-grid { grid-template-columns: 1fr; } }
`;

const IconUpload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);
const IconFile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);
const IconPaperclip = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const shortenFileName = (name) => {
  if (!name) return '';
  if (name.length <= 16) return name;
  const ext = name.split('.').pop();
  return name.substring(0, 12) + '…' + ext;
};

export default function ReuploadDocument() {
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState('');
  const [docTypeId, setDocTypeId] = useState('');

  const customerDetails = useSelector((state) => state.customerJourneyDetails.customerDetails);
  const showDocsUpload = customerDetails?.show_docs_upload;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const resp = await getMasterData({ profileId: customerDetails?.profileId });
        if (resp?.data?.status === 1) setData(resp.data?.data || []);
      } catch { console.log('failed to fetch'); }
    };
    fetchDocuments();
  }, []);

  const handleDocChange = (e) => {
    const id = e.target.value;
    setDocTypeId(id);
    const doc = data.find((d) => d.id == id);
    setSelectedDoc(doc?.docs_sub_type || '');
  };

  const handleUpload = async () => {
    if (!docTypeId) { toast.error('Please select a document type'); return; }
    if (!selectedFileName) { toast.error('Please select a file'); return; }
    const ext = selectedFileName.name.split('.').pop().toLowerCase();
    if (!['pdf', 'jpg', 'jpeg', 'png'].includes(ext)) {
      toast.error('Please upload only PDF or image (jpg, jpeg, png)');
      return;
    }
    const formData = new FormData();
    formData.append('paySlip', selectedFileName);
    formData.append('profileId', customerDetails?.profileId || '');
    formData.append('docTypeId', docTypeId);
    formData.append('uploadType', 2);
    formData.append('password', password);
    formData.append('leadId', customerDetails?.lead_id);
    try {
      const resp = await getDocsUpload(formData);
      if (resp?.apiStatus === 1) {
        toast.success(resp?.message);
        setSelectedFileName(null); setPassword(''); setDocTypeId(''); setSelectedDoc('');
      }
    } catch { toast.error('File size is too large'); }
  };

  if (showDocsUpload != 1) return null;

  return (
    <div className="db-card">
      <style>{ruStyles}</style>
      <div className="db-section-title">Upload document</div>
      <p style={{ fontSize: 13, color: '#6b7a90', marginBottom: '1rem' }}>
        Upload the necessary documents to move ahead with your application.
      </p>

      {/* Document type select */}
      <select
        className="db-input db-select"
        value={docTypeId}
        onChange={handleDocChange}
      >
        <option value="">Select document type</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>{item.docs_sub_type}</option>
        ))}
      </select>

      <div className="ru-grid">
        {/* File picker */}
        <div>
          <input
            id="ru-file"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => setSelectedFileName(e.target.files[0])}
            accept="application/pdf, image/*"
          />
          <label htmlFor="ru-file" className={`ru-file-trigger ${selectedFileName ? 'has-file' : ''}`}>
            <span>{selectedFileName ? shortenFileName(selectedFileName.name) : 'Choose file'}</span>
            {selectedFileName ? <IconFile /> : <IconPaperclip />}
          </label>
        </div>

        {/* Password */}
        <input
          type="password"
          className="db-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="File password (if any)"
        />
      </div>

      <button className="ru-upload-btn" onClick={handleUpload}>
        <IconUpload /> Upload document
      </button>
    </div>
  );
}
