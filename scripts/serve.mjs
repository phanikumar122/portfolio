import { createServer } from 'node:http'
import { stat, readFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8' }
function accepts(header, encoding) {
  const entries = String(header || '').split(',').map(value => value.trim().split(';'))
  const entry = entries.find(([name]) => name === encoding) || entries.find(([name]) => name === '*')
  return entry && !entry.slice(1).some(value => /^\s*q\s*=\s*0(?:\.0*)?\s*$/.test(value))
}
export function createPortfolioServer(root = resolve(new URL('../dist/', import.meta.url).pathname)) {
  return createServer(async (req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); res.end(); return }
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      let file = resolve(root, '.' + pathname)
      if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return }
      if (pathname.endsWith('/')) file = resolve(file, 'index.html')
      let info
      try { info = await stat(file); if (!info.isFile()) throw new Error('Missing') }
      catch { if (extname(pathname)) { res.writeHead(404); res.end(); return }; file = resolve(root, 'index.html'); info = await stat(file) }
      const contentType = types[extname(file)] || 'application/octet-stream'
      let encoding
      if (!req.headers.range) {
        for (const candidate of ['br', 'gzip']) {
          if (accepts(req.headers['accept-encoding'], candidate)) {
            try { const compressed = file + (candidate === 'br' ? '.br' : '.gz'); info = await stat(compressed); file = compressed; encoding = candidate; break } catch { /* Identity file remains available. */ }
          }
        }
      }
      const etag = `"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`
      const headers = { 'Content-Type': contentType, 'Cache-Control': /\/assets\//.test(file) ? 'public, max-age=31536000, immutable' : 'no-cache', Vary: 'Accept-Encoding', ETag: etag, 'X-Content-Type-Options': 'nosniff', 'Accept-Ranges': 'bytes' }
      if (encoding) headers['Content-Encoding'] = encoding
      if (req.headers['if-none-match']?.split(/,\s*/).includes(etag)) { res.writeHead(304, headers); res.end(); return }
      let start = 0, end = info.size - 1, status = 200
      if (req.headers.range) {
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range)
        if (!range || (!range[1] && !range[2])) { res.writeHead(416, { ...headers, 'Content-Range': `bytes */${info.size}` }); res.end(); return }
        if (!range[1]) start = Math.max(0, info.size - Number(range[2]))
        else { start = Number(range[1]); if (range[2]) end = Math.min(end, Number(range[2])) }
        if (start > end || start >= info.size) { res.writeHead(416, { ...headers, 'Content-Range': `bytes */${info.size}` }); res.end(); return }
        status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`
      }
      headers['Content-Length'] = Math.max(0, end - start + 1)
      res.writeHead(status, headers)
      if (req.method === 'HEAD') res.end()
      else res.end((await readFile(file)).subarray(start, end + 1))
    } catch (error) { if (!res.headersSent) res.writeHead(error instanceof URIError ? 400 : 500); res.end() }
  })
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 5173)
  createPortfolioServer().listen(port, '127.0.0.1', () => console.log(`Production portfolio: http://127.0.0.1:${port}/`))
}
