// Dev-only capture script — run with: npx playwright@1.61.0 node scripts/capture-showcase.mjs
// Requires: npx playwright install chromium (first time only)
// Produces: assets/showcase/{slug}-{desktop|tablet|mobile}.png

import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'assets', 'showcase');
mkdirSync(OUT, { recursive: true });

const SITES = [
  { slug: 'bar',       url: 'https://milan-bar.vercel.app/' },
  { slug: 'portfolio', url: 'https://matiezeordu.com.ar/' },
  { slug: 'skincare',  url: 'https://gildedglowskin.vercel.app/' },
  { slug: 'decants',   url: 'https://www.nadiradecants.com.ar/', dismissPopup: true },
];

const DEVICES = [
  { name: 'desktop', width: 1440, height: 900,  dpr: 2 },
  { name: 'tablet',  width: 834,  height: 1112, dpr: 2 },
  { name: 'mobile',  width: 390,  height: 844,  dpr: 3 },
];

// Selectors for common cookie/consent banners to dismiss
const CONSENT_SELECTORS = [
  'button[id*="accept"]',
  'button[class*="accept"]',
  'button[class*="cookie"]',
  '[aria-label*="Accept"]',
  '[aria-label*="Aceptar"]',
  'button:has-text("Aceptar")',
  'button:has-text("Accept")',
  'button:has-text("OK")',
];

// Selectors for marketing popups / discount coupons (close buttons)
const POPUP_SELECTORS = [
  'button[class*="close"]',
  'button[class*="Close"]',
  '[class*="popup"] button',
  '[class*="modal"] button[aria-label*="close" i]',
  '[class*="modal"] button[aria-label*="cerrar" i]',
  '[class*="overlay"] button',
  '[id*="popup"] button',
  'button[aria-label*="close" i]',
  'button[aria-label*="cerrar" i]',
  '[class*="dismiss"]',
];

async function dismissConsent(page) {
  for (const sel of CONSENT_SELECTORS) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 1500 })) {
        await el.click();
        await page.waitForTimeout(400);
        break;
      }
    } catch {}
  }
}

async function dismissPopup(page) {
  // Target the close button by its aria-label (nadiradecants uses "Cerrar")
  const closeSelectors = [
    'button[aria-label="Cerrar"]',
    'button[aria-label="cerrar"]',
    'button[aria-label="Close"]',
    'button[aria-label="close"]',
    ...POPUP_SELECTORS,
  ];

  for (const sel of closeSelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 2000 })) {
        await el.click();
        await page.waitForTimeout(600);
        return;
      }
    } catch {}
  }

  // Fallback: Escape key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
}

(async () => {
  const browser = await chromium.launch();

  const target = process.argv[2]; // optional: filter by slug, e.g. "decants"
  for (const site of SITES.filter(s => !target || s.slug === target)) {
    for (const device of DEVICES) {
      const outFile = join(OUT, `${site.slug}-${device.name}.png`);
      console.log(`Capturing ${site.slug} / ${device.name}...`);

      const ctx = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        deviceScaleFactor: device.dpr,
        locale: 'es-AR',
      });
      const page = await ctx.newPage();

      // Block analytics/tracking to speed up load
      await page.route(/google-analytics|googletagmanager|hotjar|clarity\.ms|facebook\.net/, r => r.abort());

      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1500); // let fonts/animations/popups settle
      await dismissConsent(page);
      if (site.dismissPopup) await dismissPopup(page);

      await page.screenshot({
        path: outFile,
        clip: { x: 0, y: 0, width: device.width, height: device.height },
      });

      console.log(`  ✓ saved ${outFile}`);
      await ctx.close();
    }
  }

  await browser.close();
  console.log('\nDone.');
})();
