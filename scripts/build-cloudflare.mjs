import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

const rootFiles = [
  "index.html",
  "pricing.html",
  "projects.html",
  "brief.html",
  "aria.html",
  "studio.html",
  "privacy.html",
  "styles.css",
  "theme.js",
  "animations.js",
  "CNAME",
  "_headers",
  "_redirects",
];

const rootExtensions = new Set([
  ".ico",
  ".jpg",
  ".jpeg",
  ".mp4",
  ".png",
  ".svg",
  ".webp",
]);

const assetDirs = [
  "portfolio",
  "generated-images",
  "generated-videos",
];

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function copyIfExists(relativePath) {
  if (path.isAbsolute(relativePath) || relativePath.split(path.sep).includes("..")) {
    throw new Error(`Refusing to copy unsafe path: ${relativePath}`);
  }

  const from = path.resolve(root, relativePath);
  const to = path.resolve(dist, relativePath);
  if (!from.startsWith(`${root}${path.sep}`) || !to.startsWith(`${dist}${path.sep}`)) {
    throw new Error(`Refusing to copy path outside build roots: ${relativePath}`);
  }

  if (!(await exists(from))) return;

  await mkdir(path.dirname(to), { recursive: true });
  await cp(from, to, { recursive: true });
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of rootFiles) {
  await copyIfExists(file);
}

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  if (rootExtensions.has(path.extname(entry.name).toLowerCase())) {
    await copyIfExists(entry.name);
  }
}

for (const dir of assetDirs) {
  await copyIfExists(dir);
}

console.log(`Cloudflare Pages build ready: ${path.relative(root, dist)}`);
