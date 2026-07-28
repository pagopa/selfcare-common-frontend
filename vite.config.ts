import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
  },
});
