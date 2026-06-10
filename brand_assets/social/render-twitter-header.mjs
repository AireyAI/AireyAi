import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, "twitter-header-source.html");
const outputPath = path.join(__dirname, "twitter-header-1500x500.png");

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 500, deviceScaleFactor: 1 });
  await page.goto(`file://${sourcePath}`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: outputPath, type: "png" });
  console.log(outputPath);
} finally {
  await browser.close();
}
