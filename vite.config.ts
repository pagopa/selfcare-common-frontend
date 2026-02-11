import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dts({
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: false, // Keep separate .d.ts files for each module
      outDir: 'dist',
      exclude: [
        'src/lib/**/__tests__/**',
        'src/lib/**/*.test.ts',
        'src/lib/**/*.test.tsx',
        'src/lib/**/*.spec.ts',
        'src/lib/**/*.spec.tsx',
      ],
    }),
  ],
  server: {
    host: true,
    port: 3001,
  },
  build: {
    lib: {
      entry: {
        'index': resolve(__dirname, 'src/lib/index.ts'),
        'consentManagementConfigure': resolve(__dirname, 'src/lib/consentManagementConfigure.ts'),
        'utils/api-utils': resolve(__dirname, 'src/lib/utils/api-utils.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      treeshake: false,
      external: [
        'react/jsx-runtime',
        ...[
          ...Object.keys(pkg.peerDependencies || {}),
          ...Object.keys(pkg.dependencies || {}),
        ].map((pkgName) => new RegExp(`^${pkgName}(\/.*)?$`)),
      ],
      // Preserve module structure instead of bundling
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src/lib',
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  define: {
    'process.env': {},
  },
});