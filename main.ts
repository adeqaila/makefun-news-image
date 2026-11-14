// news-image-01 entry, slot 2 (Node 22, standard library only).
//
// Grind of the slot-1 entry ("Boreal Nucleus"): same newspaper front page
// summing up the world's news of Friday 13 November 2026 — masthead
// "FRIDAY 13 NOVEMBER 2026" plus four panels — with one targeted change
// from the makefun-grind loop: a short factual sub-headline under each
// caption, so a viewer who missed the day can tell what happened:
//   "FLIGHTS RESUME AFTER FAA GROUND STOP"
//     — "US departures halted 4+ hours by communications failure"
//   "UKRAINE LAUNCHES 1,200 DRONES"
//     — "One of Kyiv's largest drone attacks as peace talks widen"
//   "TENSIONS IN THE STRAIT OF HORMUZ"
//     — "US downs Iranian drones; four tankers hit"
//   "MICROSOFT OUTAGE, DAY TWO"
//     — "Global Microsoft 365 outage enters second day"
// The program copies it byte-for-byte to /output/entry.png (or
// $MAKEFUN_OUTPUT_DIR/entry.png). No network, no randomness: two runs
// write identical bytes.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
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

// And the bytes themselves must match, not just the length.
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
if (sha(dest) !== sha(src)) {
  throw new Error('entry.png sha256 mismatch after copy');
}
