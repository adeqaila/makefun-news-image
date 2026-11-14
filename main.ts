// news-image-01 entry (Node 22, standard library only).
//
// The entry image is the entry.png beside this file: a newspaper front page
// summing up the world's news of Friday 13 November 2026 — masthead
// "FRIDAY 13 NOVEMBER 2026" plus four panels:
//   "FLIGHTS RESUME AFTER FAA GROUND STOP",
//   "UKRAINE LAUNCHES 1,200 DRONES",
//   "TENSIONS IN THE STRAIT OF HORMUZ",
//   "MICROSOFT OUTAGE, DAY TWO".
// The program copies it byte-for-byte to /output/entry.png (or
// $MAKEFUN_OUTPUT_DIR/entry.png). No network, no randomness: two runs
// write identical bytes.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);

// Fail loudly instead of silently shipping a truncated copy: the output
// must be byte-for-byte the source image.
const srcBytes = statSync(src).size;
const outBytes = statSync(dest).size;
if (outBytes !== srcBytes) {
  throw new Error(`entry.png size mismatch: wrote ${outBytes} bytes, expected ${srcBytes}`);
}
