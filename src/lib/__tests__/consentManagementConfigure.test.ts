import { vi, beforeEach, describe, test, expect } from 'vitest';
import { initAnalytics } from '../services/analyticsService';

vi.mock('../services/analyticsService', () => ({ 
  initAnalytics: vi.fn() 
}));

declare const window: any;

let onConsentChanged = () => {};
window.OneTrust = {
  OnConsentChanged: (f: () => void) => (onConsentChanged = f),
};

window.OnetrustActiveGroups = '';

const configureConsentManagement = async () => {
  await import('../consentManagementConfigure');
  window.OptanonWrapper();
};

describe('test clean session', () => {
  beforeEach(async () => {
    vi.clearAllMocks(); // Clear mock call history
    await configureConsentManagement();
  });

  test('Approved consent', () => {
    window.OnetrustActiveGroups = 'C0001,C0002,C0003,C0004';
    onConsentChanged();
    expect(initAnalytics).toHaveBeenCalledTimes(1);
  });

  test('Rejected consent', () => {
    window.OnetrustActiveGroups = 'C0001,C0003,C0004';
    onConsentChanged();
    expect(initAnalytics).toHaveBeenCalledTimes(0);
  });
});

describe('test cookies setted', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    // Re-mock after reset
    vi.doMock('../services/analyticsService', () => ({ 
      initAnalytics: vi.fn() 
    }));
  });

  test('Approved consent', async () => {
    document.cookie = 'OptanonConsent=groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1';
    
    // Import AFTER mocking
    const { initAnalytics } = await import('../services/analyticsService');
    await configureConsentManagement();
    
    expect(initAnalytics).toHaveBeenCalledTimes(1);
  });

  test('Rejected consent', async () => {
    document.cookie = 'OptanonConsent=groups=C0001%3A1%2CC0002%3A0%2CC0003%3A1%2CC0004%3A1';
    
    const { initAnalytics } = await import('../services/analyticsService');
    await configureConsentManagement();
    
    expect(initAnalytics).toHaveBeenCalledTimes(0);
  });
});