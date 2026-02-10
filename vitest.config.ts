import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    alias: {
      '@pagopa/selfcare-common-frontend/lib/decorators/withLogin': path.resolve(
        __dirname,
        'src/__mocks__/@pagopa/selfcare-common-frontend/decorators/withLogin.tsx'
      ),
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/index.tsx',
        'src/consentAndAnalyticsConfiguration.ts',
        'src/api/generated/**',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/__tests__/**',
        'src/**/__mocks__/**',
        'src/vite-env.d.ts',
      ],
    },
    restoreMocks: true,
    clearMocks: true,
  },
});
