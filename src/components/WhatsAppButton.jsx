import React, { useState } from "react";
import logo from "../images/logo.webp";
import "../css/whatsappButton.css";

// const WA_NUMBER = "+918796041166";
// const WA_NUMBER = "+919355753533";
const WA_NUMBER = "+918448240723";
const WA_MESSAGE = "Hi I need support";

const WhatsAppIcon = ({ size = 20, color }) => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
    {color ? (
      <path
        d="M11 .5C5.2.5.5 5.2.5 11c0 1.9.5 3.7 1.4 5.3L.5 21.5l5.4-1.4c1.5.8 3.3 1.3 5.1 1.3 5.8 0 10.5-4.7 10.5-10.5S16.8.5 11 .5Zm5.8 14.5c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.5-1.2-2.9 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.4-.5.5-.2.2-.3.3-.1.6.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.4.1.1.1.7-.1 1.4Z"
        fill={color}
      />
    ) : (
      <>
        <path d="m.76 21.24 1.412-5.12A10.324 10.324 0 0 1 .76 10.93C.76 5.35 5.35.76 10.964.76 16.58.76 21.24 5.35 21.24 10.93c0 5.578-4.661 10.31-10.276 10.31-1.765 0-3.46-.565-4.978-1.413L.76 21.24Z" fill="#EDEDED" />
        <path d="m6.268 17.991.318.177c1.307.812 2.825 1.306 4.414 1.306 4.626 0 8.474-3.848 8.474-8.545 0-4.696-3.848-8.404-8.51-8.404-4.66 0-8.439 3.743-8.439 8.404 0 1.624.46 3.213 1.307 4.555l.212.318-.812 2.966 3.036-.777Z" fill="#25D366" />
        <path d="m8.245 6.198-.671-.036a.802.802 0 0 0-.565.212c-.318.283-.848.812-.989 1.519-.247 1.059.141 2.33 1.06 3.601.918 1.271 2.683 3.32 5.79 4.202.989.283 1.766.106 2.402-.282.494-.318.812-.812.918-1.342l.105-.494a.355.355 0 0 0-.176-.389l-2.225-1.024a.337.337 0 0 0-.423.106l-.883 1.13a.275.275 0 0 1-.283.07c-.6-.211-2.613-1.059-3.707-3.177-.036-.106-.036-.212.035-.283l.848-.953c.07-.106.105-.247.07-.353L8.527 6.41a.308.308 0 0 0-.282-.212Z" fill="#FEFEFE" />
      </>
    )}
  </svg>
);

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);

  const startChat = () =>
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`,
      "_blank"
    );

  return (
    <div className="stu-wa-wrap">
      {open && (
        <div className="stu-card">
          {/* Header */}
          <div className="stu-header">
            <div className="stu-avatar">
              <img src={logo} alt="Salary Topup" />
              <span className="stu-online-dot" />
            </div>
            <div className="stu-header-info">
              <div className="stu-header-name">Salary Topup</div>
              <div className="stu-header-status">Instant replies</div>
            </div>
            <button className="stu-close" aria-label="Close chat" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>

          {/* Chat body */}
          <div className="stu-body">
            <div className="stu-bubble">Hi there 👋</div>
            <div className="stu-bubble delay">How can I help you today?</div>
          </div>

          {/* Footer / CTA */}
          <div className="stu-footer">
            <button className="stu-start" onClick={startChat}>
              <WhatsAppIcon size={20} color="#fff" /> Start Chat
            </button>
          </div>
        </div>
      )}

      {/* Floating action button */}
      <button
        className="stu-fab"
        aria-label={open ? "Close chat" : "Chat on WhatsApp"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <span className="stu-fab-close">×</span>
        ) : (
          <WhatsAppIcon size={34} color="#fff" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
