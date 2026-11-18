import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { gzipSync, brotliCompressSync, constants } from 'node:zlib'
async function compress(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await compress(path)
    else if (/\.(html|js|css|svg|json|txt)$/.test(entry.name)) {
      const data = await readFile(path)
      await writeFile(path + '.gz', gzipSync(data, { level: 9 }))
      await writeFile(path + '.br', brotliCompressSync(data, { params: { [constants.BROTLI_PARAM_QUALITY]: 9 } }))
    }
  }
}
await compress(new URL('../dist/', import.meta.url).pathname)
console.log('Generated Brotli and gzip variants for text assets.')
