import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      exclude: [
        'src/index.tsx',
        'src/api/generated',
        'src/examples/**',
        'src/AppExample.tsx',
        'src/lib/utils/fixSwagger20ArraySchemaDef.js',
        'src/lib/index.ts',
        'src/lib/components/icons/**',
        'src/lib/model/**',
      ],
    },
    restoreMocks: true,
    clearMocks: true,
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
});