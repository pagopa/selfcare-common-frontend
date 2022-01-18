/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'uat' | 'production';

    REACT_APP_MOCK_USER: string;
  }
}
interface Window {
  Stripe: any;
}
