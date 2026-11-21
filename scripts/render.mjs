// Render build/page.html to assets/news.png (1024 x 1024) with Playwright.
// Uses the cached Chromium build; no network is needed at render time.
import { chromium } from '/home/hatch/workspace/goals/make-fun-gta-6-bounty-participation/build/tools/node_modules/playwright-core/index.mjs';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'assets');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/home/hatch/.cache/ms-playwright/chromium-1148/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
await page.goto('file://' + join(root, 'build', 'page.html'));
await page.waitForTimeout(400);
const png = await page.screenshot({ type: 'png' });
await browser.close();

const outPath = join(outDir, 'news.png');
writeFileSync(outPath, png);
const size = statSync(outPath).size;
console.log(`rendered ${outPath}: ${size} bytes (${(size / 1024).toFixed(1)} KiB), limit 1048576 bytes`);
if (size > 1048576) {
  console.log('OVER 1 MiB — rerender as JPEG or simplify the page.');
  process.exit(1);
}
