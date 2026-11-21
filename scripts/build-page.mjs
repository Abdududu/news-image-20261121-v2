// Build the front-page HTML from data/news.json.
// Reads the news data and writes build/page.html (1024 x 1024 newspaper front page).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'data', 'news.json'), 'utf8'));

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function storyHtml(st) {
  return `<div class="story"><div class="sh">${esc(st.headline)}</div><div class="ss">${esc(st.summary)} <span class="src">${esc(st.source)}</span></div></div>`;
}

function sectionHtml(sec) {
  return `<div class="section"><div class="sec-head">${esc(sec.name)}</div>${sec.stories.map(storyHtml).join('')}</div>`;
}

// Column assignment keeps the three columns balanced by story count.
// EUROPE (7) + SPORT & CULTURE (4) = 11 | MIDDLE EAST (3) + ASIA-PACIFIC (5) + AFRICA (2) = 10 | AMERICAS (4) + TECH & SCIENCE (5) = 9
const col1 = [data.sections[0], data.sections[6]];
const col2 = [data.sections[1], data.sections[2], data.sections[4]];
const col3 = [data.sections[3], data.sections[5]];

const lead = data.hero[0];
const cards = data.hero.slice(1);

const heroCards = cards.map(c =>
  `<div class="card"><div class="kicker">${esc(c.kicker)}</div><div class="ch">${esc(c.headline)}</div><div class="cs">${esc(c.summary)} <span class="src">${esc(c.source)}</span></div></div>`
).join('');

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1024px; height: 1024px; overflow: hidden; }
  body { background: #f7f2e7; color: #141414; font-family: Arial, Helvetica, 'Liberation Sans', sans-serif; padding: 16px 24px 12px 24px; }
  .masthead { text-align: center; border-top: 4px solid #141414; padding-top: 4px; }
  .masthead h1 { font-family: Georgia, 'Times New Roman', 'Liberation Serif', serif; font-size: 52px; line-height: 1; letter-spacing: 2px; font-weight: 900; }
  .dateline { display: flex; justify-content: space-between; font-size: 11px; font-weight: bold; letter-spacing: 1.5px; border-top: 1px solid #141414; border-bottom: 3px solid #141414; padding: 5px 2px; margin-top: 6px; }
  .lead { padding: 10px 0 8px 0; border-bottom: 1px solid #141414; }
  .kicker { color: #b91c1c; font-size: 11px; font-weight: bold; letter-spacing: 2px; }
  .lead h2 { font-family: Georgia, 'Times New Roman', 'Liberation Serif', serif; font-size: 24px; line-height: 1.12; font-weight: 900; margin: 3px 0 4px 0; }
  .lead p { font-size: 13px; line-height: 1.38; }
  .cards { display: flex; gap: 14px; padding: 9px 0 10px 0; border-bottom: 3px solid #141414; }
  .card { flex: 1; border-left: 1px solid #c9c2ae; padding-left: 12px; }
  .card:first-child { border-left: none; padding-left: 0; }
  .card .ch { font-family: Georgia, 'Times New Roman', 'Liberation Serif', serif; font-size: 14px; font-weight: 900; line-height: 1.2; margin: 3px 0 4px 0; }
  .card .cs { font-size: 10.5px; line-height: 1.32; }
  .grid { display: flex; gap: 18px; padding-top: 9px; }
  .col { flex: 1; }
  .section { margin-bottom: 10px; }
  .sec-head { font-size: 12px; font-weight: bold; letter-spacing: 2px; color: #b91c1c; border-bottom: 2px solid #b91c1c; padding-bottom: 3px; margin-bottom: 6px; }
  .story { margin-bottom: 7px; }
  .story .sh { font-family: Georgia, 'Times New Roman', 'Liberation Serif', serif; font-size: 12px; font-weight: 900; line-height: 1.2; }
  .story .ss { font-size: 10px; line-height: 1.32; margin-top: 1px; }
  .src { font-size: 8.5px; font-weight: bold; letter-spacing: 0.5px; color: #6b6b6b; text-transform: uppercase; white-space: nowrap; }
  .footer { border-top: 3px solid #141414; margin-top: 0; padding-top: 5px; font-size: 10px; line-height: 1.45; }
  .footer .sources { color: #333; }
  .footer .note { color: #6b6b6b; }
</style></head><body>
  <div class="masthead">
    <h1>${esc(data.masthead)}</h1>
    <div class="dateline"><span>SATURDAY 21 NOVEMBER 2026</span><span>35 STORIES &middot; 7 REGIONS</span><span>ONE PAGE &middot; THE WHOLE WORLD</span></div>
  </div>
  <div class="lead">
    <div class="kicker">${esc(lead.kicker)}</div>
    <h2>${esc(lead.headline)}</h2>
    <p>${esc(lead.summary)} <span class="src">${esc(lead.source)}</span></p>
  </div>
  <div class="cards">${heroCards}</div>
  <div class="grid">
    <div class="col">${col1.map(sectionHtml).join('')}</div>
    <div class="col">${col2.map(sectionHtml).join('')}</div>
    <div class="col">${col3.map(sectionHtml).join('')}</div>
  </div>
  <div class="footer">
    <div class="sources"><b>Sources:</b> ${esc(data.footer_sources)}</div>
    <div class="note">${esc(data.tagline)} Compiled Saturday 21 November 2026.</div>
  </div>
</body></html>
`;

mkdirSync(join(root, 'build'), { recursive: true });
writeFileSync(join(root, 'build', 'page.html'), html);
const total = data.hero.length + data.sections.reduce((n, s) => n + s.stories.length, 0);
console.log(`page built: ${total} stories, ${data.sections.length} sections`);
