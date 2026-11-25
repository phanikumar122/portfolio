import { test } from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readdir, mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createPortfolioServer } from './serve.mjs'

test('hashed assets use immutable caching on the native filesystem', async () => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-server-test-'))
  await mkdir(join(root, 'assets'))
  await writeFile(join(root, 'assets', 'app-test123.js'), 'export default true')
  const server = createPortfolioServer(root)
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/assets/app-test123.js`)
    assert.equal(response.status, 200)
    assert.equal(response.headers.get('cache-control'), 'public, max-age=31536000, immutable')
    assert.equal(await response.text(), 'export default true')
  } finally {
    server.closeAllConnections()
    await new Promise(resolve => server.close(resolve))
    await rm(root, { recursive: true, force: true })
  }
})

test('production responses support compression, caching, PDF ranges and safe paths', async () => {
  const server = createPortfolioServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const base = `http://127.0.0.1:${server.address().port}`
  try {
    const page = await fetch(base, { headers: { 'Accept-Encoding': 'br' } })
    assert.equal(page.status, 200)
    assert.equal(page.headers.get('content-encoding'), 'br')
    assert.match(await page.text(), /<title>Phani Kumar — Full-stack developer<\/title>/)
    assert.equal(page.headers.get('cache-control'), 'no-cache')
    const files = await readdir(new URL('../dist/assets/', import.meta.url))
    const asset = '/assets/' + files.find(file => file.endsWith('.js'))
    const compressed = await fetch(base + asset, { headers: { 'Accept-Encoding': 'gzip' } })
    assert.equal(compressed.headers.get('content-encoding'), 'gzip')
    assert.match(compressed.headers.get('cache-control'), /immutable/)
    const cached = await fetch(base + asset, { headers: { 'Accept-Encoding': 'gzip', 'If-None-Match': compressed.headers.get('etag') } })
    assert.equal(cached.status, 304)
    const identity = await fetch(base + asset, { headers: { 'Accept-Encoding': 'br;q=0, gzip;q=0' } })
    assert.equal(identity.headers.get('content-encoding'), null)
    const range = await fetch(base + '/resume.pdf', { headers: { Range: 'bytes=0-9' } })
    assert.equal(range.status, 206)
    assert.equal((await range.arrayBuffer()).byteLength, 10)
    assert.equal((await fetch(base + '/assets/missing.js')).status, 404)
    assert.equal((await fetch(base + '/%2e%2e%2fpackage.json')).status, 403)
    assert.equal((await fetch(base, { method: 'POST' })).status, 405)
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)) }
})
