import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['@pagopa/mui-italia'],
      },
    },
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        'src/index.tsx',
        'src/reportWebVitals.ts',
        'src/api/generated/**',
        'src/examples/**',
        'src/AppExample.tsx',
        'src/lib/utils/fixSwagger20ArraySchemaDef.js',
        'src/lib/common-polyfill.ts',
        'src/lib/index.ts',
        'src/lib/components/icons/**',
        'src/lib/model/**',
      ],
    },
  },
});
