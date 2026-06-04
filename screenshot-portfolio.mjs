import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3005', { waitUntil: 'networkidle2' });
await page.evaluate(() => document.querySelector('#portfolio').scrollIntoView());
await new Promise(r => setTimeout(r, 1200));
const el = await page.$('#portfolio');
await el.screenshot({ path: 'temporary screenshots/portfolio-section.png' });
await browser.close();
console.log('done');
