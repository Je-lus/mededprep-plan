import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BugWidget',
      formats: ['umd', 'es'],
      fileName: (format) => {
        if (format === 'es') return 'bug-widget.es.js';
        return 'bug-widget.js';
      },
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
    minify: 'esbuild',
    sourcemap: true,
  },
});
