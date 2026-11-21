// THE WORLD TODAY — Saturday 21 November 2026 (v2).
// Copies the pre-rendered front page (assets/news.png) to the output
// directory as entry.png. Deterministic by design: no network, no
// randomness, no clock. The image is fixed bytes stored in the repository,
// so every run writes the same file. Before writing, the source is
// verified: it must be a real PNG, at most 1 MiB, and at most 1024 x 1024
// pixels. After writing, the output bytes are compared against the source;
// any mismatch exits non-zero. Outside the grader, MAKEFUN_OUTPUT_DIR
// stands in for /output (mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts).
import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1048576;
const MAX_SIDE = 1024;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, 'assets', 'news.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const out = join(outDir, 'entry.png');

const bytes = readFileSync(src);

if (bytes.length === 0 || bytes.length > MAX_BYTES) {
  console.error(`source image is ${bytes.length} bytes; must be 1..${MAX_BYTES}`);
  process.exit(1);
}
if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  console.error('source image is not a PNG');
  process.exit(1);
}
// IHDR chunk: width at bytes 16..19, height at bytes 20..23, big-endian.
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width === 0 || width > MAX_SIDE || height === 0 || height > MAX_SIDE) {
  console.error(`source image is ${width}x${height}; must be at most ${MAX_SIDE}x${MAX_SIDE}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, out);

const written = readFileSync(out);
if (!written.equals(bytes)) {
  console.error('output bytes differ from the source image');
  process.exit(1);
}
const size = statSync(out).size;
console.log(`wrote ${out}: ${size} bytes (${width}x${height} PNG)`);
