// Renders the static export's /print/ page to an A4 PDF with the installed Chrome.
// Usage: npm run pdf   (runs `next build` first)
import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright-core";

const root = resolve("out");
const outDir = resolve("pdf");
const outFile = join(outDir, "조성빈_백엔드_포트폴리오.pdf");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
};

const server = createServer((req, res) => {
  let path = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html");
  if (!existsSync(path)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" });
  createReadStream(path).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const { port } = server.address();

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/print/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  mkdirSync(outDir, { recursive: true });
  await page.pdf({
    path: outFile,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `<div style="width:100%;font-size:7.5pt;color:#8a8b90;padding:0 14mm;display:flex;justify-content:space-between;font-family:-apple-system,sans-serif">
      <span>조성빈 · 백엔드 포트폴리오 · ricky00-dev.github.io</span>
      <span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  });
  console.log(`PDF written: ${outFile}`);
} finally {
  await browser.close();
  server.close();
}
