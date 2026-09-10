import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const LEGACY_URL = 'https://legacy.example.com/privacy';
const TERMS_URL = 'https://legacy.example.com/terms';
const STATIC_URL = 'https://cdn.example.com/privacy.html';

const setBackstageUser = () => {
  window.localStorage.setItem('user', JSON.stringify({ iss: 'PAGOPA' }));
};

const clearBackstageUser = () => {
  window.localStorage.removeItem('user');
};

describe('CONFIG.FOOTER.LINK.PRIVACYPOLICY', () => {
  beforeEach(() => {
    vi.resetModules();
    clearBackstageUser();
    vi.stubEnv('VITE_URL_PRIVACY_DISCLAIMER', LEGACY_URL);
    vi.stubEnv('VITE_URL_TERMS_AND_CONDITIONS', TERMS_URL);
  });

  afterEach(() => {
    clearBackstageUser();
    vi.unstubAllEnvs();
  });

  it('uses the legacy SPA route with the backstage param when isFromBackstage is true, regardless of the environment', async () => {
    setBackstageUser();
    vi.stubEnv('VITE_ENV', 'UAT');
    vi.stubEnv('VITE_URL_PRIVACY_POLICY_STATIC', STATIC_URL);

    const { CONFIG } = await import('../env');

    expect(CONFIG.FOOTER.LINK.PRIVACYPOLICY).toBe(`${LEGACY_URL}?origin=backstage`);
    expect(CONFIG.FOOTER.LINK.PRIVACYPOLICY_OPEN_IN_NEW_TAB).toBe(false);
  });

  it('uses the legacy SPA route without the backstage param in PROD, even when not from backstage', async () => {
    vi.stubEnv('VITE_ENV', 'PROD');
    vi.stubEnv('VITE_URL_PRIVACY_POLICY_STATIC', STATIC_URL);

    const { CONFIG } = await import('../env');

    expect(CONFIG.FOOTER.LINK.PRIVACYPOLICY).toBe(LEGACY_URL);
    expect(CONFIG.FOOTER.LINK.PRIVACYPOLICY_OPEN_IN_NEW_TAB).toBe(false);
  });

  it('uses the static CDN url in DEV/UAT when not from backstage, and flags it to be opened in a new tab', async () => {
    vi.stubEnv('VITE_ENV', 'UAT');
    vi.stubEnv('VITE_URL_PRIVACY_POLICY_STATIC', STATIC_URL);

    const { CONFIG } = await import('../env');

    expect(CONFIG.FOOTER.LINK.PRIVACYPOLICY).toBe(STATIC_URL);
    expect(CONFIG.FOOTER.LINK.PRIVACYPOLICY_OPEN_IN_NEW_TAB).toBe(true);
  });

  it('falls back to the legacy SPA route without the backstage param when the static url is not configured', async () => {
    vi.stubEnv('VITE_ENV', 'DEV');
    vi.stubEnv('VITE_URL_PRIVACY_POLICY_STATIC', '');

    const { CONFIG } = await import('../env');

    expect(CONFIG.FOOTER.LINK.PRIVACYPOLICY).toBe(LEGACY_URL);
    expect(CONFIG.FOOTER.LINK.PRIVACYPOLICY_OPEN_IN_NEW_TAB).toBe(false);
  });

  it('does not affect TERMSANDCONDITIONS, which always stays on the legacy SPA route', async () => {
    vi.stubEnv('VITE_ENV', 'DEV');
    vi.stubEnv('VITE_URL_PRIVACY_POLICY_STATIC', STATIC_URL);

    const { CONFIG } = await import('../env');

    expect(CONFIG.FOOTER.LINK.TERMSANDCONDITIONS).toBe(TERMS_URL);
  });

  it('appends the backstage param to TERMSANDCONDITIONS too when isFromBackstage is true', async () => {
    setBackstageUser();
    vi.stubEnv('VITE_ENV', 'DEV');

    const { CONFIG } = await import('../env');

    expect(CONFIG.FOOTER.LINK.TERMSANDCONDITIONS).toBe(`${TERMS_URL}?origin=backstage`);
  });
});
