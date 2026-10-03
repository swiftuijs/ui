// Local server for browser acceptance of the production static export.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'

const root = resolve(process.env.STATIC_ROOT ?? 'apps/docs/out')
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json' }
try { await stat(resolve(root, 'index.html')) } catch { throw new Error('Build docs before browser tests: pnpm --filter docs build') }
createServer(async (request, response) => {
  try {
    let file = resolve(root, `.${decodeURIComponent(new URL(request.url, 'http://localhost').pathname)}`)
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
    const data = await readFile(file)
    response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' })
    response.end(data)
  } catch { response.writeHead(404).end() }
}).listen(Number(process.env.STATIC_PORT ?? 3102), '127.0.0.1')
