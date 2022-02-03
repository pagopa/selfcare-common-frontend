import { initAnalytics } from './services/analyticsService';

declare const OneTrust: any;
declare const OnetrustActiveGroups: string;
const global = window as any;

// target cookies (Mixpanel)
const targCookiesGroup = 'C0004';

// OneTrust callback at first time
// eslint-disable-next-line functional/immutable-data
global.OptanonWrapper = function () {
  OneTrust.OnConsentChanged(function () {
    const activeGroups = OnetrustActiveGroups;
    if (activeGroups.indexOf(targCookiesGroup) > -1) {
      initAnalytics();
    }
  });
};
// check mixpanel cookie consent in cookie
const OTCookieValue: string =
  document.cookie.split('; ').find((row) => row.startsWith('OptanonConsent=')) || '';
const checkValue = `${targCookiesGroup}%3A1`;
if (OTCookieValue.indexOf(checkValue) > -1) {
  initAnalytics();
}
