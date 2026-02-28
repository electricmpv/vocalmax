import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });

const shots = [
  ['/', '/tmp/ui/01-landing.png'],
  ['/app?track=a', '/tmp/ui/02-app-track-a.png'],
  ['/app?track=b', '/tmp/ui/03-app-track-b.png'],
  ['/app/session/track-a-day-01-ex-01', '/tmp/ui/04-session-ex1.png'],
  ['/app/session/track-b-day-01-ex-01', '/tmp/ui/05-session-b-ex1.png'],
  ['/coach', '/tmp/ui/06-coach.png'],
  ['/privacy', '/tmp/ui/08-privacy.png'],
];

import { mkdir } from 'fs/promises';
await mkdir('/tmp/ui', { recursive: true });

for (const [url, path] of shots) {
  await page.goto('http://127.0.0.1:3002' + url);
  await page.waitForTimeout(400);
  await page.screenshot({ path, fullPage: true });
  console.log('✓', url);
}

// Share card - wait for canvas
await page.goto('http://127.0.0.1:3002/share?s=85&d=78&st=91&p=65&streak=7&track=a');
await page.waitForSelector('img[alt="分享卡"]', { timeout: 10000 });
await page.screenshot({ path: '/tmp/ui/07-share-card.png', fullPage: true });
console.log('✓ /share (canvas rendered)');

// Coach expanded
await page.goto('http://127.0.0.1:3002/coach');
await page.waitForTimeout(300);
const firstCard = page.locator('.cursor-pointer, [role="button"]').first();
await firstCard.click().catch(() => {});
const cards = await page.locator('div').filter({ hasText: '点击展开教程' }).all();
if (cards.length) await cards[0].click().catch(() => {});
await page.waitForTimeout(300);
await page.screenshot({ path: '/tmp/ui/06b-coach-expanded.png', fullPage: true });
console.log('✓ /coach expanded');

await browser.close();
console.log('\nAll screenshots done.');
