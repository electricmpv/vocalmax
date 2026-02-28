import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';

await mkdir('/tmp/ui-quiz-meme', { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 390, height: 844 });

// 6 种背景：用分数+类型组合触发不同 memeType
const cases = [
  // [url_params, filename, label]
  ['s=88&d=80&st=85&p=78&mode=quiz&qt=dating&si=0&forced=0', '1-magnetic.png', 'magnetic（约会·高分·紫色正弦波）'],
  ['s=88&d=82&st=86&p=80&mode=quiz&qt=work&si=0&forced=0',   '2-authority.png', 'authority（职场·高分·蓝色网格）'],
  ['s=65&d=60&st=68&p=62&mode=quiz&qt=work&si=1&forced=0',   '3-potential.png', 'potential（职场·中分·绿色圆弧）'],
  ['s=45&d=50&st=38&p=42&mode=quiz&qt=work&si=2&forced=1',   '4-forced.png',   'forced（刻意压低·黄黑警示条纹）'],
  ['s=65&d=58&st=70&p=62&mode=quiz&qt=dating&si=1&forced=0', '5-natural.png',  'natural（约会·中分·翠绿曲线）'],
  ['s=40&d=42&st=36&p=38&mode=quiz&qt=dating&si=2&forced=0', '6-dormant.png',  'dormant（低分·灰色噪点）'],
];

for (const [params, filename, label] of cases) {
  await page.goto(`http://127.0.0.1:3002/share?${params}`);
  await page.waitForSelector('img[alt="分享卡"]', { timeout: 12000 });
  await page.waitForTimeout(200);
  // 只截取分享卡区域
  await page.screenshot({ path: `/tmp/ui-quiz-meme/${filename}`, fullPage: false });
  console.log(`✓ ${label}`);
}

await browser.close();
console.log('\n全部 6 种 MEME 背景截图完成。');
