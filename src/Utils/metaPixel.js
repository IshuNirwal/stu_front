// pixel.js
export const initPixel = () => {
  if (window.fbq) return;

  // Create script tag
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  // Setup fbq function
  window.fbq = function () {
    if (window.fbq.callMethod) {
      window.fbq.callMethod.apply(window.fbq, arguments);
    } else {
      window.fbq.queue.push(arguments);
    }
  };

  if (!window._fbq) window._fbq = window.fbq;

  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = "2.0";
  window.fbq.queue = [];

  // Init pixels
  window.fbq("init", "907109168609496");
  window.fbq("init", "27159363247031525");
  window.fbq("track", "PageView");
};

// Events
export const trackLead = () => {
  window.fbq && window.fbq('track', 'Lead');
};

export const trackPurchase = (value) => {
  window.fbq && window.fbq('track', 'Purchase');
};