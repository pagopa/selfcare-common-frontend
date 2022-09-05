import { initAnalytics } from '../services/analyticsService';

jest.mock('../services/analyticsService', () => ({ initAnalytics: jest.fn() }));

declare const window: any;

let onConsentChanged = () => {};
window.OneTrust = {
  OnConsentChanged: (f: () => void) => (onConsentChanged = f),
};

window.OnetrustActiveGroups = '';

const configureConsentManagement = () => {
  require('../consentManagementConfigure');
  window.OptanonWrapper();
};

describe('test clean session', () => {
  beforeEach(configureConsentManagement);

  test('Approved consent', () => {
    window.OnetrustActiveGroups = 'C0001,C0002,C0003,C0004';
    onConsentChanged();
    expect(initAnalytics).toBeCalledTimes(1);
  });

  test('Rejected consent', () => {
    window.OnetrustActiveGroups = 'C0001,C0003,C0004';
    onConsentChanged();
    expect(initAnalytics).toBeCalledTimes(0);
  });
});

describe('test cookies setted', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('../services/analyticsService', () => ({ initAnalytics: jest.fn() }));
  });

  test('Approved consent', () => {
    document.cookie = 'OptanonConsent=groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1';
    configureConsentManagement();
    expect(require('../services/analyticsService').initAnalytics).toBeCalledTimes(1);
  });

  test('Rejected consent', () => {
    document.cookie = 'OptanonConsent=groups=C0001%3A1%2CC0002%3A0%2CC0003%3A1%2CC0004%3A1';
    configureConsentManagement();
    expect(require('../services/analyticsService').initAnalytics).toBeCalledTimes(0);
  });
});
