import { createSlice } from '@reduxjs/toolkit';

const COOKIE_NAME = 'squarepixel_consent';

const getInitialConsentState = () => {
  const consent = localStorage.getItem(COOKIE_NAME);
  if (consent) {
    const data = JSON.parse(consent);
    const now = new Date().getTime();
    if (now < data.expires) {
      return { hasConsent: true, showModal: false };
    }
  }

  const isExternal = document.referrer &&
    !document.referrer.includes(window.location.hostname);

  return {
    hasConsent: false,
    showModal: isExternal,
  };
};

const initialState = getInitialConsentState();

export const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    acceptCookies: (state) => {
      const ttlMinutes = parseInt(import.meta.env.VITE_COOKIE_PERMISSION_TTL_MIN || '10', 10);
      const expires = new Date().getTime() + ttlMinutes * 60 * 1000;

      localStorage.setItem(COOKIE_NAME, JSON.stringify({ expires }));
      state.hasConsent = true;
      state.showModal = false;
    },
    declineCookies: (state) => {
      state.hasConsent = false;
      state.showModal = false;
      const redirectUrl = import.meta.env.VITE_COOKIE_DECLINE_REDIRECT || 'https://example.com';
      window.location.href = redirectUrl;
    },
    showCookieModal: (state) => {
      state.showModal = true;
    },
  },
});

export const { acceptCookies, declineCookies, showCookieModal } = cookieSlice.actions;
export default cookieSlice.reducer;
