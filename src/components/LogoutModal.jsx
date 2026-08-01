// components/LogoutModal.js
import React from 'react';
import '../css/LogoutModal.css'; // Add your own styling or use a CSS-in-JS solution

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-1">
      <div className="modal-content-1">
        <p style={{ fontWeight: '500' }}>Are you sure you want to Sign Out?</p>
        <div className="modal-actions" style={{ marginTop: '0px', marginBottom: '0' }}>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
