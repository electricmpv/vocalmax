import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';

await mkdir('/tmp/ui-quiz', { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });

// Landing - with quiz CTA
await page.goto('http://127.0.0.1:3002/');
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/ui-quiz/01-landing-with-quiz.png', fullPage: true });
console.log('✓ /');

// Quiz selection
await page.goto('http://127.0.0.1:3002/quiz');
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/ui-quiz/02-quiz-select.png', fullPage: true });
console.log('✓ /quiz');

// Quiz session (dating) - intro step
await page.goto('http://127.0.0.1:3002/quiz/session?type=dating');
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/ui-quiz/03-quiz-dating-intro.png', fullPage: true });
console.log('✓ /quiz/session?type=dating');

// Quiz session (work) - intro step
await page.goto('http://127.0.0.1:3002/quiz/session?type=work');
await page.waitForTimeout(400);
await page.screenshot({ path: '/tmp/ui-quiz/04-quiz-work-intro.png', fullPage: true });
console.log('✓ /quiz/session?type=work');

// Share in quiz mode
await page.goto('http://127.0.0.1:3002/share?s=82&d=75&st=88&p=70&mode=quiz&qt=dating&si=0&forced=0');
await page.waitForSelector('img[alt="分享卡"]', { timeout: 10000 });
await page.screenshot({ path: '/tmp/ui-quiz/05-share-quiz-mode.png', fullPage: true });
console.log('✓ /share?mode=quiz');

// Share in quiz mode - forced
await page.goto('http://127.0.0.1:3002/share?s=45&d=55&st=38&p=50&mode=quiz&qt=work&si=1&forced=1');
await page.waitForSelector('img[alt="分享卡"]', { timeout: 10000 });
await page.screenshot({ path: '/tmp/ui-quiz/06-share-quiz-forced.png', fullPage: true });
console.log('✓ /share?mode=quiz&forced=1');

await browser.close();
console.log('\nAll quiz screenshots done.');
