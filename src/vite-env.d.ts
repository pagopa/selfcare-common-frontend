/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

interface ImportMetaEnv {
  readonly VITE_MOCK_USER: string;
  readonly VITE_ANALYTICS_ENABLE: string;
  readonly VITE_ANALYTICS_MOCK: string;
  readonly VITE_ANALYTICS_DEBUG: string;
  readonly VITE_MIXPANEL_TOKEN: string;
  readonly VITE_GOOGLE_LOGIN_URL: string;
  readonly VITE_URL_PRIVACY_DISCLAIMER: string;
  readonly VITE_URL_TERMS_AND_CONDITIONS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
