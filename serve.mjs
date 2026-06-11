import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  urlPath = decodeURIComponent(urlPath);
  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const type = MIME[ext] || 'application/octet-stream';
    const range = req.headers.range;
    if (range) {
      // Range support — required for <video> seeking (matches GitHub Pages behaviour)
      const m = /bytes=(\d*)-(\d*)/.exec(range);
      const start = m && m[1] ? parseInt(m[1], 10) : 0;
      const end = m && m[2] ? Math.min(parseInt(m[2], 10), data.length - 1) : data.length - 1;
      res.writeHead(206, {
        'Content-Type': type,
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${start}-${end}/${data.length}`,
        'Content-Length': end - start + 1,
      });
      res.end(data.subarray(start, end + 1));
      return;
    }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
