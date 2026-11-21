# THE WORLD TODAY — Saturday 21 November 2026

[![make.fun](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121)
[![rank](https://make.fun/badge/news-image-20261121/Abdududu/news-image-20261121-v2/rank.svg)](https://make.fun/bounty/news-image-20261121)
[![reward](https://make.fun/badge/news-image-20261121/Abdududu/news-image-20261121-v2/reward.svg)](https://make.fun/bounty/news-image-20261121)

One image that sums up the world's news of **Saturday 21 November 2026**: a newspaper
front page with 35 real, verified stories across 7 regions — a lead story, a top-5 hero
strip, and dense regional sections, every story carrying its headline, a one-line summary,
and the outlet it came from. Built for the make.fun bounty
[Sum up 21 November's world news in one image](https://make.fun/bounty/news-image-20261121).

This is v2: five more stories than v1 (35 vs 30), led by the day's biggest developing
stories — COP31 going into overtime in Antalya, the Houthi missiles downed over Riyadh,
the Kyiv barrage spilling into Poland, and a magnitude 6.8 earthquake in Peru — plus
three football results from the FIFA U-17 World Cup and the A-League, all played on
Saturday 21 November 2026.

## The day in five stories

1. **COP31 talks go into overtime in Antalya** — negotiators work an extra day past the
   scheduled close, with no final agreement yet on fossil fuels or finance, and the draft
   text drops every mention of ending fossil fuels. (AP)
2. **Russia's barrage hits Kyiv — and spills into Poland** — over 400 drones and 110 missiles
   strike Ukraine; two Russian missiles and a drone come down in Poland. (The Times)
3. **Saudi Arabia downs three Houthi missiles at Riyadh** — the second Houthi attack on the
   capital in days. (Reuters)
4. **Magnitude 6.8 quake strikes Peru, felt in Lima** — a magnitude 6.8 earthquake hits
   central Peru in the Andean region of Junin, sending residents in Lima onto the streets.
   (Reuters)
5. **Trump calls Putin "my friend" at three-way summit** — Trump, Xi and Putin meet in
   Shenzhen and agree a "declaration toward peace". (Le Monde)

The front page also covers the ICJ ruling that Myanmar committed genocide, Europe (EU aid
and arms for Ukraine, the UK–EU youth mobility deal, Denmark expelling a Russian attaché),
the Middle East (Iraqi troops in Jurf al-Sakhar), Asia-Pacific, the Americas, Africa, Tech
& Science (AI chips to China, potatoes in mock moon soil, the COP31 draft, the next summit
set for Ethiopia in 2027), and Sport & Culture (the Pete Rose pardon, the U-17 World Cup,
Auckland FC's late equaliser).

## How it works

`main.ts` (Node 22) copies the pre-rendered front page, `assets/news.png`
(1024 × 1024), to `/output/entry.png`. No network, no randomness, no clock —
the image is fixed bytes in the repository, so two runs write byte-identical output.

The image was produced during this build from `data/news.json` (35 stories, each written
from a source actually read) by `scripts/build-page.mjs`, which renders the newspaper
front page as HTML, and `scripts/render.mjs`, which screenshots it at 1024 × 1024 with
Playwright. The final PNG was read and checked by eye before this entry was committed.

## Run it

```sh
node main.ts
# wrote /output/entry.png: <bytes>
```

## Sources

CNN · Reuters · The Times · Le Monde · AP · EU Council · GOV.UK · Ukrinform · US Treasury ·
NPR · Oregon State University · Agencia Presentes · SAPS · IndexBox · Saudi-led coalition ·
Friends of Football
