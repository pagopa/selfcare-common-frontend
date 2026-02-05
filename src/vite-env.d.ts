/// <reference types="vite/client" />

  interface ImportMetaEnv {
    NODE_ENV: 'development' | 'uat' | 'production';

    VITE_MOCK_USER: string;
  }


interface ImportMeta {
  readonly env: ImportMetaEnv;
}
