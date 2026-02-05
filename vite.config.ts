import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      exclude: ['**/__tests__/**', '**/examples/**', 'src/index.tsx', 'src/setupTests.ts'],
    }),
  ],
  server: {
    host: true, 
    port: 3001,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'SelfcareCommonFrontend',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.peerDependencies),
        'react/jsx-runtime',
      ],
      output: {
        manualChunks: undefined,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});