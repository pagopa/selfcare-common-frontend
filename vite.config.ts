import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      tsconfigPath: './tsconfig.json',
      include: ['src/lib'],
      insertTypesEntry: true,
      rollupTypes: false,
      exclude: ['**/__tests__/**', 'src/examples', 'src/index.tsx', 'src/setupTests.ts'],
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
      external: [...Object.keys(pkg.peerDependencies), 'react/jsx-runtime'],
      input: resolve(__dirname, 'src/lib/index.ts'),  
      output: {
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
