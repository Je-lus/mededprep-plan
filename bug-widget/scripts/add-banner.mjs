// Prepends an eslint-disable header to the built bundles. Consumers vendor
// these files inside linted src trees (e.g. ce's app/src/lib) — without the
// header their eslint runs flag the minified output with hundreds of errors.
// Done post-build because esbuild minification strips rollup output.banner.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BANNER = '/* eslint-disable */\n';
const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');

for (const file of ['bug-widget.es.js', 'bug-widget.js']) {
  const path = resolve(dist, file);
  const content = readFileSync(path, 'utf8');
  if (!content.startsWith(BANNER)) {
    writeFileSync(path, BANNER + content);
    console.log(`banner added: ${file}`);
  }
}
