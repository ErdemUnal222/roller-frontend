import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
        sourcemapIgnoreList: (source) => source.includes('react_devtools_backend_compact.js') ? false : true,
    host: '0.0.0.0',
    allowedHosts: ['ihsanerdemunal.ide.3wa.io'], // this line is fine
    // ❌ Do NOT add `https: true`
  },
});
