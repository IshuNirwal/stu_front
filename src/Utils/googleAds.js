export const trackGoogleConversion = (redirectUrl = null) => {
  if (!window.gtag) {
    console.warn("Google Ads gtag not loaded");
    return;
  }

  const callback = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  window.gtag('event', 'conversion', {
    send_to: 'AW-17828602701/AsCoCPufjNkbEM3Gq7VC',
    value: 1.0,
    currency: 'INR',
    event_callback: callback,
  });
};
