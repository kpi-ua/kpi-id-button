import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default {
  plugins: [cssInjectedByJsPlugin()],
  build: {
    outDir: 'dist',
    assetsDir: '.',
    lib: {
      entry: 'src/main.ts',
      name: 'KPIID',
      formats: ['iife'],
      fileName: () => `kpi-id-signin.js`,
    },
  },
};
